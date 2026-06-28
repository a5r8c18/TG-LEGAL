'use client'

import { useState } from 'react'
import { Icon } from './Icon'

const WHATSAPP = '17868135148'

interface FAQItem {
  question: string
  answer: string
  hook?: string
}

interface FAQSection {
  title: string
  items: FAQItem[]
}

const sections: FAQSection[] = [
  {
    title: 'Inversión Extranjera',
    items: [
      {
        question: '¿Qué ley regula la inversión de capital extranjero en Cuba?',
        answer: 'La Ley 118, "Ley de Inversión Extranjera", publicada en la Gaceta Oficial Extraordinaria No. 29 de 2014. Esta es la ley marco que establece las formas, requisitos y garantías para la inversión foránea en el país.',
        hook: 'Esta ley define 3 figuras jurídicas distintas para invertir, cada una con implicaciones fiscales y operativas muy diferentes. Descubre cuál se adapta a tu caso →',
      },
      {
        question: '¿Qué formas legales puede adoptar un inversor extranjero para invertir en Cuba?',
        answer: 'Un inversor extranjero puede establecer su inversión a través de tres figuras jurídicas (Artículo 16 de la Ley 118):\n1. Empresa de Capital Totalmente Extranjero (ETCE).\n2. Asociación Económica Internacional (AEI).\n3. Contrato de Asociación Económica Internacional (donde no se crea una nueva persona jurídica, sino que se firma un contrato de riesgo compartido).',
        hook: 'Cada figura tiene requisitos de capital mínimo, plazos y procesos de aprobación distintos. Los detalles exactos de cada una están disponibles dentro del panel →',
      },
      {
        question: '¿Existen sectores donde un extranjero no puede invertir?',
        answer: 'Sí. La ley prohíbe la inversión extranjera en los sectores de la defensa nacional, la seguridad interior, la salud pública (servicios médicos asistenciales directos a la población) y la educación pública. Además, la inversión en recursos naturales estratégicos (como minería o hidrocarburos) solo se permite mediante Asociación Económica Internacional con el Estado, nunca al 100%.',
      },
      {
        question: '¿Qué es la Zona Especial de Desarrollo Mariel (ZEDM)?',
        answer: 'Es una zona franca de desarrollo económico (Decreto-Ley 313/2013). Ofrece un régimen aduanero y fiscal preferencial. La ZEDM cuenta con su propia Autoridad Reguladora que agiliza los trámites y otorga exenciones del Impuesto sobre Utilidades por un plazo de hasta 10 años.',
      },
      {
        question: '¿Puede un inversor extranjero repatriar sus ganancias a su país?',
        answer: 'Sí. La ley garantiza el derecho a la repatriación del capital invertido y las utilidades netas (una vez pagados todos los impuestos correspondientes). Esta transferencia debe realizarse a través de las entidades bancarias autorizadas en Cuba (Artículos 26 y 31 de la Ley 118).',
      },
    ],
  },
  {
    title: 'MIPYMES y Capital Extranjero',
    items: [
      {
        question: '¿Cuál es la ley vigente que regula las MIPYMES en Cuba hoy?',
        answer: 'La norma vigente es el Decreto-Ley 89/2023 "De las Micro, Pequeñas y Medianas Empresas", publicado en la Gaceta Oficial Extraordinaria No. 94 de 2023.',
        hook: 'Esta ley trajo cambios fundamentales que afectan directamente a los inversores extranjeros. Descubre cuáles son y cómo impactan tu negocio →',
      },
      {
        question: '¿Puede un extranjero ser propietario o socio de una MIPYME cubana?',
        answer: 'No. El Decreto-Ley No. 88 establece que pueden ser socios de las MIPYMES de propiedad privada las personas naturales cubanas con residencia efectiva en el territorio nacional y extranjeras residentes permanentes en Cuba.',
        hook: 'Si tu capital es extranjero, existen figuras legales específicas diseñadas para ti. La ruta correcta está explicada en detalle dentro del panel →',
      },
      {
        question: '¿Si mi capital es extranjero, qué figura legal debo usar para invertir en Cuba?',
        answer: 'Un extranjero debe usar la Ley 118 para invertir. Debe constituir una Empresa de Capital Totalmente Extranjero (ETCE) o una Asociación Económica Internacional (AEI). Estas figuras requieren un capital mínimo de inversión aprobado por el MINCEX y un proceso de aprobación del Comité Ejecutivo del Consejo de Ministros. No debe intentar usar la figura de MIPYME.',
      },
    ],
  },
  {
    title: 'Trámites y Costos Administrativos',
    items: [
      {
        question: '¿Qué documentos debe presentar un inversor extranjero para solicitar una inversión en Cuba?',
        answer: 'El inversor debe presentar un expediente que contenga: Estudio de Factibilidad económica, Carta de Intención, Certificado de antecedentes penales del inversor, Poder Legal Especial (legalizado/apostillado y traducido al español por traductor jurado), y la documentación societaria de su empresa matriz.',
      },
      {
        question: '¿Cuánto tardan en aprobar una inversión extranjera?',
        answer: 'La ley establece un plazo de 60 días hábiles para que el Comité Ejecutivo del Consejo de Ministros o el MINCEX respondan a la solicitud de inversión, tras la presentación completa de la documentación. Puede demorar o menos en dependencia de las condiciones del país.',
      },
      {
        question: '¿Cómo funciona el sistema bancario para la inversión extranjera?',
        answer: 'El inversor extranjero debe abrir una cuenta corriente en el Banco Central de Cuba o en bancos comerciales autorizados (como el Banco Financiero Internacional - BFI, o el Banco de Comercio Exterior - BANCOEX). Las cuentas operan en divisas (USD, EUR, etc.). Los gastos en moneda nacional (CUP) para la nómina y operaciones locales se gestionan mediante la compra de divisas en la ventanilla bancaria oficial.',
      },
    ],
  },
  {
    title: 'Sistema Tributario',
    items: [
      {
        question: '¿Qué impuestos principales debe pagar una inversión extranjera en Cuba?',
        answer: 'Basado en la Ley 113 "Sistema Tributario":\n1. Impuesto sobre Utilidades: 15%.\n2. Impuesto sobre las Ventas: 2.5%.\n3. Impuesto sobre los Ingresos Personales (IRTP): progresivo, del 10% al 50%.\n4. Contribución a la Seguridad Social: 14% a cargo del empleador sobre la nómina.',
      },
      {
        question: '¿Existen exenciones o bonificaciones fiscales para el inversor extranjero?',
        answer: 'Sí, dependiendo del sector y la ubicación. Las exenciones específicas, plazos y condiciones para acceder a ellas están disponibles para suscriptores del Plan Información.',
      },
    ],
  },
  {
    title: 'Propiedad y Bienes Raíces',
    items: [
      {
        question: '¿Puede un extranjero ser propietario de tierras o inmuebles en Cuba?',
        answer: 'No. La Constitución cubana establece que el suelo y los bienes inmuebles son propiedad del Estado. Un extranjero no puede ser propietario de un inmueble en Cuba. La única figura legal para ocupar un terreno para uso industrial o comercial es el Contrato de Usufructo (concesión del uso del suelo por un plazo determinado) otorgado por el Estado, o el arrendamiento de propiedades ya construidas.',
      },
    ],
  },
]

