'use client'

import { useState } from 'react'
import { Usuario } from '@/types'

export default function DatabaseTest() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rawResponse, setRawResponse] = useState<string>('')
  const [testResults, setTestResults] = useState<any[]>([])

  const addTestResult = (test: string, success: boolean, details: string) => {
    setTestResults(prev => [...prev, { test, success, details, timestamp: new Date().toISOString() }])
  }

  const testBackendConnection = async () => {
    setLoading(true)
    setError(null)
    setRawResponse('')
    setTestResults([])
    
    try {
      console.log('🔄 Iniciando pruebas de conexión...')
      
      // Test 1: Verificar si el servidor responde
      addTestResult('Servidor Backend', false, 'Probando...')
      const response = await fetch('http://localhost:8080/TurnoDent/api/usuarios')
      const responseText = await response.text()
      
      if (response.ok) {
        addTestResult('Servidor Backend', true, `Status: ${response.status}`)
      } else {
        addTestResult('Servidor Backend', false, `Error: ${response.status} - ${response.statusText}`)
        setError(`Error HTTP: ${response.status} - ${response.statusText}`)
        return
      }
      
      // Test 2: Verificar formato de respuesta
      addTestResult('Formato JSON', false, 'Probando...')
      let data
      try {
        data = JSON.parse(responseText)
        addTestResult('Formato JSON', true, 'Respuesta válida')
      } catch (parseError) {
        addTestResult('Formato JSON', false, `Error parseando: ${parseError}`)
        setError('Error parseando la respuesta JSON')
        return
      }
      
      // Test 3: Verificar estructura de datos
      addTestResult('Estructura de Datos', false, 'Probando...')
      if (Array.isArray(data)) {
        addTestResult('Estructura de Datos', true, `Array con ${data.length} elementos`)
        
        if (data.length > 0) {
          const firstUser = data[0]
          const hasRequiredFields = firstUser.idUsuario && firstUser.nombre_usuario && firstUser.rol
          
          if (hasRequiredFields) {
            addTestResult('Campos Requeridos', true, 'Todos los campos presentes')
            setUsuarios(data)
          } else {
            addTestResult('Campos Requeridos', false, 'Faltan campos requeridos')
            setError('Los datos no tienen la estructura esperada')
          }
        } else {
          addTestResult('Datos en BD', false, 'No hay usuarios en la base de datos')
          setUsuarios([])
        }
      } else {
        addTestResult('Estructura de Datos', false, 'No es un array')
        setError('La respuesta no es un array de usuarios')
      }
      
      setRawResponse(`Status: ${response.status}\nHeaders: ${JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2)}\nResponse: ${responseText}`)
      
    } catch (fetchError) {
      console.error('❌ Error de conexión:', fetchError)
      addTestResult('Conexión', false, `Error: ${fetchError instanceof Error ? fetchError.message : 'Error desconocido'}`)
      setError(`Error de conexión: ${fetchError instanceof Error ? fetchError.message : 'Error desconocido'}`)
    } finally {
      setLoading(false)
    }
  }

  const testCreateUsuario = async () => {
    setLoading(true)
    setError(null)
    
    try {
      console.log('🔄 Probando crear usuario...')
      
      const formData = new FormData()
      formData.append('nombreUsuario', 'test_user_' + Date.now())
      formData.append('contrasenia', 'test123')
      formData.append('rol', 'Secretario')
      
      const response = await fetch('http://localhost:8080/TurnoDent/api/usuarios', {
        method: 'POST',
        body: formData
      })
      
      const responseText = await response.text()
      console.log('📡 Create Status:', response.status)
      console.log('📡 Create Response:', responseText)
      
      if (response.ok) {
        addTestResult('Crear Usuario', true, 'Usuario creado exitosamente')
        alert('Usuario creado exitosamente')
        // Recargar la lista
        testBackendConnection()
      } else {
        addTestResult('Crear Usuario', false, `Error: ${response.status} - ${responseText}`)
        setError(`Error creando usuario: ${response.status} - ${responseText}`)
      }
    } catch (error) {
      console.error('❌ Error creando usuario:', error)
      addTestResult('Crear Usuario', false, `Error: ${error instanceof Error ? error.message : 'Error desconocido'}`)
      setError(`Error creando usuario: ${error instanceof Error ? error.message : 'Error desconocido'}`)
    } finally {
      setLoading(false)
    }
  }

  const clearResults = () => {
    setTestResults([])
    setError(null)
    setRawResponse('')
    setUsuarios([])
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🔧 Diagnóstico Completo de Base de Datos</h1>
      
      <div className="space-y-4 mb-6">
        <button 
          onClick={testBackendConnection}
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? '🔄 Probando...' : '📡 Ejecutar Diagnóstico Completo'}
        </button>
        
        <button 
          onClick={testCreateUsuario}
          disabled={loading}
          className="btn btn-secondary ml-2"
        >
          {loading ? '🔄 Creando...' : '➕ Crear Usuario de Prueba'}
        </button>

        <button 
          onClick={clearResults}
          className="btn btn-outline ml-2"
        >
          🗑️ Limpiar Resultados
        </button>
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="card mb-6">
          <h2 className="text-lg font-semibold mb-4">📊 Resultados de Pruebas</h2>
          <div className="space-y-2">
            {testResults.map((result, index) => (
              <div key={index} className={`p-3 rounded-md border ${
                result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center">
                  <span className={`text-lg mr-2 ${result.success ? 'text-green-600' : 'text-red-600'}`}>
                    {result.success ? '✅' : '❌'}
                  </span>
                  <div>
                    <h3 className={`font-medium ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                      {result.test}
                    </h3>
                    <p className={`text-sm ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                      {result.details}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(result.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
          <h3 className="text-sm font-medium text-red-800">❌ Error</h3>
          <p className="text-sm text-red-700 mt-1">{error}</p>
        </div>
      )}

      {rawResponse && (
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
          <h3 className="text-sm font-medium text-gray-800 mb-2">📡 Respuesta del Backend</h3>
          <pre className="text-xs text-gray-700 whitespace-pre-wrap overflow-auto max-h-64">
            {rawResponse}
          </pre>
        </div>
      )}

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">👥 Usuarios en Base de Datos ({usuarios.length})</h2>
        
        {usuarios.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Persona</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {usuarios.map((usuario, index) => (
                  <tr key={usuario.idUsuario || index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {usuario.idUsuario}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {usuario.nombre_usuario || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {usuario.rol || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {usuario.idPersona || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No hay usuarios para mostrar</p>
          </div>
        )}
      </div>
    </div>
  )
} 