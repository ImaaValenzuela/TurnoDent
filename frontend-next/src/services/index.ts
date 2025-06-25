// Exportar todos los servicios
export { usuarioService } from './usuarioService'
export { odontologoService } from './odontologoService'
export { pacienteService } from './pacienteService'
export { turnoService } from './turnoService'
export { horarioService } from './horarioService'
export { responsableService } from './responsableService'
export { secretarioService } from './secretarioService'
export { apiService } from './api'

// Exportar tipos de servicios
export type { CreateUsuarioData, UpdateUsuarioData, LoginResponse } from './usuarioService'
export type { CreateTurnoData, UpdateTurnoData } from './turnoService'
export type { CreateHorarioData, UpdateHorarioData } from './horarioService'
export type { CreateResponsableData, UpdateResponsableData } from './responsableService'
export type { CreateSecretarioData, UpdateSecretarioData } from './secretarioService' 