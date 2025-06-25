package com.imaavalenzuela.turnodent.servlets;

import com.imaavalenzuela.turnodent.logica.Controller;
import com.imaavalenzuela.turnodent.logica.Usuario;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet(name = "ApiLoginServlet", urlPatterns = {"/api/login"})
public class ApiLoginServlet extends HttpServlet {
    
    private Controller controller = new Controller();
    private Gson gson = new GsonBuilder().setPrettyPrinting().create();
    
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
            String usuario = request.getParameter("usuario");
            String contrasenia = request.getParameter("contrasenia");
            
            if (usuario == null || contrasenia == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                Map<String, String> error = new HashMap<>();
                error.put("error", "Usuario y contraseña son requeridos");
                out.println(gson.toJson(error));
                return;
            }
            
            boolean validado = controller.comprobarIngreso(usuario, contrasenia);
            
            if (validado) {
                // Obtener información completa del usuario
                List<Usuario> usuarios = controller.getUsuarios();
                Usuario usuarioEncontrado = null;
                
                for (Usuario usu : usuarios) {
                    if (usu.getNombre_usuario().equals(usuario)) {
                        usuarioEncontrado = usu;
                        break;
                    }
                }
                
                if (usuarioEncontrado != null) {
                    // Crear sesión
                    HttpSession session = request.getSession();
                    session.setAttribute("usuario_id", usuarioEncontrado.getIdUsuario());
                    session.setAttribute("usuario_nombre", usuarioEncontrado.getNombre_usuario());
                    session.setAttribute("usuario_rol", usuarioEncontrado.getRol());
                    
                    // Respuesta exitosa
                    Map<String, Object> success = new HashMap<>();
                    success.put("success", true);
                    success.put("message", "Login exitoso");
                    success.put("usuario", usuarioEncontrado.getNombre_usuario());
                    success.put("rol", usuarioEncontrado.getRol());
                    success.put("id", usuarioEncontrado.getIdUsuario());
                    success.put("session_id", session.getId());
                    
                    out.println(gson.toJson(success));
                } else {
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    Map<String, String> error = new HashMap<>();
                    error.put("error", "Error al obtener información del usuario");
                    out.println(gson.toJson(error));
                }
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                Map<String, String> error = new HashMap<>();
                error.put("error", "Usuario o contraseña incorrectos");
                out.println(gson.toJson(error));
            }
            
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error interno del servidor: " + e.getMessage());
            out.println(gson.toJson(error));
        }
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        // Configurar CORS
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setContentType("application/json;charset=UTF-8");
        
        PrintWriter out = response.getWriter();
        
        try {
            HttpSession session = request.getSession(false);
            
            if (session != null && session.getAttribute("usuario_id") != null) {
                // Usuario está logueado
                Map<String, Object> userInfo = new HashMap<>();
                userInfo.put("logged_in", true);
                userInfo.put("usuario", session.getAttribute("usuario_nombre"));
                userInfo.put("rol", session.getAttribute("usuario_rol"));
                userInfo.put("id", session.getAttribute("usuario_id"));
                
                out.println(gson.toJson(userInfo));
            } else {
                // Usuario no está logueado
                Map<String, Object> userInfo = new HashMap<>();
                userInfo.put("logged_in", false);
                
                out.println(gson.toJson(userInfo));
            }
            
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error interno del servidor: " + e.getMessage());
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
            HttpSession session = request.getSession(false);
            
            if (session != null) {
                session.invalidate();
                
                Map<String, String> success = new HashMap<>();
                success.put("message", "Logout exitoso");
                out.println(gson.toJson(success));
            } else {
                Map<String, String> error = new HashMap<>();
                error.put("error", "No hay sesión activa");
                out.println(gson.toJson(error));
            }
            
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error interno del servidor: " + e.getMessage());
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