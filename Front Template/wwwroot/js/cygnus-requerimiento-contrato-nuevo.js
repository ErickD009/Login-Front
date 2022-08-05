////const { firstDefined } = require("@fullcalendar/core/util/misc");
////const { Rut } = require("jquery");

var seValidoAnteriormente = false;

function inicialRequerimientoContratos() {
    //esperando();
    $("#iPDSAsociados").click(function () {
        if (document.getElementById('ddlCuenta').value != '-1') {
            if (document.getElementById('ddlCiudad').value != '-1')
                eventoPdsAsociados();
            else
                mensajeAlerta('Debe seleccionar una ciudad');
        }
        else
            mensajeAlerta('Debe seleccionar una cuenta');
    });

    $("#iBusPersona").click(function () {
        if (document.getElementById('ddlCuenta').value != "-1") {
            eventoBusquedaPersona();
        }
        else {
            mensajeAlerta('Debe seleccionar una cuenta');
        }
    });

    $("#iAbrirHorario").click(function () {
        //if (document.getElementById('ddlCuenta').value != "-1") {
        //    eventoAbrirHorario();
        //}
        //else {
        //    mensajeAlerta('Debe seleccionar una cuenta');
        //}
        if (document.getElementById('ddlCuenta').value != "-1") {
            if (document.getElementById('ddlJornada').value != "-1") {
                if (document.getElementById('ddlJornada').value != "AR22")
                    eventoAbrirHorario();
                else
                    mensajeAlerta('No se puede asignar horario para una jornada Artículo 22');
            }
            else
                mensajeAlerta('Debe seleccionar una jornada');
        }
        else {
            mensajeAlerta('Debe seleccionar una cuenta');
        }
    });

    CargaSelectCuentaNuevoReq('ddlCuenta', 'DivDdlCuenta');
    CargaSelectMotivoNuevoReq('ddlMotivoReq', 'DivDdlMotivoReq');

    CargaSelectTipoContrato('DivTipoContrato', 'ddlTipoContrato');
    CargaSelectTipoVacante('ddlTipoVacante', 'DivDdlTipoVacante');
    CargaSelectEstudios('DivDdlEstudios', 'ddlEstudios');
    CargaSelectExperiencia('DivDdlExperiencia', 'ddlExperiencia');
    CargaSelectGenero('DivDdlGenero', 'ddlGenero');
    CargaSelectTurnoNuevoReq('ddlTurno', 'DivDdlTurno');
    calIndividual('FecRequerimiento');
    //calIndividual('FecTerminoVisa');
    calIndividualBlanco('fecNewTerminoContrato');
    CargaSelectTipoOperacionNuevoReq('ddlTipoOperacion', 'DivDdlTipoOperacion');

    var folio = document.getElementById('hdnFolioReqNuevo').value; //'109234';//document.getElementById('hdnFolio').value;
    //console.log(folio);
    if (folio != '') {
        folio = document.getElementById('hdnFolioReqNuevo').value;
        document.getElementById('divFolioReqNuevo').style.display = "block";
        document.getElementById('btnActualizarRequerimiento').style.display = "block";
        document.getElementById('btnGuardarRequerimiento').style.display = "none";
        document.getElementById('divCheckCopiar').style.display = "none";
        document.getElementById('txtFolioReqNuevo').value = folio;
        ddlCuenta.addEventListener("load", cargaSolicitudSegunFolio(folio));
    } else {
        cargarHorarioDefecto();
        document.getElementById('divCheckCopiar').style.display = "block";

    }
    
    //console.log(folio);
    //if (folio != '' ||) {
    //    console.log(folio);

    //    document.getElementById('divFolio').style.display = "block";
    //    document.getElementById('txtFolio').value = folio;
    //    //cargaSolicitudSegunFolio(folio);
    //} 

    //terminoEspera();
}


