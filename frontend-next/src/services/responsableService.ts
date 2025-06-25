import { apiService } from './api'
import { Responsable, ApiResponse } from '@/types'

export interface CreateResponsableData {
  nombre: string
  apellido: string
  dni: string
  telefono: string
  email: string
  direccion: string
  parentesco: string
}

export interface UpdateResponsableData {
  idResponsable: number
  nombre: string
  apellido: string
  dni: string
  telefono: string
  email: string
  direccion: string
  parentesco: string
}

class ResponsableService {
  // Obtener todos los responsables
  async getResponsables(): Promise<Responsable[]> {
    try {
      const response = await apiService.get<Responsable[]>('/api/responsables')
      return response
    } catch (error) {
      console.error('Error fetching responsables:', error)
      return []
    }
  }

  // Obtener un responsable por ID
  async getResponsable(id: number): Promise<Responsable | null> {
    try {
      const response = await apiService.get<Responsable>(`/api/responsables/${id}`)
      return response
    } catch (error) {
      console.error('Error fetching responsable:', error)
      return null
    }
  }

  // Crear un nuevo responsable
  async createResponsable(data: CreateResponsableData): Promise<ApiResponse<Responsable>> {
    try {
      const formData = new FormData()
      formData.append('nombre', data.nombre)
      formData.append('apellido', data.apellido)
      formData.append('dni', data.dni)
      formData.append('telefono', data.telefono)
      formData.append('email', data.email)
      formData.append('direccion', data.direccion)
      formData.append('parentesco', data.parentesco)

      const response = await apiService.postForm<{ message: string }>('/api/responsables', formData)
      
      const responsableId = Date.now()
      return {
        success: true,
        message: response.message || 'Responsable creado exitosamente',
        data: {
          idResponsable: responsableId,
          idPersona: responsableId,
          nombre: data.nombre,
          apellido: data.apellido,
          dni: data.dni,
          telefono: data.telefono,
          email: data.email,
          direccion: data.direccion,
          parentesco: data.parentesco
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al crear responsable'
      }
    }
  }

  // Actualizar un responsable
  async updateResponsable(data: UpdateResponsableData): Promise<ApiResponse<Responsable>> {
    try {
      const formData = new FormData()
      formData.append('id', data.idResponsable.toString())
      formData.append('nombre', data.nombre)
      formData.append('apellido', data.apellido)
      formData.append('dni', data.dni)
      formData.append('telefono', data.telefono)
      formData.append('email', data.email)
      formData.append('direccion', data.direccion)
      formData.append('parentesco', data.parentesco)

      const response = await apiService.postForm<{ message: string }>('/api/responsables', formData)
      
      return {
        success: true,
        message: response.message || 'Responsable actualizado exitosamente',
        data: {
          idResponsable: data.idResponsable,
          idPersona: data.idResponsable,
          nombre: data.nombre,
          apellido: data.apellido,
          dni: data.dni,
          telefono: data.telefono,
          email: data.email,
          direccion: data.direccion,
          parentesco: data.parentesco
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al actualizar responsable'
      }
    }
  }

  // Eliminar un responsable
  async deleteResponsable(id: number): Promise<ApiResponse<void>> {
    try {
      const formData = new FormData()
      formData.append('id', id.toString())

      const response = await apiService.postForm<{ message: string }>('/api/responsables', formData)
      
      return {
        success: true,
        message: response.message || 'Responsable eliminado exitosamente'
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al eliminar responsable'
      }
    }
  }

  // Buscar responsables por nombre
  async getResponsablesByNombre(nombre: string): Promise<Responsable[]> {
    try {
      const responsables = await this.getResponsables()
      return responsables.filter(r => 
        r.nombre.toLowerCase().includes(nombre.toLowerCase()) ||
        r.apellido.toLowerCase().includes(nombre.toLowerCase())
      )
    } catch (error) {
      console.error('Error fetching responsables por nombre:', error)
      return []
    }
  }

  // Buscar responsables por DNI
  async getResponsablesByDNI(dni: string): Promise<Responsable[]> {
    try {
      const responsables = await this.getResponsables()
      return responsables.filter(r => r.dni.includes(dni))
    } catch (error) {
      console.error('Error fetching responsables por DNI:', error)
      return []
    }
  }

  // Buscar responsables por parentesco
  async getResponsablesByParentesco(parentesco: string): Promise<Responsable[]> {
    try {
      const responsables = await this.getResponsables()
      return responsables.filter(r => r.parentesco.toLowerCase().includes(parentesco.toLowerCase()))
    } catch (error) {
      console.error('Error fetching responsables por parentesco:', error)
      return []
    }
  }
}

export const responsableService = new ResponsableService() 