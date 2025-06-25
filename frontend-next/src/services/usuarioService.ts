import { apiService } from './api'
import { Usuario, LoginCredentials, ApiResponse } from '@/types'

export interface CreateUsuarioData {
  nombreUsuario: string
  contrasenia: string
  rol: string
}

export interface UpdateUsuarioData {
  idUsuario: number
  nombreUsuario: string
  contrasenia?: string
  rol: string
}

export interface LoginResponse {
  success: boolean
  message: string
  usuario?: string
  rol?: string
  id?: number
  session_id?: string
}

class UsuarioService {
  // Obtener todos los usuarios
  async getUsuarios(): Promise<Usuario[]> {
    try {
      const response = await apiService.get<Usuario[]>('/api/usuarios')
      return response
    } catch (error) {
      console.error('Error fetching usuarios:', error)
      return []
    }
  }

  // Obtener un usuario por ID
  async getUsuario(id: number): Promise<Usuario | null> {
    try {
      const response = await apiService.get<Usuario>(`/api/usuarios/${id}`)
      return response
    } catch (error) {
      console.error('Error fetching usuario:', error)
      return null
    }
  }

  // Crear un nuevo usuario
  async createUsuario(data: CreateUsuarioData): Promise<ApiResponse<Usuario>> {
    try {
      const formData = new FormData()
      formData.append('nombreUsuario', data.nombreUsuario)
      formData.append('contrasenia', data.contrasenia)
      formData.append('rol', data.rol)

      const response = await apiService.postForm<{ message: string }>('/api/usuarios', formData)
      
      return {
        success: true,
        message: response.message || 'Usuario creado exitosamente',
        data: {
          idUsuario: Date.now(), // ID temporal
          nombre_usuario: data.nombreUsuario,
          contrasenia: '****',
          rol: data.rol,
          idPersona: 0
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al crear usuario'
      }
    }
  }

  // Actualizar un usuario
  async updateUsuario(data: UpdateUsuarioData): Promise<ApiResponse<Usuario>> {
    try {
      const formData = new FormData()
      formData.append('idUsuario', data.idUsuario.toString())
      formData.append('nombreUsuario', data.nombreUsuario)
      if (data.contrasenia) {
        formData.append('contrasenia', data.contrasenia)
      }
      formData.append('rol', data.rol)

      const response = await apiService.postForm<{ message: string }>('/api/usuarios', formData)
      
      return {
        success: true,
        message: response.message || 'Usuario actualizado exitosamente',
        data: {
          idUsuario: data.idUsuario,
          nombre_usuario: data.nombreUsuario,
          contrasenia: '****',
          rol: data.rol,
          idPersona: 0
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al actualizar usuario'
      }
    }
  }

  // Eliminar un usuario
  async deleteUsuario(id: number): Promise<ApiResponse<void>> {
    try {
      const formData = new FormData()
      formData.append('id', id.toString())

      const response = await apiService.postForm<{ message: string }>('/api/usuarios', formData)
      
      return {
        success: true,
        message: response.message || 'Usuario eliminado exitosamente'
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al eliminar usuario'
      }
    }
  }

  // Login de usuario usando el nuevo endpoint REST
  async login(credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
    try {
      const formData = new FormData()
      formData.append('usuario', credentials.username)
      formData.append('contrasenia', credentials.password)

      const response = await apiService.postForm<LoginResponse>('/api/login', formData)
      
      return {
        success: true,
        message: response.message || 'Login exitoso',
        data: response
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error en el login'
      }
    }
  }

  // Verificar estado de sesión
  async checkSession(): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await apiService.get<LoginResponse>('/api/login')
      
      return {
        success: true,
        message: 'Sesión verificada',
        data: response
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al verificar sesión'
      }
    }
  }

  // Logout
  async logout(): Promise<ApiResponse<void>> {
    try {
      const response = await apiService.delete<{ message: string }>('/api/login')
      
      return {
        success: true,
        message: response.message || 'Logout exitoso'
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error en el logout'
      }
    }
  }
}

export const usuarioService = new UsuarioService() 