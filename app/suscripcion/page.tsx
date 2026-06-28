'use client'

import { useState } from 'react'
import { Icon } from '../components/Icon'
import { LanguageSelector } from '../components/LanguageSelector'
import { createSubscriber } from '../lib/subscribers'

const WHATSAPP_NUMBER = '17868135148'

type Plan = 'info' | 'especialista'

interface PlanConfig {
  id: Plan
  name: string
  price: string
  period: string
  desc: string
  features: string[]
  highlight?: boolean
}

const plans: PlanConfig[] = [
  {
    id: 'info',
    name: 'Plan Información',
    price: '$5',
    period: '/mes',
    desc: 'Accede a todos los detalles de nuestros servicios, preguntas y respuestas frecuentes y orientación general.',
    features: [
      'Acceso completo a preguntas frecuentes',
      'Detalles de todos los servicios',
      'Orientación general sobre trámites',
      'Actualizaciones legales mensuales',
      'Atención por WhatsApp (respuesta en 24h)',
    ],
  },
  {
    id: 'especialista',
    name: 'Consulta con Especialista',
    price: '$35',
    period: '/sesión',
    desc: 'Sesión personalizada con un abogado o contador especializado para analizar tu caso en detalle.',
    features: [
      'Todo lo del Plan Información',
      'Sesión en vivo con un especialista',
      'Análisis detallado de tu caso',
      'Estrategia legal personalizada',
      'Seguimiento post-consulta (7 días)',
      'Documentación de recomendaciones',
    ],
    highlight: true,
  },
]

