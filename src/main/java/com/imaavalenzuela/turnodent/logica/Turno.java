package com.imaavalenzuela.turnodent.logica;

import java.util.Date;

public class Turno {
    
    private int idTurno;
    private Date fecha_turno;
    private String hora_turno;
    private String afeccion;

    public Turno() {
    }

    public Turno(int idTurno, Date fecha_turno, String hora_turno, String afeccion) {
        this.idTurno = idTurno;
        this.fecha_turno = fecha_turno;
        this.hora_turno = hora_turno;
        this.afeccion = afeccion;
    }

    public int getIdTurno() {
        return idTurno;
    }

    public void setIdTurno(int idTurno) {
        this.idTurno = idTurno;
    }

    public Date getFecha_turno() {
        return fecha_turno;
    }

    public void setFecha_turno(Date fecha_turno) {
        this.fecha_turno = fecha_turno;
    }

    public String getHora_turno() {
        return hora_turno;
    }

    public void setHora_turno(String hora_turno) {
        this.hora_turno = hora_turno;
    }

    public String getAfeccion() {
        return afeccion;
    }

    public void setAfeccion(String afeccion) {
        this.afeccion = afeccion;
    }
    

    
}