function cargaSolicitudSegunFolio(folio) {
    var url = host() + 'Solicitud/BuscarSolicitud/';
    var token = document.getElementById('token').value;
    
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify({
            "folio": folio
        }),
        headers: {
            'Authorization': 'Bearer ' + token,
            //'Origin': origin
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //$("#ddlCentroCosto").empty();
            //console.log(data);
            if (data[0].codigo == "200") {

                document.getElementById('txtCantPersonalRequerido').value = data[1].cant;
                document.getElementById('txtFechaSolicitud').value = data[1].fechaSol;
                //var usr = document.getElementById('rut').value ;
                //CargaSelectCuentaReferidos('ddlCuenta', 'DivDdlCuenta');
                document.getElementById('ddlCuenta').value = data[1].cuenta;
                eventoDdlCuentaNuevoReq(1);
                //document.getElementById('ddlTipoVacante').value = "00";
                document.getElementById('ddlTipoContrato').value = data[1].tipoContrato;
                //cargarDdlSegundaCarga(data[1].supervisor.trim(), data[1].ciudadDondeTrabaja, data[1].comunaDeTrabajo, data[1].lugarTrabajo, data[1].direccionDeTrabajo);
                //$("#ddlCuenta").trigger('change');
                //document.getElementById('ddlEmpresa').value = data[1].empresa;

                //document.getElementById('ddlEstructura').value = data[1].estrLiq;
                //document.getElementById('ddlCargo').value = data[1].cargo;
                //document.getElementById('ddlJornada').value = data[1].jornada;
                //document.getElementById('ddlCentroCosto').value = data[1].centroCosto;
                document.getElementById('FecRequerimiento').value = data[1].fechaReq;
                //document.getElementById('ddlSupervisor').value = /*data[1].supervisor.trim()*/;
                document.getElementById('txtFonoSupervisor').value = data[1].telefonoSupervisor;
                //var motivo = document.getElementById('ddlMotivoReq').value;
                //document.getElementById('ddlMotivoReq').value.toString().split(';')[0] = data[1].motivoReq;

                document.getElementById('txtObservacion').value = data[1].observaciones;
                //document.getElementById('txRutEmpleadoReemplazado').value = ;
                document.getElementById('fecNewTerminoContrato').value = data[1].terminoContrato;
                //document.getElementById('ddlCiudad').value = data[1].ciudadDondeTrabaja;
                //eventoDdlCiudadReferido();
                //document.getElementById('ddlTurno').value=data[1].turno;
                //document.getElementById('txtDirTrabajo').value = data[1].direccionDeTrabajo;
                //document.getElementById('ddlComuna').value = data[1].comunaDeTrabajo;
                document.getElementById('ddlGenero').value = data[1].genero;
                document.getElementById('ddlExperiencia').value = data[1].experiencia;
                //document.getElementById('ddlComuna').value = data[1].comunaDeTrabajo;
                //document.getElementById('txtHorarioTrabajo').value = data[1].horarioTrabajo;
                //document.getElementById('txtLugarTrabajo').value = data[1].lugarTrabajo;
                //var reqPostulante = 'N';
                document.getElementById('ddlEstudios').value = data[1].estudios;
                data[1].busesAcercamiento == 'S' ? $("#chkBuses").prop('checked', true) : $("#chkBuses").prop('checked', false);
                data[1].entrevista == 'S' ? $("#chkEntrevistaCliente").prop('checked', true) : $("#chkEntrevistaCliente").prop('checked', false);
                data[1].ley21015 == 'SI' ? $("#chkLey21015Req").prop('checked', true) : $("#chkLey21015Req").prop('checked', false);
                document.getElementById('ddlTipoOperacion').value = data[1].tipoDeOperacion;
                document.getElementById('ddlTipoVacante').value = data[1].tipoVacante;
                document.getElementById('txtCriticidad').value = data[1].zonaCriticidad;
                

                cargarSetearEstr(data[1].cuenta, data[1].empresa, data[1].estrLiq);
                cargarSetearCargo(data[1].empresa, data[1].estrLiq, data[1].cargo);
                cargarSetearCC(data[1].empresa, data[1].estrLiq, data[1].centroCosto);
                cargarSetearJornada(data[1].empresa, data[1].estrLiq, data[1].cargo, data[1].centroCosto, data[1].jornada, data[1].horarioTrabajo);
                cargarSetearCiudad(data[1].ciudadDondeTrabaja);
                cargarSetearSupervisor(data[1].supervisor.trim());
                cargarSetearComuna(data[1].ciudadDondeTrabaja, data[1].comunaDeTrabajo, data[1].lugarTrabajo, data[1].direccionDeTrabajo);
                CargaSelectTurnoNuevoReq('ddlTurno', 'DivDdlTurno', data[1].turno);
                CargaSelectMotivoNuevoReq('ddlMotivoReq', 'DivDdlMotivoReq', data[1].motivoReq);

                ArmaGrillaPersonasSeleccionados(data[1].empleadosReemplazados);
                $('#dvListaPersonas').collapse('show');

                ArmaGrillaHorario(data[1].CalendarioHorario);
                cargarSetearSuperCalendarioHorarios(data[1].jornada);
                eventoBotonCargarHorario();

                //for (let i = 0; i < data[1].empleadosReemplazados.length; i++) {
                //    eventoBotonCargarListaRefCnDt(data[1].referidos[i].rut, data[1].referidos[i].nombre, data[1].referidos[i].Telefono, data[1].referidos[i].tipo)
                //}
            } else {
                mensajeError(data[0].codigo + ' ' + data[0].mensaje);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error: arranca ctm');

        }
    });
}
function cargarSetearSuperCalendarioHorarios(jor) {

//DST:20220411
    //var url = host() + 'RequerimientoContrato/ObtenerJornadas/';
    var url = host() + 'RequerimientoContrato/ObtenerJornadasVacaciones/';
//DST:20220411

    var codJornada = jor;
    var token = document.getElementById('token').value;

    const valores = new FormData();
    valores.append('codJornada', codJornada);

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Origin': origin
        },
        body: valores
    })
        .then(res => res.json())
        .then(
            (result) => {
                terminoEspera();
                if (controlCarga(result)) {
                    var datos = result[1];
                    if (datos.length == 1) {
                        //console.log(datos);
                        eventoCambioHoraTotalSemanal();

                        //DST:20220411
                        /*var diasXSemana = datos[0].diaXSemana * datos[0].horasXDia;
                        var horasSemanal = minTommss(diasXSemana);*/
                        var horasXSemana = datos[0].horasXSemana;
                        var horasSemanal = minTommss(horasXSemana); 

                        document.getElementById("txtTotalHorasSemanalJornada").value = horasSemanal;
                    }
                }
            },
            (error) => {
                crearDropDownList.log(error);
                //$('#modal-espera-persona-lg').modal('hide');  
            }
        )
}
function cargarSetearCC(empr,estr,cc) {
    //CargaSelectCentroCostoNuevoReq('ddlCentroCosto', 'DivDdlCentroCosto');
    var url = host() + 'RequerimientoContrato/CargarDDLCentroCosto_X_Empresa_Y_Estructura/';

    var empresa = empr;
    var estructura = estr;
    var texto_inicial = "";
    var token = document.getElementById('token').value;

    const valores = new FormData();
    valores.append('empresa', empresa);
    valores.append('estructura', estructura);
    valores.append('texto_inicial', texto_inicial);

    fetch(url, {
        method: 'POST',
        headers: {
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
                    if (datos.length > 0) {
                        crearDropDownListEvento(datos, 'ddlCentroCosto', 'DivDdlCentroCosto', 'eventoDdlCentroCostoNuevoReq()', false);
                        document.getElementById('ddlCentroCosto').value = cc;
                    }
                    else {
                        crearDropDownListVacio(ddl, div, false);
                    }
                    //eventoDdlCentroCostoNuevoReq();
                }
            },
            (error) => {
                crearDropDownList.log(error);
            }
        )
}
function cargarSetearJornada(emp,estr,car,cc,opt,hr) {
    var url = host() + 'RequerimientoContrato/CargarDDLJornada_X_Empresa_Estructura_Cargo_CentroCosto/';

    var empresa = emp;
    var estructura = estr;
    var cargo = car;
    var centroCosto = cc;
    var texto_inicial = "";
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    const valores = new FormData();
    valores.append('empresa', empresa);
    valores.append('estructura', estructura);
    valores.append('cargo', cargo);
    valores.append('centroCosto', centroCosto);
    valores.append('texto_inicial', texto_inicial);

    fetch(url, {
        method: 'POST',
        headers: {
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
                    if (datos.length > 0) {
                        crearDropDownListEvento(datos, 'ddlJornada', 'DivDdlJornada', 'eventoInfoJornada()', false);
                        document.getElementById('ddlJornada').value = opt;
                        document.getElementById('txtHorarioTrabajo').value = hr;
                        //crearDropDownList(datos, ddl, div);
                        document.getElementById('superMensajeVitoco').style.display = "none";
                    }
                    else {
                        crearDropDownListVacio(ddl, div, false);
                        document.getElementById('superMensajeVitoco').style.display = "block";

                    }
                    //eventoDdlJornadaReferidos();
                    //else {
                    //    crearDropDownListVacio(ddl, div);
                    //}
                }
            },
            (error) => {
                crearDropDownList.log(error);
            }
        )
}
function cargarSetearCargo(empr,estr,car) {

    var url = host() + 'RequerimientoContrato/CargarDDLCargo_X_Empresa_Y_Estructura/';

    var empresa = empr;
    var estructura = estr;
    var texto_inicial = "";
    var token = document.getElementById('token').value;

    const valores = new FormData();
    valores.append('empresa', empresa);
    valores.append('estructura', estructura);
    valores.append('texto_inicial', texto_inicial);

    fetch(url, {
        method: 'POST',
        headers: {
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
                    if (datos.length > 0) {
                        crearDropDownListEvento(datos, 'ddlCargo', 'DivDdlCargo', 'eventoDdlCargoNuevoRef()', false);
                        document.getElementById('ddlCargo').value = car;
                    }
                    else {
                        crearDropDownListVacio(ddl, div, false);
                    }
                    //eventoDdlCargoNuevoRef();
                }
            },
            (error) => {
                crearDropDownList.log(error);
            }
        )
}
function cargarSetearEstr(cta,empr,estr) {
    var url = host() + 'RequerimientoContrato/CargarDDLEstructura_X_RutCuenta_Y_Empresa/';

    var rutCuenta = cta;
    var empresa = empr;
    var texto_inicial = "";
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    const valores = new FormData();
    valores.append('rutCuenta', rutCuenta);
    valores.append('empresa', empresa);
    valores.append('texto_inicial', texto_inicial);

    fetch(url, {
        method: 'POST',
        headers: {
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
                    if (datos.length > 0) {
                        crearDropDownListEvento(datos, 'ddlEstructura', 'DivDdlEstructura', 'eventoDdlEstructuraNuevoReq()', false);
                        document.getElementById('ddlEstructura').value = estr;
                    }
                    else {
                        crearDropDownListVacio(ddl, div, false);
                        eventoDdlEstructuraNuevoReq();
                    }
                }
            },
            (error) => {
                crearDropDownList.log(error);
            }
        )
}
function cargarSetearComuna(cit,com,lug,dir,) {
    var url = generico() + 'Parametro/CargaDDLParametrizadosXValor/';
    var idTabla = 1;
    var valor = cit;
    var token = document.getElementById('token').value;
    //console.log("token: " + token);
    const valores = new FormData();
    valores.append('idTabla', idTabla);
    valores.append('valor', valor);

    fetch(url, {
        method: 'POST',
        headers: {
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
                    if (datos.length > 0) {
                        crearDropDownList(datos, 'ddlComuna', 'DivDdlComuna', false);
                        document.getElementById('ddlComuna').value = com;
                        document.getElementById('txtLugarTrabajo').value = lug;
                        document.getElementById('txtDirTrabajo').value = dir;
                    }
                    else {
                        crearDropDownListVacio(ddl, div, true);
                    }
                }
            },
            (error) => {
                crearDropDownList.log(error);
            }
        )
}
function cargarSetearSupervisor(sup) {
    var url = host() + 'RequerimientoContrato/SP_RC_Encargado_Listar/';

    var cuenta = document.getElementById('ddlCuenta').value;
    var token = document.getElementById('token').value;

    const valores = new FormData();
    valores.append('cuenta', cuenta);

    fetch(url, {
        method: 'POST',
        headers: {
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
                    if (datos.length > 0) {
                        crearDropDownList(datos, 'ddlSupervisor', 'DivDdlSupervisor', false);
                        document.getElementById('ddlSupervisor').value = sup;
                    }
                    else {
                        crearDropDownListVacio(ddl, div, false);
                    }
                }
            },
            (error) => {
                crearDropDownList.log(error);
            }
        )

}

