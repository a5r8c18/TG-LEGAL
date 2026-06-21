'use client'

import { useState } from 'react'
import { Icon } from '../../components/Icon'
import { createLawyer, deleteLawyer, type Lawyer } from '../../lib/lawyers'

interface Props {
  lawyers: Lawyer[]
  onChanged: () => void
}

export function LawyersManager({ lawyers, onChanged }: Props) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await createLawyer({ name, specialty, phone, email })
      setName('')
      setSpecialty('')
      setPhone('')
      setEmail('')
      setOpen(false)
      onChanged()
    } catch (err: any) {
      setError(err.message || 'No se pudo agregar el abogado.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteLawyer(id)
      onChanged()
    } catch (err: any) {
      setError(err.message || 'No se pudo eliminar el abogado.')
    }
  }

  return (
    <div className="card mb-8">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="users" size={18} className="text-[#0f2347]" />
          <h2 className="font-display text-lg font-bold text-[#0f2347]">Abogados del equipo</h2>
          <span className="text-xs text-slate-400">({lawyers.length})</span>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0f2347] hover:text-amber-600 transition-colors"
        >
          <Icon name={open ? 'x' : 'userPlus'} size={16} /> {open ? 'Cerrar' : 'Agregar abogado'}
        </button>
      </div>

      {open && (
        <form onSubmit={handleAdd} className="p-6 border-b border-slate-100 grid sm:grid-cols-2 gap-4 bg-slate-50/50">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Nombre completo *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required className="input-field" placeholder="Lic. Juan Pérez" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Especialidad</label>
            <input value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="input-field" placeholder="Derecho mercantil" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Teléfono</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field" placeholder="+53 ..." />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Correo</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="abogado@email.com" />
          </div>
          {error && <p className="sm:col-span-2 text-sm text-red-600">{error}</p>}
          <div className="sm:col-span-2">
            <button type="submit" disabled={loading} className="btn-dark disabled:opacity-50">
              {loading ? 'Guardando...' : 'Guardar abogado'}
            </button>
          </div>
        </form>
      )}

      <div className="p-6">
        {lawyers.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-4">Aún no hay abogados registrados.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {lawyers.map((l) => (
              <div key={l.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-white">
                <span className="w-10 h-10 rounded-full bg-[#0f2347]/5 text-[#0f2347] flex items-center justify-center">
                  <Icon name="user" size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-800 truncate">{l.name}</p>
                  <p className="text-xs text-slate-400 truncate">{l.specialty || 'Generalista'}</p>
                </div>
                <button
                  onClick={() => handleDelete(l.id)}
                  className="text-slate-300 hover:text-red-500 transition-colors"
                  aria-label="Eliminar abogado"
                >
                  <Icon name="x" size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
