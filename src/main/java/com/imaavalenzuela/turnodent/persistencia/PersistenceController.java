package com.imaavalenzuela.turnodent.persistencia;

import com.imaavalenzuela.turnodent.logica.Usuario;
import com.imaavalenzuela.turnodent.logica.Odontologo;
import com.imaavalenzuela.turnodent.logica.Paciente;
import com.imaavalenzuela.turnodent.logica.Turno;
import com.imaavalenzuela.turnodent.logica.Horario;
import com.imaavalenzuela.turnodent.logica.Responsable;
import com.imaavalenzuela.turnodent.logica.Secretario;
import com.imaavalenzuela.turnodent.persistencia.exceptions.NonexistentEntityException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class PersistenceController {

    HorarioJpaController horarioJPA;
    OdontologoJpaController odontologoJPA;
    PacienteJpaController pacienteJPA;
    PersonaJpaController personaJPA;
    ResponsableJpaController responsableJPA;
    SecretarioJpaController secretarioJPA;
    TurnoJpaController turnoJPA;
    UsuarioJpaController usuarioJPA;

    public PersistenceController() {
        
     usuarioJPA = new UsuarioJpaController();
     horarioJPA = new HorarioJpaController();
     odontologoJPA = new OdontologoJpaController();
     pacienteJPA= new PacienteJpaController();
     personaJPA = new PersonaJpaController();
     responsableJPA = new ResponsableJpaController();
     secretarioJPA = new SecretarioJpaController();
     turnoJPA = new TurnoJpaController();
    }

    // Métodos para Usuario
    public void crearUsuario(Usuario usuario) {
        usuarioJPA.create(usuario);
    }

    public List<Usuario> getUsuarios() {
        return usuarioJPA.findUsuarioEntities();
    }

    public void borrarUsuario(int id) {
        try {
            usuarioJPA.destroy(id);
        } catch (NonexistentEntityException ex) {
            Logger.getLogger(PersistenceController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public Usuario getUsuario(int id) {
        return usuarioJPA.findUsuario(id);
    }

    public void editarUsuario(Usuario usuarioEditado) {
        try {
            usuarioJPA.edit(usuarioEditado);
        } catch (Exception ex) {
            Logger.getLogger(PersistenceController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    // Métodos para Odontologo
    public void crearOdontologo(Odontologo odontologo) {
        odontologoJPA.create(odontologo);
    }

    public List<Odontologo> getOdontologos() {
        return odontologoJPA.findOdontologoEntities();
    }

    public Odontologo getOdontologo(int id) {
        return odontologoJPA.findOdontologo(id);
    }

    public void editarOdontologo(Odontologo odontologo) {
        try {
            odontologoJPA.edit(odontologo);
        } catch (Exception ex) {
            Logger.getLogger(PersistenceController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void borrarOdontologo(int id) {
        try {
            odontologoJPA.destroy(id);
        } catch (NonexistentEntityException ex) {
            Logger.getLogger(PersistenceController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    // Métodos para Paciente
    public void crearPaciente(Paciente paciente) {
        pacienteJPA.create(paciente);
    }

    public List<Paciente> getPacientes() {
        return pacienteJPA.findPacienteEntities();
    }

    public Paciente getPaciente(int id) {
        return pacienteJPA.findPaciente(id);
    }

    public void editarPaciente(Paciente paciente) {
        try {
            pacienteJPA.edit(paciente);
        } catch (Exception ex) {
            Logger.getLogger(PersistenceController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void borrarPaciente(int id) {
        try {
            pacienteJPA.destroy(id);
        } catch (NonexistentEntityException ex) {
            Logger.getLogger(PersistenceController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    // Métodos para Turno
    public void crearTurno(Turno turno) {
        turnoJPA.create(turno);
    }

    public List<Turno> getTurnos() {
        return turnoJPA.findTurnoEntities();
    }

    public Turno getTurno(int id) {
        return turnoJPA.findTurno(id);
    }

    public void editarTurno(Turno turno) {
        try {
            turnoJPA.edit(turno);
        } catch (Exception ex) {
            Logger.getLogger(PersistenceController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void borrarTurno(int id) {
        try {
            turnoJPA.destroy(id);
        } catch (NonexistentEntityException ex) {
            Logger.getLogger(PersistenceController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    // Métodos para Horario
    public void crearHorario(Horario horario) {
        horarioJPA.create(horario);
    }

    public List<Horario> getHorarios() {
        return horarioJPA.findHorarioEntities();
    }

    public Horario getHorario(int id) {
        return horarioJPA.findHorario(id);
    }

    public void editarHorario(Horario horario) {
        try {
            horarioJPA.edit(horario);
        } catch (Exception ex) {
            Logger.getLogger(PersistenceController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void borrarHorario(int id) {
        try {
            horarioJPA.destroy(id);
        } catch (NonexistentEntityException ex) {
            Logger.getLogger(PersistenceController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    // Métodos para Responsable
    public void crearResponsable(Responsable responsable) {
        responsableJPA.create(responsable);
    }

    public List<Responsable> getResponsables() {
        return responsableJPA.findResponsableEntities();
    }

    public Responsable getResponsable(int id) {
        return responsableJPA.findResponsable(id);
    }

    public void editarResponsable(Responsable responsable) {
        try {
            responsableJPA.edit(responsable);
        } catch (Exception ex) {
            Logger.getLogger(PersistenceController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void borrarResponsable(int id) {
        try {
            responsableJPA.destroy(id);
        } catch (NonexistentEntityException ex) {
            Logger.getLogger(PersistenceController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    // Métodos para Secretario
    public void crearSecretario(Secretario secretario) {
        secretarioJPA.create(secretario);
    }

    public List<Secretario> getSecretarios() {
        return secretarioJPA.findSecretarioEntities();
    }

    public Secretario getSecretario(int id) {
        return secretarioJPA.findSecretario(id);
    }

    public void editarSecretario(Secretario secretario) {
        try {
            secretarioJPA.edit(secretario);
        } catch (Exception ex) {
            Logger.getLogger(PersistenceController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void borrarSecretario(int id) {
        try {
            secretarioJPA.destroy(id);
        } catch (NonexistentEntityException ex) {
            Logger.getLogger(PersistenceController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
