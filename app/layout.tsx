import './globals.css'

export const metadata = {
  title: 'Teneduría García SURL — Asesoría Jurídica y Contable',
  description: 'Soluciones jurídicas, contables e inteligentes para cubanos dentro y fuera de la Isla. Tu derecho, nuestro compromiso.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
