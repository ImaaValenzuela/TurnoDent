import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TurnoDent - Sistema de Gestión Odontológica',
  description: 'Sistema de gestión de turnos y pacientes para clínicas odontológicas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div id="page-top" className="bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
} 