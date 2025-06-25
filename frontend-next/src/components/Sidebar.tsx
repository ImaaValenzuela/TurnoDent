'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<string[]>([])

  const toggleMenu = (menuId: string) => {
    setOpenMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    )
  }

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Menú',
      href: '/',
      active: pathname === '/'
    },
    {
      id: 'odontologos',
      label: 'Odontólogos',
      submenu: [
        { label: 'Ver Odontólogos', href: '/odontologos' },
        { label: 'Alta Odontólogos', href: '/odontologos/nuevo' }
      ]
    },
    {
      id: 'pacientes',
      label: 'Pacientes',
      submenu: [
        { label: 'Ver Pacientes', href: '/pacientes' },
        { label: 'Alta Pacientes', href: '/pacientes/nuevo' }
      ]
    },
    {
      id: 'usuarios',
      label: 'Usuarios',
      submenu: [
        { label: 'Ver Usuarios', href: '/usuarios' },
        { label: 'Alta Usuarios', href: '/usuarios/nuevo' }
      ]
    }
  ]

  return (
    <>
      {/* Overlay para móviles */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-800 to-blue-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex flex-col h-full">
          {/* Brand */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-blue-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <span className="text-white text-xl">🦷</span>
              </div>
              <div className="text-white font-semibold text-lg">
                TurnoDent<sup className="text-xs">Admin</sup>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <div key={item.id}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      item.active
                        ? "bg-blue-700 text-white"
                        : "text-blue-100 hover:bg-blue-700 hover:text-white"
                    }`}
                    onClick={onClose}
                  >
                    <span className="mr-3">📊</span>
                    {item.label}
                  </Link>
                ) : (
                  <div>
                    <button
                      onClick={() => toggleMenu(item.id)}
                      className={`flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        openMenus.includes(item.id)
                          ? "bg-blue-700 text-white"
                          : "text-blue-100 hover:bg-blue-700 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="mr-3">
                          {item.id === 'odontologos' && '👨‍⚕️'}
                          {item.id === 'pacientes' && '👥'}
                          {item.id === 'usuarios' && '👤'}
                        </span>
                        {item.label}
                      </div>
                      <span className={`transition-transform ${
                        openMenus.includes(item.id) ? "rotate-180" : ""
                      }`}>
                        ▼
                      </span>
                    </button>
                    
                    {openMenus.includes(item.id) && item.submenu && (
                      <div className="ml-6 mt-2 space-y-1">
                        {item.submenu.map((subItem, index) => (
                          <Link
                            key={index}
                            href={subItem.href}
                            className="block px-3 py-2 text-sm text-blue-200 hover:text-white hover:bg-blue-600 rounded-md transition-colors"
                            onClick={onClose}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
} 