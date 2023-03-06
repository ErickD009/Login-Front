


//function LoginCygnus(url, data) {

//    //alert(url);
//    fetch(url, {
//        method: 'POST', body: data
//    })
//        .then(res => res.json())
//        .then(
//            (result) => {
//                /*console.log('datos',result);*/
//                if (result.estadoSession == 0) {
//                    document.getElementById('msjeAcceso').innerHTML = result.mensajeSession;
//                    document.getElementById('alertPass').style.display = 'block';
//                    $("#alertPass").fadeOut(3000);
//                } else {
//                    //document.getElementById('uxs').value = result.uxsUsuarioSession;
//                    //document.getElementById('nombre').value = result.nombreUsuarioSession;
//                    //document.getElementById('token').value = result.tokenSession;
//                    console.log('dato', result.rutUsuarioSession, result.usrUsuarioSession, result.uxsUsuarioSession);
//                    var rut = result.rutUsuarioSession;
//                    var usr = result.usrUsuarioSession;
//                    var uxs = result.uxsUsuarioSession;
//                    var nombre = result.nombreUsuarioSession;
//                    var token = result.tokenSession;

//                    inicio(rut, usr, uxs, nombre, token);
//                    //traeMenu();
//                }
//            },
//            (error) => {
//                alert('error: ' + error);
//            }
//        )
//        .catch((error) => console.log(error))
//}


//function login() {

//    var user = document.getElementById('txtUsuario').value;
//    var pass = document.getElementById('txtPass').value;
//    var sistema = 5; // cambiar id para el sistema que se cree

//    const data = new FormData();
//    data.append('usuario', user);
//    data.append('pass', pass);
//    data.append('sistema', sistema);

//    //var url = host() + 'Usuario/validaUsuario';
//    //var url = origen() + 'Usuario/validaUsuario';
//    var url = generico() + 'Usuario/validaUsuario ';
//    /*var url = host() + 'Usuario/Usuario_Traer_Sistemas';*/

//    /*console.log(url, data);*/
//    LoginCygnus(url, data);

//}

//function login_E() {
//    var sistemas = []
//    var user = document.getElementById('txtUsuario').value;
//    var pass = document.getElementById('txtPass').value;
//    var url = host() + 'Usuario/Usuario_Traer_Sistemas';

//    var myHeaders = new Headers();
//    myHeaders.append("Content-Type", "application/json");

//    var raw = JSON.stringify({
//        "USR_LOGIN": user,
//        "USR_PASSWORD": pass
//    });

//    var requestOptions = {
//        method: 'POST',
//        headers: myHeaders,
//        body: raw,
//        redirect: 'follow'
//    };

//    fetch(url, requestOptions)
//        .then(response => response.json())
//        .then(result => {
//            console.log(result);
//            result = sistemas;
//            if (error instanceof Error && error.message.includes("400")) {
//                document.getElementById("alertPass_2").style.display = "block";
//                document.getElementById("msjeAcceso").innerHTML = "Error en sus credenciales, verifiquelas y vuelva a intentarlo";
//            } else {
//                window.location.href = 'https://localhost:44304/InicioB/Index';
//            }
//        })
//        .catch(error => console.log('error', error));


//        /*window.location.href = 'https://localhost:44304/InicioB/Index';*/

//}

//.then(result => {
        //    /*console.log(result);*/
        //    var parsedResult = JSON.parse(result);
        //    var uxS_AUTOID = parsedResult[0].uxS_AUTOID;
        //    var siS_AUTOID = parsedResult[0].siS_AUTOID;
        //    var siS_DESCRIPCION = parsedResult[0].siS_DESCRIPCION;
        //    var siS_URL = parsedResult[0].siS_URL;
        //    var siS_TOOLTIP = parsedResult[0].siS_TOOLTIP;
        //    var siS_ICON_URL = parsedResult[0].siS_ICON_URL;
        //    window.location.href = 'https://localhost:44304/InicioB/Index';
        //    console.log(uxS_AUTOID);
        //    console.log(siS_AUTOID);
        //    console.log(siS_URL);
        //    console.log(siS_ICON_URL);
        //    console.log(siS_DESCRIPCION);
        //    console.log(siS_TOOLTIP);

        //})