function cargarSetearCiudad(cit) {

    var url = generico() + 'Parametro/CargaDDLParametrizados/';

    var idTabla = 2;
    var modo_despliegue = 3;
    var texto_primer_registro = "";
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    const valores = new FormData();
    valores.append('idTabla', idTabla);
    valores.append('modo_despliegue', modo_despliegue);
    valores.append('texto_primer_registro', texto_primer_registro);

    fetch(url, {
        method: 'POST',
        headers: {
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
                    if (datos.length > 0) {
                        crearDropDownListEvento(datos, 'ddlCiudad', 'DivDdlCiudad', 'eventoDdlCiudadReferido()', false);
                        document.getElementById('ddlCiudad').value = cit;
                    }
                    else {
                        crearDropDownListVacio(ddl, div, true);
                    }
                }
            },
            (error) => {
                crearDropDownList.log(error);
            }
        )
}
function CargaSelectTipoContrato(div, ddl) {

    var url = host() + 'RequerimientoContrato/CargaDDLTipoContrato/';

    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    const valores = new FormData();
    //valores.append('empresa', empresa);
    //valores.append('todo', todo);

    fetch(url, {
        method: 'POST',
        headers: {
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
                    if (datos.length > 0) {
                        crearDropDownList(datos, ddl, div, false);
                        document.getElementById('ddlTipoContrato').value = '001';
                        document.getElementById('ddlTipoContrato').className = 'form-control disabled';
                    }
                }
            },
            (error) => {
                console.log(error);
            }
        )
}
function CargaSelectEstudios(div, ddl) {

    var url = host() + 'RequerimientoContrato/CargaDDLEstudios/';

    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    const valores = new FormData();
    //valores.append('empresa', empresa);
    //valores.append('todo', todo);

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Origin': origin
        },
        body: valores
    })
        .then(res => res.json())
        .then(
            (result) => {
                if (controlCarga(result)) {
                    //console.log(result);
                    var datos = result[1];
                    if (datos.length > 0) {
                        crearDropDownList(datos, ddl, div);
                    }
                }
            },
            (error) => {
                console.log(error);
            }
        )
}
function CargaSelectExperiencia(div, ddl) {

    var url = host() + 'RequerimientoContrato/CargaDDLExperiencia/';

    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    const valores = new FormData();
    //valores.append('empresa', empresa);
    //valores.append('todo', todo);

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Origin': origin
        },
        body: valores
    })
        .then(res => res.json())
        .then(
            (result) => {
                if (controlCarga(result)) {
                    //console.log(result);
                    var datos = result[1];
                    if (datos.length > 0) {
                        crearDropDownList(datos, ddl, div);
                    }
                }
            },
            (error) => {
                console.log(error);
            }
        )
}
function CargaSelectGenero(div, ddl) {

    var url = host() + 'RequerimientoContrato/CargaDDLGenero/';

    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    const valores = new FormData();
    //valores.append('empresa', empresa);
    //valores.append('todo', todo);

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Origin': origin
        },
        body: valores
    })
        .then(res => res.json())
        .then(
            (result) => {
                if (controlCarga(result)) {
                    //console.log(result);
                    var datos = result[1];
                    if (datos.length > 0) {
                        crearDropDownList(datos, ddl, div);
                    }
                }
            },
            (error) => {
                console.log(error);
            }
        )
}

