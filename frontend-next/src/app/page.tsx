'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function HomePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-xl">🦷</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">TurnoDent</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Sistema de Gestión Odontológica</span>
              <button
                onClick={() => router.push('/login')}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Panel de Control</h2>
          <p className="text-lg text-gray-600">Gestiona usuarios, pacientes, odontólogos y turnos</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Usuarios */}
          <Link href="/usuarios" className="group">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200">
                  <span className="text-blue-600 text-xl">👥</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Usuarios</h3>
                  <p className="text-sm text-gray-600">Gestionar usuarios del sistema</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Pacientes */}
          <Link href="/pacientes" className="group">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-200">
                  <span className="text-green-600 text-xl">🏥</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Pacientes</h3>
                  <p className="text-sm text-gray-600">Gestionar pacientes</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Odontólogos */}
          <Link href="/odontologos" className="group">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200">
                  <span className="text-purple-600 text-xl">👨‍⚕️</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Odontólogos</h3>
                  <p className="text-sm text-gray-600">Gestionar odontólogos</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Turnos */}
          <Link href="/test" className="group">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-orange-200">
                  <span className="text-orange-600 text-xl">📅</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Turnos</h3>
                  <p className="text-sm text-gray-600">Gestionar turnos</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/usuarios/nuevo">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Nuevo Usuario
              </button>
            </Link>
            <Link href="/pacientes/nuevo">
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                Nuevo Paciente
              </button>
            </Link>
            <Link href="/odontologos/nuevo">
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
                Nuevo Odontólogo
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 