function login_E() {
    var sistemas = []
    var user = document.getElementById('txtUsuario').value;
    var pass = document.getElementById('txtPass').value;
    var url = host() + 'Usuario/Usuario_Traer_Sistemas';

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "USR_LOGIN": user,
        "USR_PASSWORD": pass
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error("Bad request");
            }
            return response.json();
        })
        .then(result => {
            console.log(result);
            result = sistemas;
            if (result.length == 0) {
                document.getElementById("alertPass_2").style.display = "block";
                document.getElementById("msjeAcceso").innerHTML = "No se encontraron datos para este usuario y contraseña.";
            } else {
                window.location.href = 'https://localhost:44304/InicioB/Index';
            }
        })
        .catch(error => {
            console.log('error', error);
            document.getElementById("alertPass_2").style.display = "block";
            document.getElementById("msjeAcceso").innerHTML = "Se ha producido un error en la solicitud: " + error.message;
        });
}


function ActualizarPass() {

    var url = host() + 'Usuario/Usuario_Actualizar_Clave'
    var USR_PASS1 = document.getElementById("txtNewPass").value;
    var USR_PASS2 = document.getElementById("txtNewPassRep").value;
    var USR_RUT = document.getElementById("txtEnRut").value;
    var mensaje = document.getElementById("divMensaje3");
    var mensaje2 = document.getElementById("divMensaje4");

    var passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (USR_PASS1 !== USR_PASS2) {
        mensaje.innerHTML = "Las contraseñas no coinciden, intente nuevamente.";
        mensaje.style.display = "block";
        mensaje2.style.display = "none";
    } else if (!passRegex.test(USR_PASS1)) {
        mensaje.innerHTML = "La contraseña debe tener al menos 8 caracteres, contener números y letras.";
        mensaje.style.display = "block";
        mensaje2.style.display = "none";
    } else {
        var USR_PASS = USR_PASS1;
        mensaje.style.display = "none";
        console.log(USR_RUT)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "usR_PASS": USR_PASS,
            "usR_RUT": USR_RUT
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    mensaje2.innerHTML = "La contraseña se actualizó correctamente.";
                    mensaje2.className = "col-md-12 alert alert-success";
                    mensaje2.style.display = "block";
                } else {
                    mensaje2.innerHTML = "Error al actualizar la contraseña."
                    mensaje2.style.display = "block";
                }
            })
            .then(result => console.log(result))
            .catch(error => {
                mensaje2.innerHTML = "Error al conectar con el servicio. Intente nuevamente más tarde.";
                mensaje2.style.display = "block";
                console.log('error', error)
            });
    }
}

