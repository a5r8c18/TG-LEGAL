# Teneduría García SURL — Guía de configuración

Plataforma de asesoría jurídica/contable. Next.js 14 + TypeScript + Tailwind + **Supabase**.

## Modos de funcionamiento

- **Sin configurar Supabase** → modo *demo* con `localStorage` (datos solo en tu navegador).
- **Con Supabase configurado** → backend real: autenticación, consultas, abogados y cobros persistentes.

El panel `/admin` muestra una insignia indicando el modo activo.

---

## 1. Crear proyecto en Supabase

1. Entra en [supabase.com](https://supabase.com) y crea un proyecto.
2. Ve a **Project Settings → API** y copia:
   - `Project URL`
   - `anon public key`

## 2. Configurar variables de entorno

Copia `.env.local.example` como `.env.local` y rellena:

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_public_key
```

Reinicia el servidor (`npm run dev`).

## 3. Crear las tablas

En **SQL Editor** de Supabase, pega y ejecuta el contenido de `supabase-setup.sql`.
Esto crea: `profiles` (roles), `lawyers`, `consultations` (con precio, moneda, cobro y abogado),
los triggers, la función `roles_taken()` y las políticas RLS.

## 4. Autenticación (importante)

La app usa **Supabase Auth** con dos roles: `admin` y `developer` (uno por rol).

- **Email de confirmación**: para acceso inmediato tras registrarse, ve a
  **Authentication → Providers → Email** y **desactiva "Confirm email"**.
  Si lo dejas activado, el usuario deberá confirmar su correo antes de iniciar sesión.
- **Recuperación de contraseña**: funciona por correo. Configura el remitente en
  **Authentication → Emails**. El enlace redirige a `/admin/reset`.
  Añade tu dominio (y `http://localhost:3000`) en **Authentication → URL Configuration → Redirect URLs**.

## 5. Flujo de uso

1. En el home, botón **"Panel"** → `/admin` (redirige a `/admin/login` si no hay sesión).
2. **Registra** la cuenta `admin` y luego la `developer`. Tras completar ambos roles,
   el registro se **deshabilita automáticamente** (solo login + recuperación).
3. En el panel:
   - **Abogados del equipo**: agrega/elimina abogados.
   - Cada solicitud tiene **"Gestionar"** (icono de engranaje) para:
     - Asignar un **abogado**.
     - Definir **costo + moneda** (USD, EUR, CUP, MLC).
     - Marcar el **estado del cobro** (Sin cotizar, Cotizada, Pagada, Exonerada).
     - Cambiar el **estado** de la solicitud.
   - Acciones rápidas (confirmar/cancelar/completar) con iconos y tooltips.

## 6. Deploy en Vercel

1. Sube el repo a GitHub e impórtalo en [vercel.com](https://vercel.com).
2. En **Settings → Environment Variables** añade `NEXT_PUBLIC_SUPABASE_URL` y
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. En Supabase, agrega la URL de producción a **Redirect URLs**.
4. Deploy.

---

## Notas de seguridad

- Las políticas RLS permiten **insertar** solicitudes de forma anónima (formulario público)
  y **leer/gestionar** solo a usuarios **autenticados**.
- El modo demo (localStorage) es solo para desarrollo/demostración, no es seguro para producción.
