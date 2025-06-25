import { apiService } from './api'
import { Paciente, CreatePacienteData, UpdatePacienteData, ApiResponse } from '@/types'

class PacienteService {
  // Obtener todos los pacientes
  async getPacientes(): Promise<Paciente[]> {
    try {
      const response = await apiService.get<Paciente[]>('/api/pacientes')
      return response
    } catch (error) {
      console.error('Error fetching pacientes:', error)
      return []
    }
  }

  // Obtener un paciente por ID
  async getPaciente(id: number): Promise<Paciente | null> {
    try {
      const response = await apiService.get<Paciente>(`/api/pacientes/${id}`)
      return response
    } catch (error) {
      console.error('Error fetching paciente:', error)
      return null
    }
  }

  // Crear un nuevo paciente
  async createPaciente(data: CreatePacienteData): Promise<ApiResponse<Paciente>> {
    try {
      const formData = new FormData()
      formData.append('dni', data.persona.dni)
      formData.append('nombre', data.persona.nombre)
      formData.append('apellido', data.persona.apellido)
      formData.append('telefono', data.persona.telefono)
      formData.append('direccion', data.persona.direccion)
      formData.append('fecha_nac', data.fechaNacimiento)
      formData.append('tipoSangre', data.grupoSanguineo)
      formData.append('tieneObraSocial', 'true') // Por defecto

      const response = await apiService.postForm<{ message: string }>('/api/pacientes', formData)
      
      const personaId = Date.now()
      return {
        success: true,
        message: response.message || 'Paciente creado exitosamente',
        data: {
          idPaciente: personaId,
          fechaNacimiento: data.fechaNacimiento,
          grupoSanguineo: data.grupoSanguineo,
          alergias: data.alergias,
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
        error: error instanceof Error ? error.message : 'Error al crear paciente'
      }
    }
  }

  // Actualizar un paciente
  async updatePaciente(data: UpdatePacienteData): Promise<ApiResponse<Paciente>> {
    try {
      const formData = new FormData()
      formData.append('id', data.idPaciente.toString())
      formData.append('dni', data.persona.dni)
      formData.append('nombre', data.persona.nombre)
      formData.append('apellido', data.persona.apellido)
      formData.append('telefono', data.persona.telefono)
      formData.append('direccion', data.persona.direccion)
      formData.append('fecha_nac', data.fechaNacimiento)
      formData.append('tipoSangre', data.grupoSanguineo)

      const response = await apiService.postForm<{ message: string }>('/api/pacientes', formData)
      
      return {
        success: true,
        message: response.message || 'Paciente actualizado exitosamente',
        data: {
          idPaciente: data.idPaciente,
          fechaNacimiento: data.fechaNacimiento,
          grupoSanguineo: data.grupoSanguineo,
          alergias: data.alergias,
          idPersona: data.idPaciente,
          persona: {
            ...data.persona,
            idPersona: data.idPaciente
          }
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al actualizar paciente'
      }
    }
  }

  // Eliminar un paciente
  async deletePaciente(id: number): Promise<ApiResponse<void>> {
    try {
      const formData = new FormData()
      formData.append('id', id.toString())

      const response = await apiService.postForm<{ message: string }>('/api/pacientes', formData)
      
      return {
        success: true,
        message: response.message || 'Paciente eliminado exitosamente'
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error al eliminar paciente'
      }
    }
  }

  // Buscar pacientes por nombre
  async getByNombre(nombre: string): Promise<Paciente[]> {
    try {
      const pacientes = await this.getPacientes()
      return pacientes.filter(p => 
        p.persona?.nombre.toLowerCase().includes(nombre.toLowerCase()) ||
        p.persona?.apellido.toLowerCase().includes(nombre.toLowerCase())
      )
    } catch (error) {
      console.error('Error fetching pacientes por nombre:', error)
      return []
    }
  }

  // Buscar pacientes por DNI
  async getByDNI(dni: string): Promise<Paciente[]> {
    try {
      const pacientes = await this.getPacientes()
      return pacientes.filter(p => p.persona?.dni.includes(dni))
    } catch (error) {
      console.error('Error fetching pacientes por DNI:', error)
      return []
    }
  }

  // Buscar pacientes por grupo sanguíneo
  async getByGrupoSanguineo(grupoSanguineo: string): Promise<Paciente[]> {
    try {
      const response = await apiService.get<Paciente[]>(`/api/pacientes/grupo-sanguineo/${grupoSanguineo}`)
      return response
    } catch (error) {
      console.error('Error fetching pacientes by grupo sanguíneo:', error)
      throw new Error('Error al obtener los pacientes por grupo sanguíneo')
    }
  }

  // Obtener pacientes con alergias
  async getConAlergias(): Promise<Paciente[]> {
    try {
      const response = await apiService.get<Paciente[]>('/api/pacientes/con-alergias')
      return response
    } catch (error) {
      console.error('Error fetching pacientes con alergias:', error)
      throw new Error('Error al obtener los pacientes con alergias')
    }
  }

  // Obtener estadísticas de pacientes
  async getStats(): Promise<{
    total: number
    conAlergias: number
    gruposSanguineos: Record<string, number>
  }> {
    try {
      const response = await apiService.get<{
        total: number
        conAlergias: number
        gruposSanguineos: Record<string, number>
      }>('/api/pacientes/stats')
      return response
    } catch (error) {
      console.error('Error fetching paciente stats:', error)
      throw new Error('Error al obtener las estadísticas de pacientes')
    }
  }
}

export const pacienteService = new PacienteService() 