function enviarRut() {
    var minutosRecuperacionPass = document.getElementById('txtminutosRecuperacionPass').value;
    const selectEmpresas = document.getElementById("selEmpresas");
    selectEmpresas.innerHTML = "";
    const btnEnviarRut = document.getElementById("btnEnviarRut");
    btnEnviarRut.disabled = true;
    document.getElementById('btnRecuperar').disabled = true;

    const USR_LOGIN = document.getElementById('txtRut').value.replace(/[-.\s]/g, '').trim();

    if (USR_LOGIN.trim().length < 8) {
        const divMensaje = document.getElementById("divMensaje");
        divMensaje.innerHTML = "Por favor, ingrese un rut válido.";
        divMensaje.style.display = "block";
        btnEnviarRut.disabled = false;
        document.getElementById('btnRecuperar').disabled = false;
        return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const url = host() + 'Usuario/Usuario_Traer_Empresas'
    const url2 = host() + 'Usuario/Usuario_Traer_Correo'
    const raw = JSON.stringify({ 'usrlogin': USR_LOGIN });
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(empresa => {
                const option = document.createElement("option");
                option.text = empresa.nombreCliente;
                option.value = empresa.cli_autoid;
                if (empresa.marcaRespuestaCorrecta === 'X') document.getElementById('hdRsp').value = empresa.cli_autoid;
                selectEmpresas.add(option);
            });
        })
        .catch(error => {
            var divMensaje = document.getElementById("divMensaje");
            if (error instanceof TypeError) {
                divMensaje.innerHTML = "No se pudo conectar con el servidor.";
            } else if (error instanceof Error && error.message.includes("400")) {
                divMensaje.innerHTML = "Error. No se encontró el usuario en los registros. ";
                divMensaje.style.display = "block";
                document.getElementById('btnEnviarRut').disabled = true;
                document.getElementById('btnRecuperar').disabled = true;
            } else if (error instanceof Error && error.message.includes("401")) {
                divMensaje.innerHTML = "Vuelva a intentarlo dentro de " + minutosRecuperacionPass + " minutos.";
                divMensaje.style.display = "block";
            } else {
                divMensaje.innerHTML = "Ocurrió un error inesperado.";
                divMensaje.style.display = "block";
            }
        });

    fetch(url2, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            document.getElementById('txtCorreo').value = result.usr_mail;
        })
        .catch(error => console.log('error', error));
    /*document.getElementById('txtRut').value = "";*/
    var divMensaje = document.getElementById("divMensaje");
    divMensaje.style.display = "none";
    var divMensaje2 = document.getElementById("divMensaje2");
    divMensaje2.style.display = "none";
    document.getElementById('btnEnviarRut').disabled = true;
    document.getElementById('btnRecuperar').disabled = false;

}


function recuperarPass() {
    var minutosRecuperacionPass = document.getElementById('txtminutosRecuperacionPass').value;
    var USR_RUT = document.getElementById('txtRut').value;
    var url = host() + 'Usuario/Usuario_Enviar_Correo_Recuperacion'
    var url2 = host() + 'Usuario/Log_Recuperar_Password'
    document.getElementById('btnRecuperar').disabled = true;
    document.getElementById('divMensaje2').style.display = 'none';
    document.getElementById('divMensaje2').innerHTML = '';
    const selectedOption = document.getElementById("selEmpresas").options.selectedIndex;
    if (selectedOption === -1) {
        document.getElementById("divMensaje2").innerHTML = "Debe seleccionar una empresa.";
        document.getElementById("divMensaje2").style.display = "block";
        document.getElementById("selEmpresas").selectedIndex = -1;
        return;
    }
    const cli_autoid = document.getElementById("selEmpresas").options[selectedOption].value;
    const hdRsp = document.getElementById('hdRsp').value;

    var txtCorreo = document.getElementById('txtCorreo').value;
    if (txtCorreo === '') {
        document.getElementById("divMensaje2").innerHTML = "El usuario no tiene correo.";
        document.getElementById("divMensaje2").style.display = "block";
        return;
    }

    //console.log('cli_autoid:', cli_autoid);
    //console.log('hdRsp:', hdRsp);
    if (cli_autoid !== hdRsp) {
        console.log("Los valores no coinciden");
        var myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "usrlogin": USR_RUT
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(url2, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        document.getElementById("divMensaje2").innerHTML = "Datos ingresados inválidos.<br>Deberá volver a intentarlo dentro de " + minutosRecuperacionPass + " minutos";
        document.getElementById("divMensaje2").style.display = "block";


        document.getElementById("selEmpresas").innerHTML = '';

        //document.getElementById("selEmpresas").options.selectedIndex = -1;
        document.getElementById('btnEnviarRut').disabled = false;
        document.getElementById('btnRecuperar').disabled = false;

    } else {
        //console.log("Los valores coinciden");
        var divMensaje2 = document.getElementById("divMensaje1");
        divMensaje2.style.display = "none";

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "para": document.getElementById('txtCorreo').value,
            "rut": USR_RUT
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {

                    document.getElementById("divMensaje2").innerHTML = "Se le ha enviado un correo electrónico con las instrucciones para la recuperación.";
                    document.getElementById("divMensaje2").className = "col-md-12 alert alert-success";
                    document.getElementById("divMensaje2").style.display = "block";
                    //document.getElementById("divMensaje2").style.backgroundColor = "green";
                    //document.getElementById("divMensaje2").style.color = "white";
                    //document.getElementById("divMensaje2").style.display = "inline-block";
                    //document.getElementById("divMensaje2").classList.add("col-md-12", "alert", "alert-success");

                } else {

                    document.getElementById("divMensaje2").innerHTML = "Ha ocurrido un error al enviar el correo electrónico.";
                    document.getElementById("divMensaje2").style.color = "red";
                    document.getElementById("divMensaje2").style.display = "block";
                }
            })
            .catch(error => {

                console.log(error)
                document.getElementById("divMensaje2").innerHTML = "Ha ocurrido un error de red.";
                document.getElementById("divMensaje2").style.color = "red";
                document.getElementById("divMensaje2").style.display = "block";
            });
    }

}



