package com.imaavalenzuela.turnodent.logica;

import java.util.Date;
import java.util.List;

public class Odontologo extends Persona{

    private int idOdontologo;
    private String especialidad;
    private List<Turno> listaTurnos;
    private Usuario usuario;
    private Horario horario;

    public Odontologo() {
    }

    public Odontologo(int idOdontologo, String especialidad, List<Turno> listaTurnos, Usuario usuario, Horario horario, String dni, String nombre, String apellido, String telefono, String direccion, Date fecha_nac) {
        super(dni, nombre, apellido, telefono, direccion, fecha_nac);
        this.idOdontologo = idOdontologo;
        this.especialidad = especialidad;
        this.listaTurnos = listaTurnos;
        this.usuario = usuario;
        this.horario = horario;
    }

    public int getIdOdontologo() {
        return idOdontologo;
    }

    public void setIdOdontologo(int idOdontologo) {
        this.idOdontologo = idOdontologo;
    }

    public String getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }

    public List<Turno> getListaTurnos() {
        return listaTurnos;
    }

    public void setListaTurnos(List<Turno> listaTurnos) {
        this.listaTurnos = listaTurnos;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Horario getHorario() {
        return horario;
    }

    public void setHorario(Horario horario) {
        this.horario = horario;
    }
    
    
    
}
