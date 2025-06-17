package com.imaavalenzuela.turnodent.logica;

import com.imaavalenzuela.turnodent.persistencia.PersistenceController;
import java.util.ArrayList;
import java.util.List;

public class Controller {
    PersistenceController controlador = new PersistenceController();
    
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
}
