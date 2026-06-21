import { Icon, type IconName } from './components/Icon'
import { CubanFlag } from './components/CubanFlag'
import { FAQ } from './components/FAQ'

const services: { icon: IconName; title: string; desc: string }[] = [
  {
    icon: 'building',
    title: 'Constitución y Gestión de MIPYMES',
    desc: 'Asesoría integral para crear y administrar tu empresa en Cuba, con todos los trámites legales y permisos.',
  },
  {
    icon: 'home',
    title: 'Compraventa y Traspaso de Inmuebles',
    desc: 'Acompañamiento legal completo en la compra, venta y traspaso de propiedades con plena seguridad jurídica.',
  },
  {
    icon: 'globe',
    title: 'Importación y Exportación',
    desc: 'Facilitamos tus operaciones comerciales internacionales con orientación aduanera y mercantil.',
  },
  {
    icon: 'fileText',
    title: 'Representaciones Legales y Poderes',
    desc: 'Otorga poderes y representaciones desde cualquier parte del mundo con validez legal.',
  },
  {
    icon: 'users',
    title: 'Matrimonio y Trámites Familiares',
    desc: 'Acompañamiento profesional en matrimonios, divorcios y gestiones familiares.',
  },
  {
    icon: 'feather',
    title: 'Servicios Notariales',
    desc: 'Documentación legal con validez oficial, escrituras y certificaciones.',
  },
  {
    icon: 'barChart',
    title: 'Contabilidad y Asesoría Empresarial',
    desc: 'Gestión financiera, fiscal y contable para mantener tu empresa al día.',
  },
  {
    icon: 'key',
    title: 'Usufructos y Vivienda',
    desc: 'Asesoría especializada en derechos de propiedad, usufructo y vivienda.',
  },
]

const stats = [
  { value: '+15', label: 'Años de experiencia' },
  { value: '+2,500', label: 'Casos resueltos' },
  { value: '+40', label: 'Países atendidos' },
  { value: '24/7', label: 'Atención online' },
]

