'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Icon, type IconName } from '../components/Icon'
import {
  getConsultations,
  updateConsultationStatus,
  seedLocalSampleData,
  usingSupabase,
  paymentStatusLabel,
  type Consultation,
  type ConsultationStatus,
} from '../lib/consultations'
import { getLawyers, seedLocalLawyers, type Lawyer } from '../lib/lawyers'
import { getSession, logout, roleLabel, type Session } from '../lib/auth'
import { LawyersManager } from './components/LawyersManager'
import { ManageConsultationModal } from './components/ManageConsultationModal'
import { SubscribersManager } from './components/SubscribersManager'
import { getSubscribers, type Subscriber } from '../lib/subscribers'

type Appointment = Consultation

function formatPrice(value?: number | null, currency?: string | null) {
  if (value == null) return null
  return `${new Intl.NumberFormat('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(value)} ${currency ?? 'USD'}`
}

export default function AdminPage() {
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [lawyers, setLawyers] = useState<Lawyer[]>([])
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [selected, setSelected] = useState<Consultation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled' | 'completed'>('all')

  useEffect(() => {
    let active = true
    ;(async () => {
      const current = await getSession()
      if (!current) {
        router.replace('/admin/login')
        return
      }
      if (!active) return
      setSession(current)
      setCheckingAuth(false)
      await Promise.all([fetchAppointments(), fetchLawyers(), fetchSubscribers()])
    })()
    return () => {
      active = false
    }
  }, [router])

  const handleLogout = async () => {
    await logout()
    router.replace('/admin/login')
  }

  const fetchSubscribers = async () => {
    try {
      setSubscribers(await getSubscribers())
    } catch (err: any) {
      setError(err.message || 'Error al cargar suscriptores')
    }
  }

  const fetchLawyers = async () => {
    try {
      if (!usingSupabase) {
        const now = new Date().toISOString()
        seedLocalLawyers([
          { id: 'l1', name: 'Lic. Ana Martínez', specialty: 'Derecho mercantil', email: 'ana@teneduria.cu', phone: '+53 555 111 222', active: true, created_at: now },
          { id: 'l2', name: 'Lic. Roberto Fernández', specialty: 'Inmobiliario y notarial', email: 'roberto@teneduria.cu', phone: '+53 555 333 444', active: true, created_at: now },
        ])
      }
      setLawyers(await getLawyers())
    } catch (err: any) {
      setError(err.message || 'Error al cargar abogados')
    }
  }

  const lawyerName = (id?: string | null) => lawyers.find((l) => l.id === id)?.name ?? null

  const fetchAppointments = async () => {
    try {
      // En modo demo (sin Supabase), sembrar datos de ejemplo si está vacío
      if (!usingSupabase) {
        const now = new Date().toISOString()
        seedLocalSampleData([
          { id: '1', patient_name: 'Carlos Rodríguez', patient_email: 'carlos@email.com', patient_phone: '+53 523 456 789', service_type: 'legal', specific_service: 'Consultas Jurídicas Generales', preferred_date: '2024-12-20', preferred_time: '09:00', status: 'pending', notes: 'Consulta sobre trámites de herencia', created_at: now, updated_at: now },
          { id: '2', patient_name: 'María González', patient_email: 'maria@email.com', patient_phone: '+53 512 345 678', service_type: 'business', specific_service: 'Constitución y Gestión de MIPYMES', preferred_date: '2024-12-21', preferred_time: '14:00', status: 'confirmed', notes: 'Creación de empresa en La Habana', created_at: now, updated_at: now },
          { id: '3', patient_name: 'Pedro Díaz', patient_email: 'pedro@email.com', patient_phone: '+53 534 567 890', service_type: 'property', specific_service: 'Compraventa y Traspaso de Inmuebles', preferred_date: '2024-12-22', preferred_time: '10:00', status: 'completed', notes: 'Compra de apartamento en Varadero', created_at: now, updated_at: now },
        ])
      }
      const data = await getConsultations()
      setAppointments(data)
    } catch (err: any) {
      setError(err.message || 'Error al cargar las asesorías')
    } finally {
      setLoading(false)
    }
  }

  const updateAppointmentStatus = async (id: string, status: ConsultationStatus) => {
    try {
      await updateConsultationStatus(id, status)
      setAppointments(prev =>
        prev.map(apt =>
          apt.id === id ? { ...apt, status, updated_at: new Date().toISOString() } : apt,
        ),
      )
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el estado')
    }
  }

  const filteredAppointments = appointments.filter(apt => 
    filter === 'all' || apt.status === filter
  )

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: Appointment['status']): IconName => {
    switch (status) {
      case 'pending':
        return 'clock'
      case 'confirmed':
        return 'checkCircle'
      case 'cancelled':
        return 'xCircle'
      case 'completed':
        return 'award'
      default:
        return 'clock'
    }
  }

  const getStatusText = (status: Appointment['status']) => {
    switch (status) {
      case 'pending':
        return 'Pendiente'
      case 'confirmed':
        return 'Confirmada'
      case 'cancelled':
        return 'Cancelada'
      case 'completed':
        return 'Completada'
      default:
        return status
    }
  }

  if (checkingAuth || loading) {
    return (
      <div className="min-h-screen bg-[#0f2347] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <svg className="animate-spin w-20 h-20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="36" stroke="white" strokeOpacity="0.08" strokeWidth="6" />
              <path d="M40 4 a36 36 0 0 1 36 36" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Icon name="scale" size={22} className="text-amber-400" />
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="font-display text-white font-semibold text-lg tracking-wide">Teneduría García</p>
            <p className="text-amber-400/70 text-xs tracking-[0.2em] uppercase font-medium mt-0.5">
              {checkingAuth ? 'Verificando acceso...' : 'Cargando panel...'}
            </p>
          </div>
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
                <span className="block font-display text-lg font-bold text-[#0f2347]">Panel Administrativo</span>
                <span className="block text-[11px] tracking-[0.2em] text-amber-600 font-semibold uppercase">Teneduría García SURL</span>
              </div>
            </a>
            <div className="flex items-center gap-3 sm:gap-5">
              {session && (
                <div className="hidden sm:flex items-center gap-2 text-sm">
                  <span className="w-8 h-8 rounded-full bg-[#0f2347]/5 text-[#0f2347] flex items-center justify-center"><Icon name="user" size={16} /></span>
                  <div className="leading-tight">
                    <span className="block font-medium text-slate-700">{session.email}</span>
                    <span className="block text-[11px] text-amber-600 font-semibold uppercase tracking-wider">{roleLabel[session.role]}</span>
                  </div>
                </div>
              )}
              <a href="/" className="hidden sm:inline text-sm font-medium text-slate-600 hover:text-[#0f2347] transition-colors">
                ← Sitio
              </a>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
              >
                <Icon name="logout" size={17} /> Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-3xl font-bold text-[#0f2347]">Gestión de Asesorías</h2>
              <p className="text-slate-500 mt-1">Administra las solicitudes de asesoría de tus clientes.</p>
            </div>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${usingSupabase ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              <Icon name={usingSupabase ? 'shield' : 'alertCircle'} size={14} />
              {usingSupabase ? 'Conectado a Supabase' : 'Modo demo (localStorage)'}
            </span>
          </div>
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
            {([
              { label: 'Total', value: appointments.length, icon: 'folder', color: 'bg-[#0f2347]' },
              { label: 'Pendientes', value: appointments.filter(a => a.status === 'pending').length, icon: 'clock', color: 'bg-amber-500' },
              { label: 'Confirmadas', value: appointments.filter(a => a.status === 'confirmed').length, icon: 'checkCircle', color: 'bg-emerald-500' },
              { label: 'Completadas', value: appointments.filter(a => a.status === 'completed').length, icon: 'award', color: 'bg-indigo-500' }
            ] as { label: string; value: number; icon: IconName; color: string }[]).map((stat, index) => (
              <div key={index} className="card p-6">
                <div className={`w-11 h-11 ${stat.color} rounded-xl flex items-center justify-center mb-4 text-white`}>
                  <Icon name={stat.icon} size={20} />
                </div>
                <h3 className="font-display text-3xl font-bold text-[#0f2347]">{stat.value}</h3>
                <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Lawyers management */}
          <LawyersManager lawyers={lawyers} onChanged={fetchLawyers} />

          {/* Subscribers management */}
          <SubscribersManager subscribers={subscribers} onChanged={fetchSubscribers} />

          {/* Filter */}
          <div className="card mb-6">
            <div className="p-6">
              <h2 className="font-display text-lg font-bold text-[#0f2347] mb-4">Filtrar por Estado</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'all', label: 'Todas' },
                  { value: 'pending', label: 'Pendientes' },
                  { value: 'confirmed', label: 'Confirmadas' },
                  { value: 'cancelled', label: 'Canceladas' },
                  { value: 'completed', label: 'Completadas' }
                ].map((status) => (
                  <button
                    key={status.value}
                    onClick={() => setFilter(status.value as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === status.value
                        ? 'bg-[#0f2347] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Appointments Table */}
          <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h2 className="font-display text-lg font-bold text-[#0f2347]">Asesorías Solicitadas</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Contacto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Servicio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Fecha/Hora
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Abogado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Costo / Cobro
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="w-9 h-9 rounded-full bg-[#0f2347]/5 text-[#0f2347] flex items-center justify-center"><Icon name="user" size={18} /></span>
                          <div className="text-sm font-medium text-slate-900">
                            {appointment.patient_name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-600">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Icon name="mail" size={15} className="text-slate-400" />
                            {appointment.patient_email}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Icon name="phone" size={15} className="text-slate-400" />
                            {appointment.patient_phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">
                          <div className="font-medium">{appointment.specific_service}</div>
                          <div className="text-slate-500 text-xs">
                            {appointment.service_type === 'legal' ? 'Legal' :
                             appointment.service_type === 'business' ? 'Empresarial' : 'Inmobiliario'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-600">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Icon name="calendar" size={15} className="text-slate-400" />
                            {new Date(appointment.preferred_date).toLocaleDateString('es-ES')}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Icon name="clock" size={15} className="text-slate-400" />
                            {appointment.preferred_time}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {lawyerName(appointment.assigned_lawyer_id) ? (
                          <div className="flex items-center gap-1.5 text-sm text-slate-700">
                            <Icon name="user" size={15} className="text-emerald-500" />
                            {lawyerName(appointment.assigned_lawyer_id)}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Sin asignar</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatPrice(appointment.price, appointment.currency) ? (
                          <div className="text-sm">
                            <div className="font-semibold text-slate-800">{formatPrice(appointment.price, appointment.currency)}</div>
                            <div className="text-xs text-slate-500">{paymentStatusLabel[appointment.payment_status ?? 'pending']}</div>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Sin cotizar</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                          <Icon name={getStatusIcon(appointment.status)} size={13} />
                          {getStatusText(appointment.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <ActionButton
                            tooltip="Gestionar (abogado, precio, estado)"
                            icon="settings"
                            onClick={() => setSelected(appointment)}
                            color="navy"
                          />
                          {appointment.status === 'pending' && (
                            <>
                              <ActionButton
                                tooltip="Confirmar"
                                icon="check"
                                onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                                color="emerald"
                              />
                              <ActionButton
                                tooltip="Cancelar"
                                icon="x"
                                onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                                color="red"
                              />
                            </>
                          )}
                          {appointment.status === 'confirmed' && (
                            <ActionButton
                              tooltip="Marcar como completada"
                              icon="award"
                              onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                              color="indigo"
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredAppointments.length === 0 && (
                <div className="text-center py-16">
                  <Icon name="inbox" size={44} className="text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">Ninguna asesoría encontrada</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {selected && (
        <ManageConsultationModal
          consultation={selected}
          lawyers={lawyers}
          onClose={() => setSelected(null)}
          onSaved={fetchAppointments}
        />
      )}
    </div>
  )
}

const actionColors: Record<string, string> = {
  emerald: 'text-emerald-600 bg-emerald-50 hover:bg-emerald-600 hover:text-white',
  red: 'text-red-600 bg-red-50 hover:bg-red-600 hover:text-white',
  indigo: 'text-indigo-600 bg-indigo-50 hover:bg-indigo-600 hover:text-white',
  navy: 'text-[#0f2347] bg-[#0f2347]/5 hover:bg-[#0f2347] hover:text-white',
}

function ActionButton({
  tooltip,
  icon,
  onClick,
  color,
}: {
  tooltip: string
  icon: IconName
  onClick: () => void
  color: 'emerald' | 'red' | 'indigo' | 'navy'
}) {
  return (
    <div className="group relative">
      <button
        onClick={onClick}
        aria-label={tooltip}
        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${actionColors[color]}`}
      >
        <Icon name={icon} size={17} />
      </button>
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#0f2347] px-2.5 py-1 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10 shadow-lg">
        {tooltip}
        <span className="absolute left-1/2 top-full -translate-x-1/2 -mt-px border-4 border-transparent border-t-[#0f2347]" />
      </span>
    </div>
  )
}
