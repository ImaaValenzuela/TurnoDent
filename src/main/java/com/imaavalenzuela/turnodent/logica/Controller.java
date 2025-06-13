package com.imaavalenzuela.turnodent.logica;

import com.imaavalenzuela.turnodent.persistencia.PersistenceController;

public class Controller {
    PersistenceController controlador = new PersistenceController();
    
    public void crearUsuario(String nombreUsuario, String contrasenia, String rol){
        Usuario usuario = new Usuario();
        usuario.setNombre_usuario(nombreUsuario);
        usuario.setContrasenia(contrasenia);
        usuario.setRol(rol);
        
        controlador.crearUsuario(usuario);
    }
}