const process = [
  { step: '01', title: 'Solicita tu asesoría', desc: 'Completa el formulario online o escríbenos por WhatsApp Business.' },
  { step: '02', title: 'Análisis de tu caso', desc: 'Nuestros especialistas estudian tu situación y te contactan.' },
  { step: '03', title: 'Orientación personalizada', desc: 'Recibe una estrategia clara con todos los pasos a seguir.' },
  { step: '04', title: 'Acompañamiento total', desc: 'Te guiamos en cada gestión hasta resolver tu trámite.' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
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
            <nav className="hidden md:flex items-center gap-8">
              <a href="#servicios" className="text-sm font-medium text-slate-600 hover:text-[#0f2347] transition-colors">Servicios</a>
              <a href="#proceso" className="text-sm font-medium text-slate-600 hover:text-[#0f2347] transition-colors">Cómo trabajamos</a>
              <a href="#diaspora" className="text-sm font-medium text-slate-600 hover:text-[#0f2347] transition-colors">Diáspora</a>
              <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-[#0f2347] transition-colors">FAQ</a>
              <a href="/admin" className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-[#0f2347] transition-colors"><Icon name="lock" size={15} /> Panel</a>
              <a href="/agendar" className="btn-dark text-sm !px-6 !py-3">Solicitar Asesoría</a>
            </nav>
            <div className="md:hidden flex items-center gap-3">
              <a href="/admin" className="text-slate-600 hover:text-[#0f2347]" aria-label="Panel administrativo"><Icon name="lock" size={20} /></a>
              <a href="/agendar" className="btn-dark text-sm !px-4 !py-2.5">Asesoría</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0f2347] text-white">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl animate-fade-up">
            <span className="eyebrow !text-amber-400 mb-6">
              <span className="h-px w-8 bg-amber-400" /> Tu derecho, nuestro compromiso
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] mt-5 mb-6">
              Soluciones jurídicas y contables para cubanos
              <span className="text-amber-400"> dentro y fuera de la Isla.</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100/80 mb-9 max-w-2xl">
              Orientación legal, contable y administrativa confiable y accesible. Servimos de puente
              entre Cuba y su diáspora, acompañándote en cada paso desde cualquier parte del mundo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/agendar" className="btn-primary text-base">Solicitar Asesoría →</a>
              <a href="#servicios" className="btn-outline text-base">Conocer Servicios</a>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-10 text-sm text-blue-100/70">
              <span className="flex items-center gap-2"><Icon name="message" size={18} className="text-amber-400" /> Atención por WhatsApp Business</span>
              <span className="flex items-center gap-2"><Icon name="card" size={18} className="text-amber-400" /> Pagos internacionales (PayPal)</span>
              <span className="flex items-center gap-2"><Icon name="shield" size={18} className="text-amber-400" /> 100% confidencial</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-[#0f2347]">{s.value}</div>
                <div className="text-sm text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow justify-center mb-4">Áreas de práctica</span>
            <h2 className="section-title mb-4">Nuestros Servicios Jurídicos y Contables</h2>
            <p className="text-slate-500 text-lg">
              Un equipo especializado para acompañarte en cada gestión legal, empresarial y patrimonial en Cuba.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.title} className="card card-hover p-7 group">
                <div className="w-14 h-14 rounded-xl bg-[#0f2347]/5 text-[#0f2347] flex items-center justify-center mb-5 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                  <Icon name={service.icon} size={26} />
                </div>
                <h3 className="font-display text-lg font-bold text-[#0f2347] mb-2 leading-snug">{service.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="proceso" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow justify-center mb-4">Cómo trabajamos</span>
            <h2 className="section-title mb-4">Un proceso simple y transparente</h2>
            <p className="text-slate-500 text-lg">Desde tu primera consulta hasta la resolución, te acompañamos en cada etapa.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {process.map((p, i) => (
              <div key={p.step} className="relative">
                <div className="font-display text-5xl font-bold text-amber-500/30">{p.step}</div>
                <h3 className="font-display text-lg font-bold text-[#0f2347] mt-3 mb-2">{p.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
                {i < process.length - 1 && (
                  <div className="hidden md:block absolute top-6 right-0 w-1/2 h-px bg-gradient-to-r from-amber-200 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diaspora Section */}
      <section id="diaspora" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="eyebrow mb-4">Para la diáspora cubana</span>
            <h2 className="section-title mb-6">Cuba te espera con los brazos abiertos</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Tu talento, tu experiencia y tu amor por Cuba son una fuerza fundamental para el futuro
              de nuestra nación. Ponemos a tu disposición una plataforma moderna, segura y accesible
              para mantener tus vínculos con la patria, invertir o apoyar a tu familia.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'Invierte en Cuba con respaldo legal profesional',
                'Gestiona trámites desde cualquier país',
                'Apoya a tus familiares con poderes y representaciones',
                'Reencuéntrate con tus raíces de forma segura',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0"><Icon name="check" size={13} strokeWidth={3} /></span>
                  {item}
                </li>
              ))}
            </ul>
            <a href="/agendar" className="btn-dark">Comienza tu trámite hoy</a>
          </div>
          <div className="relative">
            <div className="card p-10 bg-[#0f2347] text-white border-0 text-center">
              <CubanFlag className="mx-auto w-28 h-auto rounded-md shadow-lg ring-1 ring-white/10" />
              <blockquote className="font-display text-2xl md:text-3xl font-semibold leading-snug mt-7 mb-6">
                "Dondequiera que se encuentre un cubano, allí también vive una parte de Cuba."
              </blockquote>
              <div className="h-px bg-white/15 mb-6" />
              <p className="text-blue-100/70">
                Desde Cuba, extendemos nuestra mano amiga para orientarte, acompañarte y facilitar
                cada paso de tu camino.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow justify-center mb-4">Preguntas frecuentes</span>
            <h2 className="section-title mb-4">¿Tienes dudas? Aquí te ayudamos</h2>
            <p className="text-slate-500 text-lg">
              Resolvemos las preguntas más comunes sobre nuestros servicios legales y contables.
            </p>
          </div>
          <FAQ />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-[#0f2347] text-white">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-5">¿Listo para resolver tu situación legal?</h2>
          <p className="text-lg text-blue-100/80 mb-9 max-w-2xl mx-auto">
            Solicita tu asesoría hoy mismo. Nuestro equipo de especialistas está listo para ayudarte
            estés donde estés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/agendar" className="btn-primary text-base">Solicitar Asesoría Ahora</a>
            <a href="#servicios" className="btn-outline text-base">Ver todos los servicios</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#091831] text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center">
                  <Icon name="scale" size={22} className="text-amber-400" />
                </div>
                <div className="leading-tight">
                  <span className="block font-display text-lg font-bold">Teneduría García SURL</span>
                  <span className="block text-[11px] tracking-[0.2em] text-amber-400/80 font-semibold uppercase">Soluciones Legales e Inteligentes</span>
                </div>
              </div>
              <p className="text-blue-100/60 max-w-md leading-relaxed">
                Plataforma digital de asesoría jurídica y contable para cubanos dentro y fuera de la Isla.
                Tu derecho, nuestro compromiso.
              </p>
            </div>
            <div>
              <h4 className="font-display font-bold mb-4 text-amber-400">Servicios</h4>
              <ul className="space-y-2.5 text-sm text-blue-100/60">
                <li><a href="#servicios" className="hover:text-white transition-colors">MIPYMES</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Inmuebles</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Servicios Notariales</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Contabilidad</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold mb-4 text-amber-400">Contacto</h4>
              <ul className="space-y-2.5 text-sm text-blue-100/60">
                <li className="flex items-center gap-2"><Icon name="message" size={16} className="text-amber-400/80" /> WhatsApp Business</li>
                <li className="flex items-center gap-2"><Icon name="card" size={16} className="text-amber-400/80" /> Pagos vía PayPal</li>
                <li><a href="/agendar" className="hover:text-white transition-colors">Solicitar asesoría</a></li>
                <li><a href="/admin" className="hover:text-white transition-colors">Acceso administrativo</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-blue-100/50">
            <span>© 2024 Teneduría García SURL. Todos los derechos reservados.</span>
            <span className="italic text-amber-400/70 font-display">"Tu derecho, nuestro compromiso."</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
