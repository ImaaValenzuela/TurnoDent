'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CreateOdontologoData } from '@/types'
import { odontologoService } from '@/services/odontologoService'

export default function NuevoOdontologoPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<CreateOdontologoData>({
    matricula: '',
    especialidad: '',
    persona: {
      nombre: '',
      apellido: '',
      dni: '',
      telefono: '',
      email: '',
      direccion: ''
    }
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validar matrícula
    if (!formData.matricula.trim()) {
      newErrors.matricula = 'La matrícula es requerida'
    }

    // Validar especialidad
    if (!formData.especialidad.trim()) {
      newErrors.especialidad = 'La especialidad es requerida'
    }

    // Validar datos de persona
    if (!formData.persona.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido'
    }

    if (!formData.persona.apellido.trim()) {
      newErrors.apellido = 'El apellido es requerido'
    }

    if (!formData.persona.dni.trim()) {
      newErrors.dni = 'El DNI es requerido'
    } else if (!/^\d{8}$/.test(formData.persona.dni)) {
      newErrors.dni = 'El DNI debe tener 8 dígitos'
    }

    if (!formData.persona.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido'
    }

    if (!formData.persona.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.persona.email)) {
      newErrors.email = 'El email no es válido'
    }

    if (!formData.persona.direccion.trim()) {
      newErrors.direccion = 'La dirección es requerida'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    try {
      const response = await odontologoService.createOdontologo(formData)
      if (response.success) {
        alert('Odontólogo creado exitosamente')
        router.push('/odontologos')
      } else {
        alert(response.error || 'Error al crear el odontólogo')
      }
    } catch (error) {
      alert('Error al crear el odontólogo')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
    
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
          <h1 className="text-2xl font-bold text-gray-900">Nuevo Odontólogo</h1>
          <p className="text-gray-600">Registra un nuevo odontólogo en el sistema</p>
        </div>
        <Link href="/odontologos" className="btn btn-secondary">
          <span className="mr-2">←</span>
          Volver
        </Link>
      </div>

      {/* Form */}
      <div className="card max-w-4xl">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Información Profesional */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              <span className="mr-2">👨‍⚕️</span>
              Información Profesional
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Matrícula *
                </label>
                <input
                  type="text"
                  value={formData.matricula}
                  onChange={(e) => handleChange('matricula', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.matricula ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ej: MAT001"
                />
                {errors.matricula && (
                  <p className="mt-1 text-sm text-red-600">{errors.matricula}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Especialidad *
                </label>
                <select
                  value={formData.especialidad}
                  onChange={(e) => handleChange('especialidad', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.especialidad ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Seleccionar especialidad</option>
                  <option value="Ortodoncia">Ortodoncia</option>
                  <option value="Endodoncia">Endodoncia</option>
                  <option value="Periodoncia">Periodoncia</option>
                  <option value="Cirugía Oral">Cirugía Oral</option>
                  <option value="Odontopediatría">Odontopediatría</option>
                  <option value="Prótesis">Prótesis</option>
                  <option value="Implantología">Implantología</option>
                  <option value="Estética Dental">Estética Dental</option>
                </select>
                {errors.especialidad && (
                  <p className="mt-1 text-sm text-red-600">{errors.especialidad}</p>
                )}
              </div>
            </div>
          </div>

          {/* Información Personal */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              <span className="mr-2">👤</span>
              Información Personal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  value={formData.persona.nombre}
                  onChange={(e) => handleChange('persona.nombre', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.nombre ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nombre"
                />
                {errors.nombre && (
                  <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apellido *
                </label>
                <input
                  type="text"
                  value={formData.persona.apellido}
                  onChange={(e) => handleChange('persona.apellido', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.apellido ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Apellido"
                />
                {errors.apellido && (
                  <p className="mt-1 text-sm text-red-600">{errors.apellido}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DNI *
                </label>
                <input
                  type="text"
                  value={formData.persona.dni}
                  onChange={(e) => handleChange('persona.dni', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.dni ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="12345678"
                  maxLength={8}
                />
                {errors.dni && (
                  <p className="mt-1 text-sm text-red-600">{errors.dni}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  value={formData.persona.telefono}
                  onChange={(e) => handleChange('persona.telefono', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.telefono ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="123456789"
                />
                {errors.telefono && (
                  <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.persona.email}
                  onChange={(e) => handleChange('persona.email', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="odontologo@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección *
                </label>
                <input
                  type="text"
                  value={formData.persona.direccion}
                  onChange={(e) => handleChange('persona.direccion', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.direccion ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Av. Principal 123, Ciudad"
                />
                {errors.direccion && (
                  <p className="mt-1 text-sm text-red-600">{errors.direccion}</p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Link href="/odontologos" className="btn btn-secondary">
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
                  Guardar Odontólogo
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 