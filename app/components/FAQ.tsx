'use client'

import { useState } from 'react'
import { Icon } from './Icon'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: '¿Cómo puedo solicitar una asesoría legal?',
    answer: 'Puedes solicitar tu asesoría completando el formulario online en nuestra web, escribiéndonos por WhatsApp Business, o llamando directamente a nuestras oficinas. Te contactaremos en menos de 24 horas para analizar tu caso.'
  },
  {
    question: '¿Atienden casos desde fuera de Cuba?',
    answer: 'Sí, atendemos a clientes en todo el mundo. Tenemos experiencia trabajando con la diáspora cubana y podemos gestionar trámites sin importar dónde te encuentres. Utilizamos medios digitales para facilitar la comunicación.'
  },
  {
    question: '¿Cuáles son los métodos de pago aceptados?',
    answer: 'Aceptamos pagos internacionales a través de PayPal, transferencias bancarias, y otros métodos electrónicos seguros. Para clientes dentro de Cuba, también aceptamos transferencias locales y efectivo en nuestras oficinas.'
  },
  {
    question: '¿Cuánto tiempo toma resolver un trámite legal?',
    answer: 'El tiempo varía según el tipo de trámite. Algunas consultas simples se resuelven en días, mientras que procesos como constitución de empresas o compraventa de inmuebles pueden tomar semanas o meses. Te daremos un estimado realista durante tu primera consulta.'
  },
  {
    question: '¿Ofrecen servicios de representación legal en juicios?',
    answer: 'Sí, contamos con abogados autorizados para representarte en procedimientos judiciales, administrativos y notariales. Nuestro equipo te acompañará en cada etapa del proceso legal.'
  },
  {
    question: '¿Cómo garantizan la confidencialidad de mi información?',
    answer: 'Toda nuestra comunicación está protegida por secreto profesional. Utilizamos plataformas seguras, cumplimos con las regulaciones de protección de datos, y nunca compartimos tu información sin tu consentimiento explícito.'
  },
  {
    question: '¿Pueden ayudar con inversiones en Cuba?',
    answer: 'Sí, somos expertos en el marco legal para inversiones extranjeras en Cuba. Te asesoramos sobre la estructura legal más adecuada, permisos necesarios, y te acompañamos en todo el proceso de inversión.'
  },
  {
    question: '¿Qué documentos necesito para iniciar un trámite?',
    answer: 'Los documentos varían según el servicio. Generalmente necesitarás identificación válida, documentos relacionados con tu caso (títulos, contratos, etc.), y poderes si actúas en representación de terceros. Te enviaremos una lista específica después de analizar tu caso.'
  },
  {
    question: '¿Ofrecen consultas gratuitas?',
    answer: 'La primera consulta tiene un costo simbólico para evaluar tu caso y determinar la mejor estrategia. Este monto se descuenta del costo total si decides proceder con nuestros servicios. Creemos en el valor del trabajo profesional desde el inicio.'
  },
  {
    question: '¿Cómo puedo hacer seguimiento a mi caso?',
    answer: 'Proporcionamos un sistema de seguimiento online donde puedes ver el estado de tu trámite en tiempo real. Además, tu abogado asignado te mantendrá informado regularmente por WhatsApp o email sobre cada avance.'
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="font-display text-lg font-semibold text-[#0f2347] pr-4">
                {item.question}
              </span>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-[#0f2347]/10 flex items-center justify-center transition-all duration-200 ${
                openIndex === index ? 'bg-amber-500 text-white rotate-180' : 'text-[#0f2347]'
              }`}>
                <Icon name="chevron" size={16} className="transition-transform duration-200" />
              </div>
            </button>
            <div
              id={`faq-answer-${index}`}
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-6 pb-5 text-slate-600 leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
