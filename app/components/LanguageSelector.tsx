'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    googleTranslateElementInit?: () => void
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string
            includedLanguages: string
            layout: number
            autoDisplay: boolean
          },
          element: string,
        ) => void
        InlineLayout?: { SIMPLE: number }
      }
    }
  }
}

const LANGUAGES = [
  { code: 'es', label: 'ES', name: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'EN', name: 'English', flag: '🇺🇸' },
  { code: 'de', label: 'DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', label: 'RU', name: 'Русский', flag: '🇷🇺' },
  { code: 'fr', label: 'FR', name: 'Français', flag: '🇫🇷' },
  { code: 'zh-CN', label: '中文', name: '中文', flag: '🇨🇳' },
  { code: 'ar', label: 'AR', name: 'العربية', flag: '🇸🇦' },
]

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${value}; expires=${expires}; path=/`
}

function getCookie(name: string): string {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(name + '='))
    ?.split('=')[1] ?? ''
}

function getCurrentLang(): string {
  const val = getCookie('googtrans')
  if (!val) return 'es'
  const parts = val.split('/')
  return parts[parts.length - 1] || 'es'
}

function translateTo(code: string) {
  if (code === 'es') {
    setCookie('googtrans', '/es/es', 1)
  } else {
    setCookie('googtrans', `/es/${code}`, 1)
  }
  window.location.reload()
}

export function LanguageSelector() {
  const current = typeof window !== 'undefined' ? getCurrentLang() : 'es'
  const currentLang = LANGUAGES.find((l) => l.code === current) ?? LANGUAGES[0]

  useEffect(() => {
    if (document.getElementById('google-translate-script')) return

    window.googleTranslateElementInit = () => {
      new window.google!.translate.TranslateElement(
        {
          pageLanguage: 'es',
          includedLanguages: 'es,en,de,ru,fr,zh-CN,ar',
          layout: 0,
          autoDisplay: false,
        },
        'google_translate_element',
      )
    }

    const script = document.createElement('script')
    script.id = 'google-translate-script'
    script.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <>
      <div id="google_translate_element" className="hidden" aria-hidden="true" />

      <div className="relative group">
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-amber-400 hover:bg-amber-50 transition-all text-sm font-medium text-slate-700 shadow-sm"
          aria-label="Seleccionar idioma"
        >
          <span className="text-base leading-none">{currentLang.flag}</span>
          <span className="hidden sm:inline">{currentLang.label}</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 text-slate-400">
            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="absolute right-0 top-full mt-1.5 w-44 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => translateTo(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors
                ${current === lang.code
                  ? 'bg-amber-50 text-amber-700 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
                }`}
            >
              <span className="text-base leading-none">{lang.flag}</span>
              <span>{lang.name}</span>
              {current === lang.code && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 ml-auto text-amber-500">
                  <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
