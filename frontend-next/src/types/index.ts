export interface Usuario {
  idUsuario: number;
  nombre_usuario: string;
  contrasenia: string;
  rol: string;
  idPersona?: number;
}

export interface Persona {
  idPersona: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  direccion: string;
}

export interface Odontologo {
  idOdontologo: number;
  matricula: string;
  especialidad: string;
  idPersona: number;
  persona?: Persona;
}

export interface Paciente {
  idPaciente: number;
  fechaNacimiento: string;
  grupoSanguineo: string;
  alergias: string;
  idPersona: number;
  persona?: Persona;
}

export interface Secretario extends Persona {
  idSecretario: number;
  sector: string;
}

export interface Responsable extends Persona {
  idResponsable: number;
  parentesco: string;
}

export interface Horario {
  idHorario: number;
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
  idOdontologo: number;
}

export interface Turno {
  idTurno: number;
  fecha: string;
  hora: string;
  estado: string;
  idPaciente: number;
  idOdontologo: number;
  idSecretario: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Tipos para formularios de usuarios
export interface CreateUsuarioData {
  nombreUsuario: string;
  contrasenia: string;
  rol: string;
}

export interface UpdateUsuarioData {
  idUsuario: number;
  nombreUsuario: string;
  contrasenia?: string;
  rol: string;
}

export interface CreateOdontologoData {
  matricula: string;
  especialidad: string;
  persona: Omit<Persona, 'idPersona'>;
}

export interface UpdateOdontologoData {
  idOdontologo: number;
  matricula: string;
  especialidad: string;
  persona: Omit<Persona, 'idPersona'>;
}

export interface CreatePacienteData {
  fechaNacimiento: string;
  grupoSanguineo: string;
  alergias: string;
  persona: Omit<Persona, 'idPersona'>;
}

export interface UpdatePacienteData {
  idPaciente: number;
  fechaNacimiento: string;
  grupoSanguineo: string;
  alergias: string;
  persona: Omit<Persona, 'idPersona'>;
} 