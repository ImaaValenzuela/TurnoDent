import { apiService } from './api'
import { Horario, ApiResponse } from '@/types'

export interface CreateHorarioData {
  diaSemana: string
  horaInicio: string
  horaFin: string
  idOdontologo: number
}

export interface UpdateHorarioData {
  idHorario: number
  diaSemana: string
  horaInicio: string
  horaFin: string
  idOdontologo: number
}

class HorarioService {
  // Obtener todos los horarios
  async getHorarios(): Promise<Horario[]> {
    try {
      const response = await apiService.get<Horario[]>('/api/horarios')
      return response
    } catch (error) {
      console.error('Error fetching horarios:', error)
      return []
    }
  }

  // Obtener un horario por ID
  async getHorario(id: number): Promise<Horario | null> {
    try {
      const response = await apiService.get<Horario>(`/api/horarios/${id}`)
      return response
    } catch (error) {
      console.error('Error fetching horario:', error)
      return null
    }
  }

  // Crear un nuevo horario
  async createHorario(data: CreateHorarioData): Promise<ApiResponse<Horario>> {
    try {
      const formData = new FormData()
      formData.append('diaSemana', data.diaSemana)
      formData.append('horaInicio', data.horaInicio)
      formData.append('horaFin', data.horaFin)
      formData.append('idOdontologo', data.idOdontologo.toString())

      const response = await apiService.postForm<{ message: string }>('/api/horarios', formData)
      
      return {
        success: true,
        message: response.message || 'Horario creado exitosamente',
        data: {
          idHorario: Date.now(),
          diaSemana: data.diaSemana,
          horaInicio: data.horaInicio,
          horaFin: data.horaFin,
          idOdontologo: data.idOdontologo
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al crear horario'
      }
    }
  }

  // Actualizar un horario
  async updateHorario(data: UpdateHorarioData): Promise<ApiResponse<Horario>> {
    try {
      const formData = new FormData()
      formData.append('id', data.idHorario.toString())
      formData.append('diaSemana', data.diaSemana)
      formData.append('horaInicio', data.horaInicio)
      formData.append('horaFin', data.horaFin)
      formData.append('idOdontologo', data.idOdontologo.toString())

      const response = await apiService.postForm<{ message: string }>('/api/horarios', formData)
      
      return {
        success: true,
        message: response.message || 'Horario actualizado exitosamente',
        data: {
          idHorario: data.idHorario,
          diaSemana: data.diaSemana,
          horaInicio: data.horaInicio,
          horaFin: data.horaFin,
          idOdontologo: data.idOdontologo
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al actualizar horario'
      }
    }
  }

  // Eliminar un horario
  async deleteHorario(id: number): Promise<ApiResponse<void>> {
    try {
      const formData = new FormData()
      formData.append('id', id.toString())

      const response = await apiService.postForm<{ message: string }>('/api/horarios', formData)
      
      return {
        success: true,
        message: response.message || 'Horario eliminado exitosamente'
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al eliminar horario'
      }
    }
  }

  // Obtener horarios por odontólogo
  async getHorariosByOdontologo(idOdontologo: number): Promise<Horario[]> {
    try {
      const horarios = await this.getHorarios()
      return horarios.filter(h => h.idOdontologo === idOdontologo)
    } catch (error) {
      console.error('Error fetching horarios por odontólogo:', error)
      return []
    }
  }

  // Obtener horarios por día de la semana
  async getHorariosByDia(diaSemana: string): Promise<Horario[]> {
    try {
      const horarios = await this.getHorarios()
      return horarios.filter(h => h.diaSemana.toLowerCase() === diaSemana.toLowerCase())
    } catch (error) {
      console.error('Error fetching horarios por día:', error)
      return []
    }
  }

  // Obtener horarios disponibles para una fecha y hora específica
  async getHorariosDisponibles(fecha: string, hora: string): Promise<Horario[]> {
    try {
      const horarios = await this.getHorarios()
      // Lógica para verificar disponibilidad
      return horarios.filter(h => {
        // Aquí puedes implementar la lógica de disponibilidad
        return true
      })
    } catch (error) {
      console.error('Error fetching horarios disponibles:', error)
      return []
    }
  }
}

export const horarioService = new HorarioService() 