package com.imaavalenzuela.turnodent.servlets;

import com.imaavalenzuela.turnodent.logica.Controller;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "ApiTestServlet", urlPatterns = {"/api/test"})
public class ApiTestServlet extends HttpServlet {
    
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
        
        PrintWriter out = response.getWriter();
        Map<String, Object> result = new HashMap<>();
        
        try {
            // Probar conexión a la base de datos
            int userCount = controller.getUsuarios().size();
            
            result.put("status", "success");
            result.put("message", "Conexión a MySQL exitosa");
            result.put("database", "turnodent");
            result.put("userCount", userCount);
            result.put("timestamp", System.currentTimeMillis());
            
            out.println(gson.toJson(result));
            
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            result.put("status", "error");
            result.put("message", "Error de conexión a MySQL");
            result.put("error", e.getMessage());
            result.put("timestamp", System.currentTimeMillis());
            
            out.println(gson.toJson(result));
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