package com.imaavalenzuela.turnodent.persistencia;

import com.imaavalenzuela.turnodent.logica.Usuario;

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
}
