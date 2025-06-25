package com.imaavalenzuela.turnodent.servlets;

import com.imaavalenzuela.turnodent.logica.Controller;
import com.imaavalenzuela.turnodent.logica.Paciente;
import com.imaavalenzuela.turnodent.logica.Responsable;
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

@WebServlet(name = "ApiPacienteServlet", urlPatterns = {"/api/pacientes/*"})
public class ApiPacienteServlet extends HttpServlet {
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
                List<Paciente> pacientes = controller.getPacientes();
                out.println(gson.toJson(pacientes));
            } else {
                String[] pathParts = pathInfo.split("/");
                if (pathParts.length == 2) {
                    int id = Integer.parseInt(pathParts[1]);
                    Paciente paciente = controller.getPaciente(id);
                    if (paciente != null) {
                        out.println(gson.toJson(paciente));
                    } else {
                        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                        Map<String, String> error = new HashMap<>();
                        error.put("error", "Paciente no encontrado");
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
            String dni = request.getParameter("dni");
            String nombre = request.getParameter("nombre");
            String apellido = request.getParameter("apellido");
            String telefono = request.getParameter("telefono");
            String direccion = request.getParameter("direccion");
            String fechaNacStr = request.getParameter("fecha_nac");
            String tipoSangre = request.getParameter("tipoSangre");
            String responsableIdStr = request.getParameter("responsable_id");
            String obraSocialStr = request.getParameter("tieneObraSocial");
            boolean tieneObraSocial = obraSocialStr != null && obraSocialStr.equalsIgnoreCase("true");
            if (dni == null || nombre == null || apellido == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                Map<String, String> error = new HashMap<>();
                error.put("error", "Faltan parámetros requeridos");
                out.println(gson.toJson(error));
                return;
            }
            Paciente paciente = new Paciente();
            paciente.setDni(dni);
            paciente.setNombre(nombre);
            paciente.setApellido(apellido);
            paciente.setTelefono(telefono);
            paciente.setDireccion(direccion);
            paciente.setTipoSangre(tipoSangre);
            paciente.setTieneObraSocial(tieneObraSocial);
            if (fechaNacStr != null && !fechaNacStr.trim().isEmpty()) {
                try {
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    Date fechaNac = sdf.parse(fechaNacStr);
                    paciente.setFecha_nac(fechaNac);
                } catch (Exception e) {}
            }
            if (responsableIdStr != null && !responsableIdStr.trim().isEmpty()) {
                try {
                    int responsableId = Integer.parseInt(responsableIdStr);
                    Responsable responsable = controller.getResponsable(responsableId);
                    if (responsable != null) {
                        paciente.setResponsable(responsable);
                    }
                } catch (NumberFormatException e) {}
            }
            controller.crearPaciente(paciente);
            Map<String, String> success = new HashMap<>();
            success.put("message", "Paciente creado exitosamente");
            out.println(gson.toJson(success));
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al crear paciente: " + e.getMessage());
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
                error.put("error", "ID de paciente requerido");
                out.println(gson.toJson(error));
                return;
            }
            int id = Integer.parseInt(idStr);
            Paciente paciente = controller.getPaciente(id);
            if (paciente == null) {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                Map<String, String> error = new HashMap<>();
                error.put("error", "Paciente no encontrado");
                out.println(gson.toJson(error));
                return;
            }
            String dni = request.getParameter("dni");
            String nombre = request.getParameter("nombre");
            String apellido = request.getParameter("apellido");
            String telefono = request.getParameter("telefono");
            String direccion = request.getParameter("direccion");
            String fechaNacStr = request.getParameter("fecha_nac");
            String tipoSangre = request.getParameter("tipoSangre");
            String responsableIdStr = request.getParameter("responsable_id");
            String obraSocialStr = request.getParameter("tieneObraSocial");
            if (dni != null) paciente.setDni(dni);
            if (nombre != null) paciente.setNombre(nombre);
            if (apellido != null) paciente.setApellido(apellido);
            if (telefono != null) paciente.setTelefono(telefono);
            if (direccion != null) paciente.setDireccion(direccion);
            if (tipoSangre != null) paciente.setTipoSangre(tipoSangre);
            if (obraSocialStr != null) paciente.setTieneObraSocial(obraSocialStr.equalsIgnoreCase("true"));
            if (fechaNacStr != null && !fechaNacStr.trim().isEmpty()) {
                try {
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    Date fechaNac = sdf.parse(fechaNacStr);
                    paciente.setFecha_nac(fechaNac);
                } catch (Exception e) {}
            }
            if (responsableIdStr != null && !responsableIdStr.trim().isEmpty()) {
                try {
                    int responsableId = Integer.parseInt(responsableIdStr);
                    Responsable responsable = controller.getResponsable(responsableId);
                    if (responsable != null) {
                        paciente.setResponsable(responsable);
                    }
                } catch (NumberFormatException e) {}
            }
            controller.editarPaciente(paciente);
            Map<String, String> success = new HashMap<>();
            success.put("message", "Paciente actualizado exitosamente");
            out.println(gson.toJson(success));
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al actualizar paciente: " + e.getMessage());
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
                error.put("error", "ID de paciente requerido");
                out.println(gson.toJson(error));
                return;
            }
            int id = Integer.parseInt(idStr);
            controller.borrarPaciente(id);
            Map<String, String> success = new HashMap<>();
            success.put("message", "Paciente eliminado exitosamente");
            out.println(gson.toJson(success));
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al eliminar paciente: " + e.getMessage());
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