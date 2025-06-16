<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<%@ include file="../../layout/head.jsp" %>
<body id="page-top">

    <div id="wrapper">
        <%@ include file="../../layout/sidebar.jsp" %>

        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                <%@ include file="../../layout/topbar.jsp" %>
                                    <div class="d-sm-flex align-items-center justify-content-between m-4">
                        <h1 class="h3 mb-0 text-gray-800">Alta de Usuario</h1>
                    </div>
                
                <div class="container-fluid">
                    <form class="user" action="${pageContext.request.contextPath}/UsuarioServlet" method="POST">
                                                        <div class="form-group col">
                                    <div class="col-sm-6 mb-3">
                                        <input type="text" class="form-control form-control-user" id="nombreUsuario" name="nombreUsuario"
                                            placeholder="Nombre Usuario">
                                    </div>
                                    <div class="col-sm-6 mb-3">
                                        <input type="password" class="form-control form-control-user" id="contrasenia" name ="contrasenia"
                                            placeholder="Contraseña">
                                    </div>
                                    <div class="col-sm-6 mb-3">
                                        <input type="text" class="form-control form-control-user" id="rol" name="rol"
                                            placeholder="Rol">
                                    </div>                                   
                                                                     
                                </div>
                                
                                <button class="btn btn-primary btn-user btn-block" type="submit">
                                    Crear Usuario
                                </button>
                    </form>
                </div>   
            </div>

            <%@ include file="../../layout/footer.jsp" %>
        </div>
    </div>
    <%@ include file="../../layout/logoutModal.jsp" %>
    <%@ include file="../../layout/scripts.jsp" %>

</body>
</html>
