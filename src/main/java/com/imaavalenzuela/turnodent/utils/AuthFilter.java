package com.imaavalenzuela.turnodent.utils;

import java.io.IOException;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebFilter(filterName = "AuthFilter", urlPatterns = {
    "/index.jsp",
    "/views/pages/*",
})
public class AuthFilter implements Filter {

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        HttpSession session = request.getSession(false);
        boolean loggedIn = session != null && session.getAttribute("Usuario Logeado") != null;

        if (loggedIn) {
            chain.doFilter(req, res);
        } else {
            request.setAttribute("error", "Debes iniciar sesión para acceder");
            request.getRequestDispatcher("/views/pages/auth/login.jsp").forward(request, response);
        }
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {}

    @Override
    public void destroy() {}
}

