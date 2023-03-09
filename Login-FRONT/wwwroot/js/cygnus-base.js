


function LoginCygnus(url, data) {

    //alert(url);
    fetch(url, {
        method: 'POST', body: data
    })
        .then(res => res.json())
        .then(
            (result) => {
                /*console.log('datos',result);*/
                if (result.estadoSession == 0) {
                    document.getElementById('msjeAcceso').innerHTML = result.mensajeSession;
                    document.getElementById('alertPass').style.display = 'block';
                    $("#alertPass").fadeOut(3000);
                } else {
                    //document.getElementById('uxs').value = result.uxsUsuarioSession;
                    //document.getElementById('nombre').value = result.nombreUsuarioSession;
                    //document.getElementById('token').value = result.tokenSession;
                    console.log('dato', result.rutUsuarioSession, result.usrUsuarioSession, result.uxsUsuarioSession);
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
    /*var url = host() + 'Usuario/Usuario_Traer_Sistemas';*/

    /*console.log(url, data);*/
    LoginCygnus(url, data);

}

function login_B() {
    var usr = ''
    var nombre = ''
    var user = document.getElementById('txtUsuario').value;
    var pass = document.getElementById('txtPass').value;
    var url = host() + 'Usuario/Usuario_Validar';

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "usR_PASSWORD": pass,
        "usR_RUT": user
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => {
            if (response.status === 400) {
                document.getElementById("msjeAcceso").innerHTML = "Error, verifique sus credenciales";
                document.getElementById("alertPass").style.display = "block";
                return;
            }
            if (!response.ok) {
            }
            return response.json();

        })
        .then(result => {
            usr = result.usR_AUTOID;
            nombre = result.usR_NOMBRE;
            console.log('nombre', nombre)
            console.log('usr', usr)

            inicio_B(usr, nombre);

        })
        .catch(error => console.log('error', error));
}

function inicio_B(usr, nombre) {

    var url = origen() + 'InicioB/Index';

    var form = document.createElement('form');
    document.body.appendChild(form);
    form.method = 'post';
    form.action = url;

    var inputUsr = document.createElement('input');
    inputUsr.type = 'hidden';
    inputUsr.name = 'usrUsuario';
    inputUsr.value = usr;
    form.appendChild(inputUsr);


    var inputNom = document.createElement('input');
    inputNom.type = 'hidden';
    inputNom.name = 'nomUsuario';
    inputNom.value = nombre;
    form.appendChild(inputNom);

    form.submit();
}

function llenarMenu() {
    var url = host() + 'Usuario/Usuario_Traer_Sistemas';
    var sistemas = [];
    var usr = document.getElementById('usr').value;
    var urlO = origen();
    const nombreUsuario = document.getElementById('nombre').value;
    document.getElementById('nombreUsuario').textContent = nombreUsuario;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "usR_AUTOID": usr
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
            }
            return response.json();

        })
        .then(result => {
            /*console.log(result);*/
            sistemas = result;


            const container = document.querySelector('.col-md-12');
            const imagenDefault = '/Content/images/gear.png';
            const exitImagen = '/Content/images/exit-icon.gif';

            for (let i = 0; i < sistemas.length; i += 4) {

                const row = document.createElement('div');
                row.classList.add('row', 'paddingTop');

                const colors = ['btn-secondary', 'btn-success', 'btn-info'];

                for (let j = i; j < i + 4 && j < sistemas.length; j++) {
                    const sistema = sistemas[j];

                    const col = document.createElement('div');
                    col.classList.add('col-md-3');

                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.classList.add('btn', colors[j % colors.length], 'btn-block');
                    btn.dataset.url = sistema.siS_URL;

                    const img = document.createElement('img');

                    if (sistema.siS_ICON_URL) {
                        img.src = sistema.siS_ICON_URL;
                        img.alt = sistema.siS_DESCRIPCION;
                        img.width = 16;
                        img.height = 16;
                    } else {
                        img.src = imagenDefault;
                        img.alt = 'Imagen';
                        img.width = 16;
                        img.height = 16;
                    }

                    const span = document.createElement('span');
                    span.textContent = ' ';

                    const text = document.createTextNode(sistema.siS_DESCRIPCION);

                    btn.appendChild(img);
                    btn.appendChild(span);
                    btn.appendChild(text);
                    col.appendChild(btn);
                    row.appendChild(col);

                    if (j === sistemas.length - 1) {
                        btn.setAttribute('id', 'btnVersiones');
                    }

                    btn.addEventListener('click', function () {
                        window.open(this.dataset.url, '_blank');
                    });
                }

                container.appendChild(row);
            }

           
            const lastRow = document.createElement('div');
            lastRow.classList.add('row', 'paddingTop');

            
            const colors = ['btn-dark', 'btn-danger'];

          
            for (let k = 0; k < 2; k++) {
                const col = document.createElement('div');
                col.classList.add('col-md-3');

                const btn = document.createElement('button');
                btn.type = 'button';
                btn.classList.add('btn', colors[k % colors.length], 'btn-block');

                const span = document.createElement('span');
                span.textContent = k === 0 ? 'Versiones' : 'Cerrar sesión';

                btn.appendChild(span);
                col.appendChild(btn);
                lastRow.appendChild(col);

               
                btn.addEventListener('click', function () {
                    if (k === 0) {
                       
                        const versionesModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {});
                        versionesModal.show();
                    } else {

                        window.location.href = urlO;
                        document.getElementById('uxs').value = '';
                        document.getElementById('nombre').value = '';
                    }
                });
            }

            container.appendChild(lastRow);

            
        })

}

