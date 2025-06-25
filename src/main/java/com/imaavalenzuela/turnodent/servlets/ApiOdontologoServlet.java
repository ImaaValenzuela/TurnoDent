package com.imaavalenzuela.turnodent.servlets;

import com.imaavalenzuela.turnodent.logica.Controller;
import com.imaavalenzuela.turnodent.logica.Odontologo;
import com.imaavalenzuela.turnodent.logica.Usuario;
import com.imaavalenzuela.turnodent.logica.Horario;
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

@WebServlet(name = "ApiOdontologoServlet", urlPatterns = {"/api/odontologos/*"})
public class ApiOdontologoServlet extends HttpServlet {
    
    private Controller controller = new Controller();
    private Gson gson = new GsonBuilder().setPrettyPrinting().create();
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        // Configurar CORS
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setContentType("application/json;charset=UTF-8");
        
        String pathInfo = request.getPathInfo();
        PrintWriter out = response.getWriter();
        
        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                // GET /api/odontologos - Obtener todos los odontólogos
                List<Odontologo> odontologos = controller.getOdontologos();
                out.println(gson.toJson(odontologos));
            } else {
                // GET /api/odontologos/{id} - Obtener odontólogo por ID
                String[] pathParts = pathInfo.split("/");
                if (pathParts.length == 2) {
                    int id = Integer.parseInt(pathParts[1]);
                    Odontologo odontologo = controller.getOdontologo(id);
                    if (odontologo != null) {
                        out.println(gson.toJson(odontologo));
                    } else {
                        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                        Map<String, String> error = new HashMap<>();
                        error.put("error", "Odontólogo no encontrado");
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
        
        // Configurar CORS
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setContentType("application/json;charset=UTF-8");
        
        PrintWriter out = response.getWriter();
        
        try {
            // Obtener parámetros del formulario
            String dni = request.getParameter("dni");
            String nombre = request.getParameter("nombre");
            String apellido = request.getParameter("apellido");
            String telefono = request.getParameter("telefono");
            String direccion = request.getParameter("direccion");
            String fechaNacStr = request.getParameter("fecha_nac");
            String especialidad = request.getParameter("especialidad");
            String usuarioIdStr = request.getParameter("usuario_id");
            String horarioIdStr = request.getParameter("horario_id");
            
            // Validar parámetros requeridos
            if (dni == null || nombre == null || apellido == null || especialidad == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                Map<String, String> error = new HashMap<>();
                error.put("error", "Faltan parámetros requeridos");
                out.println(gson.toJson(error));
                return;
            }
            
            // Crear odontólogo
            Odontologo odontologo = new Odontologo();
            odontologo.setDni(dni);
            odontologo.setNombre(nombre);
            odontologo.setApellido(apellido);
            odontologo.setTelefono(telefono);
            odontologo.setDireccion(direccion);
            odontologo.setEspecialidad(especialidad);
            
            // Procesar fecha de nacimiento
            if (fechaNacStr != null && !fechaNacStr.trim().isEmpty()) {
                try {
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    Date fechaNac = sdf.parse(fechaNacStr);
                    odontologo.setFecha_nac(fechaNac);
                } catch (Exception e) {
                    // Si hay error en la fecha, continuar sin fecha
                }
            }
            
            // Asignar usuario si se proporciona
            if (usuarioIdStr != null && !usuarioIdStr.trim().isEmpty()) {
                try {
                    int usuarioId = Integer.parseInt(usuarioIdStr);
                    Usuario usuario = controller.getUsuario(usuarioId);
                    if (usuario != null) {
                        odontologo.setUsuario(usuario);
                    }
                } catch (NumberFormatException e) {
                    // Si hay error en el ID, continuar sin usuario
                }
            }
            
            // Asignar horario si se proporciona
            if (horarioIdStr != null && !horarioIdStr.trim().isEmpty()) {
                try {
                    int horarioId = Integer.parseInt(horarioIdStr);
                    Horario horario = controller.getHorario(horarioId);
                    if (horario != null) {
                        odontologo.setHorario(horario);
                    }
                } catch (NumberFormatException e) {
                    // Si hay error en el ID, continuar sin horario
                }
            }
            
            controller.crearOdontologo(odontologo);
            
            Map<String, String> success = new HashMap<>();
            success.put("message", "Odontólogo creado exitosamente");
            out.println(gson.toJson(success));
            
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al crear odontólogo: " + e.getMessage());
            out.println(gson.toJson(error));
        }
    }
    
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        // Configurar CORS
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
                error.put("error", "ID de odontólogo requerido");
                out.println(gson.toJson(error));
                return;
            }
            
            int id = Integer.parseInt(idStr);
            Odontologo odontologo = controller.getOdontologo(id);
            
            if (odontologo == null) {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                Map<String, String> error = new HashMap<>();
                error.put("error", "Odontólogo no encontrado");
                out.println(gson.toJson(error));
                return;
            }
            
            // Actualizar campos si se proporcionan
            String dni = request.getParameter("dni");
            String nombre = request.getParameter("nombre");
            String apellido = request.getParameter("apellido");
            String telefono = request.getParameter("telefono");
            String direccion = request.getParameter("direccion");
            String fechaNacStr = request.getParameter("fecha_nac");
            String especialidad = request.getParameter("especialidad");
            String usuarioIdStr = request.getParameter("usuario_id");
            String horarioIdStr = request.getParameter("horario_id");
            
            if (dni != null) odontologo.setDni(dni);
            if (nombre != null) odontologo.setNombre(nombre);
            if (apellido != null) odontologo.setApellido(apellido);
            if (telefono != null) odontologo.setTelefono(telefono);
            if (direccion != null) odontologo.setDireccion(direccion);
            if (especialidad != null) odontologo.setEspecialidad(especialidad);
            
            // Procesar fecha de nacimiento
            if (fechaNacStr != null && !fechaNacStr.trim().isEmpty()) {
                try {
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    Date fechaNac = sdf.parse(fechaNacStr);
                    odontologo.setFecha_nac(fechaNac);
                } catch (Exception e) {
                    // Si hay error en la fecha, mantener la fecha actual
                }
            }
            
            // Actualizar usuario si se proporciona
            if (usuarioIdStr != null && !usuarioIdStr.trim().isEmpty()) {
                try {
                    int usuarioId = Integer.parseInt(usuarioIdStr);
                    Usuario usuario = controller.getUsuario(usuarioId);
                    if (usuario != null) {
                        odontologo.setUsuario(usuario);
                    }
                } catch (NumberFormatException e) {
                    // Si hay error en el ID, mantener el usuario actual
                }
            }
            
            // Actualizar horario si se proporciona
            if (horarioIdStr != null && !horarioIdStr.trim().isEmpty()) {
                try {
                    int horarioId = Integer.parseInt(horarioIdStr);
                    Horario horario = controller.getHorario(horarioId);
                    if (horario != null) {
                        odontologo.setHorario(horario);
                    }
                } catch (NumberFormatException e) {
                    // Si hay error en el ID, mantener el horario actual
                }
            }
            
            controller.editarOdontologo(odontologo);
            
            Map<String, String> success = new HashMap<>();
            success.put("message", "Odontólogo actualizado exitosamente");
            out.println(gson.toJson(success));
            
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al actualizar odontólogo: " + e.getMessage());
            out.println(gson.toJson(error));
        }
    }
    
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        // Configurar CORS
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
                error.put("error", "ID de odontólogo requerido");
                out.println(gson.toJson(error));
                return;
            }
            
            int id = Integer.parseInt(idStr);
            controller.borrarOdontologo(id);
            
            Map<String, String> success = new HashMap<>();
            success.put("message", "Odontólogo eliminado exitosamente");
            out.println(gson.toJson(success));
            
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al eliminar odontólogo: " + e.getMessage());
            out.println(gson.toJson(error));
        }
    }
    
    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        // Configurar CORS para preflight requests
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setStatus(HttpServletResponse.SC_OK);
    }
} 