'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Odontologo } from '@/types'
import { odontologoService } from '@/services/odontologoService'

export default function OdontologosPage() {
  const [odontologos, setOdontologos] = useState<Odontologo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadOdontologos()
  }, [])

  const loadOdontologos = async () => {
    try {
      setLoading(true)
      const data = await odontologoService.getOdontologos()
      setOdontologos(data)
    } catch (err) {
      setError('Error al cargar los odontólogos')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Está seguro de que desea eliminar este odontólogo?')) return
    
    try {
      const response = await odontologoService.deleteOdontologo(id)
      if (response.success) {
        setOdontologos(prev => prev.filter(od => od.idOdontologo !== id))
      } else {
        alert(response.error || 'Error al eliminar el odontólogo')
      }
    } catch (err) {
      alert('Error al eliminar el odontólogo')
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <span className="text-4xl animate-spin">⏳</span>
            <p className="mt-4 text-gray-600">Cargando odontólogos...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <span className="text-2xl mr-3">❌</span>
            <div>
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Odontólogos</h1>
          <p className="text-gray-600">Gestiona los odontólogos del sistema</p>
        </div>
        <Link
          href="/odontologos/nuevo"
          className="btn btn-primary"
        >
          <span className="mr-2">👨‍⚕️</span>
          Nuevo Odontólogo
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">👨‍⚕️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Odontólogos</p>
              <p className="text-2xl font-bold text-gray-900">{odontologos.length}</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Activos</p>
              <p className="text-2xl font-bold text-gray-900">{odontologos.length}</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
            <span className="text-2xl">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Especialidades</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(odontologos.map(od => od.especialidad)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Odontólogo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Matrícula
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Especialidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {odontologos.map((odontologo) => (
                <tr key={odontologo.idOdontologo} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {odontologo.persona?.nombre.charAt(0)}{odontologo.persona?.apellido.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {odontologo.persona?.nombre} {odontologo.persona?.apellido}
                        </div>
                        <div className="text-sm text-gray-500">
                          DNI: {odontologo.persona?.dni}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {odontologo.matricula}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {odontologo.especialidad}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{odontologo.persona?.telefono}</div>
                    <div className="text-sm text-gray-500">{odontologo.persona?.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        href={`/odontologos/editar/${odontologo.idOdontologo}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <span className="mr-1">✏️</span>
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(odontologo.idOdontologo)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <span className="mr-1">🗑️</span>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {odontologos.length === 0 && (
        <div className="text-center py-12">
          <span className="text-6xl mb-4 block">👨‍⚕️</span>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay odontólogos registrados</h3>
          <p className="text-gray-600 mb-6">Comienza agregando el primer odontólogo al sistema</p>
          <Link href="/odontologos/nuevo" className="btn btn-primary">
            <span className="mr-2">👨‍⚕️</span>
            Agregar Odontólogo
          </Link>
        </div>
      )}
    </div>
  )
} 