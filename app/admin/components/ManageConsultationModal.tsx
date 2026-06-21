'use client'

import { useState } from 'react'
import { Icon } from '../../components/Icon'
import {
  updateConsultation,
  notifyQuote,
  usingSupabase,
  CURRENCIES,
  paymentStatusLabel,
  type Consultation,
  type ConsultationStatus,
  type PaymentStatus,
} from '../../lib/consultations'
import type { Lawyer } from '../../lib/lawyers'

interface Props {
  consultation: Consultation
  lawyers: Lawyer[]
  onClose: () => void
  onSaved: () => void
}

const statusOptions: { value: ConsultationStatus; label: string }[] = [
  { value: 'pending', label: 'Pendiente' },
  { value: 'confirmed', label: 'Confirmada' },
  { value: 'completed', label: 'Completada' },
  { value: 'cancelled', label: 'Cancelada' },
]

const paymentOptions = Object.entries(paymentStatusLabel) as [PaymentStatus, string][]

export function ManageConsultationModal({ consultation, lawyers, onClose, onSaved }: Props) {
  const [lawyerId, setLawyerId] = useState<string>(consultation.assigned_lawyer_id ?? '')
  const [price, setPrice] = useState<string>(
    consultation.price != null ? String(consultation.price) : '',
  )
  const [currency, setCurrency] = useState<string>(consultation.currency ?? 'USD')
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(
    consultation.payment_status ?? 'pending',
  )
  const [status, setStatus] = useState<ConsultationStatus>(consultation.status)
  const [notifyClient, setNotifyClient] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')

  const lawyerName = lawyers.find((l) => l.id === lawyerId)?.name ?? null
  const priceNumber = price === '' ? null : Number(price)

  const handleSave = async () => {
    setLoading(true)
    setError('')
    setInfo('')
    try {
      await updateConsultation(consultation.id, {
        assigned_lawyer_id: lawyerId || null,
        price: priceNumber,
        currency,
        payment_status: paymentStatus,
        status,
      })

      // Automatización: si se marca como "Cotizada" y hay precio, enviar correo al cliente.
      if (notifyClient && paymentStatus === 'quoted' && priceNumber != null && usingSupabase) {
        try {
          await notifyQuote({
            to: consultation.patient_email,
            name: consultation.patient_name,
            service: consultation.specific_service,
            price: priceNumber,
            currency,
            lawyer: lawyerName,
          })
          setInfo('Cambios guardados y cotización enviada por correo al cliente.')
        } catch (mailErr: any) {
          setError(`Cambios guardados, pero no se pudo enviar el correo: ${mailErr.message}`)
          setLoading(false)
          return
        }
      }

      onSaved()
      onClose()
    } catch (err: any) {
      setError(err.message || 'No se pudieron guardar los cambios.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0f2347]/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl animate-fade-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-[#0f2347]">Gestionar solicitud</h2>
            <p className="text-sm text-slate-500 mt-0.5">{consultation.specific_service}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600" aria-label="Cerrar">
            <Icon name="x" size={22} />
          </button>
        </div>

        {/* Client info */}
        <div className="px-6 py-4 bg-slate-50/70 border-b border-slate-100 text-sm space-y-1.5">
          <div className="flex items-center gap-2 text-slate-700">
            <Icon name="user" size={15} className="text-slate-400" /> {consultation.patient_name}
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Icon name="mail" size={15} className="text-slate-400" /> {consultation.patient_email}
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Icon name="phone" size={15} className="text-slate-400" /> {consultation.patient_phone}
          </div>
          {consultation.notes && (
            <p className="text-slate-500 pt-1 italic">"{consultation.notes}"</p>
          )}
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
              <Icon name="alertCircle" size={16} /> {error}
            </div>
          )}
          {info && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
              <Icon name="checkCircle" size={16} /> {info}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Abogado asignado</label>
            <select value={lawyerId} onChange={(e) => setLawyerId(e.target.value)} className="input-field">
              <option value="">Sin asignar</option>
              {lawyers.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}{l.specialty ? ` — ${l.specialty}` : ''}
                </option>
              ))}
            </select>
            {lawyers.length === 0 && (
              <p className="text-xs text-amber-600 mt-1.5">Agrega abogados en la sección "Abogados del equipo".</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Costo de la consulta</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input-field"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Moneda</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="input-field">
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Estado del cobro</label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
              className="input-field"
            >
              {paymentOptions.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Estado de la solicitud</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ConsultationStatus)}
              className="input-field"
            >
              {statusOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Notificación automática al cliente */}
          <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${paymentStatus === 'quoted' ? 'border-amber-200 bg-amber-50/60' : 'border-slate-200 bg-slate-50/60'}`}>
            <input
              type="checkbox"
              checked={notifyClient}
              onChange={(e) => setNotifyClient(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-amber-500"
            />
            <span className="text-sm text-slate-600">
              <span className="flex items-center gap-1.5 font-medium text-slate-800">
                <Icon name="mail" size={15} className="text-amber-500" /> Notificar al cliente por correo
              </span>
              Al guardar con estado de cobro <strong>"Cotizada"</strong>, se enviará automáticamente la cotización a {consultation.patient_email}.
              {!usingSupabase && <span className="block text-amber-600 mt-1">Requiere Supabase configurado (modo demo: no se envía).</span>}
            </span>
          </label>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
            Cancelar
          </button>
          <button onClick={handleSave} disabled={loading} className="btn-dark disabled:opacity-50">
            <Icon name="check" size={17} /> {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  )
}
