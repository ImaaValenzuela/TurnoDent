'use client'

import { useState, useEffect, useCallback } from 'react'
import { Usuario } from '@/types'
import { usuarioService, CreateUsuarioData, UpdateUsuarioData } from '@/services/usuarioService'

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar usuarios
  const loadUsuarios = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await usuarioService.getUsuarios()
      setUsuarios(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar usuarios')
    } finally {
      setLoading(false)
    }
  }, [])

  // Crear usuario
  const createUsuario = useCallback(async (data: CreateUsuarioData) => {
    try {
      setError(null)
      const response = await usuarioService.createUsuario(data)
      
      if (response.success && response.data) {
        setUsuarios(prev => [...prev, response.data!])
        return { success: true, message: response.message }
      } else {
        setError(response.error || 'Error al crear usuario')
        return { success: false, message: response.error }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear usuario'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    }
  }, [])

  // Actualizar usuario
  const updateUsuario = useCallback(async (data: UpdateUsuarioData) => {
    try {
      setError(null)
      const response = await usuarioService.updateUsuario(data)
      
      if (response.success && response.data) {
        setUsuarios(prev => 
          prev.map(usuario => 
            usuario.idUsuario === data.idUsuario ? response.data! : usuario
          )
        )
        return { success: true, message: response.message }
      } else {
        setError(response.error || 'Error al actualizar usuario')
        return { success: false, message: response.error }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar usuario'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    }
  }, [])

  // Eliminar usuario
  const deleteUsuario = useCallback(async (id: number) => {
    try {
      setError(null)
      const response = await usuarioService.deleteUsuario(id)
      
      if (response.success) {
        setUsuarios(prev => prev.filter(usuario => usuario.idUsuario !== id))
        return { success: true, message: response.message }
      } else {
        setError(response.error || 'Error al eliminar usuario')
        return { success: false, message: response.error }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar usuario'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    }
  }, [])

  // Obtener usuario por ID
  const getUsuario = useCallback(async (id: number) => {
    try {
      setError(null)
      return await usuarioService.getUsuario(id)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener usuario'
      setError(errorMessage)
      return null
    }
  }, [])

  // Cargar usuarios al montar el componente
  useEffect(() => {
    loadUsuarios()
  }, [loadUsuarios])

  return {
    usuarios,
    loading,
    error,
    loadUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuario,
    clearError: () => setError(null)
  }
} 