'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CreateUsuarioData } from '@/types'
import { usuarioService } from '@/services/usuarioService'

export default function NuevoUsuarioPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<CreateUsuarioData>({
    nombreUsuario: '',
    contrasenia: '',
    rol: 'Secretario'
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombreUsuario.trim()) {
      newErrors.nombreUsuario = 'El nombre de usuario es requerido'
    } else if (formData.nombreUsuario.length < 3) {
      newErrors.nombreUsuario = 'El nombre de usuario debe tener al menos 3 caracteres'
    }

    if (!formData.contrasenia.trim()) {
      newErrors.contrasenia = 'La contraseña es requerida'
    } else if (formData.contrasenia.length < 6) {
      newErrors.contrasenia = 'La contraseña debe tener al menos 6 caracteres'
    }

    if (!formData.rol) {
      newErrors.rol = 'El rol es requerido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    try {
      const response = await usuarioService.createUsuario(formData)
      if (response.success) {
        alert('Usuario creado exitosamente')
        router.push('/usuarios')
      } else {
        alert(response.error || 'Error al crear el usuario')
      }
    } catch (error) {
      alert('Error al crear el usuario')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nuevo Usuario</h1>
          <p className="text-gray-600">Registra un nuevo usuario en el sistema</p>
        </div>
        <Link href="/usuarios" className="btn btn-secondary">
          <span className="mr-2">←</span>
          Volver
        </Link>
      </div>

      {/* Form */}
      <div className="card max-w-2xl">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Información del Usuario */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              <span className="mr-2">👤</span>
              Información del Usuario
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de Usuario *
                </label>
                <input
                  type="text"
                  value={formData.nombreUsuario}
                  onChange={(e) => handleChange('nombreUsuario', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.nombreUsuario ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ingrese el nombre de usuario"
                />
                {errors.nombreUsuario && (
                  <p className="mt-1 text-sm text-red-600">{errors.nombreUsuario}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña *
                </label>
                <input
                  type="password"
                  value={formData.contrasenia}
                  onChange={(e) => handleChange('contrasenia', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.contrasenia ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ingrese la contraseña"
                />
                {errors.contrasenia && (
                  <p className="mt-1 text-sm text-red-600">{errors.contrasenia}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  La contraseña debe tener al menos 6 caracteres
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rol *
                </label>
                <select
                  value={formData.rol}
                  onChange={(e) => handleChange('rol', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.rol ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="Secretario">Secretario</option>
                  <option value="Odontólogo">Odontólogo</option>
                  <option value="Administrador">Administrador</option>
                </select>
                {errors.rol && (
                  <p className="mt-1 text-sm text-red-600">{errors.rol}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  El rol determina los permisos del usuario en el sistema
                </p>
              </div>
            </div>
          </div>

          {/* Información de Seguridad */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              <span className="mr-2">🔒</span>
              Información de Seguridad
            </h3>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex">
                <span className="text-2xl mr-3">💡</span>
                <div>
                  <h4 className="text-sm font-medium text-blue-800">Recomendaciones de Seguridad</h4>
                  <ul className="mt-2 text-sm text-blue-700 space-y-1">
                    <li>• Usa una contraseña fuerte con letras, números y símbolos</li>
                    <li>• No compartas las credenciales con otros usuarios</li>
                    <li>• Cambia la contraseña periódicamente</li>
                    <li>• Cierra sesión al terminar de usar el sistema</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Link href="/usuarios" className="btn btn-secondary">
              Cancelar
            </Link>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Guardando...
                </>
              ) : (
                <>
                  <span className="mr-2">💾</span>
                  Guardar Usuario
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 