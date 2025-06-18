package com.imaavalenzuela.turnodent.logica;

import com.imaavalenzuela.turnodent.persistencia.PersistenceController;
import com.imaavalenzuela.turnodent.utils.Seguridad;
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

    public boolean comprobarIngreso(String usuario, String contrasenia) {
        List<Usuario> usuarios = controlador.getUsuarios();

        for (Usuario usu : usuarios) {
            if (usu.getNombre_usuario().equals(usuario)) {
                String hashPass = usu.getContrasenia();
                return Seguridad.verificarPassword(contrasenia, hashPass);
            }
        }

        return false;
    }
}
