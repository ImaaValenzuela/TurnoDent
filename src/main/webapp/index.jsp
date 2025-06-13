<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<%@include file="views/layout/head.jsp" %>
<body id="page-top">

    <div id="wrapper">
        <%@include file="views/layout/sidebar.jsp" %>

        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                <%@include file="views/layout/topbar.jsp" %>
                <%@include file="views/pages/home.jsp" %>
            </div>

            <%@include file="views/layout/footer.jsp" %>
        </div>
    </div>

    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>

    <%@include file="views/layout/logoutModal.jsp" %>
    <%@include file="views/layout/scripts.jsp" %>

</body>
</html>