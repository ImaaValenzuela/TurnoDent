'use client'

import { useState } from 'react'
import { Edit, Trash2, Plus, Search, Loader2 } from 'lucide-react'
import { Usuario } from '@/types'
import { cn } from '@/lib/utils'
import { useUsuarios } from '@/hooks/useUsuarios'
import UsuarioForm from '@/components/UsuarioForm'

export default function UsuariosPage() {
  const { usuarios, loading, error, deleteUsuario, createUsuario, updateUsuario } = useUsuarios()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')

  const filteredUsuarios = usuarios.filter(usuario =>
    typeof usuario?.nombre_usuario === 'string' &&
    typeof usuario?.rol === 'string' &&
    (
      usuario.nombre_usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.rol.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const handleDelete = async (id: number) => {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
      setDeletingId(id)
      const result = await deleteUsuario(id)
      setDeletingId(null)
      
      if (!result.success) {
        alert(result.message)
      }
    }
  }

  const handleEdit = (usuario: Usuario) => {
    setSelectedUser(usuario)
    setFormMode('edit')
    setShowForm(true)
  }

  const handleCreate = () => {
    setSelectedUser(null)
    setFormMode('create')
    setShowForm(true)
  }

  const handleFormSubmit = async (data: any) => {
    if (formMode === 'create') {
      const result = await createUsuario(data)
      return { success: result.success, message: result.message || 'Operación completada' }
    } else {
      const result = await updateUsuario(data)
      return { success: result.success, message: result.message || 'Operación completada' }
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setSelectedUser(null)
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
          <span className="ml-2 text-gray-600">Cargando usuarios...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error al cargar usuarios</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
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
        <h1 className="text-2xl font-bold text-gray-900">Lista de Usuarios Activos</h1>
        <button 
          onClick={handleCreate}
          className="btn btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Usuario
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Usuarios ({filteredUsuarios.length})</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre de Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsuarios.map((usuario) => (
                <tr key={usuario.idUsuario} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {usuario.idUsuario}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {usuario.nombre_usuario}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={cn(
                      "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                      usuario.rol === 'Administrador' && "bg-purple-100 text-purple-800",
                      usuario.rol === 'Secretario' && "bg-blue-100 text-blue-800",
                      usuario.rol === 'Odontólogo' && "bg-green-100 text-green-800"
                    )}>
                      {usuario.rol}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(usuario)}
                        className="btn btn-secondary"
                        disabled={deletingId === usuario.idUsuario}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(usuario.idUsuario)}
                        className="btn btn-danger"
                        disabled={deletingId === usuario.idUsuario}
                      >
                        {deletingId === usuario.idUsuario ? (
                          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4 mr-1" />
                        )}
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsuarios.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              {searchTerm ? 'No se encontraron usuarios con ese criterio de búsqueda' : 'No hay usuarios registrados'}
            </p>
          </div>
        )}
      </div>

      {/* Form Modal */}
      <UsuarioForm
        usuario={selectedUser}
        isOpen={showForm}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        mode={formMode}
      />
    </div>
  )
} 