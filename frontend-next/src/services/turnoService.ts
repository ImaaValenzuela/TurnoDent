import { apiService } from './api'
import { Turno, ApiResponse } from '@/types'

export interface CreateTurnoData {
  fecha: string
  hora: string
  estado: string
  idPaciente: number
  idOdontologo: number
  idSecretario: number
  afeccion?: string
}

export interface UpdateTurnoData {
  idTurno: number
  fecha: string
  hora: string
  estado: string
  idPaciente: number
  idOdontologo: number
  idSecretario: number
  afeccion?: string
}

class TurnoService {
  // Obtener todos los turnos
  async getTurnos(): Promise<Turno[]> {
    try {
      const response = await apiService.get<Turno[]>('/api/turnos')
      return response
    } catch (error) {
      console.error('Error fetching turnos:', error)
      return []
    }
  }

  // Obtener un turno por ID
  async getTurno(id: number): Promise<Turno | null> {
    try {
      const response = await apiService.get<Turno>(`/api/turnos/${id}`)
      return response
    } catch (error) {
      console.error('Error fetching turno:', error)
      return null
    }
  }

  // Crear un nuevo turno
  async createTurno(data: CreateTurnoData): Promise<ApiResponse<Turno>> {
    try {
      const formData = new FormData()
      formData.append('fecha_turno', data.fecha)
      formData.append('hora_turno', data.hora)
      formData.append('afeccion', data.afeccion || '')
      formData.append('odontologo_id', data.idOdontologo.toString())
      formData.append('paciente_id', data.idPaciente.toString())

      const response = await apiService.postForm<{ message: string }>('/api/turnos', formData)
      
      return {
        success: true,
        message: response.message || 'Turno creado exitosamente',
        data: {
          idTurno: Date.now(),
          fecha: data.fecha,
          hora: data.hora,
          estado: data.estado,
          idPaciente: data.idPaciente,
          idOdontologo: data.idOdontologo,
          idSecretario: data.idSecretario
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al crear turno'
      }
    }
  }

  // Actualizar un turno
  async updateTurno(data: UpdateTurnoData): Promise<ApiResponse<Turno>> {
    try {
      const formData = new FormData()
      formData.append('id', data.idTurno.toString())
      formData.append('fecha_turno', data.fecha)
      formData.append('hora_turno', data.hora)
      formData.append('afeccion', data.afeccion || '')
      formData.append('odontologo_id', data.idOdontologo.toString())
      formData.append('paciente_id', data.idPaciente.toString())

      const response = await apiService.postForm<{ message: string }>('/api/turnos', formData)
      
      return {
        success: true,
        message: response.message || 'Turno actualizado exitosamente',
        data: {
          idTurno: data.idTurno,
          fecha: data.fecha,
          hora: data.hora,
          estado: data.estado,
          idPaciente: data.idPaciente,
          idOdontologo: data.idOdontologo,
          idSecretario: data.idSecretario
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al actualizar turno'
      }
    }
  }

  // Eliminar un turno
  async deleteTurno(id: number): Promise<ApiResponse<void>> {
    try {
      const formData = new FormData()
      formData.append('id', id.toString())

      const response = await apiService.postForm<{ message: string }>('/api/turnos', formData)
      
      return {
        success: true,
        message: response.message || 'Turno eliminado exitosamente'
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al eliminar turno'
      }
    }
  }

  // Obtener turnos por fecha
  async getTurnosByFecha(fecha: string): Promise<Turno[]> {
    try {
      const turnos = await this.getTurnos()
      return turnos.filter(t => t.fecha === fecha)
    } catch (error) {
      console.error('Error fetching turnos por fecha:', error)
      return []
    }
  }

  // Obtener turnos por odontólogo
  async getTurnosByOdontologo(idOdontologo: number): Promise<Turno[]> {
    try {
      const turnos = await this.getTurnos()
      return turnos.filter(t => t.idOdontologo === idOdontologo)
    } catch (error) {
      console.error('Error fetching turnos por odontólogo:', error)
      return []
    }
  }

  // Obtener turnos por paciente
  async getTurnosByPaciente(idPaciente: number): Promise<Turno[]> {
    try {
      const turnos = await this.getTurnos()
      return turnos.filter(t => t.idPaciente === idPaciente)
    } catch (error) {
      console.error('Error fetching turnos por paciente:', error)
      return []
    }
  }

  // Obtener turnos por estado
  async getTurnosByEstado(estado: string): Promise<Turno[]> {
    try {
      const turnos = await this.getTurnos()
      return turnos.filter(t => t.estado === estado)
    } catch (error) {
      console.error('Error fetching turnos por estado:', error)
      return []
    }
  }
}

export const turnoService = new TurnoService() 