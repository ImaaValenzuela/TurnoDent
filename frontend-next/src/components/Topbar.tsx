'use client'

import { useState } from 'react'

interface TopbarProps {
  onMenuClick: () => void
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Botón de menú para móviles */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <span className="text-xl">☰</span>
        </button>

        {/* Título de la página */}
        <div className="flex-1 lg:flex-none">
          <h1 className="text-xl font-semibold text-gray-900">TurnoDent</h1>
        </div>

        {/* Acciones del usuario */}
        <div className="flex items-center space-x-4">
          {/* Notificaciones */}
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
            <span className="text-xl">🔔</span>
          </button>

          {/* Menú de usuario */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <span className="text-xl">👤</span>
              <span className="hidden md:block text-sm font-medium">Admin</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <span className="mr-3">👤</span>
                  Perfil
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                  <span className="mr-3">🚪</span>
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 