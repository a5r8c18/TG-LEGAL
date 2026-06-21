import { supabase, isSupabaseConfigured } from './supabase'

export type ServiceType = 'legal' | 'business' | 'property'
export type ConsultationStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'
export type PaymentStatus = 'pending' | 'quoted' | 'paid' | 'waived'

export interface Consultation {
  id: string
  patient_name: string
  patient_email: string
  patient_phone: string
  service_type: ServiceType
  specific_service: string
  preferred_date: string
  preferred_time: string
  status: ConsultationStatus
  notes?: string | null
  assigned_lawyer_id?: string | null
  price?: number | null
  currency?: string | null
  payment_status?: PaymentStatus | null
  created_at: string
  updated_at?: string
}

export type NewConsultation = Pick<
  Consultation,
  | 'patient_name'
  | 'patient_email'
  | 'patient_phone'
  | 'service_type'
  | 'specific_service'
  | 'preferred_date'
  | 'preferred_time'
  | 'notes'
>

export const paymentStatusLabel: Record<PaymentStatus, string> = {
  pending: 'Sin cotizar',
  quoted: 'Cotizada',
  paid: 'Pagada',
  waived: 'Exonerada',
}

export const CURRENCIES = ['USD', 'EUR', 'CUP', 'MLC'] as const

const STORAGE_KEY = 'consultations'
const TABLE = 'consultations'

/** Indica si estamos usando Supabase real o el modo demo (localStorage). */
export const usingSupabase = isSupabaseConfigured

// ---------- localStorage fallback ----------
function readLocal(): Consultation[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function writeLocal(items: Consultation[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

// ---------- API pública ----------
export async function getConsultations(): Promise<Consultation[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw new Error(error.message)
    return (data as Consultation[]) ?? []
  }

  return readLocal().sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )
}

export async function createConsultation(payload: NewConsultation): Promise<Consultation> {
  if (supabase) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert({ ...payload, status: 'pending' })
      .select()
      .single()
    if (error) throw new Error(error.message)
    return data as Consultation
  }

  const now = new Date().toISOString()
  const record: Consultation = {
    ...payload,
    id: (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID()
      : Date.now().toString(),
    status: 'pending',
    created_at: now,
    updated_at: now,
  }
  const items = readLocal()
  items.push(record)
  writeLocal(items)
  return record
}

/** Actualiza cualquier campo de una consulta (estado, abogado, precio, cobro, etc.). */
export async function updateConsultation(
  id: string,
  patch: Partial<Consultation>,
): Promise<void> {
  const updates = { ...patch, updated_at: new Date().toISOString() }
  if (supabase) {
    const { error } = await supabase.from(TABLE).update(updates).eq('id', id)
    if (error) throw new Error(error.message)
    return
  }

  const items = readLocal().map((c) => (c.id === id ? { ...c, ...updates } : c))
  writeLocal(items)
}

export async function updateConsultationStatus(
  id: string,
  status: ConsultationStatus,
): Promise<void> {
  return updateConsultation(id, { status })
}

/** Inserta datos de ejemplo en modo demo (solo localStorage, si está vacío). */
export function seedLocalSampleData(sample: Consultation[]) {
  if (typeof window === 'undefined') return
  if (readLocal().length === 0) writeLocal(sample)
}

/**
 * Envía por correo la cotización al cliente mediante la Edge Function `send-quote`.
 * Solo disponible con Supabase configurado.
 */
export async function notifyQuote(params: {
  to: string
  name: string
  service: string
  price: number
  currency: string
  lawyer?: string | null
}): Promise<void> {
  if (!supabase) {
    throw new Error('El envío de correos requiere Supabase configurado.')
  }
  const { error } = await supabase.functions.invoke('send-quote', { body: params })
  if (error) throw new Error(error.message)
}
