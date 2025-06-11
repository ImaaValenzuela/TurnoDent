package com.imaavalenzuela.turnodent.logica;

public class Horario {
    private int idHorario;
    private String horario_inicio;
    private String horario_fin;

    public Horario() {
    }

    public Horario(int idHorario, String horario_inicio, String horario_fin) {
        this.idHorario = idHorario;
        this.horario_inicio = horario_inicio;
        this.horario_fin = horario_fin;
    }

    public int getIdHorario() {
        return idHorario;
    }

    public void setIdHorario(int idHorario) {
        this.idHorario = idHorario;
    }

    public String getHorario_inicio() {
        return horario_inicio;
    }

    public void setHorario_inicio(String horario_inicio) {
        this.horario_inicio = horario_inicio;
    }

    public String getHorario_fin() {
        return horario_fin;
    }

    public void setHorario_fin(String horario_fin) {
        this.horario_fin = horario_fin;
    }
    
    
}
