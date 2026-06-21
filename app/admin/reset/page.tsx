'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from '../../components/Icon'
import { updatePassword, usingSupabaseAuth } from '../../lib/auth'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await updatePassword(password)
      setDone(true)
      setTimeout(() => router.replace('/admin/login'), 2000)
    } catch (err: any) {
      setError(err.message || 'No se pudo actualizar la contraseña.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f2347] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="relative w-full max-w-md">
        <a href="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
            <Icon name="scale" size={24} className="text-amber-400" />
          </div>
          <div className="leading-tight text-white">
            <span className="block font-display text-lg font-bold">Teneduría García</span>
            <span className="block text-[11px] tracking-[0.2em] text-amber-400/80 font-semibold uppercase">
              Restablecer contraseña
            </span>
          </div>
        </a>

        <div className="bg-white rounded-2xl shadow-2xl p-8 animate-fade-up">
          {!usingSupabaseAuth ? (
            <div className="text-center">
              <Icon name="alertCircle" size={40} className="text-amber-500 mx-auto mb-3" />
              <p className="text-slate-600">
                Esta página solo está disponible con Supabase configurado. En modo demo, recupera tu
                contraseña desde la pantalla de inicio de sesión.
              </p>
              <a href="/admin/login" className="btn-dark w-full mt-6">Ir a iniciar sesión</a>
            </div>
          ) : done ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="checkCircle" size={36} />
              </div>
              <h1 className="font-display text-xl font-bold text-[#0f2347] mb-2">¡Contraseña actualizada!</h1>
              <p className="text-slate-500">Redirigiéndote al inicio de sesión...</p>
            </div>
          ) : (
            <>
              <h1 className="font-display text-2xl font-bold text-[#0f2347] mb-1">Nueva contraseña</h1>
              <p className="text-sm text-slate-500 mb-6">Define una nueva contraseña para tu cuenta.</p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-5 flex items-center gap-2">
                  <Icon name="alertCircle" size={16} />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nueva contraseña</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="input-field pr-11"
                      placeholder="Mínimo 6 caracteres"
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
                  <Icon name="key" size={18} /> {loading ? 'Guardando...' : 'Guardar contraseña'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
