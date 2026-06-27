'use client'

import { useState } from 'react'
import { Icon } from '../../components/Icon'
import { createLawyer, deleteLawyer, updateLawyer, type Lawyer } from '../../lib/lawyers'

interface Props {
  lawyers: Lawyer[]
  onChanged: () => void
}

interface EditState {
  name: string
  specialty: string
  phone: string
  email: string
}

export function LawyersManager({ lawyers, onChanged }: Props) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editState, setEditState] = useState<EditState>({ name: '', specialty: '', phone: '', email: '' })
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState('')

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await createLawyer({ name, specialty, phone, email })
      setName(''); setSpecialty(''); setPhone(''); setEmail('')
      setOpen(false)
      onChanged()
    } catch (err: any) {
      setError(err.message || 'No se pudo agregar el abogado.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este abogado?')) return
    try {
      await deleteLawyer(id)
      onChanged()
    } catch (err: any) {
      setError(err.message || 'No se pudo eliminar el abogado.')
    }
  }

  const startEdit = (l: Lawyer) => {
    setEditingId(l.id)
    setEditState({ name: l.name, specialty: l.specialty ?? '', phone: l.phone ?? '', email: l.email ?? '' })
    setEditError('')
  }

  const cancelEdit = () => { setEditingId(null); setEditError('') }

  const handleUpdate = async (id: string) => {
    if (!editState.name.trim()) { setEditError('El nombre es obligatorio.'); return }
    setEditLoading(true)
    setEditError('')
    try {
      await updateLawyer(id, { name: editState.name, specialty: editState.specialty, phone: editState.phone, email: editState.email })
      setEditingId(null)
      onChanged()
    } catch (err: any) {
      setEditError(err.message || 'No se pudo actualizar el abogado.')
    } finally {
      setEditLoading(false)
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
          onClick={() => { setOpen((o) => !o); setError('') }}
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
          <div className="space-y-3">
            {lawyers.map((l) =>
              editingId === l.id ? (
                /* ── Edit mode ── */
                <div key={l.id} className="rounded-xl border-2 border-amber-400 bg-amber-50/40 p-4">
                  <div className="grid sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Nombre *</label>
                      <input
                        value={editState.name}
                        onChange={(e) => setEditState((s) => ({ ...s, name: e.target.value }))}
                        className="input-field text-sm"
                        placeholder="Lic. Juan Pérez"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Especialidad</label>
                      <input
                        value={editState.specialty}
                        onChange={(e) => setEditState((s) => ({ ...s, specialty: e.target.value }))}
                        className="input-field text-sm"
                        placeholder="Derecho mercantil"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Teléfono</label>
                      <input
                        value={editState.phone}
                        onChange={(e) => setEditState((s) => ({ ...s, phone: e.target.value }))}
                        className="input-field text-sm"
                        placeholder="+53 ..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Correo</label>
                      <input
                        type="email"
                        value={editState.email}
                        onChange={(e) => setEditState((s) => ({ ...s, email: e.target.value }))}
                        className="input-field text-sm"
                        placeholder="abogado@email.com"
                      />
                    </div>
                  </div>
                  {editError && <p className="text-xs text-red-600 mb-2">{editError}</p>}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdate(l.id)}
                      disabled={editLoading}
                      className="btn-dark text-sm !px-4 !py-2 disabled:opacity-50"
                    >
                      {editLoading ? 'Guardando...' : 'Guardar cambios'}
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-sm text-slate-500 hover:text-slate-700 transition-colors px-2 py-1"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                /* ── View mode ── */
                <div key={l.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-white hover:border-slate-200 transition-colors">
                  <span className="w-10 h-10 rounded-full bg-[#0f2347]/5 text-[#0f2347] flex items-center justify-center flex-shrink-0">
                    <Icon name="user" size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800 truncate">{l.name}</p>
                    <p className="text-xs text-slate-400 truncate">{l.specialty || 'Generalista'}{l.email ? ` · ${l.email}` : ''}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => startEdit(l)}
                      className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
                      aria-label="Editar abogado"
                      title="Editar"
                    >
                      <Icon name="settings" size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(l.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Eliminar abogado"
                      title="Eliminar"
                    >
                      <Icon name="x" size={15} />
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}
