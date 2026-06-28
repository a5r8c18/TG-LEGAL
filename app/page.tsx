import { Icon, type IconName } from './components/Icon'
import { CubanFlag } from './components/CubanFlag'
import { FAQ } from './components/FAQ'
import { LanguageSelector } from './components/LanguageSelector'

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
              <a href="#planes" className="text-sm font-medium text-slate-600 hover:text-[#0f2347] transition-colors">Planes</a>
              <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-[#0f2347] transition-colors">FAQ</a>
              <a href="/admin" className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-[#0f2347] transition-colors"><Icon name="lock" size={15} /> Panel</a>
              <a href="/agendar" className="btn-dark text-sm !px-6 !py-3">Solicitar Asesoría</a>
              <LanguageSelector />
            </nav>
            <div className="md:hidden flex items-center gap-3">
              <LanguageSelector />
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
              <span className="flex items-center gap-2">
                <Icon name="card" size={18} className="text-amber-400" />
                <span className="flex items-center gap-1.5">
                  <span className="text-blue-100/70">Pago seguro</span>
                  <span className="text-blue-100/30">·</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-5 h-auto rounded-sm flex-shrink-0"><rect width="60" height="30" fill="#B22234"/><rect y="2.3" width="60" height="2.3" fill="#fff"/><rect y="6.9" width="60" height="2.3" fill="#fff"/><rect y="11.5" width="60" height="2.3" fill="#fff"/><rect y="16.2" width="60" height="2.3" fill="#fff"/><rect y="20.8" width="60" height="2.3" fill="#fff"/><rect y="25.4" width="60" height="2.3" fill="#fff"/><rect width="24" height="16.2" fill="#3C3B6E"/></svg>
                  <img src="/logo-majority.png" alt="Majority" className="h-4 w-auto flex-shrink-0" style={{filter:'brightness(0) invert(1)'}} />
                  <span className="text-blue-100/30">|</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 339.43 295.27" className="w-5 h-auto flex-shrink-0"><path d="M62.15 1.45l-61.89 105.3a4.42 4.42 0 0 0 .54 5.2l166.33 182.38a4.42 4.42 0 0 0 6.55 0L339.8 111.95a4.42 4.42 0 0 0 .54-5.2L278.52 1.45A4.42 4.42 0 0 0 274.63 0H64.84a4.42 4.42 0 0 0-3.89 1.45z" fill="#53ae94"/><path d="M191.19 144.8v-.1c-1.2.09-7.37.46-21.16.46-11 0-18.79-.33-21.53-.46v.1c-42.51-1.87-74.24-9.27-74.24-18.15s31.73-16.28 74.24-18.16v28.91c2.78.2 10.74.67 21.72.67 13.18 0 19.78-.55 21-.66v-28.9c42.42 1.87 74.08 9.27 74.08 18.14s-31.65 16.28-74.08 18.15zm0-39.3V79.2h59.2V37.58H89.25V79.2h59.19v26.29c-48.11 2.21-84.29 11.74-84.29 23.3s36.18 21.09 84.29 23.3v83.4h42.55v-83.4c48-2.2 84.17-11.73 84.17-23.29s-36.18-21.09-84.17-23.3z" fill="#fff"/></svg>
                  <span className="text-white font-medium">USDT</span>
                </span>
              </span>
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

      {/* Pricing Section */}
      <section id="planes" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0f2347] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-4">
            <span className="eyebrow !text-amber-400 justify-center mb-4">Acceso por suscripción</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Información detallada requiere suscripción</h2>
            <p className="text-blue-100/70 text-lg mb-3">
              El homepage te da una visión general de nuestros servicios. Para acceder a detalles, preguntas y respuestas completas, o consultar directamente con un especialista, elige el plan que mejor se adapte a ti.
            </p>
          </div>

          {/* Payment notice */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:border-amber-500/30 transition-colors">
                <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 mt-0.5 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-full h-full"><rect width="60" height="30" fill="#B22234"/><rect y="2.3" width="60" height="2.3" fill="#fff"/><rect y="6.9" width="60" height="2.3" fill="#fff"/><rect y="11.5" width="60" height="2.3" fill="#fff"/><rect y="16.2" width="60" height="2.3" fill="#fff"/><rect y="20.8" width="60" height="2.3" fill="#fff"/><rect y="25.4" width="60" height="2.3" fill="#fff"/><rect width="24" height="16.2" fill="#3C3B6E"/></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-0.5">Estados Unidos</p>
                  <p className="text-xs text-blue-100/55 leading-relaxed">Link de pago <span className="text-amber-300 font-medium">Majority</span> enviado a tu WhatsApp tras la solicitud.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:border-amber-500/30 transition-colors">
                <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 mt-0.5 shadow-md bg-slate-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z"/></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-0.5">Resto del mundo</p>
                  <p className="text-xs text-blue-100/55 leading-relaxed">Solo aceptamos <span className="text-amber-300 font-medium">USDT</span> (criptomoneda). Coordinamos el pago por WhatsApp.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plan Info */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col hover:border-amber-400/50 transition-colors">
              <div className="mb-6">
                <h3 className="font-display text-xl font-bold text-white mb-2">Plan Información</h3>
                <div className="flex items-end gap-1 mb-3">
                  <span className="text-4xl font-bold text-amber-400">$5</span>
                  <span className="text-blue-100/60 mb-1">/mes</span>
                </div>
                <p className="text-blue-100/60 text-sm leading-relaxed">Accede a todos los detalles de servicios, preguntas y respuestas frecuentes y orientación general.</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {['Acceso completo a FAQ', 'Detalles de todos los servicios', 'Orientación general sobre trámites', 'Actualizaciones legales mensuales'].map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm text-blue-100/80">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0"><Icon name="check" size={12} strokeWidth={3} /></span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="/suscripcion" className="btn-outline w-full text-center text-sm">Solicitar este plan →</a>
            </div>

            {/* Plan Especialista */}
            <div className="bg-amber-500 rounded-2xl p-8 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl tracking-wide uppercase">Más completo</div>
              <div className="mb-6">
                <h3 className="font-display text-xl font-bold text-slate-900 mb-2">Consulta con Especialista</h3>
                <div className="flex items-end gap-1 mb-3">
                  <span className="text-4xl font-bold text-slate-900">$35</span>
                  <span className="text-slate-800/70 mb-1">/sesión</span>
                </div>
                <p className="text-slate-800/70 text-sm leading-relaxed">Sesión personalizada con un abogado o contador para analizar tu caso en detalle.</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {['Todo lo del Plan Información', 'Sesión en vivo con un especialista', 'Análisis detallado de tu caso', 'Estrategia legal personalizada', 'Seguimiento post-consulta (7 días)'].map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-900">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center flex-shrink-0"><Icon name="check" size={12} strokeWidth={3} /></span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="/suscripcion" className="btn-dark w-full text-center text-sm">Solicitar este plan →</a>
            </div>
          </div>

          <p className="text-center text-sm text-blue-100/50 mt-8">
            Sin pasarela automática · Solicitas por WhatsApp y te enviamos el link de pago
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow justify-center mb-4">Preguntas frecuentes</span>
            <h2 className="section-title mb-4">¿Tienes dudas? Aquí te ayudamos</h2>
            <p className="text-slate-500 text-lg">
              Las primeras dos preguntas son gratuitas. Para ver todas las respuestas, activa el <strong>Plan Información</strong> por <span className="text-amber-600 font-bold">$5/mes</span>.
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
            <a href="#planes" className="btn-outline text-base">Ver planes</a>
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
                <li className="flex items-center gap-2 flex-wrap">
                  <span className="inline-block w-5 h-3 rounded-sm overflow-hidden flex-shrink-0 shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-full h-full"><rect width="60" height="30" fill="#B22234"/><rect y="2.3" width="60" height="2.3" fill="#fff"/><rect y="6.9" width="60" height="2.3" fill="#fff"/><rect y="11.5" width="60" height="2.3" fill="#fff"/><rect y="16.2" width="60" height="2.3" fill="#fff"/><rect y="20.8" width="60" height="2.3" fill="#fff"/><rect y="25.4" width="60" height="2.3" fill="#fff"/><rect width="24" height="16.2" fill="#3C3B6E"/></svg></span>
                  <img src="/logo-majority.png" alt="Majority" className="h-3.5 w-auto flex-shrink-0" style={{filter:'brightness(0) invert(1)'}} />
                  <span className="text-blue-100/30">·</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 339.43 295.27" className="w-4 h-auto flex-shrink-0"><path d="M62.15 1.45l-61.89 105.3a4.42 4.42 0 0 0 .54 5.2l166.33 182.38a4.42 4.42 0 0 0 6.55 0L339.8 111.95a4.42 4.42 0 0 0 .54-5.2L278.52 1.45A4.42 4.42 0 0 0 274.63 0H64.84a4.42 4.42 0 0 0-3.89 1.45z" fill="#53ae94"/><path d="M191.19 144.8v-.1c-1.2.09-7.37.46-21.16.46-11 0-18.79-.33-21.53-.46v.1c-42.51-1.87-74.24-9.27-74.24-18.15s31.73-16.28 74.24-18.16v28.91c2.78.2 10.74.67 21.72.67 13.18 0 19.78-.55 21-.66v-28.9c42.42 1.87 74.08 9.27 74.08 18.14s-31.65 16.28-74.08 18.15zm0-39.3V79.2h59.2V37.58H89.25V79.2h59.19v26.29c-48.11 2.21-84.29 11.74-84.29 23.3s36.18 21.09 84.29 23.3v83.4h42.55v-83.4c48-2.2 84.17-11.73 84.17-23.29s-36.18-21.09-84.17-23.3z" fill="#fff"/></svg>
                  <span>USDT</span>
                </li>
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
