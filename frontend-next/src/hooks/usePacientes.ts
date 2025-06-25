'use client'

import { useState, useEffect, useCallback } from 'react'
import { Paciente } from '@/types'
import { pacienteService } from '@/services/pacienteService'

export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar pacientes
  const loadPacientes = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await pacienteService.getPacientes()
      setPacientes(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar pacientes')
    } finally {
      setLoading(false)
    }
  }, [])

  // Crear paciente
  const createPaciente = useCallback(async (data: any) => {
    try {
      setError(null)
      const response = await pacienteService.createPaciente(data)
      
      if (response.success && response.data) {
        setPacientes(prev => [...prev, response.data!])
        return { success: true, message: response.message }
      } else {
        setError(response.error || 'Error al crear paciente')
        return { success: false, message: response.error }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear paciente'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    }
  }, [])

  // Actualizar paciente
  const updatePaciente = useCallback(async (data: any) => {
    try {
      setError(null)
      const response = await pacienteService.updatePaciente(data)
      
      if (response.success && response.data) {
        setPacientes(prev => 
          prev.map(paciente => 
            paciente.idPaciente === data.idPaciente ? response.data! : paciente
          )
        )
        return { success: true, message: response.message }
      } else {
        setError(response.error || 'Error al actualizar paciente')
        return { success: false, message: response.error }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar paciente'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    }
  }, [])

  // Eliminar paciente
  const deletePaciente = useCallback(async (id: number) => {
    try {
      setError(null)
      const response = await pacienteService.deletePaciente(id)
      
      if (response.success) {
        setPacientes(prev => prev.filter(paciente => paciente.idPaciente !== id))
        return { success: true, message: response.message }
      } else {
        setError(response.error || 'Error al eliminar paciente')
        return { success: false, message: response.error }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar paciente'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    }
  }, [])

  // Obtener paciente por ID
  const getPaciente = useCallback(async (id: number) => {
    try {
      setError(null)
      return await pacienteService.getPaciente(id)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener paciente'
      setError(errorMessage)
      return null
    }
  }, [])

  // Cargar pacientes al montar el componente
  useEffect(() => {
    loadPacientes()
  }, [loadPacientes])

  return {
    pacientes,
    loading,
    error,
    loadPacientes,
    createPaciente,
    updatePaciente,
    deletePaciente,
    getPaciente,
    clearError: () => setError(null)
  }
} 