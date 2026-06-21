// Capa de autenticación con roles para el panel administrativo.
// Usa Supabase Auth cuando está configurado; si no, modo demo con localStorage (SHA-256).
// Roles: 'admin' y 'developer'. Solo UN usuario por rol; al completarse ambos,
// el registro queda deshabilitado (solo login + recuperación de contraseña).

import { supabase, isSupabaseConfigured } from './supabase'

export const usingSupabaseAuth = isSupabaseConfigured

export type Role = 'admin' | 'developer'

export interface AuthUser {
  id: string
  email: string
  role: Role
  passwordHash: string
  createdAt: string
}

export interface Session {
  id: string
  email: string
  role: Role
}

export const ROLES: Role[] = ['admin', 'developer']

const USERS_KEY = 'auth_users'
const SESSION_KEY = 'auth_session'

async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function readUsers(): AuthUser[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch {
    return []
  }
}

function writeUsers(users: AuthUser[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function getUsers(): AuthUser[] {
  return readUsers()
}

/** Roles que ya tienen un usuario registrado (Supabase via RPC o localStorage). */
export async function takenRoles(): Promise<Role[]> {
  if (supabase) {
    const { data, error } = await supabase.rpc('roles_taken')
    if (error) throw new Error(error.message)
    return ((data as string[]) ?? []).filter((r): r is Role => ROLES.includes(r as Role))
  }
  return readUsers().map((u) => u.role)
}

/** Roles que aún se pueden registrar. */
export async function availableRoles(): Promise<Role[]> {
  const taken = await takenRoles()
  return ROLES.filter((r) => !taken.includes(r))
}

/** ¿Se permite todavía registrar nuevos usuarios? */
export async function canRegister(): Promise<boolean> {
  return (await availableRoles()).length > 0
}

async function fetchRole(userId: string): Promise<Role> {
  if (!supabase) return 'admin'
  const { data } = await supabase.from('profiles').select('role').eq('id', userId).single()
  const role = data?.role as Role | undefined
  return role && ROLES.includes(role) ? role : 'admin'
}

export const roleLabel: Record<Role, string> = {
  admin: 'Administrador',
  developer: 'Desarrollador',
}

export async function register(params: {
  email: string
  password: string
  role: Role
}): Promise<{ session: Session | null; needsConfirmation: boolean }> {
  const { email, password, role } = params
  if (!ROLES.includes(role)) throw new Error('Rol no válido.')
  if (password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres.')

  const free = await availableRoles()
  if (!free.includes(role)) {
    throw new Error(`Ya existe un usuario con el rol ${roleLabel[role]}.`)
  }

  if (supabase) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role } },
    })
    if (error) throw new Error(error.message)
    if (data.session && data.user) {
      return {
        session: { id: data.user.id, email: data.user.email ?? email, role },
        needsConfirmation: false,
      }
    }
    return { session: null, needsConfirmation: true }
  }

  const users = readUsers()
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('Ese correo ya está registrado.')
  }
  const user: AuthUser = {
    id: crypto.randomUUID(),
    email,
    role,
    passwordHash: await hashPassword(password),
    createdAt: new Date().toISOString(),
  }
  users.push(user)
  writeUsers(users)
  const session: Session = { id: user.id, email: user.email, role: user.role }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return { session, needsConfirmation: false }
}

export async function login(params: { email: string; password: string }): Promise<Session> {
  const { email, password } = params
  if (supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error || !data.user) throw new Error('Correo o contraseña incorrectos.')
    const role = await fetchRole(data.user.id)
    return { id: data.user.id, email: data.user.email ?? email, role }
  }
  const users = readUsers()
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
  const hash = await hashPassword(password)
  if (!user || user.passwordHash !== hash) {
    throw new Error('Correo o contraseña incorrectos.')
  }
  const session: Session = { id: user.id, email: user.email, role: user.role }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

/**
 * Recuperación de contraseña.
 * - Supabase: envía un correo con enlace de recuperación hacia /admin/reset.
 * - Demo (localStorage): establece directamente la nueva contraseña.
 */
export async function sendRecovery(params: { email: string; newPassword?: string }): Promise<void> {
  const { email, newPassword } = params
  if (supabase) {
    const redirectTo =
      typeof window !== 'undefined' ? `${window.location.origin}/admin/reset` : undefined
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
    if (error) throw new Error(error.message)
    return
  }
  if (!newPassword || newPassword.length < 6) {
    throw new Error('La nueva contraseña debe tener al menos 6 caracteres.')
  }
  const users = readUsers()
  const index = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase())
  if (index === -1) throw new Error('No existe ninguna cuenta registrada con ese correo.')
  users[index].passwordHash = await hashPassword(newPassword)
  writeUsers(users)
}

/** Actualiza la contraseña del usuario autenticado (página de reset de Supabase). */
export async function updatePassword(newPassword: string): Promise<void> {
  if (newPassword.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres.')
  if (supabase) {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw new Error(error.message)
    return
  }
  throw new Error('Función no disponible en modo demo.')
}

export async function getSession(): Promise<Session | null> {
  if (supabase) {
    const { data } = await supabase.auth.getSession()
    const user = data.session?.user
    if (!user) return null
    const role = await fetchRole(user.id)
    return { id: user.id, email: user.email ?? '', role }
  }
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as Session) : null
  } catch {
    return null
  }
}

export async function logout() {
  if (supabase) {
    await supabase.auth.signOut()
    return
  }
  if (typeof window === 'undefined') return
  localStorage.removeItem(SESSION_KEY)
}