/*Limpiar Modal*/
const myModal = document.getElementById("Modal");
function limpiarModal() {
    /*console.log('Limpiando modal...');*/
    document.getElementById('txtRut').value = '';
    document.getElementById('selEmpresas').innerHTML = '';
    document.getElementById('divMensaje').style.display = 'none';
    document.getElementById('divMensaje2').style.display = 'none';
    document.getElementById('divMensaje2').innerHTML = '';
    document.getElementById("selEmpresas").options.selectedIndex = -1;
    document.getElementById('btnEnviarRut').disabled = false;
    document.getElementById('btnRecuperar').disabled = false;
    //document.getElementById('divMensaje1').style.display = 'none';
    /*document.getElementById('divMensaje1').innerHTML = '';*/
}

// Borrar Mensaje de error del input Rut
document.addEventListener("DOMContentLoaded", function () {
    var USR_LOGIN = document.getElementById("txtRut");
    USR_LOGIN.addEventListener("input", function () {
        var rut = USR_LOGIN.value;
        if (rut.trim().length >= 8) {
            var divMensaje = document.getElementById("divMensaje");
            divMensaje.style.display = "none";
        }
    });
});

function home() {
    var rut = document.getElementById('rut').value;
    var usr = document.getElementById('usr').value;
    var uxs = document.getElementById('uxs').value;
    var nombre = document.getElementById('nombre').value;
    var token = document.getElementById('token').value;

    inicio(rut, usr, uxs, nombre, token);
}

function inicio(rut, usr, uxs, nombre, token) {
    //setTimeout(preguntar, 5000);
    //setInterval(preguntar(), 5000);

    var url = origen() + 'Inicio/Index';

    var form = document.createElement('form');
    document.body.appendChild(form);
    form.method = 'post';
    form.action = url;

    var inputRut = document.createElement('input');
    inputRut.type = 'hidden';
    inputRut.name = 'rutUsuario';
    inputRut.value = rut;
    form.appendChild(inputRut);

    var inputUsr = document.createElement('input');
    inputUsr.type = 'hidden';
    inputUsr.name = 'usrUsuario';
    inputUsr.value = usr;
    form.appendChild(inputUsr);

    var inputUxs = document.createElement('input');
    inputUxs.type = 'hidden';
    inputUxs.name = 'uxsUsuario';
    inputUxs.value = uxs;
    form.appendChild(inputUxs);

    var inputNom = document.createElement('input');
    inputNom.type = 'hidden';
    inputNom.name = 'nomUsuario';
    inputNom.value = nombre;
    form.appendChild(inputNom);

    var inputTok = document.createElement('input');
    inputTok.type = 'hidden';
    inputTok.name = 'tokUsuario';
    inputTok.value = token;
    form.appendChild(inputTok);

    form.submit();
}

