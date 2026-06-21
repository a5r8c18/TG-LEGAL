import { supabase } from './supabase'

export interface Lawyer {
  id: string
  name: string
  specialty?: string | null
  email?: string | null
  phone?: string | null
  active: boolean
  created_at: string
}

export type NewLawyer = {
  name: string
  specialty?: string
  email?: string
  phone?: string
}

const STORAGE_KEY = 'lawyers'
const TABLE = 'lawyers'

function readLocal(): Lawyer[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function writeLocal(items: Lawyer[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export async function getLawyers(): Promise<Lawyer[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('name', { ascending: true })
    if (error) throw new Error(error.message)
    return (data as Lawyer[]) ?? []
  }
  return readLocal().sort((a, b) => a.name.localeCompare(b.name))
}

export async function createLawyer(payload: NewLawyer): Promise<Lawyer> {
  if (supabase) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert({ ...payload, active: true })
      .select()
      .single()
    if (error) throw new Error(error.message)
    return data as Lawyer
  }

  const record: Lawyer = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    name: payload.name,
    specialty: payload.specialty ?? null,
    email: payload.email ?? null,
    phone: payload.phone ?? null,
    active: true,
    created_at: new Date().toISOString(),
  }
  const items = readLocal()
  items.push(record)
  writeLocal(items)
  return record
}

export async function deleteLawyer(id: string): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from(TABLE).delete().eq('id', id)
    if (error) throw new Error(error.message)
    return
  }
  writeLocal(readLocal().filter((l) => l.id !== id))
}

/** Datos de ejemplo en modo demo. */
export function seedLocalLawyers(sample: Lawyer[]) {
  if (typeof window === 'undefined') return
  if (readLocal().length === 0) writeLocal(sample)
}