const FREE_PER_SECTION = 2

export function FAQ() {
  const [openKey, setOpenKey] = useState<string | null>(null)

  const toggle = (key: string) => setOpenKey(openKey === key ? null : key)

  const whatsappUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hola, me interesa una consulta personalizada con un especialista.')}`

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {sections.map((section, sIdx) => {
        const freeItems = section.items.slice(0, FREE_PER_SECTION)
        const lockedItems = section.items.slice(FREE_PER_SECTION)

        return (
          <div key={sIdx}>
            {/* Section header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-amber-400 rounded-full" />
              <h3 className="font-display text-base font-bold text-[#0f2347] uppercase tracking-wide">
                {section.title}
              </h3>
            </div>

            <div className="space-y-3">
              {/* Free items */}
              {freeItems.map((item, iIdx) => {
                const key = `${sIdx}-${iIdx}`
                const isOpen = openKey === key
                return (
                  <div key={key} className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                    <button
                      onClick={() => toggle(key)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-base font-semibold text-[#0f2347] pr-4">{item.question}</span>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-[#0f2347]/10 flex items-center justify-center transition-all duration-200 ${isOpen ? 'bg-amber-500 text-white rotate-180' : 'text-[#0f2347]'}`}>
                        <Icon name="chevron" size={16} />
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
                      <div className="px-6 pb-2 text-slate-600 leading-relaxed whitespace-pre-line text-sm">
                        {item.answer}
                      </div>
                      {item.hook && (
                        <div className="mx-6 mb-4 mt-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                          <p className="text-xs text-amber-800 leading-relaxed mb-2">
                            <span className="font-semibold">👉 </span>{item.hook}
                          </p>
                          <a href="/suscripcion" className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-900 transition-colors">
                            Acceder por $5/mes →
                          </a>
                        </div>
                      )}
                      <div className="px-6 pb-5 pt-1 border-t border-slate-100 mt-2">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-[#0f2347] transition-colors font-medium"
                        >
                          <Icon name="message" size={13} className="text-amber-500" />
                          ¿Tu caso es complejo? Agenda una consulta con un especialista por $35 USD
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Locked items — titles visible, answers blocked */}
              {lockedItems.length > 0 && (
                <>
                  {lockedItems.map((item, iIdx) => (
                    <div key={`locked-${sIdx}-${iIdx}`} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                      <div className="px-6 py-4 flex items-center justify-between gap-4">
                        <span className="font-display text-base font-semibold text-[#0f2347] pr-4">{item.question}</span>
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 flex-shrink-0">
                          <Icon name="lock" size={14} />
                        </div>
                      </div>
                      <div className="px-6 pb-4 flex items-center justify-between gap-3 border-t border-slate-50">
                        <p className="text-xs text-slate-400">Disponible con el Plan Información · $5/mes</p>
                        <a href="/suscripcion" className="text-xs font-semibold text-amber-600 hover:text-amber-800 transition-colors whitespace-nowrap">
                          Desbloquear →
                        </a>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )
      })}

      {/* Global paywall CTA */}
      <div className="bg-[#0f2347] rounded-2xl p-8 text-center">
        <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Icon name="lock" size={22} className="text-[#0f2347]" />
        </div>
        <h3 className="font-display text-xl font-bold text-white mb-2">Accede a todas las respuestas</h3>
        <p className="text-blue-100/70 text-sm mb-6 max-w-md mx-auto leading-relaxed">
          Desbloquea las respuestas de ejecución: requisitos exactos, plazos, costos, modelos de contratos y cronogramas legales.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/suscripcion" className="btn-primary text-sm">
            Plan Información — $5/mes →
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm !border-white/30 !text-white hover:!bg-white/10"
          >
            Consulta con especialista — $35
          </a>
        </div>
        <p className="text-xs text-blue-100/40 mt-4">Sin pasarela automática · Link de pago por WhatsApp</p>
      </div>
    </div>
  )
}