function traeMenu() {

    //var url = host() + 'Usuario/obtenerMenuJson/';
    var url = generico() + 'Usuario/obtenerMenuJson/';
    var origin = origen();

    var uxs = document.getElementById('uxs').value;
    var token = document.getElementById('token').value;

    const valores = new FormData();
    valores.append('usuariosistema', uxs);
    //data.append('token', token);

    fetch(url, {
        method: 'POST',
        headers: {
            //'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token,
            'Origin': origin
        },
        body: valores
    })
        .then(res => res.json())
        .then(
            (result) => {
                armaMenu(result)
            },
            (error) => {
                document.getElementById('divMenu').innerHTML = error;
            }
        )
}

function armaMenu(data) {

    //const cabeceras = data.map((contenido, i) => (
    //    '<ul>' + contenido + '</ul>'
    //));

    var construccion = '';

    for (var cab in data) {
        construccion += '<li class="nav-item has-treeview">';
        construccion += '<a href = "#" class="nav-link" >';
        //construccion += '<i class="nav-icon fas fa-tachometer-alt"></i>';
        construccion += '<i class="nav-icon fas ' + data[cab].opcionIconUrl + '"></i>';
        construccion += '<p>' + data[cab].opcionDescripcion + '<i class="right fas fa-angle-left"></i></p>';
        construccion += '</a>'

        construccion += '<ul class="nav nav-treeview">';

        var funciones = data[cab].hijosMenu;

        for (var itm in funciones) {
            construccion += '<li class="nav-item">';
            construccion += '<a onclick="cargaFuncionalidad(\'' + funciones[itm].opcionUrl + '\');" href="#" class="nav-link">';
            if (funciones[itm].opcionIconUrl != null && funciones[itm].opcionIconUrl != "")
                construccion += '<i class="far ' + funciones[itm].opcionIconUrl + ' nav-icon"></i>';
            else
                construccion += '<i class="far fa-minus-square nav-icon"></i>';
            construccion += '<p>' + funciones[itm].opcionDescripcion + '</p>';
            construccion += '</a>';
            construccion += '</li>';
        }
        construccion += '</ul>';
        construccion += '</li>'
    }

    document.getElementById('menuCygnus').innerHTML = construccion;

}

function cargaFuncionalidad(funcion) {

    var url = origen() + funcion;

    fetch(url, {
        method: 'GET'
    })
        .then(res => res.text())
        .then(
            (result) => {
                document.getElementById('body').innerHTML = result;

                var arr = document.getElementById('body').getElementsByTagName('script')
                for (var n = 0; n < arr.length; n++)
                    eval(arr[n].innerHTML)
            },
            (error) => {
                document.getElementById('divMenu').innerHTML = error;
            }
        )
}

function siguienteFuncion(funcion, id, tipo, cuenta) {

    //console.log("funcion: " + funcion + " id: " + id + " tipo: " + tipo + " cuenta: " + cuenta);
    var url = funcion + '?id=' + id + '&tipo=' + tipo + '&cuenta=' + cuenta;

    fetch(url, {
        method: 'GET'
    })
        .then(res => res.text())
        .then(
            (result) => {
                document.getElementById('body').innerHTML = result;

                var arr = document.getElementById('body').getElementsByTagName('script')
                for (var n = 0; n < arr.length; n++)
                    eval(arr[n].innerHTML)
            },
            (error) => {
                document.getElementById('divMenu').innerHTML = error;
            }
        )
}

function siguienteFuncionTieneResp(funcion, id, tipo, cuenta, tieneResp) {

    //console.log("funcion: " + funcion + " id: " + id + " tipo: " + tipo + " cuenta: " + cuenta);
    var url = funcion + '?id=' + id + '&tipo=' + tipo + '&cuenta=' + cuenta + '&tieneResp=' + tieneResp;

    fetch(url, {
        method: 'GET'
    })
        .then(res => res.text())
        .then(
            (result) => {
                document.getElementById('body').innerHTML = result;

                var arr = document.getElementById('body').getElementsByTagName('script')
                for (var n = 0; n < arr.length; n++)
                    eval(arr[n].innerHTML)
            },
            (error) => {
                document.getElementById('divMenu').innerHTML = error;
            }
        )
}

function mensajeCorrecto(msje) {
    toastr.success(msje);
}

