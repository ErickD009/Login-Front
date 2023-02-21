//function redirecionar() {

//    var uxs = document.getElementById('uxsform').value;

//    if (uxs != "-1") {
//        const data = new FormData();
//        data.append('uxs', uxs);

//        var url = generico() + 'Usuario/validaUsuarioXSistema';

//        fetch(url, {
//            method: 'POST', body: data
//        })
//            .then(res => res.json())
//            .then(
//                (result) => {
//                    //console.log(result);
//                    if (result.estadoSession == 0) {
//                        document.getElementById('msjeAcceso').innerHTML = result.mensajeSession;
//                        document.getElementById('alertPass').style.display = 'block';
//                        $("#alertPass").fadeOut(3000);
//                    } else {


//                        var rut = result.rutUsuarioSession;
//                        var usr = result.usrUsuarioSession;
//                        var uxs = result.uxsUsuarioSession;
//                        var nombre = result.nombreUsuarioSession;
//                        var token = result.tokenSession;

//                        inicio(rut, usr, uxs, nombre, token);

//                    }
//                },
//                (error) => {
//                    alert('error: ' + error);
//                }
//            )
//            .catch((error) => console.log(error))
//    }
//    else
//        document.getElementById('divLogin').style.display = 'block';
//}

//function redirecionarTemp() {

//    var uxs = 186216;//document.getElementById('uxsform').value;

//    if (uxs != "-1") {
//        const data = new FormData();
//        data.append('uxs', uxs);

//        var url = generico() + 'Usuario/validaUsuarioXSistema';

//        fetch(url, {
//            method: 'POST', body: data
//        })
//            .then(res => res.json())
//            .then(
//                (result) => {
//                    //console.log(result);
//                    if (result.estadoSession == 0) {
//                        document.getElementById('msjeAcceso').innerHTML = result.mensajeSession;
//                        document.getElementById('alertPass').style.display = 'block';
//                        $("#alertPass").fadeOut(3000);
//                    } else {


//                        var rut = result.rutUsuarioSession.trim();
//                        var pass = '0601';//result.pass;

//                        loginTemp(rut, pass);

//                    }
//                },
//                (error) => {
//                    alert('error: ' + error);
//                }
//            )
//            .catch((error) => console.log(error))
//    }
//    else
//        document.getElementById('divLogin').style.display = 'block';
//}
//function loginTemp(rut, clave) {

//    var user = rut;
//    var pass = clave;
//    var sistema = 115;

//    const data = new FormData();
//    data.append('usuario', user);
//    data.append('pass', pass);
//    data.append('sistema', sistema);

//    //var url = host() + 'Usuario/validaUsuario';

//    var url = generico() + 'Usuario/validaUsuario ';

//    LoginCygnus(url, data);

//}

function LoginCygnus(url, data) {

    //alert(url);
    fetch(url, {
        method: 'POST', body: data
    })
        .then(res => res.json())
        .then(
            (result) => {
                //console.log(result);
                if (result.estadoSession == 0) {
                    document.getElementById('msjeAcceso').innerHTML = result.mensajeSession;
                    document.getElementById('alertPass').style.display = 'block';
                    $("#alertPass").fadeOut(3000);
                } else {
                    //document.getElementById('uxs').value = result.uxsUsuarioSession;
                    //document.getElementById('nombre').value = result.nombreUsuarioSession;
                    //document.getElementById('token').value = result.tokenSession;
                    console.log(result);
                    var rut = result.rutUsuarioSession;
                    var usr = result.usrUsuarioSession;
                    var uxs = result.uxsUsuarioSession;
                    var nombre = result.nombreUsuarioSession;
                    var token = result.tokenSession;

                    inicio(rut, usr, uxs, nombre, token);
                    //traeMenu();
                }
            },
            (error) => {
                alert('error: ' + error);
            }
        )
        .catch((error) => console.log(error))
}


function login() {

    var user = document.getElementById('txtUsuario').value;
    var pass = document.getElementById('txtPass').value;
    var sistema = 5; // cambiar id para el sistema que se cree

    const data = new FormData();
    data.append('usuario', user);
    data.append('pass', pass);
    data.append('sistema', sistema);

    //var url = host() + 'Usuario/validaUsuario';
    //var url = origen() + 'Usuario/validaUsuario';
    var url = generico() + 'Usuario/validaUsuario ';
    //var url = host() + 'Usuario/Usuario_Traer_Sistemas';
    console.log(url, data);   
    LoginCygnus(url, data);

}

//function login1() {

//    var user = document.getElementById('txtUsuario').value;
//    var pass = document.getElementById('txtPass').value;
//    /*var sistema = 5; // cambiar id para el sistema que se cree*/

//    const data = new FormData();
//    data.append('USR_LOGIN', user);
//    data.append('USR_PASSWORD', pass);
//    /*data.append('sistema', sistema);*/

//    //var url = host() + 'Usuario/validaUsuario';
//    //var url = origen() + 'Usuario/validaUsuario';
//   /* var url = generico() + 'Usuario/validaUsuario ';*/
//    var url = host() + 'Usuario/Usuario_Traer_Sistemas';
//    /*console.log(url, data);*/




//    fetch(url, {
//        method: 'POST',
//        headers: {
//            'Content-Type': 'application/json'
//        },
//        body: JSON.stringify(data)
//    })
//        .then(response => response.text())
//        .then(data => console.log(data))
//        .catch(error => console.error(error));

//}

function enviarRut() {
    
    var USR_LOGIN = document.getElementById('txtRut').value;
    var url = host() + 'Usuario/Usuario_Traer_Empresas?rut=' + USR_LOGIN;
    var valores = new FormData();
    valores.append('usrlogin', USR_LOGIN);
   
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }//,
        //|body: JSON.stringify('usrlogin': '16147519k')
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error(error));  
}

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
    }
}
////****NOTIFICACIONES *****////