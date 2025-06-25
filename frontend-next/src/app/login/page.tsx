'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Usuario } from '@/types'

export default function LoginPage() {
  const router = useRouter()
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }))
    setError(null)
    setSuccess(null)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)
    setDebugInfo(null)

    try {
      console.log('🔄 Iniciando login...')
      
      // Usar el endpoint de login del backend
      const params = new URLSearchParams();
      params.append('usuario', credentials.username);
      params.append('contrasenia', credentials.password);

      const loginResponse = await fetch('http://localhost:8080/TurnoDent/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      })
      
      const loginData = await loginResponse.text()
      console.log('📡 Login response:', loginData)
      
      if (loginResponse.ok) {
        // Login exitoso
        const loginJson = JSON.parse(loginData)
        setSuccess(`¡Login exitoso! Bienvenido ${loginJson.usuario} (${loginJson.rol})`)
        
        // Obtener información del usuario para debug
        const usersResponse = await fetch('http://localhost:8080/TurnoDent/api/usuarios')
        const usersData = await usersResponse.json()
        
        const user = usersData.find((u: Usuario) => 
          u.nombre_usuario === credentials.username
        )
        
        setDebugInfo({
          totalUsers: usersData.length,
          currentUser: user,
          loginResponse: loginJson
        })
        
        // Simular redirección después de 2 segundos
        setTimeout(() => {
          router.push('/')
        }, 2000)
      } else {
        // Login fallido
        try {
          const errorJson = JSON.parse(loginData)
          setError(`Error de login: ${errorJson.error}`)
        } catch {
          setError(`Error de login: ${loginData}`)
        }
        
        // Mostrar información de debug
        const usersResponse = await fetch('http://localhost:8080/TurnoDent/api/usuarios')
        const usersData = await usersResponse.json()
        
        setDebugInfo({
          totalUsers: usersData.length,
          users: usersData,
          loginResponse: loginData
        })
      }

    } catch (error) {
      console.error('❌ Error en login:', error)
      setError(`Error de conexión: ${error instanceof Error ? error.message : 'Error desconocido'}`)
    } finally {
      setLoading(false)
    }
  }

  const testDatabaseConnection = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    setDebugInfo(null)

    try {
      console.log('🔄 Probando conexión con base de datos...')
      
      const response = await fetch('http://localhost:8080/TurnoDent/api/usuarios')
      const data = await response.json()
      
      if (response.ok) {
        setSuccess(`✅ Conexión exitosa! Se encontraron ${data.length} usuarios en la base de datos`)
        setDebugInfo({
          status: response.status,
          totalUsers: data.length,
          users: data
        })
      } else {
        setError(`❌ Error HTTP: ${response.status} - ${response.statusText}`)
      }
    } catch (error) {
      console.error('❌ Error de conexión:', error)
      setError(`❌ Error de conexión: ${error instanceof Error ? error.message : 'Error desconocido'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl text-white">🦷</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">TurnoDent</h2>
          <p className="mt-2 text-sm text-gray-600">Sistema de Gestión Odontológica</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Usuario
              </label>
              <input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ingrese su usuario"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ingrese su contraseña"
                required
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? '🔄 Iniciando...' : '🔐 Iniciar Sesión'}
              </button>
              
              <button
                type="button"
                onClick={testDatabaseConnection}
                disabled={loading}
                className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? '🔄' : '📊'}
              </button>
            </div>
          </form>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <span className="text-red-600 mr-2">❌</span>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex">
              <span className="text-green-600 mr-2">✅</span>
              <p className="text-sm text-green-700">{success}</p>
            </div>
          </div>
        )}

        {/* Debug Info */}
        {debugInfo && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
            <h3 className="text-sm font-medium text-gray-800 mb-2">📊 Información de Debug</h3>
            <div className="text-xs text-gray-700 space-y-1">
              <p><strong>Total usuarios:</strong> {debugInfo.totalUsers}</p>
              {debugInfo.users && debugInfo.users.length > 0 && (
                <div>
                  <p><strong>Usuarios disponibles:</strong></p>
                  <ul className="list-disc list-inside ml-2">
                    {debugInfo.users.map((user: Usuario, index: number) => (
                      <li key={index}>
                        {user.nombre_usuario} ({user.rol}) - ID: {user.idUsuario}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Access */}
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">Acceso rápido para pruebas:</p>
          <div className="space-y-1">
            <button
              onClick={() => setCredentials({ username: 'admin', password: 'admin' })}
              className="text-xs text-blue-600 hover:text-blue-800 mr-2"
            >
              Usar: admin/admin
            </button>
            <button
              onClick={() => setCredentials({ username: 'Imanol', password: 'admin' })}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Usar: Imanol/admin
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Nota: Las contraseñas están hasheadas en la BD
          </p>
        </div>
      </div>
    </div>
  )
} 