function GuardarRequerimientoContratoNuevo() {

    if (validacionBasicaCampos() ) {
        var url = host() + 'RequerimientoContrato/GuardarReqContratoNuevo/';
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);

        var cantPersona = document.getElementById('txtCantPersonalRequerido').value.trim();
        var fecSolicitud = today.toLocaleDateString();
        var usr = document.getElementById('rut').value.trim();
        var rutCuenta = document.getElementById('ddlCuenta').value;
        var empresa = document.getElementById('ddlEmpresa').value;
        var estructura = document.getElementById('ddlEstructura').value;
        var cargo = document.getElementById('ddlCargo').value;
        var tipoContrato = document.getElementById('ddlTipoContrato').value;
        var jornada = document.getElementById('ddlJornada').value;
        var centroCosto = document.getElementById('ddlCentroCosto').value;
        var fecInicioContrato = document.getElementById('FecRequerimiento').value;
        var supervisor = document.getElementById('ddlSupervisor').value;
        var fonoSup = '+56 9' + document.getElementById('txtFonoSupervisor').value;
        var lugarTrabajo = document.getElementById('txtLugarTrabajo').value;
        //var motivo = document.getElementById('ddlMotivoReq').value;
        var motivo = document.getElementById('ddlMotivoReq').value;
        var estadoReq = '00';
        var observacion = document.getElementById('txtObservacion').value;
        var rutReemplazo = document.getElementById('txRutEmpleadoReemplazado').value;
        var fecTerminoContrato = document.getElementById('fecNewTerminoContrato').value;
        var baseP = '0';
        var movilizacion = '0';
        var colacion = '0';
        var gratificacion = '0';
        var tipoGratificacion = '';
        var cotizacion = '';
        var ciudad = document.getElementById('ddlCiudad').value;
        var turno = document.getElementById('ddlTurno').value;
        var direccion = document.getElementById('txtDirTrabajo').value;
        var ddlCom = document.getElementById('ddlComuna');
        var nombreComuna = ddlCom.options[ddlCom.selectedIndex].text;
        var genero = document.getElementById('ddlGenero').value;
        var experiencia = document.getElementById('ddlExperiencia').value;
        var comuna = document.getElementById('ddlComuna').value;
        var horario = document.getElementById('txtHorarioTrabajo').value;
        var reqPostulante = 'N';
        var estudios = document.getElementById('ddlEstudios').value;
        var buses = $("#chkBuses").is(':checked') ? 'S' : 'N';//document.getElementById('chkBuses').cheked ? 'S' : 'N';
        var entrevista = $("#chkEntrevistaCliente").is(':checked') ? 'S' : 'N';//document.getElementById('chkEntrevistaCliente').cheked ? 'S' : 'N';
        var tipoOperacion = document.getElementById('ddlTipoOperacion').value;
        var tipoVacante = document.getElementById('ddlTipoVacante').value;
        var ley = $("#chkLey21015Req").is(':checked') ? 'SI' : 'NO';//document.getElementById('chkLey21015Req').cheked ? 'SI' : 'NO';
        var envioSel = $("#chkSel").is(':checked') ? '1' : '0';//document.getElementById('chkSel').cheked ? 1 : 0;
        fecInicioContrato = $("#rdAM").is(':checked')  ? fecInicioContrato + ' 07:30:00' : fecInicioContrato + ' 14:30:00';
        
        var table = $('#tbListaRef').DataTable();
        var listaref = [];
        table.rows().every(function () {
            var d = this.data();
            listaref.push(d);
        });

        var table2 = $('#tbListaPersonas').DataTable();
        var listaEmp = [];
        table2.rows().every(function () {
            var d = this.data();
            listaEmp.push(d);
        });

        var listaHorario = null;
        if (document.getElementById('ddlJornada').value != "AR22")
            listaHorario = eventoGuardarHorario();

        var nombreCuenta = $('#ddlCuenta').find('option:selected').text();
        //console.log(listaEmp);
        var token = document.getElementById('token').value;

        $.ajax({
            type: "POST",
            url:url,
            data: JSON.stringify({
                "fecSolicitud": fecSolicitud,
                "usr": usr,
                "cantPersona": cantPersona,
                "rutCuenta": rutCuenta,
                "empresa": empresa,
                "estructura": estructura,
                "cargo": cargo,
                "tipoContrato": tipoContrato,
                "jornada": jornada,
                "centroCosto": centroCosto,
                "fecInicioContrato": fecInicioContrato,
                "supervisor": supervisor,
                "fonoSup": fonoSup,
                "lugarTrabajo": lugarTrabajo,
                "motivo": motivo,
                "estadoReq": estadoReq,
                "observacion": observacion,
                "rutReemplazo": rutReemplazo,
                "fecTerminoContrato": fecTerminoContrato,
                "baseP": baseP,
                "movilizacion": movilizacion,
                "colacion": colacion,
                "gratificacion": gratificacion,
                "tipoGratificacion": tipoGratificacion,
                "cotizacion": cotizacion,
                "ciudad": ciudad,
                "turno": turno,
                "direccion": direccion,
                "nombreComuna": nombreComuna,
                "genero": genero,
                "experiencia": experiencia,
                "comuna": comuna,
                "horario": horario,
                "reqPostulante": reqPostulante,
                "estudios": estudios,
                "buses": buses,
                "entrevista": entrevista,
                "tipoOperacion": tipoOperacion,
                "tipoVacante": tipoVacante,
                "ley": ley,
                "envioSeleccion": envioSel,
                "refConN": listaref,
                "empRem": listaEmp,
                "listaHorario": listaHorario,
                "nombreCuenta": nombreCuenta
            }),
            headers: {
                'Authorization': 'Bearer ' + token,
                //'Origin': origin
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //$("#ddlCentroCosto").empty();
                //console.log(data);
                if (data[0].codigo == "200") {
                    //inicialRequerimientoContratos();
                    var chek = $("#chkCopiar").is(':checked');
                    if (chek == false) {
                        limpiarReqNuevo();
                    } else {
                        $("#chkCopiar").prop('checked', false);
                    }
                    //document.getElementById('txtMensajeFinal').innerHTML = data[1].toString();
                    //$('#modalConfirmacion').modal('show');
                    document.getElementById('lblMensajeCorreo').innerText = data[1].toString();
                    document.getElementById('lblMensajeFolio').innerText = data[3].toString();
                    $('#modal-mensajeFolio').modal({ backdrop: 'static', keyboard: false });
                    $('#modal-mensajeFolio').modal('show');
                    //mensajeCorrecto(data[1].toString());

                } else {
                    if (data[2] == 1) {
                        mensajeAlerta(data[0].mensaje);
                    } else {
                        mensajeError(data[0].mensaje);
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error: arranca ctm');

            }
        });

    } else {
        //mensajeAlerta('no funca');
    }
}

function ActualizarRequerimientoContratoNuevo() {
    if (validacionBasicaCampos()) {
        var url = host() + 'RequerimientoContrato/ActualizarReqContratoNuevo/';
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);

        var folio = document.getElementById('txtFolioReqNuevo').value;
        var cantPersona = document.getElementById('txtCantPersonalRequerido').value.trim();
        var fecSolicitud = today.toLocaleDateString();
        var usr = document.getElementById('rut').value.trim();
        var rutCuenta = document.getElementById('ddlCuenta').value;
        var empresa = document.getElementById('ddlEmpresa').value;
        var estructura = document.getElementById('ddlEstructura').value;
        var cargo = document.getElementById('ddlCargo').value;
        var tipoContrato = document.getElementById('ddlTipoContrato').value;
        var jornada = document.getElementById('ddlJornada').value;
        var centroCosto = document.getElementById('ddlCentroCosto').value;
        var fecInicioContrato = document.getElementById('FecRequerimiento').value;
        var supervisor = document.getElementById('ddlSupervisor').value;
        var fonoSup = '+56 9' + document.getElementById('txtFonoSupervisor').value;
        var lugarTrabajo = document.getElementById('txtLugarTrabajo').value;
        //var motivo = document.getElementById('ddlMotivoReq').value;
        var motivo = document.getElementById('ddlMotivoReq').value;
        var estadoReq = '00';
        var observacion = document.getElementById('txtObservacion').value;
        var rutReemplazo = document.getElementById('txRutEmpleadoReemplazado').value;
        var fecTerminoContrato = document.getElementById('fecNewTerminoContrato').value;
        var baseP = '0';
        var movilizacion = '0';
        var colacion = '0';
        var gratificacion = '0';
        var tipoGratificacion = '';
        var cotizacion = '';
        var ciudad = document.getElementById('ddlCiudad').value;
        var turno = document.getElementById('ddlTurno').value;
        var direccion = document.getElementById('txtDirTrabajo').value;
        var ddlCom = document.getElementById('ddlComuna');
        var nombreComuna = ddlCom.options[ddlCom.selectedIndex].text;
        var genero = document.getElementById('ddlGenero').value;
        var experiencia = document.getElementById('ddlExperiencia').value;
        var comuna = document.getElementById('ddlComuna').value;
        var horario = document.getElementById('txtHorarioTrabajo').value;
        var reqPostulante = 'N';
        var estudios = document.getElementById('ddlEstudios').value;
        var buses = $("#chkBuses").is(':checked') ? 'S' : 'N';//document.getElementById('chkBuses').cheked ? 'S' : 'N';
        var entrevista = $("#chkEntrevistaCliente").is(':checked') ? 'S' : 'N';//document.getElementById('chkEntrevistaCliente').cheked ? 'S' : 'N';
        var tipoOperacion = document.getElementById('ddlTipoOperacion').value;
        var tipoVacante = document.getElementById('ddlTipoVacante').value;
        var ley = $("#chkLey21015Req").is(':checked') ? 'SI' : 'NO';//document.getElementById('chkLey21015Req').cheked ? 'SI' : 'NO';
        var envioSel = $("#chkSel").is(':checked') ? '1' : '0';//document.getElementById('chkSel').cheked ? 1 : 0;
        fecInicioContrato = $("#rdAM").is(':checked') ? fecInicioContrato + ' 07:30' : fecInicioContrato + ' 14:30';

        var table = $('#tbListaRef').DataTable();
        var listaref = [];
        table.rows().every(function () {
            var d = this.data();
            listaref.push(d);
        });

        var table2 = $('#tbListaPersonas').DataTable();
        var listaEmp = [];
        table2.rows().every(function () {
            var d = this.data();
            listaEmp.push(d);
        });

        var listaHorario = null;
        if (document.getElementById('ddlJornada').value != "AR22")
            listaHorario = eventoGuardarHorario();
        var nombreCuenta = $('#ddlCuenta').find('option:selected').text();

        //console.log(listaEmp);
        var token = document.getElementById('token').value;

        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify({
                "folio": folio,
                "fecSolicitud": fecSolicitud,
                "usr": usr,
                "cantPersona": cantPersona,
                "rutCuenta": rutCuenta,
                "empresa": empresa,
                "estructura": estructura,
                "cargo": cargo,
                "tipoContrato": tipoContrato,
                "jornada": jornada,
                "centroCosto": centroCosto,
                "fecInicioContrato": fecInicioContrato,
                "supervisor": supervisor,
                "fonoSup": fonoSup,
                "lugarTrabajo": lugarTrabajo,
                "motivo": motivo,
                "estadoReq": estadoReq,
                "observacion": observacion,
                "rutReemplazo": rutReemplazo,
                "fecTerminoContrato": fecTerminoContrato,
                "baseP": baseP,
                "movilizacion": movilizacion,
                "colacion": colacion,
                "gratificacion": gratificacion,
                "tipoGratificacion": tipoGratificacion,
                "cotizacion": cotizacion,
                "ciudad": ciudad,
                "turno": turno,
                "direccion": direccion,
                "nombreComuna": nombreComuna,
                "genero": genero,
                "experiencia": experiencia,
                "comuna": comuna,
                "horario": horario,
                "reqPostulante": reqPostulante,
                "estudios": estudios,
                "buses": buses,
                "entrevista": entrevista,
                "tipoOperacion": tipoOperacion,
                "tipoVacante": tipoVacante,
                "ley": ley,
                "envioSeleccion": envioSel,
                "refConN": listaref,
                "empRem": listaEmp,
                "listaHorario": listaHorario,
                "nombreCuenta": nombreCuenta
            }),
            headers: {
                'Authorization': 'Bearer ' + token,
                //'Origin': origin
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //$("#ddlCentroCosto").empty();
                //console.log(data);
                if (data[0].codigo == "200") {
                    //inicialRequerimientoContratos();
                    limpiarReqNuevo();
                    //document.getElementById('txtMensajeFinal').innerHTML = data[1].toString();
                    //$('#modalConfirmacion').modal('show');
                    document.getElementById('lblMensajeCorreo').innerText = data[1].toString();
                    document.getElementById('lblMensajeFolio').innerText = data[3].toString();
                    $('#modal-mensajeFolio').modal({ backdrop: 'static', keyboard: false });
                    $('#modal-mensajeFolio').modal('show');
                    //mensajeCorrecto(data[1].toString());

                } else {
                    if (data[2] == 1) {
                        mensajeAlerta(data[0].mensaje);
                    } else {
                        mensajeError(data[0].mensaje);
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error: arranca ctm');

            }
        });

    } else {
        //mensajeAlerta('no funca');
    }
}
function validacionBasicaCampos() {
    var err = 0;
    //document.getElementById('ddlCuenta').value == "-1" ? document.getElementById('ddlCuenta').className = 'form-control is-invalid' :'' ;
    var superMensaje = "Existen Campos obligatorios que debe completar";
    if (document.getElementById('ddlCuenta').value == "-1") {
        document.getElementById('ddlCuenta').className = 'form-control is-invalid';
        document.getElementById('lblDdlCuenta').focus();
        $("#ddlCuenta").change(function () {
            regeneraValidados('ddlCuenta');
        });
        //mensajeAlerta('Debe seleccionar una Cuenta' + document.getElementById('ddlCuenta').value);
        err = 1;
    }
    if (document.getElementById('ddlEmpresa').value == "-1") {
        document.getElementById('ddlEmpresa').className = 'form-control is-invalid';
        document.getElementById('ddlEmpresa').focus();
        $("#ddlEmpresa").change(function () {
            regeneraValidados('ddlEmpresa');
        });
        //mensajeAlerta('Debe seleccionar una Empresa');
        err = 1;
    }
    if (document.getElementById('ddlEstructura').value == "-1") {
        document.getElementById('ddlEstructura').className = 'form-control is-invalid';
        document.getElementById('ddlEstructura').focus();
        $("#ddlEstructura").change(function () {
            regeneraValidados('ddlEstructura');
        });
        //mensajeAlerta('Debe seleccionar una Estructura Liquida');
        err = 1;
    }
    if (document.getElementById('ddlCargo').value == "-1") {
        document.getElementById('ddlCargo').className = 'form-control is-invalid';
        document.getElementById('ddlCargo').focus();
        $("#ddlCargo").change(function () {
            regeneraValidados('ddlCargo');
        });
        //mensajeAlerta('Debe seleccionar un Cargo ');
        err = 1;
    }
    if (document.getElementById('ddlCentroCosto').value == "-1") {
        document.getElementById('ddlCentroCosto').className = 'form-control is-invalid';
        document.getElementById('ddlCentroCosto').focus();
        $("#ddlCentroCosto").change(function () {
            regeneraValidados('ddlCentroCosto');
        });
        //mensajeAlerta('Debe seleccionar un Centro de Costo ');
        err = 1;
    }
    if (document.getElementById('ddlJornada').value == "-1") {
        document.getElementById('ddlJornada').className = 'form-control is-invalid';
        document.getElementById('ddlJornada').focus();
        $("#ddlJornada").change(function () {
            regeneraValidados('ddlJornada');
        });
        //mensajeAlerta('Debe seleccionar una Jornada ');
        err = 1;
    }

    if (document.getElementById('ddlTipoContrato').value.trim() == "") {
        document.getElementById('ddlTipoContrato').className = 'form-control is-invalid';
        document.getElementById('ddlTipoContrato').focus();
        $("#ddlTipoContrato").change(function () {
            regeneraValidados('ddlTipoContrato');
        });
        //mensajeAlerta('Debe seleccionar un Tipo de Contrato ');
        err = 1;
    }
    if (document.getElementById('ddlTipoVacante').value == "-1") {
        document.getElementById('ddlTipoVacante').className = 'form-control is-invalid';
        document.getElementById('ddlTipoVacante').focus();
        $("#ddlTipoVacante").change(function () {
            regeneraValidados('ddlTipoVacante');
        });
        //mensajeAlerta('Debe seleccionar un tipo de vacante');
        err = 1;
    }
    if (document.getElementById('txtCantPersonalRequerido').value.trim() == "") {
        document.getElementById('txtCantPersonalRequerido').className = 'form-control is-invalid';
        document.getElementById('txtCantPersonalRequerido').focus();
        $("#txtCantPersonalRequerido").change(function () {
            regeneraValidados('txtCantPersonalRequerido');
        });
        //mensajeAlerta('Debe ingresar la cantidad de personal requerido');
        err = 1;
    }
    
    //if (isNan(date.parse($("#FecRequerimiento").val().trim()))) {
    //    document.getElementById('FecRequerimiento').className = 'form-control is-invalid';
    //    document.getElementById('FecRequerimiento').focus();
    //    mensajeAlerta('Debe ingresar una fecha valida')
    //}ddlCiudad
    if (document.getElementById('ddlSupervisor').value == "") {
        document.getElementById('ddlSupervisor').className = 'form-control is-invalid';
        document.getElementById('ddlSupervisor').focus();
        $("#ddlSupervisor").change(function () {
            regeneraValidados('ddlSupervisor');
        });
        //mensajeAlerta('Debe seleccionar un Supervisor');
        err = 1;
    }
    if (document.getElementById('ddlCiudad').value == "-1") {
        document.getElementById('ddlCiudad').className = 'form-control is-invalid';
        document.getElementById('ddlCiudad').focus();
        $("#ddlCiudad").change(function () {
            regeneraValidados('ddlCiudad');
        });
        //mensajeAlerta('Debe seleccionar una Ciudad');
        err = 1;
    }
    if (document.getElementById('ddlComuna').value == "-1") {
        document.getElementById('ddlComuna').className = 'form-control is-invalid';
        document.getElementById('ddlComuna').focus();
        $("#ddlComuna").change(function () {
            regeneraValidados('ddlComuna');
        });
        //mensajeAlerta('Debe seleccionar una Comuna');
        err = 1;
    }
    if (document.getElementById('txtLugarTrabajo').value.trim() == "") {
        document.getElementById('txtLugarTrabajo').className = 'form-control is-invalid';
        document.getElementById('txtLugarTrabajo').focus();
        $("#txtLugarTrabajo").change(function () {
            regeneraValidados('txtLugarTrabajo');
        });
        //mensajeAlerta('Debe ingresar el lugar de trabajo');
        err = 1;
    }
    
    if (document.getElementById('txtDirTrabajo').value.trim() == "") {
        document.getElementById('txtDirTrabajo').className = 'form-control is-invalid';
        document.getElementById('txtDirTrabajo').focus();
        $("#txtDirTrabajo").change(function () {
            regeneraValidados('txtDirTrabajo');
        });
        //mensajeAlerta('Debe ingresar la Dirección de trabajo');
        err = 1;
    }

    //if (document.getElementById('ddlTipoOperacion').value == "-1") {
    //    document.getElementById('ddlTipoOperacion').className = 'form-control is-invalid';
    //    document.getElementById('ddlTipoOperacion').focus();
    //    mensajeAlerta('Debe seleccionar un tipo de Operación');
    //}

    if (document.getElementById('ddlTurno').value == "-1") {
        document.getElementById('ddlTurno').className = 'form-control is-invalid';
        document.getElementById('ddlTurno').focus();
        $("#ddlTurno").change(function () {
            regeneraValidados('ddlTurno');
        });
        //mensajeAlerta('Debe seleccionar un Turno');
        err = 1;
    }
    if (document.getElementById('ddlMotivoReq').value == "-1") {
        document.getElementById('ddlMotivoReq').className = 'form-control is-invalid';
        document.getElementById('ddlMotivoReq').focus();
        $("#ddlMotivoReq").change(function () {
            regeneraValidados('ddlMotivoReq');
        });
        //mensajeAlerta('Debe seleccionar un Motivo de Requerimiento');
        err = 1;
    }
    if (document.getElementById('ddlTurno').value == "") {
        document.getElementById('ddlTurno').className = 'form-control is-invalid';
        document.getElementById('ddlTurno').focus();
        $("#ddlTurno").change(function () {
            regeneraValidados('ddlTurno');
        });
        //mensajeAlerta('Debe seleccionar un Turno');
    }
    if (document.getElementById('ddlMotivoReq').value == "") {
        document.getElementById('ddlMotivoReq').className = 'form-control is-invalid';
        document.getElementById('ddlMotivoReq').focus();
        $("#ddlMotivoReq").change(function () {
            regeneraValidados('ddlMotivoReq');
        });
        //mensajeAlerta('Debe seleccionar un Motivo de Requerimiento');
        err = 1;
    }
    if (document.getElementById('ddlJornada').value != "AR22") {
        if (document.getElementById('txtHorarioTrabajo').value == "") {
            document.getElementById('txtHorarioTrabajo').className = 'form-control is-invalid';
            document.getElementById('txtHorarioTrabajo').focus();
            $("#txtHorarioTrabajo").change(function () {
                regeneraValidados('txtHorarioTrabajo');
            });
            superMensaje = superMensaje + " ingresar un horario valido";
            //mensajeAlerta('Debe seleccionar un Motivo de Requerimiento');
            err = 1;
        }
    }
    if (document.getElementById('ddlJornada').value != "AR22") {
        if (document.getElementById('txtTotalHorasSemanal').value.trim() == "") {
            document.getElementById('txtTotalHorasSemanal').className = 'form-control is-invalid';
            document.getElementById('txtTotalHorasSemanal').focus();
            $("#txtTotalHorasSemanal").change(function () {
                regeneraValidados('txtTotalHorasSemanal');
            });
            //mensajeAlerta('Debe ingresar el lugar de trabajo');
            superMensaje = superMensaje + " ingresar un horario valido";
            err = 1;
        }
    }
   
    if (err == 0) {
        return true;
    } else {
        mensajeAlerta(superMensaje);
        return false;
    }

}
function regeneraValidados(asdf) {
    //console.log(document.getElementById(asdf).classList);
    var control = document.getElementById(asdf);
    if (control.classList.contains('is-invalid')) {
        control.classList.remove('is-invalid');
    } else {
        //(control.value == "" || control.value == "-1") ? control.classList.add('is-invalid') : control.classList.add('is-valid');
    }

}

