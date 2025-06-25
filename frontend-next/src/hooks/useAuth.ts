'use client'

import { useState, useEffect, useCallback } from 'react'
import { LoginCredentials } from '@/types'
import { LoginResponse } from '@/services/usuarioService'
import { usuarioService } from '@/services/usuarioService'

export function useAuth() {
  const [user, setUser] = useState<LoginResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Verificar sesión al cargar
  const checkSession = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await usuarioService.checkSession()
      
      if (response.success && response.data) {
        setUser(response.data)
      } else {
        setUser(null)
      }
    } catch (err) {
      setUser(null)
      setError(err instanceof Error ? err.message : 'Error al verificar sesión')
    } finally {
      setLoading(false)
    }
  }, [])

  // Login
  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setLoading(true)
      setError(null)
      const response = await usuarioService.login(credentials)
      
      if (response.success && response.data) {
        setUser(response.data)
        return { success: true, message: response.message }
      } else {
        setError(response.error || 'Error en el login')
        return { success: false, message: response.error }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error en el login'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  // Logout
  const logout = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await usuarioService.logout()
      
      if (response.success) {
        setUser(null)
        return { success: true, message: response.message }
      } else {
        setError(response.error || 'Error en el logout')
        return { success: false, message: response.error }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error en el logout'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  // Verificar si el usuario está autenticado
  const isAuthenticated = useCallback(() => {
    return user !== null && user.success === true
  }, [user])

  // Verificar si el usuario tiene un rol específico
  const hasRole = useCallback((role: string) => {
    return user?.rol === role
  }, [user])

  // Verificar sesión al montar el componente
  useEffect(() => {
    checkSession()
  }, [checkSession])

  return {
    user,
    loading,
    error,
    login,
    logout,
    checkSession,
    isAuthenticated,
    hasRole,
    clearError: () => setError(null)
  }
} 