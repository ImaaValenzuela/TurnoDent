<%@page contentType="text/html" pageEncoding="UTF-8"%>

<div class="container-fluid">
    <form class="user" action="/AltaUsuarioServlet" method="POST">
                                <div class="form-group col">
                                    <div class="col-sm-6 mb-3">
                                        <input type="text" class="form-control form-control-user" id="nombreusu" name="nombreusu"
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