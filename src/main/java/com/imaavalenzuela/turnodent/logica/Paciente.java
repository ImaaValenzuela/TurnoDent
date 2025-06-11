package com.imaavalenzuela.turnodent.logica;

import java.util.Date;
import java.util.List;

public class Paciente extends Persona{
    private int idPaciente;
    private boolean tieneObraSocial;
    private String tipoSangre;
    private Responsable responsable;
    private List<Turno> listaTurnos;

    public Paciente() {
    }

    public Paciente(int idPaciente, boolean tieneObraSocial, String tipoSangre, Responsable responsable, List<Turno> listaTurnos, String dni, String nombre, String apellido, String telefono, String direccion, Date fecha_nac) {
        super(dni, nombre, apellido, telefono, direccion, fecha_nac);
        this.idPaciente = idPaciente;
        this.tieneObraSocial = tieneObraSocial;
        this.tipoSangre = tipoSangre;
        this.responsable = responsable;
        this.listaTurnos = listaTurnos;
    }

    public int getIdPaciente() {
        return idPaciente;
    }

    public void setIdPaciente(int idPaciente) {
        this.idPaciente = idPaciente;
    }

    public boolean isTieneObraSocial() {
        return tieneObraSocial;
    }

    public void setTieneObraSocial(boolean tieneObraSocial) {
        this.tieneObraSocial = tieneObraSocial;
    }

    public String getTipoSangre() {
        return tipoSangre;
    }

    public void setTipoSangre(String tipoSangre) {
        this.tipoSangre = tipoSangre;
    }

    public Responsable getResponsable() {
        return responsable;
    }

    public void setResponsable(Responsable responsable) {
        this.responsable = responsable;
    }

    public List<Turno> getListaTurnos() {
        return listaTurnos;
    }

    public void setListaTurnos(List<Turno> listaTurnos) {
        this.listaTurnos = listaTurnos;
    }
    
    
    
    
}
