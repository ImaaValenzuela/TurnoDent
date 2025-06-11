package com.imaavalenzuela.turnodent.logica;

public class Usuario {

    private int idUsuario;
    private String nombre_usuario;
    private String contrasenia;
    private String rol;

    public Usuario() {
    }

    public Usuario(int idUsuario, String nombre_usuario, String contrasenia, String rol) {
        this.idUsuario = idUsuario;
        this.nombre_usuario = nombre_usuario;
        this.contrasenia = contrasenia;
        this.rol = rol;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre_usuario() {
        return nombre_usuario;
    }

    public void setNombre_usuario(String nombre_usuario) {
        this.nombre_usuario = nombre_usuario;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
    
    
    
}