export default function SuscripcionPage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [step, setStep] = useState<'plans' | 'form' | 'success'>('plans')
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    country: '',
    paymentMethod: 'majority' as 'majority' | 'usdt',
  })
  const [loading, setLoading] = useState(false)

  const currentPlan = plans.find((p) => p.id === selectedPlan)

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan)
    setStep('form')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const buildWhatsAppMessage = () => {
    const planLabel = currentPlan?.name ?? ''
    const price = currentPlan?.price ?? ''
    const method = formData.paymentMethod === 'usdt' ? 'USDT (Crypto)' : 'Link de pago (Majority)'
    return encodeURIComponent(
      `🔔 *Nueva solicitud de suscripción — Teneduría García*\n\n` +
      `👤 Nombre: ${formData.name}\n` +
      `📱 WhatsApp cliente: ${formData.whatsapp}\n` +
      `🌎 País: ${formData.country}\n` +
      `📋 Plan solicitado: ${planLabel} (${price}/mes o sesión)\n` +
      `💳 Método de pago preferido: ${method}\n\n` +
      `Por favor envíale el link de pago al cliente.`
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createSubscriber({
        name: formData.name,
        whatsapp: formData.whatsapp,
        country: formData.country,
        plan: selectedPlan!,
        payment_method: formData.paymentMethod,
      })
    } catch {
      // Si falla el guardado, igual abrimos WhatsApp para no perder la solicitud
    }

    const msg = buildWhatsAppMessage()
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`
    window.open(url, '_blank')
    setLoading(false)
    setStep('success')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <a href="/" className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[#0f2347] rounded-xl flex items-center justify-center shadow-md">
                <Icon name="scale" size={22} className="text-amber-400" />
              </div>
              <div className="leading-tight">
                <span className="block font-display text-lg font-bold text-[#0f2347]">Teneduría García</span>
                <span className="block text-[11px] tracking-[0.2em] text-amber-600 font-semibold uppercase">SURL · Soluciones Legales</span>
              </div>
            </a>
            <div className="flex items-center gap-3">
              <LanguageSelector />
              <a href="/" className="text-sm font-medium text-slate-600 hover:text-[#0f2347] transition-colors">
                ← Volver al inicio
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-[#0f2347] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 text-center">
          <span className="eyebrow !text-amber-400 justify-center mb-4">Planes y Suscripciones</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Elige el acceso que necesitas</h1>
          <p className="text-blue-100/70 max-w-xl mx-auto">
            Sin pasarela de pagos automática. Tú nos contactas, nosotros te enviamos el link de pago directamente a tu WhatsApp.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Payment Notice Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="w-10 h-10 bg-amber-500 text-white rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon name="card" size={20} />
          </div>
          <div>
            <p className="font-semibold text-amber-900 mb-1">Importante sobre los métodos de pago</p>
            <div className="space-y-2">
              <p className="text-sm text-amber-800 leading-relaxed flex items-center gap-2">
                <span className="inline-block w-5 h-3.5 rounded-sm overflow-hidden flex-shrink-0 shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-full h-full"><rect width="60" height="30" fill="#B22234"/><rect y="2.3" width="60" height="2.3" fill="#fff"/><rect y="6.9" width="60" height="2.3" fill="#fff"/><rect y="11.5" width="60" height="2.3" fill="#fff"/><rect y="16.2" width="60" height="2.3" fill="#fff"/><rect y="20.8" width="60" height="2.3" fill="#fff"/><rect y="25.4" width="60" height="2.3" fill="#fff"/><rect width="24" height="16.2" fill="#3C3B6E"/></svg></span>
                <span><strong>Estados Unidos:</strong> Recibirás un link de pago seguro (Majority) directamente en tu WhatsApp.</span>
              </p>
              <p className="text-sm text-amber-800 leading-relaxed flex items-center gap-2">
                <span className="inline-flex w-5 h-3.5 rounded-sm overflow-hidden flex-shrink-0 shadow-sm bg-slate-500 items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z"/></svg></span>
                <span><strong>Otros países:</strong> Por el momento solo aceptamos <strong>USDT (criptomoneda)</strong>. El pago se coordina por WhatsApp antes de activar tu acceso.</span>
              </p>
            </div>
          </div>
        </div>

        {/* STEP: Plans */}
        {step === 'plans' && (
          <div className="grid md:grid-cols-2 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`card p-8 flex flex-col ${plan.highlight ? 'border-amber-400 border-2 relative overflow-hidden' : ''}`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl tracking-wide uppercase">
                    Más completo
                  </div>
                )}
                <div className="mb-6">
                  <h2 className="font-display text-xl font-bold text-[#0f2347] mb-2">{plan.name}</h2>
                  <div className="flex items-end gap-1 mb-3">
                    <span className="text-4xl font-bold text-[#0f2347]">{plan.price}</span>
                    <span className="text-slate-500 mb-1">{plan.period}</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">{plan.desc}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0">
                        <Icon name="check" size={12} strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={plan.highlight ? 'btn-primary w-full' : 'btn-dark w-full'}
                >
                  Solicitar este plan →
                </button>
              </div>
            ))}
          </div>
        )}

        {/* STEP: Form */}
        {step === 'form' && currentPlan && (
          <div className="max-w-lg mx-auto">
            <div className="card p-8">
              <button
                onClick={() => setStep('plans')}
                className="text-sm text-slate-500 hover:text-[#0f2347] transition-colors mb-6 flex items-center gap-1"
              >
                ← Cambiar plan
              </button>

              <div className="bg-slate-50 rounded-xl p-4 mb-7 flex items-center gap-4 border border-slate-200">
                <div className="w-10 h-10 bg-[#0f2347] text-white rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="scale" size={18} />
                </div>
                <div>
                  <div className="font-semibold text-[#0f2347]">{currentPlan.name}</div>
                  <div className="text-amber-600 font-bold text-lg">{currentPlan.price}<span className="text-slate-400 text-sm font-normal">{currentPlan.period}</span></div>
                </div>
              </div>

              <h2 className="font-display text-xl font-bold text-[#0f2347] mb-1">Tus datos de contacto</h2>
              <p className="text-slate-500 text-sm mb-6">
                Al enviar, abriremos WhatsApp con un mensaje listo para notificarnos. Te enviaremos el link de pago de vuelta.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nombre completo</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Tu WhatsApp (con código de país)</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="+1 786 000 0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">País de residencia</label>
                  <input
                    type="text"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Ej: Estados Unidos, España, México..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Método de pago preferido</label>
                  <div className="space-y-3">
                    <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.paymentMethod === 'majority' ? 'border-amber-400 bg-amber-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="majority"
                        checked={formData.paymentMethod === 'majority'}
                        onChange={handleChange}
                        className="mt-0.5 accent-amber-500"
                      />
                      <div>
                        <div className="font-semibold text-slate-800 text-sm">Link de pago (Majority)</div>
                        <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5"><span className="inline-block w-4 h-3 rounded-sm overflow-hidden flex-shrink-0 shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-full h-full"><rect width="60" height="30" fill="#B22234"/><rect y="2.3" width="60" height="2.3" fill="#fff"/><rect y="6.9" width="60" height="2.3" fill="#fff"/><rect y="11.5" width="60" height="2.3" fill="#fff"/><rect y="16.2" width="60" height="2.3" fill="#fff"/><rect y="20.8" width="60" height="2.3" fill="#fff"/><rect y="25.4" width="60" height="2.3" fill="#fff"/><rect width="24" height="16.2" fill="#3C3B6E"/></svg></span> Solo disponible para residentes en <strong>Estados Unidos</strong></div>
                      </div>
                    </label>
                    <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.paymentMethod === 'usdt' ? 'border-amber-400 bg-amber-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="usdt"
                        checked={formData.paymentMethod === 'usdt'}
                        onChange={handleChange}
                        className="mt-0.5 accent-amber-500"
                      />
                      <div>
                        <div className="font-semibold text-slate-800 text-sm">USDT (Criptomoneda)</div>
                        <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5"><span className="inline-flex w-4 h-3 rounded-sm overflow-hidden flex-shrink-0 shadow-sm bg-slate-500 items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z"/></svg></span> Para clientes fuera de Estados Unidos</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                  <strong>¿Cómo funciona?</strong> Al hacer clic en el botón de abajo, se abrirá WhatsApp con un mensaje listo dirigido a nuestro equipo. Nosotros te responderemos con el link de pago en tu WhatsApp en menos de 24 horas.
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Abriendo WhatsApp...' : '📲 Solicitar por WhatsApp →'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* STEP: Success */}
        {step === 'success' && (
          <div className="max-w-md mx-auto">
            <div className="card p-10 text-center animate-fade-up">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Icon name="checkCircle" size={40} />
              </div>
              <h2 className="font-display text-2xl font-bold text-[#0f2347] mb-3">¡Solicitud enviada!</h2>
              <p className="text-slate-500 mb-2 leading-relaxed">
                Tu mensaje fue enviado a nuestro equipo por WhatsApp. Te responderemos con el link de pago en menos de 24 horas.
              </p>
              <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-8">
                Recuerda que el pago solo se puede hacer desde <strong>Estados Unidos</strong> con el link de Majority. Si estás en otro país, te enviaremos instrucciones para pago en USDT.
              </p>
              <div className="flex flex-col gap-3">
                <button onClick={() => { setStep('plans'); setSelectedPlan(null) }} className="btn-dark w-full">
                  Ver otros planes
                </button>
                <a href="/" className="text-sm text-slate-500 hover:text-[#0f2347] transition-colors">
                  ← Volver al inicio
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
