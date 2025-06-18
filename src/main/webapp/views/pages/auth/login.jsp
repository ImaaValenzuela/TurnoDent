<%@ page import="com.imaavalenzuela.turnodent.logica.Usuario" %>
<%@ include file="../../layout/head.jsp" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
    <title>Ingreso Clínica</title>
    <style>
        .full-height-center {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f8f9fc; /* fondo claro */
        }
    </style>
</head>
<body id="page-top">

    <div class="full-height-center">
        <div class="card o-hidden border-0 shadow-lg" style="width: 100%; max-width: 500px;">
            <div class="card-body p-5">
                <div class="text-center mb-4">
                    <h1 class="h4 text-gray-900">Ingreso Clínica</h1>
                </div>

                <form class="user" action="${pageContext.request.contextPath}/LoginServlet" method="POST">
                    <div class="form-group">
                        <input type="text" class="form-control form-control-user"
                               id="usuario" name="usuario" placeholder="Usuario" required>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control form-control-user"
                               id="contrasenia" name="contrasenia" placeholder="Contraseña" required>
                    </div>
                    <button type="submit" class="btn btn-primary btn-user btn-block">
                        Ingresar
                    </button>
                </form>

                <% 
                    String error = (String) request.getAttribute("error");
                    if (error != null && !error.isEmpty()) { 
                %>
                    <script>
                        Toastify({
                            text: `
                                <div style="display: flex; align-items: center;">
                                    <span style="font-size: 1.2em; margin-right: 10px;">⚠️</span>
                                    <span> <%= error.replace("\"", "\\\"") %> </span>
                                    <a href='login.jsp' style='
                                        margin-left: auto;
                                        margin-right: 5px;
                                        padding: 4px 10px;
                                        background-color: #ffffff20;
                                        border: 1px solid #fff;
                                        color: #fff;
                                        border-radius: 5px;
                                        font-weight: bold;
                                        text-decoration: none;
                                        transition: background 0.3s;
                                    ' onmouseover="this.style.backgroundColor='#ffffff40'" onmouseout="this.style.backgroundColor='#ffffff20'">
                                        Iniciar sesión
                                    </a>
                                </div>
                            `,
                            duration: 3000,
                            gravity: "top",
                            position: "right",
                            backgroundColor: "#e74c3c",
                            stopOnFocus: true,
                            escapeMarkup: false,
                            style: {
                                borderRadius: "8px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                                padding: "14px 16px",
                                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                fontSize: "14px",
                                color: "#fff"
                            }
                        }).showToast();
                    </script>

                <% } %>
            </div>
        </div>
    </div>

    <%@ include file="../../layout/logoutModal.jsp" %>
    <%@ include file="../../layout/scripts.jsp" %>

</body>
</html>
