import { apiService } from './api'
import { Odontologo, CreateOdontologoData, UpdateOdontologoData, ApiResponse } from '@/types'

class OdontologoService {
  // Obtener todos los odontólogos
  async getOdontologos(): Promise<Odontologo[]> {
    try {
      const response = await apiService.get<Odontologo[]>('/api/odontologos')
      return response
    } catch (error) {
      console.error('Error fetching odontologos:', error)
      return []
    }
  }

  // Obtener un odontólogo por ID
  async getOdontologo(id: number): Promise<Odontologo | null> {
    try {
      const response = await apiService.get<Odontologo>(`/api/odontologos/${id}`)
      return response
    } catch (error) {
      console.error('Error fetching odontologo:', error)
      return null
    }
  }

  // Crear un nuevo odontólogo
  async createOdontologo(data: CreateOdontologoData): Promise<ApiResponse<Odontologo>> {
    try {
      const formData = new FormData()
      formData.append('dni', data.persona.dni)
      formData.append('nombre', data.persona.nombre)
      formData.append('apellido', data.persona.apellido)
      formData.append('telefono', data.persona.telefono)
      formData.append('direccion', data.persona.direccion)
      formData.append('especialidad', data.especialidad)

      const response = await apiService.postForm<{ message: string }>('/api/odontologos', formData)
      
      const personaId = Date.now()
      return {
        success: true,
        message: response.message || 'Odontólogo creado exitosamente',
        data: {
          idOdontologo: personaId,
          matricula: data.especialidad, // Temporal
          especialidad: data.especialidad,
          idPersona: personaId,
          persona: {
            ...data.persona,
            idPersona: personaId
          }
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al crear odontólogo'
      }
    }
  }

  // Actualizar un odontólogo
  async updateOdontologo(data: UpdateOdontologoData): Promise<ApiResponse<Odontologo>> {
    try {
      const formData = new FormData()
      formData.append('id', data.idOdontologo.toString())
      formData.append('dni', data.persona.dni)
      formData.append('nombre', data.persona.nombre)
      formData.append('apellido', data.persona.apellido)
      formData.append('telefono', data.persona.telefono)
      formData.append('direccion', data.persona.direccion)
      formData.append('especialidad', data.especialidad)

      const response = await apiService.postForm<{ message: string }>('/api/odontologos', formData)
      
      return {
        success: true,
        message: response.message || 'Odontólogo actualizado exitosamente',
        data: {
          idOdontologo: data.idOdontologo,
          matricula: data.especialidad, // Temporal
          especialidad: data.especialidad,
          idPersona: data.idOdontologo,
          persona: {
            ...data.persona,
            idPersona: data.idOdontologo
          }
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al actualizar odontólogo'
      }
    }
  }

  // Eliminar un odontólogo
  async deleteOdontologo(id: number): Promise<ApiResponse<void>> {
    try {
      const formData = new FormData()
      formData.append('id', id.toString())

      const response = await apiService.postForm<{ message: string }>('/api/odontologos', formData)
      
      return {
        success: true,
        message: response.message || 'Odontólogo eliminado exitosamente'
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al eliminar odontólogo'
      }
    }
  }

  // Buscar odontólogos por especialidad
  async getByEspecialidad(especialidad: string): Promise<Odontologo[]> {
    try {
      const odontologos = await this.getOdontologos()
      return odontologos.filter(od => od.especialidad.toLowerCase().includes(especialidad.toLowerCase()))
    } catch (error) {
      console.error('Error fetching odontólogos por especialidad:', error)
      throw new Error('Error al obtener los odontólogos por especialidad')
    }
  }

  // Obtener especialidades disponibles
  async getEspecialidades(): Promise<string[]> {
    try {
      const odontologos = await this.getOdontologos()
      const especialidades = odontologos.map(od => od.especialidad)
      return Array.from(new Set(especialidades))
    } catch (error) {
      console.error('Error fetching especialidades:', error)
      return []
    }
  }
}

export const odontologoService = new OdontologoService() 