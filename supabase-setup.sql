-- ============================================================
-- Teneduría García SURL — Configuración COMPLETA de base de datos
-- Ejecuta este script en: Supabase Dashboard > SQL Editor
-- Incluye: perfiles/roles, abogados, consultas (con precio y abogado), RLS.
-- ============================================================

create extension if not exists pgcrypto;

-- ============================================================
-- PERFILES Y ROLES (vinculados a Supabase Auth)
-- Roles permitidos: 'admin' y 'developer'. Solo UN usuario por rol.
-- ============================================================
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text,
  role       text not null check (role in ('admin','developer')),
  created_at timestamptz not null default now()
);

-- Un único usuario por rol (clave para deshabilitar el registro tras completarse)
create unique index if not exists uniq_profile_role on public.profiles(role);

-- Crea el perfil automáticamente al registrarse, leyendo el rol de los metadatos.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'role', 'admin'))
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Función para consultar roles ocupados SIN exponer datos (usada antes del login).
create or replace function public.roles_taken()
returns setof text as $$
  select role from public.profiles;
$$ language sql security definer stable;

grant execute on function public.roles_taken() to anon, authenticated;

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

-- ============================================================
-- ABOGADOS
-- ============================================================
create table if not exists public.lawyers (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  specialty  text,
  email      text,
  phone      text,
  active     boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.lawyers enable row level security;

drop policy if exists "lawyers_all_authenticated" on public.lawyers;
create policy "lawyers_all_authenticated"
  on public.lawyers for all
  to authenticated
  using (true)
  with check (true);


-- ============================================================
-- CONSULTAS / SOLICITUDES DE ASESORÍA
-- ============================================================
create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  patient_name        text not null,
  patient_email       text not null,
  patient_phone       text not null,
  service_type        text not null check (service_type in ('legal', 'business', 'property')),
  specific_service    text not null,
  preferred_date      date not null,
  preferred_time      text not null,
  status              text not null default 'pending'
                        check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  notes               text,
  -- Gestión interna: abogado asignado y cobro
  assigned_lawyer_id  uuid references public.lawyers(id) on delete set null,
  price               numeric(12,2),
  currency            text default 'USD',
  payment_status      text not null default 'pending'
                        check (payment_status in ('pending', 'quoted', 'paid', 'waived')),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- Índices para mejorar el rendimiento
create index if not exists idx_consultations_status     on public.consultations (status);
create index if not exists idx_consultations_created_at on public.consultations (created_at desc);

-- Trigger para mantener updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_consultations_updated_at on public.consultations;
create trigger trg_consultations_updated_at
  before update on public.consultations
  for each row execute function public.set_updated_at();

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================
alter table public.consultations enable row level security;

-- Cualquier visitante puede CREAR una solicitud (formulario público)
drop policy if exists "consultations_insert_anon" on public.consultations;
create policy "consultations_insert_anon"
  on public.consultations for insert
  to anon
  with check (true);

-- Solo usuarios autenticados (admin/developer) pueden leer y gestionar.
drop policy if exists "consultations_select_auth" on public.consultations;
create policy "consultations_select_auth"
  on public.consultations for select
  to authenticated
  using (true);

drop policy if exists "consultations_update_auth" on public.consultations;
create policy "consultations_update_auth"
  on public.consultations for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "consultations_delete_auth" on public.consultations;
create policy "consultations_delete_auth"
  on public.consultations for delete
  to authenticated
  using (true);

-- ============================================================
-- SUSCRIPTORES
-- ============================================================
create table if not exists public.subscribers (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  whatsapp       text not null,
  country        text not null,
  plan           text not null check (plan in ('info','especialista')),
  payment_method text not null check (payment_method in ('majority','usdt')),
  status         text not null default 'pending'
                   check (status in ('pending','paid','active','cancelled','expired')),
  notes          text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists idx_subscribers_status     on public.subscribers (status);
create index if not exists idx_subscribers_created_at on public.subscribers (created_at desc);

drop trigger if exists trg_subscribers_updated_at on public.subscribers;
create trigger trg_subscribers_updated_at
  before update on public.subscribers
  for each row execute function public.set_updated_at();

alter table public.subscribers enable row level security;

-- Cualquier visitante puede INSERTAR su solicitud (formulario público)
drop policy if exists "subscribers_insert_anon" on public.subscribers;
create policy "subscribers_insert_anon"
  on public.subscribers for insert
  to anon
  with check (true);

-- Solo admins pueden leer y gestionar
drop policy if exists "subscribers_select_auth" on public.subscribers;
create policy "subscribers_select_auth"
  on public.subscribers for select
  to authenticated
  using (true);

drop policy if exists "subscribers_update_auth" on public.subscribers;
create policy "subscribers_update_auth"
  on public.subscribers for update
  to authenticated
  using (true) with check (true);

drop policy if exists "subscribers_delete_auth" on public.subscribers;
create policy "subscribers_delete_auth"
  on public.subscribers for delete
  to authenticated
  using (true);

-- ============================================================
-- Datos de ejemplo (opcional)
-- ============================================================
insert into public.consultations
  (patient_name, patient_email, patient_phone, service_type, specific_service, preferred_date, preferred_time, status, notes)
values
  ('Carlos Rodríguez', 'carlos@email.com', '+53 523 456 789', 'legal',    'Consultas Jurídicas Generales',        current_date + 2, '09:00', 'pending',   'Consulta sobre trámites de herencia'),
  ('María González',   'maria@email.com',  '+53 512 345 678', 'business', 'Constitución y Gestión de MIPYMES',    current_date + 3, '14:00', 'confirmed', 'Creación de empresa en La Habana'),
  ('Pedro Díaz',       'pedro@email.com',  '+53 534 567 890', 'property', 'Compraventa y Traspaso de Inmuebles',  current_date + 4, '10:00', 'completed', 'Compra de apartamento en Varadero');

select 'Base de datos de Teneduría García SURL configurada correctamente.' as status;
