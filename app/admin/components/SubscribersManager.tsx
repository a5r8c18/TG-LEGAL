'use client'

import { useState } from 'react'
import { Icon } from '../../components/Icon'
import {
  updateSubscriberStatus,
  deleteSubscriber,
  subscriberStatusLabel,
  type Subscriber,
  type SubscriberStatus,
} from '../../lib/subscribers'

interface Props {
  subscribers: Subscriber[]
  onChanged: () => void
}

const STATUS_COLORS: Record<SubscriberStatus, string> = {
  pending:   'bg-yellow-100 text-yellow-800 border-yellow-200',
  paid:      'bg-blue-100 text-blue-800 border-blue-200',
  active:    'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
  expired:   'bg-slate-100 text-slate-600 border-slate-200',
}

const PLAN_LABEL: Record<string, string> = {
  info:         'Plan Información · $5/mes',
  especialista: 'Consulta Especialista · $35',
}

const PAYMENT_LABEL: Record<string, string> = {
  majority: '🇺🇸 Majority',
  usdt:     '₮ USDT',
}

const NEXT_STATUSES: Record<SubscriberStatus, SubscriberStatus[]> = {
  pending:   ['paid', 'cancelled'],
  paid:      ['active', 'cancelled'],
  active:    ['expired', 'cancelled'],
  cancelled: ['pending'],
  expired:   ['active', 'pending'],
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function SubscribersManager({ subscribers, onChanged }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<SubscriberStatus | 'all'>('all')

  const filtered = filter === 'all' ? subscribers : subscribers.filter((s) => s.status === filter)

  const counts: Record<string, number> = { all: subscribers.length }
  for (const s of subscribers) counts[s.status] = (counts[s.status] ?? 0) + 1

  const handleStatus = async (id: string, status: SubscriberStatus) => {
    setLoading(id)
    setError('')
    try {
      await updateSubscriberStatus(id, status, notes[id])
      onChanged()
      setExpandedId(null)
    } catch (err: any) {
      setError(err.message || 'Error al actualizar.')
    } finally {
      setLoading(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este suscriptor?')) return
    try {
      await deleteSubscriber(id)
      onChanged()
    } catch (err: any) {
      setError(err.message || 'Error al eliminar.')
    }
  }

  const FILTERS: { key: SubscriberStatus | 'all'; label: string }[] = [
    { key: 'all',       label: 'Todos' },
    { key: 'pending',   label: 'Pendientes' },
    { key: 'paid',      label: 'Pagados' },
    { key: 'active',    label: 'Activos' },
    { key: 'cancelled', label: 'Cancelados' },
    { key: 'expired',   label: 'Expirados' },
  ]

  return (
    <div className="card mb-8">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon name="users" size={18} className="text-[#0f2347]" />
          <h2 className="font-display text-lg font-bold text-[#0f2347]">Suscriptores</h2>
          <span className="text-xs text-slate-400">({subscribers.length})</span>
        </div>
        {/* Filter pills */}
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                filter === key
                  ? 'bg-[#0f2347] text-white border-[#0f2347]'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {label}{counts[key] ? ` (${counts[key]})` : ''}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mx-6 mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">{error}</div>
      )}

      <div className="p-6">
        {filtered.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-6">
            {filter === 'all' ? 'Aún no hay suscriptores registrados.' : `No hay suscriptores con estado "${subscriberStatusLabel[filter as SubscriberStatus]}".`}
          </p>
        ) : (
          <div className="space-y-3">
            {filtered.map((s) => (
              <div key={s.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                {/* Row */}
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="w-9 h-9 rounded-full bg-[#0f2347]/5 flex items-center justify-center flex-shrink-0">
                    <Icon name="user" size={16} className="text-[#0f2347]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-slate-800">{s.name}</p>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${STATUS_COLORS[s.status]}`}>
                        {subscriberStatusLabel[s.status]}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">
                      {s.whatsapp} · {s.country} · {PLAN_LABEL[s.plan]} · {PAYMENT_LABEL[s.payment_method]}
                    </p>
                    <p className="text-[10px] text-slate-300 mt-0.5">{formatDate(s.created_at)}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                      className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
                      title="Gestionar"
                    >
                      <Icon name="settings" size={15} />
                    </button>
                    <a
                      href={`https://wa.me/${s.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${s.name}, te contactamos de Teneduría García SURL.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                      title="WhatsApp"
                    >
                      <Icon name="message" size={15} />
                    </a>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <Icon name="x" size={15} />
                    </button>
                  </div>
                </div>

                {/* Expanded management panel */}
                {expandedId === s.id && (
                  <div className="border-t border-amber-100 bg-amber-50/40 px-4 py-4">
                    <p className="text-xs font-semibold text-slate-600 mb-2">Cambiar estado</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {NEXT_STATUSES[s.status].map((next) => (
                        <button
                          key={next}
                          onClick={() => handleStatus(s.id, next)}
                          disabled={loading === s.id}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0f2347] text-white hover:bg-[#1a3a6b] disabled:opacity-50 transition-colors"
                        >
                          {loading === s.id ? '...' : `Marcar como ${subscriberStatusLabel[next]}`}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs font-semibold text-slate-600 mb-1">Notas internas</p>
                    <textarea
                      rows={2}
                      value={notes[s.id] ?? s.notes ?? ''}
                      onChange={(e) => setNotes((n) => ({ ...n, [s.id]: e.target.value }))}
                      placeholder="Ej: Pagó el 28/06, link enviado por WA..."
                      className="w-full text-xs rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
