package com.imaavalenzuela.turnodent.servlets;

import com.imaavalenzuela.turnodent.logica.Controller;
import com.imaavalenzuela.turnodent.logica.Turno;
import com.imaavalenzuela.turnodent.logica.Odontologo;
import com.imaavalenzuela.turnodent.logica.Paciente;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "ApiTurnoServlet", urlPatterns = {"/api/turnos/*"})
public class ApiTurnoServlet extends HttpServlet {
    private Controller controller = new Controller();
    private Gson gson = new GsonBuilder().setPrettyPrinting().create();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setContentType("application/json;charset=UTF-8");
        String pathInfo = request.getPathInfo();
        PrintWriter out = response.getWriter();
        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                List<Turno> turnos = controller.getTurnos();
                out.println(gson.toJson(turnos));
            } else {
                String[] pathParts = pathInfo.split("/");
                if (pathParts.length == 2) {
                    int id = Integer.parseInt(pathParts[1]);
                    Turno turno = controller.getTurno(id);
                    if (turno != null) {
                        out.println(gson.toJson(turno));
                    } else {
                        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                        Map<String, String> error = new HashMap<>();
                        error.put("error", "Turno no encontrado");
                        out.println(gson.toJson(error));
                    }
                }
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error interno del servidor: " + e.getMessage());
            out.println(gson.toJson(error));
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            String fechaStr = request.getParameter("fecha_turno");
            String hora = request.getParameter("hora_turno");
            String afeccion = request.getParameter("afeccion");
            String odontologoIdStr = request.getParameter("odontologo_id");
            String pacienteIdStr = request.getParameter("paciente_id");
            if (fechaStr == null || hora == null || odontologoIdStr == null || pacienteIdStr == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                Map<String, String> error = new HashMap<>();
                error.put("error", "Faltan parámetros requeridos");
                out.println(gson.toJson(error));
                return;
            }
            Turno turno = new Turno();
            try {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                Date fecha = sdf.parse(fechaStr);
                turno.setFecha_turno(fecha);
            } catch (Exception e) {}
            turno.setHora_turno(hora);
            turno.setAfeccion(afeccion);
            int odontologoId = Integer.parseInt(odontologoIdStr);
            int pacienteId = Integer.parseInt(pacienteIdStr);
            Odontologo odontologo = controller.getOdontologo(odontologoId);
            Paciente paciente = controller.getPaciente(pacienteId);
            if (odontologo != null) turno.setOdontologo(odontologo);
            if (paciente != null) turno.setPaciente(paciente);
            controller.crearTurno(turno);
            Map<String, String> success = new HashMap<>();
            success.put("message", "Turno creado exitosamente");
            out.println(gson.toJson(success));
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al crear turno: " + e.getMessage());
            out.println(gson.toJson(error));
        }
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            String idStr = request.getParameter("id");
            if (idStr == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                Map<String, String> error = new HashMap<>();
                error.put("error", "ID de turno requerido");
                out.println(gson.toJson(error));
                return;
            }
            int id = Integer.parseInt(idStr);
            Turno turno = controller.getTurno(id);
            if (turno == null) {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                Map<String, String> error = new HashMap<>();
                error.put("error", "Turno no encontrado");
                out.println(gson.toJson(error));
                return;
            }
            String fechaStr = request.getParameter("fecha_turno");
            String hora = request.getParameter("hora_turno");
            String afeccion = request.getParameter("afeccion");
            String odontologoIdStr = request.getParameter("odontologo_id");
            String pacienteIdStr = request.getParameter("paciente_id");
            if (fechaStr != null && !fechaStr.trim().isEmpty()) {
                try {
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    Date fecha = sdf.parse(fechaStr);
                    turno.setFecha_turno(fecha);
                } catch (Exception e) {}
            }
            if (hora != null) turno.setHora_turno(hora);
            if (afeccion != null) turno.setAfeccion(afeccion);
            if (odontologoIdStr != null && !odontologoIdStr.trim().isEmpty()) {
                int odontologoId = Integer.parseInt(odontologoIdStr);
                Odontologo odontologo = controller.getOdontologo(odontologoId);
                if (odontologo != null) turno.setOdontologo(odontologo);
            }
            if (pacienteIdStr != null && !pacienteIdStr.trim().isEmpty()) {
                int pacienteId = Integer.parseInt(pacienteIdStr);
                Paciente paciente = controller.getPaciente(pacienteId);
                if (paciente != null) turno.setPaciente(paciente);
            }
            controller.editarTurno(turno);
            Map<String, String> success = new HashMap<>();
            success.put("message", "Turno actualizado exitosamente");
            out.println(gson.toJson(success));
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al actualizar turno: " + e.getMessage());
            out.println(gson.toJson(error));
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            String idStr = request.getParameter("id");
            if (idStr == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                Map<String, String> error = new HashMap<>();
                error.put("error", "ID de turno requerido");
                out.println(gson.toJson(error));
                return;
            }
            int id = Integer.parseInt(idStr);
            controller.borrarTurno(id);
            Map<String, String> success = new HashMap<>();
            success.put("message", "Turno eliminado exitosamente");
            out.println(gson.toJson(success));
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al eliminar turno: " + e.getMessage());
            out.println(gson.toJson(error));
        }
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setStatus(HttpServletResponse.SC_OK);
    }
} 