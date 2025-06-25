'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Paciente } from '@/types'
import { pacienteService } from '@/services/pacienteService'

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadPacientes()
  }, [])

  const loadPacientes = async () => {
    try {
      setLoading(true)
      const data = await pacienteService.getPacientes()
      setPacientes(data)
    } catch (err) {
      setError('Error al cargar los pacientes')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Está seguro de que desea eliminar este paciente?')) return
    
    try {
      const response = await pacienteService.deletePaciente(id)
      if (response.success) {
        setPacientes(prev => prev.filter(p => p.idPaciente !== id))
      } else {
        alert(response.error || 'Error al eliminar el paciente')
      }
    } catch (err) {
      alert('Error al eliminar el paciente')
    }
  }

  const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    
    return age
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <span className="text-4xl animate-spin">⏳</span>
            <p className="mt-4 text-gray-600">Cargando pacientes...</p>
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
          <h1 className="text-2xl font-bold text-gray-900">Pacientes</h1>
          <p className="text-gray-600">Gestiona los pacientes del sistema</p>
        </div>
        <Link
          href="/pacientes/nuevo"
          className="btn btn-primary"
        >
          <span className="mr-2">👥</span>
          Nuevo Paciente
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="card p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Pacientes</p>
              <p className="text-2xl font-bold text-gray-900">{pacientes.length}</p>
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
              <p className="text-2xl font-bold text-gray-900">{pacientes.length}</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">🩸</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Grupos Sanguíneos</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(pacientes.map(p => p.grupoSanguineo)).size}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Con Alergias</p>
              <p className="text-2xl font-bold text-gray-900">
                {pacientes.filter(p => p.alergias && p.alergias !== 'Ninguna').length}
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
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Edad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grupo Sanguíneo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alergias
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
              {pacientes.map((paciente) => (
                <tr key={paciente.idPaciente} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-green-600">
                            {paciente.persona?.nombre.charAt(0)}{paciente.persona?.apellido.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {paciente.persona?.nombre} {paciente.persona?.apellido}
                        </div>
                        <div className="text-sm text-gray-500">
                          DNI: {paciente.persona?.dni}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {calculateAge(paciente.fechaNacimiento)} años
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      paciente.grupoSanguineo.includes('+') 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {paciente.grupoSanguineo}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {paciente.alergias === 'Ninguna' ? (
                      <span className="text-green-600">Sin alergias</span>
                    ) : (
                      <span className="text-orange-600">{paciente.alergias}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{paciente.persona?.telefono}</div>
                    <div className="text-sm text-gray-500">{paciente.persona?.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        href={`/pacientes/editar/${paciente.idPaciente}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <span className="mr-1">✏️</span>
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(paciente.idPaciente)}
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

      {pacientes.length === 0 && (
        <div className="text-center py-12">
          <span className="text-6xl mb-4 block">👥</span>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay pacientes registrados</h3>
          <p className="text-gray-600 mb-6">Comienza agregando el primer paciente al sistema</p>
          <Link href="/pacientes/nuevo" className="btn btn-primary">
            <span className="mr-2">👥</span>
            Agregar Paciente
          </Link>
        </div>
      )}
    </div>
  )
} 