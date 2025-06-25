'use client'

import { useState, useEffect } from 'react'
import { Usuario, CreateUsuarioData, UpdateUsuarioData } from '@/types'

interface UsuarioFormProps {
  usuario?: Usuario | null
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CreateUsuarioData | UpdateUsuarioData) => Promise<{ success: boolean; message: string }>
  mode: 'create' | 'edit'
}

export default function UsuarioForm({ usuario, isOpen, onClose, onSubmit, mode }: UsuarioFormProps) {
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    contrasenia: '',
    rol: 'Secretario'
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (usuario && mode === 'edit') {
      setFormData({
        nombreUsuario: usuario.nombre_usuario,
        contrasenia: '',
        rol: usuario.rol
      })
    } else {
      setFormData({
        nombreUsuario: '',
        contrasenia: '',
        rol: 'Secretario'
      })
    }
    setErrors({})
  }, [usuario, mode])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombreUsuario.trim()) {
      newErrors.nombreUsuario = 'El nombre de usuario es requerido'
    } else if (formData.nombreUsuario.length < 3) {
      newErrors.nombreUsuario = 'El nombre de usuario debe tener al menos 3 caracteres'
    }

    if (mode === 'create' && !formData.contrasenia.trim()) {
      newErrors.contrasenia = 'La contraseña es requerida'
    } else if (formData.contrasenia && formData.contrasenia.length < 6) {
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
      const data = mode === 'edit' && usuario
        ? { ...formData, idUsuario: usuario.idUsuario } as UpdateUsuarioData
        : formData as CreateUsuarioData

      const result = await onSubmit(data)
      
      if (result.success) {
        onClose()
        // Reset form
        setFormData({
          nombreUsuario: '',
          contrasenia: '',
          rol: 'Secretario'
        })
      } else {
        alert(result.message)
      }
    } catch (error) {
      alert('Error al procesar la solicitud')
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'create' ? 'Nuevo Usuario' : 'Editar Usuario'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="text-2xl">✕</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nombre de Usuario */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="mr-2">👤</span>
              Nombre de Usuario
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

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="mr-2">🔒</span>
              Contraseña {mode === 'edit' && '(dejar en blanco para mantener)'}
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
          </div>

          {/* Rol */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="mr-2">🛡️</span>
              Rol
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
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn btn-secondary"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 btn btn-primary"
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
                  {mode === 'create' ? 'Crear' : 'Guardar'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 