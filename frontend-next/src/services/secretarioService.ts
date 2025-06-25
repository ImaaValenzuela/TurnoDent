import { apiService } from './api'
import { Secretario, ApiResponse } from '@/types'

export interface CreateSecretarioData {
  nombre: string
  apellido: string
  dni: string
  telefono: string
  email: string
  direccion: string
  sector: string
}

export interface UpdateSecretarioData {
  idSecretario: number
  nombre: string
  apellido: string
  dni: string
  telefono: string
  email: string
  direccion: string
  sector: string
}

class SecretarioService {
  // Obtener todos los secretarios
  async getSecretarios(): Promise<Secretario[]> {
    try {
      const response = await apiService.get<Secretario[]>('/api/secretarios')
      return response
    } catch (error) {
      console.error('Error fetching secretarios:', error)
      return []
    }
  }

  // Obtener un secretario por ID
  async getSecretario(id: number): Promise<Secretario | null> {
    try {
      const response = await apiService.get<Secretario>(`/api/secretarios/${id}`)
      return response
    } catch (error) {
      console.error('Error fetching secretario:', error)
      return null
    }
  }

  // Crear un nuevo secretario
  async createSecretario(data: CreateSecretarioData): Promise<ApiResponse<Secretario>> {
    try {
      const formData = new FormData()
      formData.append('nombre', data.nombre)
      formData.append('apellido', data.apellido)
      formData.append('dni', data.dni)
      formData.append('telefono', data.telefono)
      formData.append('email', data.email)
      formData.append('direccion', data.direccion)
      formData.append('sector', data.sector)

      const response = await apiService.postForm<{ message: string }>('/api/secretarios', formData)
      
      const secretarioId = Date.now()
      return {
        success: true,
        message: response.message || 'Secretario creado exitosamente',
        data: {
          idSecretario: secretarioId,
          idPersona: secretarioId,
          nombre: data.nombre,
          apellido: data.apellido,
          dni: data.dni,
          telefono: data.telefono,
          email: data.email,
          direccion: data.direccion,
          sector: data.sector
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al crear secretario'
      }
    }
  }

  // Actualizar un secretario
  async updateSecretario(data: UpdateSecretarioData): Promise<ApiResponse<Secretario>> {
    try {
      const formData = new FormData()
      formData.append('id', data.idSecretario.toString())
      formData.append('nombre', data.nombre)
      formData.append('apellido', data.apellido)
      formData.append('dni', data.dni)
      formData.append('telefono', data.telefono)
      formData.append('email', data.email)
      formData.append('direccion', data.direccion)
      formData.append('sector', data.sector)

      const response = await apiService.postForm<{ message: string }>('/api/secretarios', formData)
      
      return {
        success: true,
        message: response.message || 'Secretario actualizado exitosamente',
        data: {
          idSecretario: data.idSecretario,
          idPersona: data.idSecretario,
          nombre: data.nombre,
          apellido: data.apellido,
          dni: data.dni,
          telefono: data.telefono,
          email: data.email,
          direccion: data.direccion,
          sector: data.sector
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al actualizar secretario'
      }
    }
  }

  // Eliminar un secretario
  async deleteSecretario(id: number): Promise<ApiResponse<void>> {
    try {
      const formData = new FormData()
      formData.append('id', id.toString())

      const response = await apiService.postForm<{ message: string }>('/api/secretarios', formData)
      
      return {
        success: true,
        message: response.message || 'Secretario eliminado exitosamente'
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al eliminar secretario'
      }
    }
  }

  // Buscar secretarios por nombre
  async getSecretariosByNombre(nombre: string): Promise<Secretario[]> {
    try {
      const secretarios = await this.getSecretarios()
      return secretarios.filter(s => 
        s.nombre.toLowerCase().includes(nombre.toLowerCase()) ||
        s.apellido.toLowerCase().includes(nombre.toLowerCase())
      )
    } catch (error) {
      console.error('Error fetching secretarios por nombre:', error)
      return []
    }
  }

  // Buscar secretarios por DNI
  async getSecretariosByDNI(dni: string): Promise<Secretario[]> {
    try {
      const secretarios = await this.getSecretarios()
      return secretarios.filter(s => s.dni.includes(dni))
    } catch (error) {
      console.error('Error fetching secretarios por DNI:', error)
      return []
    }
  }

  // Buscar secretarios por sector
  async getSecretariosBySector(sector: string): Promise<Secretario[]> {
    try {
      const secretarios = await this.getSecretarios()
      return secretarios.filter(s => s.sector.toLowerCase().includes(sector.toLowerCase()))
    } catch (error) {
      console.error('Error fetching secretarios por sector:', error)
      return []
    }
  }
}

export const secretarioService = new SecretarioService() 