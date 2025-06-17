package com.imaavalenzuela.turnodent.servlets;

import com.imaavalenzuela.turnodent.logica.Controller;
import com.imaavalenzuela.turnodent.logica.Usuario;
import com.imaavalenzuela.turnodent.utils.Seguridad;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet(name = "EditarUsuarioServlet", urlPatterns = {"/EditarUsuarioServlet"})
public class EditarUsuarioServlet extends HttpServlet {
    
    Controller controller = new Controller();
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        int id = Integer.parseInt(request.getParameter("id"));
        Usuario usuario = controller.getUsuario(id);
        
        HttpSession session = request.getSession();
        session.setAttribute("edicionUsuario", usuario);
        
        response.sendRedirect(request.getContextPath() + "/views/pages/usuario/editarUsuario.jsp");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
                String nombreUsuario = request.getParameter("nombreUsuario");
        String contrasenia = request.getParameter("contrasenia");
        String rol = request.getParameter("rol");
        
        String hashPassword = Seguridad.hashPassword(contrasenia);
        
        Usuario usuarioEditado = (Usuario) request.getSession().getAttribute("edicionUsuario");
        
        usuarioEditado.setNombre_usuario(nombreUsuario);
        usuarioEditado.setContrasenia(hashPassword);
        usuarioEditado.setRol(rol);
        
        controller.editarUsuario(usuarioEditado);
        
        response.sendRedirect("UsuarioServlet");
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
