package com.imaavalenzuela.turnodent.persistencia;

import com.imaavalenzuela.turnodent.logica.Usuario;
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
}
