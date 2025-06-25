package com.imaavalenzuela.turnodent.servlets;

import com.imaavalenzuela.turnodent.logica.Controller;
import com.imaavalenzuela.turnodent.logica.Usuario;
import com.imaavalenzuela.turnodent.utils.Seguridad;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "ApiUsuarioServlet", urlPatterns = {"/api/usuarios/*"})
public class ApiUsuarioServlet extends HttpServlet {
    
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
                // GET /api/usuarios - Obtener todos los usuarios
                List<Usuario> usuarios = controller.getUsuarios();
                out.println(gson.toJson(usuarios));
            } else {
                // GET /api/usuarios/{id} - Obtener usuario por ID
                String[] pathParts = pathInfo.split("/");
                if (pathParts.length == 2) {
                    int id = Integer.parseInt(pathParts[1]);
                    Usuario usuario = controller.getUsuario(id);
                    if (usuario != null) {
                        out.println(gson.toJson(usuario));
                    } else {
                        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                        Map<String, String> error = new HashMap<>();
                        error.put("error", "Usuario no encontrado");
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
            String nombreUsuario = request.getParameter("nombreUsuario");
            String contrasenia = request.getParameter("contrasenia");
            String rol = request.getParameter("rol");
            
            if (nombreUsuario == null || contrasenia == null || rol == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                Map<String, String> error = new HashMap<>();
                error.put("error", "Faltan parámetros requeridos");
                out.println(gson.toJson(error));
                return;
            }
            
            String hashPassword = Seguridad.hashPassword(contrasenia);
            controller.crearUsuario(nombreUsuario, hashPassword, rol);
            
            Map<String, String> success = new HashMap<>();
            success.put("message", "Usuario creado exitosamente");
            out.println(gson.toJson(success));
            
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al crear usuario: " + e.getMessage());
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
            String nombreUsuario = request.getParameter("nombreUsuario");
            String contrasenia = request.getParameter("contrasenia");
            String rol = request.getParameter("rol");
            String idStr = request.getParameter("idUsuario");
            
            if (idStr == null || nombreUsuario == null || rol == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                Map<String, String> error = new HashMap<>();
                error.put("error", "Faltan parámetros requeridos");
                out.println(gson.toJson(error));
                return;
            }
            
            int id = Integer.parseInt(idStr);
            Usuario usuario = controller.getUsuario(id);
            
            if (usuario == null) {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                Map<String, String> error = new HashMap<>();
                error.put("error", "Usuario no encontrado");
                out.println(gson.toJson(error));
                return;
            }
            
            usuario.setNombre_usuario(nombreUsuario);
            usuario.setRol(rol);
            
            if (contrasenia != null && !contrasenia.trim().isEmpty()) {
                String hashPassword = Seguridad.hashPassword(contrasenia);
                usuario.setContrasenia(hashPassword);
            }
            
            controller.editarUsuario(usuario);
            
            Map<String, String> success = new HashMap<>();
            success.put("message", "Usuario actualizado exitosamente");
            out.println(gson.toJson(success));
            
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al actualizar usuario: " + e.getMessage());
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
                error.put("error", "ID de usuario requerido");
                out.println(gson.toJson(error));
                return;
            }
            
            int id = Integer.parseInt(idStr);
            controller.borrarUsuario(id);
            
            Map<String, String> success = new HashMap<>();
            success.put("message", "Usuario eliminado exitosamente");
            out.println(gson.toJson(success));
            
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al eliminar usuario: " + e.getMessage());
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