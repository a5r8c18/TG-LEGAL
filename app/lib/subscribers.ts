import { supabase } from './supabase'

export type SubscriberStatus = 'pending' | 'paid' | 'active' | 'cancelled' | 'expired'
export type PaymentMethod = 'majority' | 'usdt'
export type SubscriberPlan = 'info' | 'especialista'

export interface Subscriber {
  id: string
  name: string
  whatsapp: string
  country: string
  plan: SubscriberPlan
  payment_method: PaymentMethod
  status: SubscriberStatus
  notes?: string | null
  created_at: string
  updated_at: string
}

export type NewSubscriber = {
  name: string
  whatsapp: string
  country: string
  plan: SubscriberPlan
  payment_method: PaymentMethod
}

export const subscriberStatusLabel: Record<SubscriberStatus, string> = {
  pending: 'Pendiente',
  paid: 'Pagado',
  active: 'Activo',
  cancelled: 'Cancelado',
  expired: 'Expirado',
}

const TABLE = 'subscribers'
const STORAGE_KEY = 'subscribers'

function readLocal(): Subscriber[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function writeLocal(items: Subscriber[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export async function createSubscriber(payload: NewSubscriber): Promise<Subscriber> {
  if (supabase) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert({ ...payload, status: 'pending' })
      .select()
      .single()
    if (error) throw new Error(error.message)
    return data as Subscriber
  }
  const record: Subscriber = {
    id: crypto.randomUUID(),
    ...payload,
    status: 'pending',
    notes: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  const items = readLocal()
  items.unshift(record)
  writeLocal(items)
  return record
}

export async function getSubscribers(): Promise<Subscriber[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw new Error(error.message)
    return (data as Subscriber[]) ?? []
  }
  return readLocal().sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )
}

export async function updateSubscriberStatus(
  id: string,
  status: SubscriberStatus,
  notes?: string,
): Promise<void> {
  if (supabase) {
    const { error } = await supabase
      .from(TABLE)
      .update({ status, ...(notes !== undefined ? { notes } : {}), updated_at: new Date().toISOString() })
      .eq('id', id)
    if (error) throw new Error(error.message)
    return
  }
  const items = readLocal()
  const idx = items.findIndex((s) => s.id === id)
  if (idx !== -1) {
    items[idx].status = status
    items[idx].updated_at = new Date().toISOString()
    if (notes !== undefined) items[idx].notes = notes
  }
  writeLocal(items)
}

export async function deleteSubscriber(id: string): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from(TABLE).delete().eq('id', id)
    if (error) throw new Error(error.message)
    return
  }
  writeLocal(readLocal().filter((s) => s.id !== id))
}