function mensajeInformativo(msje) {
    toastr.info(msje);
}

function mensajeError(msje) {
    //toastr.error(msje);
    $(document).Toasts('create', {
        class: 'bg-danger',
        title: 'Ha ocurrido un error',
        subtitle: '',
        body: msje
    })
}

function mensajeAlerta(msje) {
    toastr.warning(msje);
}

function controlCarga(obj) {

    if (obj[0].codigo == '200') {
        //mensajeError(obj[0].mensaje + " (" + obj[0].codigo + ")");
        //mensajeCorrecto(obj[0].mensaje);
        return true;
    } else {
        mensajeError(obj[0].mensaje + " (" + obj[0].codigo + ")");
        return false;
    }
}

function loadingGifIn(div) {
    $("#" + div).fadeIn();

    var opts = {
        lines: 12, // The number of lines to draw
        length: 7, // The length of each line
        width: 4, // The line thickness
        radius: 10, // The radius of the inner circle
        color: '#000', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false // Whether to use hardware acceleration
    };

    var target = document.getElementById(div);
    var spinner = new Spinner(opts).spin(target);
}
function loadingGifOut(div) {
    $("#" + div).fadeOut();
}

function esperando() {
    //sleep(1000);
    $('#modal-espera-lg').modal('show');
}
function terminoEspera() {
    //sleep(1000);

    $('#modal-espera-lg').modal('hide');
    //alert($('#modal-espera-lg').is(':visible'));
    //alert($('.modal-backdrop').is(':visible'));
    if ($('#modal-espera-lg').is(':visible')) {
        $('#modal-espera-lg').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }
}
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

////****NOTIFICACIONES *****////
function preguntar() {
    alert('hola');
    //setInterval(preguntar(), 25000);
    //setTimeout(preguntar, 25000);
}

function traerNotificaciones() {

    /*var url = host() + 'Vacacion/traerNotificiacionesXLegajo/';
    var origin = origen();
    var legajo = document.getElementById('legajo').value
 
    const valores = new FormData();
    valores.append('legajo', legajo);
    //data.append('token', token);
 
    fetch(url, {
        method: 'POST',
        headers: {
            //'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token,
            'Origin': origin
        },
        body: valores
    })
        .then(res => res.json())
        .then(
            (result) => {
                if (controlCarga(result)) {
                    var datos = result[1];
                    //listaEmpresas(datos);
                    listaNotificaciones(datos);
                }
            },
            (error) => {
                console.log(error);
            }
        )*/
}
function listaNotificaciones(datos) {

    document.getElementById('spanCantidadNotif').textContent = datos.length;
    document.getElementById('spanNumNot').textContent = datos.length + ' Notificaciones';

    for (var ii = 0; ii < datos.length; ii++) {
        var a = document.createElement("a");
        a.setAttribute('class', 'dropdown-item');
        a.id = 'yalovi'

        var i = document.createElement('i');
        i.setAttribute('class', 'fas ' + datos[ii].icono + ' mr-2');

        var span = document.createElement('span');
        span.setAttribute('class', 'float-center text-muted text-sm');
        span.textContent = datos[ii].fecha;

        var div = document.createElement('div')
        div.setAttribute('class', 'dropdown-divider');
        a.appendChild(i);
        a.appendChild(document.createTextNode(datos[ii].texto + '___'));
        a.title = datos[ii].nombre;
        a.appendChild(span);

        /*aramirez 05-03-2021*/
        var marcar = document.createElement("LABEL");
        marcar.setAttribute('class', 'float-right text-muted text-sm');
        marcar.id = 'yalovi_' + datos[ii].idAutonum;
        marcar.title = 'Marcar si ya lo vio';
        marcar.innerHTML = 'X';
        marcar.setAttribute('onclick', 'MarcarNotificacionesLeidas(' + datos[ii].idAutonum + ',true);');
        a.appendChild(marcar);

        document.getElementById('divNotificaciones').appendChild(a);
        document.getElementById('divNotificaciones').appendChild(div);

        /*NOTIFICACIONES*/
    }

}
