function validarEmail(email) {
    var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
}

function mostrarNombreUsuario() {
    var session = localStorage.getItem("x");
    if (session == null) {
        // El usuario no ha iniciado sesión
        $("#nombreUsuario").html("Usuario");
    } else {
        // El usuario ha iniciado sesión, muestra su nombre de usuario
        $("#nombreUsuario").text(session);
    }
}

$(document).ready(function () {
    var session = localStorage.getItem("x");

    if (session != null) {
        mostrarNombreUsuario();
    }

    $("#btnRegistrar").click(function () {
        var email = $("#txtEmail").val()
        var nombre = $("#txtNombre").val()
        var contra = $("#txtContra").val()
        var matchFound = false;
        if (email == "" || nombre == "" || contra == "") {
            $("#capa").html("<p>Error: Campos Vacíos</p>")
        } else {
            if (!validarEmail(email)) {
                $("#capa").html("<p>Error: Email no válido</p>")
            } else {
                var objeto = {
                    correo: email,
                    nombre: nombre,
                    password: contra
                }
                $.ajax({
                    type: 'GET',
                    url: 'https://645e934d8d0810029302d9cb.mockapi.io/Arte',
                    beforeSend: function () {
                        $("#capa").html("<p>Registrando usuario...</p>")
                    },
                    error: function () {},
                    success: function (data) {
                        $.each(data, function (index, obj) {
                            if (obj.correo === email) {
                                matchFound = true;
                            }
                        });
                        if (matchFound) {
                            $("#capa").html("<p>El usuario: " + objeto.correo + " ya existe</p>")
                        } else {
                            $.ajax({
                                type: 'POST',
                                data: objeto,
                                url: 'https://645e934d8d0810029302d9cb.mockapi.io/Arte',
                                beforeSend: function () {
                                    $("#capa").html("<p>Registrando usuario...</p>")
                                },
                                error: function (xhr, status, error) {
                                    console.log(error)
                                },
                                success: function (data) {
                                    $("#capa").html("<p>¡Registrado exitosamente!</p>")
                                }
                            })
                        }
                    }
                })
            }
        }
    })

    $("#btnSesion").click(function () {
        var email = $("#txtEmail").val()
        var contra = $("#txtContra").val()
        var matchFound = false;
        if (email == "" || contra == "") {
            $("#capa").html("<p>Error: Campos Vacíos</p>")
        } else {
            if (!validarEmail(email)) {
                $("#capa").html("<p>Error: Email no válido</p>")
            } else {
                var objeto = {
                    correo: email,
                    password: contra
                }
                $.ajax({
                    type: 'GET',
                    url: 'https://645e934d8d0810029302d9cb.mockapi.io/Arte',
                    beforeSend: function () {
                        $("#capa").html("<p>Espere</p>")
                    },
                    error: function () {},
                    success: function (data) {
                        $.each(data, function (index, obj) {
                            if (obj.correo === email && obj.password === contra) {
                                matchFound = true;
                            }
                        });
    
                        if (matchFound) {
                            session = objeto.correo
                            localStorage.setItem("x", session);
                            mostrarNombreUsuario();
                            var session = localStorage.getItem("x");
                            console.log(session)
    
                            if(session == null){
                                $("#capa").html("<p>Debe iniciar sesión</p>")
                                window.location.href = "index.html"
                            }
                            else{
                                $("#capa").html("<p>Sesion iniciada.</p>")
                                window.location.href = "Sesioniniciada.html"
                                // Actualiza el nombre de usuario en el menú
                                mostrarNombreUsuario();
                            }
                        } else {
                            $("#capa").html("<p>La combinación del usuario y contraseña NO coinciden... ¡Crea una cuenta!</p>")
                        }
                    }
                })
            }
        }
    })
    $("#btnRecuperar").click(function () {
        var email = $("#txtEmail").val()
        var matchFound = false;
        var objeto_actual = null;
        if (email == "") {
            $("#capa").html("<p>Error: Campos Vacíos</p>")
        } else {
            if (!validarEmail(email)) {
                $("#capa").html("<p>Error: Email no válido</p>")
            } else {
                var objeto = {
                    correo: email
                }
                $.ajax({
                    type: 'GET',
                    url: 'https://645e934d8d0810029302d9cb.mockapi.io/Arte',
                    beforeSend: function () {
                        $("#capa").html("<p>Espere</p>")
                    },
                    error: function () {
                        //mostramos el error
                    },
                    success: function (data) {
                        $("#capa").html("<h1>Resultados:</h1>")
                        $.each(data, function (index, obj) {
                            if (obj.correo === email) {
                                matchFound = true;
                                objeto_actual = obj
                            }
                        });
                        if (matchFound) {
                            $("#capa").append("<p>Correo: " + objeto_actual.correo + "</p>")
                            $("#capa").append("<p>Contraseña: " + objeto_actual.password + "</p>")

                        } else {
                            $("#capa").html("<p>El usuario: " + objeto.correo + " No existe... ¡Create una cuenta!</p>")
                        }
                    }
                })
            }
        }
    })
    $("#btnCerrarSesion").click(function () {
        // Remueve la sesión almacenada en el almacenamiento local
        localStorage.removeItem("x");
        $("#capa").html("<h1>Sesión cerrada</h1>")
        // Actualiza el nombre de usuario en el menú
        $("#nombreUsuario").text("Invitado");
        // Redirige al usuario a la página de inicio de sesión
        window.location.href = "index.html";

    });
    
});
