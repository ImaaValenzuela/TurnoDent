<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-solid fa-tooth"></i>
                </div>
                <div class="sidebar-brand-text mx-3">TurnoDent<sup>Admin</sup></div>
            </a>

            <!-- Divider -->
            <hr class="sidebar-divider my-0">

            <!-- Nav Item - Dashboard -->
            <li class="nav-item active">
                <a class="nav-link" href="#">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Menú</span></a>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider">

            <!-- Heading -->
            <div class="sidebar-heading">
                Gestión
            </div>

            <!-- Nav Item - Pages Collapse Menu -->
            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseOdontologo"
                    aria-expanded="true" aria-controls="collapseOdontologo">
                    <i class="fas fa-solid fa-user-nurse"></i>
                    <span>Odontólogos</span>
                </a>
                <div id="collapseOdontologo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">Acciones:</h6>
                        <a class="collapse-item" href="">Ver Odontólogos</a>
                        <a class="collapse-item" href="">Alta Odontólogos</a>
                    </div>
                </div>
            </li>

            <!-- Nav Item - Utilities Collapse Menu -->
            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePaciente"
                    aria-expanded="true" aria-controls="collapsePaciente">
                    <i class="fas fa-solid fa-users"></i>
                    <span>Pacientes</span>
                </a>
                <div id="collapsePaciente" class="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">Acciones:</h6>
                        <a class="collapse-item" href="">Ver Pacientes</a>
                        <a class="collapse-item" href="">Alta Pacientes</a>
                    </div>
                </div>
            </li>

                        <!-- Nav Item - Utilities Collapse Menu -->
            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUser"
                    aria-expanded="true" aria-controls="collapseUser">
                    <i class="fas fa-solid fa-user"></i>
                    <span>Usuarios</span>
                </a>
                <div id="collapseUser" class="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">Acciones:</h6>
                        <a class="collapse-item" href="UsuarioServlet">Ver Usuarios</a>
                        <a class="collapse-item" href="${pageContext.request.contextPath}/views/pages/usuario/altaUsuario.jsp">Alta Usuarios</a>
                    </div>
                </div>
            </li>
        </ul>
        <!-- End of Sidebar -->