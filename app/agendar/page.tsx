'use client'

import { useState } from 'react'
import { Icon } from '../components/Icon'
import { createConsultation } from '../lib/consultations'

export default function AgendarPage() {
  const [formData, setFormData] = useState({
    patient_name: '',
    patient_email: '',
    patient_phone: '',
    service_type: 'legal' as 'legal' | 'business' | 'property',
    specific_service: '',
    preferred_date: '',
    preferred_time: '',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const legalServices = [
    'Consultas Jurídicas Generales',
    'Representaciones Legales y Poderes',
    'Matrimonio y Trámites Familiares',
    'Servicios Notariales',
    'Divorcios y Separaciones',
    'Herencias y Sucesiones'
  ]

  const businessServices = [
    'Constitución y Gestión de MIPYMES',
    'Contabilidad y Asesoría Empresarial',
    'Importación y Exportación',
    'Licencias y Permisos Comerciales',
    'Contratos Mercantiles',
    'Asesoría Fiscal'
  ]

  const propertyServices = [
    'Compraventa y Traspaso de Inmuebles',
    'Usufructos y Vivienda',
    'Regularización de Propiedad',
    'Arrendamientos',
    'Hipotecas y Garantías',
    'Documentación Inmobiliaria'
  ]

  const getServiceOptions = () => {
    switch (formData.service_type) {
      case 'legal':
        return legalServices
      case 'business':
        return businessServices
      case 'property':
        return propertyServices
      default:
        return []
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await createConsultation(formData)

      setSuccess(true)
      setFormData({
        patient_name: '',
        patient_email: '',
        patient_phone: '',
        service_type: 'legal',
        specific_service: '',
        preferred_date: '',
        preferred_time: '',
        notes: ''
      })
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al solicitar su asesoría. Intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="card p-10 max-w-md w-full text-center animate-fade-up">
          <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Icon name="checkCircle" size={40} />
          </div>
          <h2 className="font-display text-2xl font-bold text-[#0f2347] mb-3">¡Solicitud recibida!</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Tu solicitud de asesoría ha sido registrada con éxito. Nuestro equipo te contactará muy pronto
            para confirmar los detalles.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="btn-dark w-full"
          >
            Solicitar otra asesoría
          </button>
          <a href="/" className="block mt-4 text-sm text-slate-500 hover:text-[#0f2347] transition-colors">
            ← Volver al inicio
          </a>
        </div>
      </div>
    )
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
            <a href="/" className="text-sm font-medium text-slate-600 hover:text-[#0f2347] transition-colors">
              ← Volver al inicio
            </a>
          </div>
        </div>
      </header>

      {/* Page intro */}
      <div className="bg-[#0f2347] text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <span className="eyebrow !text-amber-400 justify-center mb-4">Solicitud de asesoría</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Cuéntanos sobre tu caso</h1>
          <p className="text-blue-100/70">Completa el formulario y un especialista te contactará para orientarte.</p>
        </div>
      </div>

      {/* Form Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="max-w-2xl mx-auto">
          <div className="card p-8">
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    name="patient_name"
                    value={formData.patient_name}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="Su nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="patient_phone"
                    value={formData.patient_phone}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="+53 XXX XXX XXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="patient_email"
                  value={formData.patient_email}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                  placeholder="su@email.com"
                />
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Área de Servicio
                </label>
                <select
                  name="service_type"
                  value={formData.service_type}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                >
                  <option value="legal">Asesoría Legal General</option>
                  <option value="business">Servicios Empresariales y Contables</option>
                  <option value="property">Inmuebles y Propiedad</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Servicio Específico
                </label>
                <select
                  name="specific_service"
                  value={formData.specific_service}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                >
                  <option value="">Seleccione un servicio</option>
                  {getServiceOptions().map(service => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date and Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Fecha Preferida
                  </label>
                  <input
                    type="date"
                    name="preferred_date"
                    value={formData.preferred_date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Horario Preferido
                  </label>
                  <select
                    name="preferred_time"
                    value={formData.preferred_time}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  >
                    <option value="">Seleccione un horario</option>
                    <option value="08:00">08:00</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Descripción del Caso (opcional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="input-field"
                  placeholder="Describa brevemente su situación legal o consulta..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? 'Enviando...' : 'Solicitar Asesoría'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