function limpiaReferidoReqContrato(){
    document.getElementById('txtRutReferido').value = '';
    document.getElementById('txtNombreReferido').value = '';
    document.getElementById('txtTelefonoReferido').value = '';
}
function eventoBotonEliminarRef(data) {
    var opcion = confirm('¿Desea eliminar este Referido/Conocido?');
    if (opcion) {
        var table = $('#tbListaRef').DataTable();
        table.row(':eq(' + data + ')').remove().draw();
    }
}
function eventoBotonCargarListaRef() {
    var refRut = document.getElementById('txtRutReferido').value;
    var refNombre = document.getElementById('txtNombreReferido').value;
    var refTelefono = document.getElementById('txtTelefonoReferido').value;
    var refTipo = '';
    var ele = document.getElementsByName('rbRef');

    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            refTipo= ele[i].value;
    }
    var table = $('#tbListaRef').DataTable();
    var listaref = [];
    table.rows().every(function () {
        var d = this.data();
        listaref.push(d);
    });
    listaref.push({ 'rut': refRut, 'nombre': refNombre, 'Telefono': refTelefono,'tipo':refTipo });
    agregarNuevoReferidoReqContrato(listaref);
    limpiaReferidoReqContrato();
}
function eventoBotonCargarListaRefCnDt(rut,nombre,telefono,tipo) {
    var refRut = rut;
    var refNombre = nombre;
    var refTelefono = telefono;
    var refTipo = tipo == 'R' ? 'Referido' : 'Conocido';

    var ele = document.getElementsByName('rbRef');

    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            refTipo = ele[i].value;
    }
    var table = $('#tbListaRef').DataTable();
    var listaref = [];
    table.rows().every(function () {
        var d = this.data();
        listaref.push(d);
    });
    listaref.push({ 'rut': refRut, 'nombre': refNombre, 'Telefono': refTelefono, 'tipo': refTipo });
    agregarNuevoReferidoReqContrato(listaref);
    limpiaReferidoReqContrato();
}
function agregarNuevoReferidoReqContrato(data) {
    $('#tbListaRef').DataTable().destroy();
    $('#dvListaRef').collapse('show');
    dataTableref = $('#tbListaRef').DataTable({
        data: data,
        select: true,
        //dom: 'lrtip',
        columns: [
            { data: "id" },
            { data: "rut", orderable: true },
            { data: "nombre", orderable: true },
            { data: "Telefono", orderable: true },
            { data: "tipo", orderable: true }
        ],
        columnDefs: [
            {
                'targets': [0],
                //visible: false
                render: function (data, type, row, meta) {
                    //alert(dataTableAsociado.row(this).data());
                    //alert(row(this));
                    var id = meta.row;
                    //data = '<i id="iEliminarPersona" class="fa fa-trash" onclick="eventoBotonEliminarPersona(' + id + ')"></i>';
                    //lala = '<i id="iEliminarPersona" class="fa fa-trash" onclick="eventoBotonEliminarPersona(' + datosConsolidado + ',' + id + ')"></i>';
                    //data = '<i id="iEliminarPersona" class="fa fa-trash" onclick="' + dataTableAsociado.rows(this).remove().draw() + '"></i>';
                    lala = '<i id="iElimina"  style="cursor:pointer; font-weight: bold;" onclick="eventoBotonEliminarRef(' + id + ')">Eliminar</i>';
                    return lala;
                }
                //orderable: false,
                //className: 'select-checkbox',
                //targets: 0
            },
            {
                'targets': [0]
                //"searchable": true
            },
            {
                'targets': [1]
                //render: function (data, type, row, meta) {
                //    data = '<span>' + row.apellidoPaterno + ' ' + row.apellidoMaterno + ', ' + data + '</span>';
                //    return data;
                //}
            },
            {
                'targets': [2]
                //"searchable": true
            },
            {
                'targets': [3]
                //"searchable": true
            }
        ],
        select: {
            'style': 'multi'
        },
        paging: false,
        bFilter: false,
        "language": {
            select: {
                rows: {
                    _: '%d filas seleccionadas',
                    1: '1 fila seleccionada'
                }
            },
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "",
            "infoEmpty": "",
            "infoFiltered": "",
            "infoPostFix": "",
            "thousands": ",",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Búsqueda",
            "zeroRecords": ""
            //,"paginate": {
            //    "first": "Primero",
            //    "last": "Ultimo",
            //    "next": "Siguiente",
            //    "previous": "Anterior"
            //}
        }
        , 'order': [[1, 'asc']]
    });
    
}
function limpiarReqNuevo() {
    document.getElementById('txtCantPersonalRequerido').value = '';
    //document.getElementById('rut').value = '';
    document.getElementById('ddlCuenta').value = '-1';
    eventoDdlCuentaNuevoReq();

    //document.getElementById('ddlTipoContrato').value = '';
    document.getElementById('ddlTipoVacante').value ='-1';
    document.getElementById('txtFonoSupervisor').value = '';
    document.getElementById('txtLugarTrabajo').value = '';
    document.getElementById('ddlMotivoReq').value = '';
    document.getElementById('txtObservacion').value = '';
    document.getElementById('txRutEmpleadoReemplazado').value = '';
    document.getElementById('fecNewTerminoContrato').value = '';
    document.getElementById('ddlCiudad').value = '-1';
    eventoDdlCiudadReferido;
    document.getElementById('txtDirTrabajo').value = '';
    document.getElementById('ddlGenero').value = 'A';
    document.getElementById('ddlExperiencia').value = '0';
    document.getElementById('txtHorarioTrabajo').value = '';
    document.getElementById('ddlEstudios').value = '-1';
    $("#chkBuses").prop('checked', false);
    $("#chkEntrevistaCliente").prop('checked', false);
    $("#chkLey21015Req").prop('checked', false);
    document.getElementById('ddlTipoOperacion').value = '-1';

    $('#tbListaRef').DataTable().rows().remove().draw();
    $('#tbListaPersonas').DataTable().rows().remove().draw();

}