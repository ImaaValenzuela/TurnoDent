'use client'

import { useState, useEffect, useCallback } from 'react'
import { Odontologo } from '@/types'
import { odontologoService } from '@/services/odontologoService'

export function useOdontologos() {
  const [odontologos, setOdontologos] = useState<Odontologo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar odontólogos
  const loadOdontologos = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await odontologoService.getOdontologos()
      setOdontologos(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar odontólogos')
    } finally {
      setLoading(false)
    }
  }, [])

  // Crear odontólogo
  const createOdontologo = useCallback(async (data: any) => {
    try {
      setError(null)
      const response = await odontologoService.createOdontologo(data)
      
      if (response.success && response.data) {
        setOdontologos(prev => [...prev, response.data!])
        return { success: true, message: response.message }
      } else {
        setError(response.error || 'Error al crear odontólogo')
        return { success: false, message: response.error }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear odontólogo'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    }
  }, [])

  // Actualizar odontólogo
  const updateOdontologo = useCallback(async (data: any) => {
    try {
      setError(null)
      const response = await odontologoService.updateOdontologo(data)
      
      if (response.success && response.data) {
        setOdontologos(prev => 
          prev.map(odontologo => 
            odontologo.idOdontologo === data.idOdontologo ? response.data! : odontologo
          )
        )
        return { success: true, message: response.message }
      } else {
        setError(response.error || 'Error al actualizar odontólogo')
        return { success: false, message: response.error }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar odontólogo'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    }
  }, [])

  // Eliminar odontólogo
  const deleteOdontologo = useCallback(async (id: number) => {
    try {
      setError(null)
      const response = await odontologoService.deleteOdontologo(id)
      
      if (response.success) {
        setOdontologos(prev => prev.filter(odontologo => odontologo.idOdontologo !== id))
        return { success: true, message: response.message }
      } else {
        setError(response.error || 'Error al eliminar odontólogo')
        return { success: false, message: response.error }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar odontólogo'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    }
  }, [])

  // Obtener odontólogo por ID
  const getOdontologo = useCallback(async (id: number) => {
    try {
      setError(null)
      return await odontologoService.getOdontologo(id)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener odontólogo'
      setError(errorMessage)
      return null
    }
  }, [])

  // Cargar odontólogos al montar el componente
  useEffect(() => {
    loadOdontologos()
  }, [loadOdontologos])

  return {
    odontologos,
    loading,
    error,
    loadOdontologos,
    createOdontologo,
    updateOdontologo,
    deleteOdontologo,
    getOdontologo,
    clearError: () => setError(null)
  }
} 