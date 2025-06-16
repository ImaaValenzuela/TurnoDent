/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.imaavalenzuela.turnodent.servlets;

import com.imaavalenzuela.turnodent.logica.Controller;
import com.imaavalenzuela.turnodent.logica.Usuario;
import com.imaavalenzuela.turnodent.utils.Seguridad;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author HP
 */
@WebServlet(name = "UsuarioServlet", urlPatterns = {"/UsuarioServlet"})
public class UsuarioServlet extends HttpServlet {
    
    Controller controller = new Controller();
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
       
        }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        List<Usuario> usuarios = new ArrayList<Usuario>();
        
        usuarios = controller.getUsuarios();
        
        HttpSession session = request.getSession();
        session.setAttribute("listaUsuarios", usuarios);
        
        response.sendRedirect(request.getContextPath() + "/views/pages/usuario/verUsuarios.jsp");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String nombreUsuario = request.getParameter("nombreUsuario");
        String contrasenia = request.getParameter("contrasenia");
        String rol = request.getParameter("rol");
        
        String hashPassword = Seguridad.hashPassword(contrasenia);
        
        controller.crearUsuario(nombreUsuario, hashPassword, rol);
        
        response.sendRedirect("index.jsp");
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