function llenarMenu2() {
    var url = host() + 'Usuario/Usuario_Traer_Sistemas';
    var sistemas = [];
    var usr = document.getElementById('usr').value;
    var urlO = origen();
    const nombreUsuario = document.getElementById('nombre').value;
    document.getElementById('nombreUsuario').textContent = nombreUsuario;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "usR_AUTOID": usr
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
            }
            return response.json();

        })
        .then(result => {
        /*console.log(result);*/
        sistemas = result;

        const container = document.querySelector('.col-md-9');
        const imagenDefault = '/Content/images/gear.png';
        const exitImagen = '/Content/images/exit-icon.gif';

        for (let i = 0; i < sistemas.length; i += 3) {

            const row = document.createElement('div');
            row.classList.add('row', 'paddingTop');

            const colors = ['btn-secondary', 'btn-success', 'btn-info'];

            for (let j = i; j < i + 3 && j < sistemas.length; j++) {
                const sistema = sistemas[j];

                const col = document.createElement('div');
                col.classList.add('col-md-4');

                const btn = document.createElement('button');
                btn.type = 'button';
                btn.classList.add('btn', colors[j % colors.length], 'btn-block');
                btn.dataset.url = sistema.siS_URL;

                const img = document.createElement('img');

                if (sistema.siS_ICON_URL) {
                    img.src = sistema.siS_ICON_URL;
                    img.alt = sistema.siS_DESCRIPCION;
                    img.width = 16;
                    img.height = 16;
                } else {
                    img.src = imagenDefault;
                    img.alt = 'Imagen';
                    img.width = 16;
                    img.height = 16;
                }


                const span = document.createElement('span');
                span.textContent = ' ';

                const text = document.createTextNode(sistema.siS_DESCRIPCION);

                btn.appendChild(img);
                btn.appendChild(span);
                btn.appendChild(text);
                col.appendChild(btn);
                row.appendChild(col);

                btn.addEventListener('click', function () {
                    window.open(this.dataset.url, '_blank');
                });
            }


            container.appendChild(row);
        }

        const lastRow = document.createElement('div');
        lastRow.classList.add('row', 'paddingTop');

        const lastCol = document.createElement('div');
        lastCol.classList.add('col-md-4');

        const btnCerrar = document.createElement('button');
        btnCerrar.type = 'button';
        btnCerrar.classList.add('btn', 'btn-danger', 'btn-block');

        const imgCerrar = document.createElement('img');
        imgCerrar.src = exitImagen;
        imgCerrar.alt = 'Cerrar sesión';
        imgCerrar.width = 16;
        imgCerrar.height = 16;

        const textCerrar = document.createTextNode('Cerrar sesión');
        const spanCerrar = document.createElement('span');
        spanCerrar.textContent = ' ';

        btnCerrar.appendChild(imgCerrar);
        btnCerrar.appendChild(spanCerrar);
        btnCerrar.appendChild(textCerrar);
        lastCol.appendChild(btnCerrar);
        lastRow.appendChild(lastCol);
        container.appendChild(lastRow);

        btnCerrar.addEventListener('click', function () {
            window.location.href = urlO;
            document.getElementById('usr').value = '';
            document.getElementById('uxs').value = '';
            document.getElementById('nombre').value = '';
        });

        
        /*console.log('sistemas', sistemas);*/

    })

    .catch(error => {
        console.log('error', error);
    });

}

//function crearVersiones() {

//    var url = host() + 'Sistema/TraerVersiones';
//    var versiones = [];

//    var myHeaders = new Headers();
//    myHeaders.append("Content-Type", "application/json");

//    var raw = JSON.stringify({
//        "sis_autoid": "0"
//    });

//    var requestOptions = {
//        method: 'POST',
//        headers: myHeaders,
//        body: raw,
//        redirect: 'follow'
//    };

//    fetch(url, requestOptions)
//        .then(response => {
//            if (!response.ok) {
//            }
//            return response.json();

//        })
//        .then(result => {
//            /*console.log(result);*/
//            versiones = result

