package com.imaavalenzuela.turnodent.logica;

import com.imaavalenzuela.turnodent.persistencia.PersistenceController;
import com.imaavalenzuela.turnodent.utils.Seguridad;
import java.util.ArrayList;
import java.util.List;

public class Controller {
    PersistenceController controlador = new PersistenceController();
    
    // Métodos para Usuario
    public void crearUsuario(String nombreUsuario, String contrasenia, String rol){
        Usuario usuario = new Usuario();
        usuario.setNombre_usuario(nombreUsuario);
        usuario.setContrasenia(contrasenia);
        usuario.setRol(rol);
        
        controlador.crearUsuario(usuario);
    }

    public List<Usuario> getUsuarios() {
        return controlador.getUsuarios();
    }

    public void borrarUsuario(int id) {
        controlador.borrarUsuario(id);
    }

    public Usuario getUsuario(int id) {
        return controlador.getUsuario(id);
    }

    public void editarUsuario(Usuario usuarioEditado) {
        controlador.editarUsuario(usuarioEditado);
    }

    public boolean comprobarIngreso(String usuario, String contrasenia) {
        List<Usuario> usuarios = controlador.getUsuarios();

        for (Usuario usu : usuarios) {
            if (usu.getNombre_usuario().equals(usuario)) {
                String hashPass = usu.getContrasenia();
                
                // Verificar si la contraseña está hasheada (empieza con $2a$)
                if (hashPass.startsWith("$2a$")) {
                    // Contraseña hasheada, usar verificación normal
                    return Seguridad.verificarPassword(contrasenia, hashPass);
                } else {
                    // Contraseña en texto plano, comparar directamente
                    if (hashPass.equals(contrasenia)) {
                        // Si coincide, hashear la contraseña y actualizarla en la BD
                        String nuevaHashPass = Seguridad.hashPassword(contrasenia);
                        usu.setContrasenia(nuevaHashPass);
                        controlador.editarUsuario(usu);
                        return true;
                    }
                    return false;
                }
            }
        }

        return false;
    }
    
    // Métodos para Odontólogo
    public void crearOdontologo(Odontologo odontologo) {
        controlador.crearOdontologo(odontologo);
    }
    
    public List<Odontologo> getOdontologos() {
        return controlador.getOdontologos();
    }
    
    public Odontologo getOdontologo(int id) {
        return controlador.getOdontologo(id);
    }
    
    public void editarOdontologo(Odontologo odontologo) {
        controlador.editarOdontologo(odontologo);
    }
    
    public void borrarOdontologo(int id) {
        controlador.borrarOdontologo(id);
    }
    
    // Métodos para Paciente
    public void crearPaciente(Paciente paciente) {
        controlador.crearPaciente(paciente);
    }
    
    public List<Paciente> getPacientes() {
        return controlador.getPacientes();
    }
    
    public Paciente getPaciente(int id) {
        return controlador.getPaciente(id);
    }
    
    public void editarPaciente(Paciente paciente) {
        controlador.editarPaciente(paciente);
    }
    
    public void borrarPaciente(int id) {
        controlador.borrarPaciente(id);
    }
    
    // Métodos para Turno
    public void crearTurno(Turno turno) {
        controlador.crearTurno(turno);
    }
    
    public List<Turno> getTurnos() {
        return controlador.getTurnos();
    }
    
    public Turno getTurno(int id) {
        return controlador.getTurno(id);
    }
    
    public void editarTurno(Turno turno) {
        controlador.editarTurno(turno);
    }
    
    public void borrarTurno(int id) {
        controlador.borrarTurno(id);
    }
    
    // Métodos para Horario
    public void crearHorario(Horario horario) {
        controlador.crearHorario(horario);
    }
    
    public List<Horario> getHorarios() {
        return controlador.getHorarios();
    }
    
    public Horario getHorario(int id) {
        return controlador.getHorario(id);
    }
    
    public void editarHorario(Horario horario) {
        controlador.editarHorario(horario);
    }
    
    public void borrarHorario(int id) {
        controlador.borrarHorario(id);
    }
    
    // Métodos para Responsable
    public void crearResponsable(Responsable responsable) {
        controlador.crearResponsable(responsable);
    }
    
    public List<Responsable> getResponsables() {
        return controlador.getResponsables();
    }
    
    public Responsable getResponsable(int id) {
        return controlador.getResponsable(id);
    }
    
    public void editarResponsable(Responsable responsable) {
        controlador.editarResponsable(responsable);
    }
    
    public void borrarResponsable(int id) {
        controlador.borrarResponsable(id);
    }
    
    // Métodos para Secretario
    public void crearSecretario(Secretario secretario) {
        controlador.crearSecretario(secretario);
    }
    
    public List<Secretario> getSecretarios() {
        return controlador.getSecretarios();
    }
    
    public Secretario getSecretario(int id) {
        return controlador.getSecretario(id);
    }
    
    public void editarSecretario(Secretario secretario) {
        controlador.editarSecretario(secretario);
    }
    
    public void borrarSecretario(int id) {
        controlador.borrarSecretario(id);
    }
}
