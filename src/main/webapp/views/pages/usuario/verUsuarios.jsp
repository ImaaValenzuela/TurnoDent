<%@page import="com.imaavalenzuela.turnodent.logica.Usuario"%>
<%@page import="java.util.List"%>
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
                        <h1 class="h3 mb-0 text-gray-800">Lista de Usuarios Activos</h1>
                    </div>
                
                <div class="container-fluid">
!-- DataTales Example -->
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Usuarios</h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Nombre de Usuario</th>
                                            <th>Rol</th>
                                            <th style="width: 210px">Acción</th>
                                        </tr>
                                    </thead>
                                   
                                    <% 
                                        List<Usuario> listaUsuarios = (List) request.getSession().getAttribute("listaUsuarios");
                                    %>
                                    
                                    <tbody>
                                        <% for (Usuario usu : listaUsuarios) {%>
                                        <tr>
                                            <td id="id_usu<%=usu.getIdUsuario()%>"><%=usu.getIdUsuario() %>   </td>
                                            <td><%=usu.getNombre_usuario() %></td>
                                            <td><%=usu.getRol()%></td>
                                            
                                            <td style="display: flex; width: 230px;">
                                                <form name="eliminar" action="${pageContext.request.contextPath}/EliminaUsuarioServlet" method="POST">
                                                            <button type="submit" class="btn btn-primary btn-user btn-block" style="background-color:red; margin-right: 5px; "> 
                                                              Eliminar
                                                            </button>
                                                            <input type="hidden" name="id" value="<%=usu.getIdUsuario()%>"> 
                                                </form>  
                                                 <form name="editar" action="${pageContext.request.contextPath}/EditarUsuarioServlet" method="GET">
                                                            <button type="submit" class="btn btn-primary btn-user btn-block"; style="margin-left: 5px;"> 
                                                              Editar
                                                            </button>
                                                            <input type="hidden" name="id" value="<%=usu.getIdUsuario()%>">
                                                </form>                                             
                                            </td>
                                        </tr>      
                                        <% } %>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>

            <%@ include file="../../layout/footer.jsp" %>
        </div>
    </div>
    <%@ include file="../../layout/logoutModal.jsp" %>
    <%@ include file="../../layout/scripts.jsp" %>

</body>
</html>