//            var ultimasActualizacionesDiv = document.getElementById("ultimasVersiones");

//            ultimasActualizacionesDiv.innerHTML = "";

//            var titulo = document.createElement("h5");
//            titulo.className = "card-title";
//            titulo.style = "text-align: center;";
//            titulo.textContent = "Últimas actualizaciones";
//            titulo.style.fontWeight = "bold";
//            ultimasActualizacionesDiv.appendChild(titulo);

//            for (var i = 0; i < versiones.length && i < 3; i++) {
//                var version = versiones[i];

//                var card = document.createElement("div");
//                card.className = "card";
//                card.style = "background-color:#D5D4D48F;";

//                var cardHeader = document.createElement("div");
//                cardHeader.className = "card-header";
//                // Agregamos una regla CSS para reducir el padding del cardHeader
//                cardHeader.style.padding = "10px 10px 5px 10px";

//                var cardTitle = document.createElement("h5");
//                cardTitle.className = "card-title";
//                cardTitle.style = "text-align: center;";

//                var fecha = version.ver_fecha.substring(0, 10);

//                var cardSubtitle = document.createElement("h6");
//                cardSubtitle.className = "card-subtitle";
//                cardSubtitle.style = "text-align: center;";
//                cardSubtitle.innerHTML = version.sis_descripcion + "<br>" + version.ver_version + " - Disponible desde : " + fecha;
//                cardSubtitle.style.marginBottom = "0";

//                var cardText = document.createElement("p");
//                cardText.className = "card-text text-left";
//                cardText.innerHTML = version.verdet_detalle_version;
//                cardText.style.marginTop = "0";
//                cardText.style.position = "auto";
//                cardText.style.fontSize = "14px";

//                cardHeader.appendChild(cardTitle);
//                cardHeader.appendChild(cardSubtitle);
//                cardHeader.appendChild(cardText);
//                card.appendChild(cardHeader);
//                ultimasActualizacionesDiv.appendChild(card);
//            }


//            /*console.log('versiones', versiones)*/
//        })

//        .catch(error => console.log('error', error));

//}

function versionesModal() {

    var url = host() + 'Sistema/TraerVersiones';
    var versiones = [];

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "sis_autoid": "0"
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
            }
            return response.json();

        })
        .then(result => {
            /*console.log(result);*/
            versiones = result

            var ultimasActualizacionesDivModal = document.getElementById("ultimasVersionesMod");


            ultimasActualizacionesDivModal.innerHTML = "";

            //var titulo = document.createElement("h5");
            //titulo.className = "card-title";
            //titulo.style = "text-align: center;";
            //titulo.textContent = "Últimas actualizaciones";
            //titulo.style.fontWeight = "bold";
            //ultimasActualizacionesDivModal.appendChild(titulo);


            for (var i = 0; i < versiones.length; i++) {
                var version = versiones[i];


                var card = document.createElement("div");
                card.className = "cardM";
                card.style = "background-color:#D5D4D48F;";


                var cardHeader = document.createElement("div");
                cardHeader.className = "card-headerM";
                cardHeader.style.marginBottom = "0";

                var cardTitle = document.createElement("h5");
                cardTitle.className = "card-titleM";
                cardTitle.style = "text-align: center;";

                var fecha = version.ver_fecha.substring(0, 10);
                var cardSubtitle = document.createElement("h6");
                cardSubtitle.className = "card-subtitleM";
                cardSubtitle.style = "text-align: center;";
                cardSubtitle.innerHTML = version.sis_descripcion + "<br>" + version.ver_version + " - Disponible desde : " + fecha;
                cardSubtitle.style.marginBottom = "0";


                var cardText = document.createElement("p");
                cardText.className = "card-text text-align-initial";
                cardText.innerHTML = version.verdet_detalle_version;
                cardText.style.marginTop = "0";
                /*cardText.style.position = "relative";*/
                cardText.style.position = "auto";
                //cardText.style.bottom = "0";


                cardHeader.appendChild(cardTitle);
                cardHeader.appendChild(cardSubtitle);
                cardHeader.appendChild(cardText);
                card.appendChild(cardHeader);
                ultimasActualizacionesDivModal.appendChild(card);


            }

            /*console.log('versiones', versiones)*/
        })

        .catch(error => console.log('error', error));

}

function ActualizarPass() {

    var url = host() + 'Usuario/Usuario_Actualizar_Clave'
    var USR_PASS1 = document.getElementById("txtNewPass").value;
    var USR_PASS2 = document.getElementById("txtNewPassRep").value;
    var USR_RUT = document.getElementById("txtEnRut").value;
    var USR_TOK = document.getElementById("textEnTok").value;
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
            "usR_PASSWORD": USR_PASS,
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

    /*var url = origen() + 'Inicio/Index';*/
    var url = origen() + 'InicioB/Index';

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
