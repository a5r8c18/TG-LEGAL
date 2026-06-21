'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from '../../components/Icon'
import {
  login,
  register,
  sendRecovery,
  availableRoles,
  getSession,
  roleLabel,
  usingSupabaseAuth,
  type Role,
} from '../../lib/auth'

type Mode = 'login' | 'register' | 'recover'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('login')
  const [registrationOpen, setRegistrationOpen] = useState(false)
  const [freeRoles, setFreeRoles] = useState<Role[]>([])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [role, setRole] = useState<Role>('admin')
  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')

  useEffect(() => {
    let active = true
    ;(async () => {
      const session = await getSession()
      if (session) {
        router.replace('/admin')
        return
      }
      const roles = await availableRoles()
      if (!active) return
      setRegistrationOpen(roles.length > 0)
      setFreeRoles(roles)
      if (roles.length > 0) setRole(roles[0])
    })()
    return () => {
      active = false
    }
  }, [router])

  const resetMessages = () => {
    setError('')
    setInfo('')
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    resetMessages()
    try {
      await login({ email, password })
      router.replace('/admin')
    } catch (err: any) {
      setError(err.message || 'No se pudo iniciar sesión.')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    resetMessages()
    try {
      const { needsConfirmation } = await register({ email, password, role })
      if (needsConfirmation) {
        setInfo('Cuenta creada. Revisa tu correo para confirmar y luego inicia sesión.')
        setMode('login')
        setPassword('')
      } else {
        router.replace('/admin')
      }
    } catch (err: any) {
      setError(err.message || 'No se pudo completar el registro.')
    } finally {
      setLoading(false)
    }
  }

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    resetMessages()
    try {
      await sendRecovery({ email, newPassword })
      if (usingSupabaseAuth) {
        setInfo('Te enviamos un correo con un enlace para restablecer tu contraseña.')
      } else {
        setInfo('Contraseña actualizada. Ya puedes iniciar sesión.')
      }
      setMode('login')
      setPassword('')
      setNewPassword('')
    } catch (err: any) {
      setError(err.message || 'No se pudo recuperar la contraseña.')
    } finally {
      setLoading(false)
    }
  }

  const titles: Record<Mode, string> = {
    login: 'Iniciar sesión',
    register: 'Crear cuenta',
    recover: 'Recuperar contraseña',
  }

  const subtitles: Record<Mode, string> = {
    login: 'Accede al panel administrativo de Teneduría García SURL.',
    register: 'Registra las cuentas autorizadas para administrar la plataforma.',
    recover: 'Introduce tu correo de registro y define una nueva contraseña.',
  }

  return (
    <div className="min-h-screen bg-[#0f2347] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Brand */}
        <a href="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
            <Icon name="scale" size={24} className="text-amber-400" />
          </div>
          <div className="leading-tight text-white">
            <span className="block font-display text-lg font-bold">Teneduría García</span>
            <span className="block text-[11px] tracking-[0.2em] text-amber-400/80 font-semibold uppercase">
              Panel Administrativo
            </span>
          </div>
        </a>

        <div className="bg-white rounded-2xl shadow-2xl p-8 animate-fade-up">
          <h1 className="font-display text-2xl font-bold text-[#0f2347] mb-1">{titles[mode]}</h1>
          <p className="text-sm text-slate-500 mb-6">{subtitles[mode]}</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-5 flex items-center gap-2">
              <Icon name="alertCircle" size={16} />
              {error}
            </div>
          )}
          {info && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-lg mb-5 flex items-center gap-2">
              <Icon name="checkCircle" size={16} />
              {info}
            </div>
          )}

          {/* LOGIN */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Correo electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Contraseña</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-field pr-11"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    <Icon name={showPassword ? 'eyeOff' : 'eye'} size={18} />
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                <Icon name="logIn" size={18} /> {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          )}

          {/* REGISTER */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Rol</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  required
                  className="input-field"
                >
                  {freeRoles.map((r) => (
                    <option key={r} value={r}>
                      {roleLabel[r]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Correo electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Contraseña</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="input-field"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                <Icon name="userPlus" size={18} /> {loading ? 'Creando...' : 'Crear cuenta'}
              </button>
            </form>
          )}

          {/* RECOVER */}
          {mode === 'recover' && (
            <form onSubmit={handleRecover} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Correo de registro</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                  placeholder="tu@email.com"
                />
              </div>
              {!usingSupabaseAuth && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nueva contraseña</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                    className="input-field"
                    placeholder="Mínimo 6 caracteres"
                  />
                </div>
              )}
              {usingSupabaseAuth && (
                <p className="text-xs text-slate-500">Te enviaremos un enlace seguro a tu correo para crear una nueva contraseña.</p>
              )}
              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                <Icon name="key" size={18} /> {loading ? 'Enviando...' : usingSupabaseAuth ? 'Enviar enlace de recuperación' : 'Actualizar contraseña'}
              </button>
            </form>
          )}

          {/* Footer links */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-sm text-center space-y-2">
            {mode !== 'login' && (
              <button onClick={() => { setMode('login'); resetMessages() }} className="text-[#0f2347] font-medium hover:text-amber-600 transition-colors">
                ← Volver a iniciar sesión
              </button>
            )}
            {mode === 'login' && (
              <>
                <button onClick={() => { setMode('recover'); resetMessages() }} className="block w-full text-slate-500 hover:text-[#0f2347] transition-colors">
                  ¿Olvidaste tu contraseña?
                </button>
                {registrationOpen ? (
                  <button onClick={() => { setMode('register'); resetMessages() }} className="block w-full text-[#0f2347] font-medium hover:text-amber-600 transition-colors">
                    Registrar cuenta autorizada
                  </button>
                ) : (
                  <p className="text-xs text-slate-400">El registro está cerrado. Las cuentas autorizadas ya fueron creadas.</p>
                )}
              </>
            )}
          </div>
        </div>

        <a href="/" className="block text-center text-sm text-blue-100/60 hover:text-white mt-6 transition-colors">
          ← Volver al sitio
        </a>
      </div>
    </div>
  )
}
