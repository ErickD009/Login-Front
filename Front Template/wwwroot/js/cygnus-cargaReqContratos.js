var datosGlobal;
var dataTable = "";
var dataTableAsociado = "";
var dataTableHorario = "";
var cantidadAdjunto = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function inicialRequerimientoReferidos() {
   
    ////DORMIR POR 1 SEGUNDOS PARA CARGAR LOS DATOS
    esperando();
    await sleep(1000);
    inicioReferidos();
    terminoEspera();
}

////INICIO DE REQUERIMIENTO
function inicioReferidos() {
   
    //document.getElementById('txtFolioRequerimiento').value = "";

    $('#dvPersonasEncontradas').collapse('hide');

    //$("#chkRotativo").click(function () {
    //    eventoTurnoRotativo($(this).prop("checked"));
    //});

    $("#chkExtranjero").click(function () {
        eventoExtranero($(this).prop("checked"));
    });

    $("#chkLey21015Ref").click(function () {
        var msjRut = validarRut(document.getElementById('txtRut'));
        if (msjRut != "") {
            limpiarLey21015();
            document.getElementById('chkLey21015Ref').readOnly = true;
        }
        else {
            document.getElementById('chkLey21015Ref').readOnly = false;
            eventoLey21015($(this).prop("checked"));
        } 
        //if (document.getElementById('txtRut').value.trim() == '') {
        //    limpiarLey21015();
        //    document.getElementById('chkLey21015Ref').readOnly  = true;
        //}
        //else {
        //    document.getElementById('chkLey21015Ref').readOnly  = false;
        //    eventoLey21015($(this).prop("checked"));
        //}   
    });

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

    $("#iBusPersonaPostulante").click(function () {
        eventoBusquedaPersonaPostulante();
    });

    $("#iAbrirHorario").click(function () {
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

    document.querySelector('[name="txtRut"]').addEventListener('keypress', function (e) {
        if (!/\d+|k/i.test(e.key)) e.preventDefault();
    });
    
    CargaSelectCuentaReferidos('ddlCuenta', 'DivDdlCuenta');
    CargaSelectMotivoReferidos('ddlMotivoReq', 'DivDdlMotivoReq');
    //CargaSelectRegionPos('ddlRegionPos', 'DivDdlRegionPos');
    CargaSelectComunaPos('ddlComunaPos', 'DivDdlComunaPos');
    CargaSelectGeneroCurricular('ddlGenero', 'DivDdlGenero');
    CargaSelectEstadoCivilCurricular('ddlEstadoCivil', 'DivDdlEstadoCivil');
    CargaSelectNacionalidadCurricular('ddlNacionalidad', 'DivDdlNacionalidad');
    //CargaSelectEducacionCurricular('DivDdlEducacion', 'ddlEducacion');
    CargaSelectTipoVisaCurricular('ddlVisa', 'DivDdlVisa');
    //CargaSelectOrigenCurricular('ddlOrigen', 'DivDdlOrigen', true);
    CargaSelectRecepcionFirma('ddlRecepcionFirma', 'DivDdlRecepcionFirma', true);

    CargaSelectAFPCurricular('ddlAFP', 'DivDdlAFP');
    CargaSelectIsapreCurricular('ddlIsapre', 'DivDdlIsapre');
    calIndividual('FecRequerimiento');
    calIndividual('FecTerminoContrato');
    calIndividual('FecTerminoVisa');
    calIndividual('FecNacimiento');
    //calIndividual('FecFechaInicioContratoPos');
    calIndividual('FecFirmaContrato');

    
    document.getElementById('FecRequerimiento').value = "";
    document.getElementById('FecTerminoContrato').value = "";
    document.getElementById('FecNacimiento').value = "";
    document.getElementById('txtHoraFirma').value = "12:00";
    
    cargarHorarioDefecto();

    validarCampos();

    document.getElementById('ddlCuenta').focus();

    cantidadAdjunto = 0;

    //////OJO ESTO DESPUES HAY QUE ELIMINARLO
    //habilitarPostulante();
}
////INICIO DE REQUERIMIENTO


////EVENTOS
//function eventoTurnoRotativo(seleccionado) {
//    if (seleccionado === true) {
//        document.getElementById('txtHorarioTrabajo').value = 'TURNO ROTATIVO 38 NUMERO 7';
//    } else {
//        if (document.getElementById('ddlJornada').value == '-1')
//            cargarHorarioDefecto();
//        else
//            eventoCambioHoraTotalSemanal();
//    }
//}
function eventoExtranero(seleccionado) {
    if (seleccionado === true) {
        $('#divExtranjero').collapse('show');
    } else {
        $('#divExtranjero').collapse('hide');
    }
}
function eventoLey21015(seleccionado) {
    //if (seleccionado === true) {
    $('#modal-inclusion').modal({ backdrop: 'static', keyboard: false })
    $('#modal-inclusion').modal('show');
    document.getElementById('tituloInclusion').innerHTML = 'Detalle Inclusión de ' + document.getElementById('txtNombre').value + ' ' + document.getElementById('txtApellidoPaterno').value + ' ' + document.getElementById('txtApellidoMaterno').value;
        // $('#tituloInclusion').innerHTML  = 'Detalle Inclusion de ';// + $('#txtNombre').text;

    //} else {
    //    $('#modal-default').collapse('hide');
    //}
}
function eventoPdsAsociados() {
    if (document.getElementById('ddlCuenta').value != '-1' && document.getElementById('ddlCiudad').value != '-1') {
        $('#modal-PDS').modal({ backdrop: 'static', keyboard: false })
        $('#modal-PDS').modal('show');
    }
}
function eventoBusquedaPersona() {
    if (document.getElementById('ddlMotivoReq').value != '-1') {
        $('#modal-Persona').modal({ backdrop: 'static', keyboard: false })
        $('#modal-Persona').modal('show');
    }
}
function eventoAbrirHorario() {
    if (dataTableHorario != "") {
        eventoActualizacionHoras();
        $('#modal-horario').modal({ backdrop: 'static', keyboard: false })
        $('#modal-horario').modal('show');
    }
    else
        $('#modal-horario').modal('hide');
    //if (dataTableHorario != "") {
    //    if ($('#dvHorario').hasClass('show'))
    //        $('#dvHorario').collapse('hide');
    //    else
    //        $('#dvHorario').collapse('show');
    //}
    //else {
    //    $('#dvHorario').collapse('hide');
    //}
}
function eventoBotonCargarInfoPDS() {

    var PXC_AUTOID = document.getElementById('ddlPDSAsociados').value;
    if (PXC_AUTOID > 0) {
        var url = host() + 'RequerimientoContrato/Obtener_PDS_X_Cuenta_Y_Ciudad/';

        var CTA_RUT = document.getElementById('ddlCuenta').value;
        //var PXC_AUTOID = document.getElementById('ddlPDSAsociados').value;
        var CIUDAD = document.getElementById('ddlCiudad').value;
        var token = document.getElementById('token').value;

        //console.log("token: " + token);

        const valores = new FormData();
        valores.append('CTA_RUT', CTA_RUT);
        valores.append('PXC_AUTOID', PXC_AUTOID);
        valores.append('CIUDAD', CIUDAD);

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
                            document.getElementById('txtLugarTrabajo').value = datos[0].pdsNombre;
                            document.getElementById('txtDirTrabajo').value = datos[0].pdsDireccion;
                            document.getElementById('ddlComuna').value = datos[0].idComuna;
                            document.getElementById('txtLugarTrabajo').setAttribute("disabled", "disabled");
                            //document.getElementById('txtDirTrabajo').setAttribute("disabled", "disabled");
                            document.getElementById('ddlComuna').setAttribute("disabled", "disabled");
                            validarObligatorio(document.getElementById('txtLugarTrabajo'));
                            validarObligatorio(document.getElementById('txtDirTrabajo'));
                        }
                        else {

                        }
                    }
                },
                (error) => {
                    crearDropDownList.log(error);
                }
            )
    }
    
}
function eventoBotonCargarInfoPersona() {
    //$('#modal-espera-persona-lg').modal('show');  
    esperando();

    var url = host() + 'RequerimientoContrato/BuscarPersonalReqContrato/';

    var nombres = document.getElementById('txtBusNombres').value;
    var paterno = document.getElementById('txtBusApellidoPaterno').value;
    var materno = document.getElementById('txtBusApellidoMaterno').value;
    var rutEmpleado = document.getElementById('txtBusRut').value;
    var rutCliente = document.getElementById('ddlCuenta').value;
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    const valores = new FormData();
    valores.append('nombres', nombres);
    valores.append('paterno', paterno);
    valores.append('materno', materno);
    valores.append('rutEmpleado', rutEmpleado);
    valores.append('rutCliente', rutCliente);

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
                    ArmaGrillaPersonasEncontradas(datos);
                    $('#dvPersonasEncontradas').collapse('show');
                    //$('#modal-espera-persona-lg').modal('hide');  
                    terminoEspera();

                    //if (datos.length > 0) {
                    //    alert(datos[0].rut);
                    //    //document.getElementById('txtDirTrabajo').value = datos[0].pdsDireccion;
                    //    //document.getElementById('ddlComuna').value = datos[0].idComuna;
                    //    //document.getElementById('txtLugarTrabajo').setAttribute("disabled", "disabled");
                    //    //document.getElementById('txtDirTrabajo').setAttribute("disabled", "disabled");
                    //    //document.getElementById('ddlComuna').setAttribute("disabled", "disabled");
                    //}
                    //else {

                    //}
                }
            },
            (error) => {
                crearDropDownList.log(error);
                //$('#modal-espera-persona-lg').modal('hide');  
                terminoEspera();
            }
        )
}
function eventoBotonCargarListaPersona() {
    if (dataTable != "") {
        var listaSeleccinados = dataTable.rows($('table tr').has('input:checked')).data();
        //dataTable.rows($('table tr').has('input:checked')).remove().draw();
        if (listaSeleccinados.length == 1) {
            ArmaGrillaPersonasSeleccionados(listaSeleccinados);
            $('#dvListaPersonas').collapse('show');
        }
        else if (listaSeleccinados.length > 1) {
            mensajeAlerta('No puede seleccionar mas de un reemplazo');
        }
        else
            mensajeAlerta('Debe seleccionar al menos uno');
        //if (dataTableAsociado == "") {

        //}   
        //else
        //    $('#dvListaPersonas').collapse('hide');
    }
    else {
        console.log('No se ha creado la tabla');
        //alert('No se ha creado la tabla');
    }
}
function eventoBotonEliminarPersona(id) {
    var opcion = confirm('¿Desea eliminar este reemplazo?')
    if (opcion) {

        if (dataTableAsociado != "") {
            dataTableAsociado.row({ id: id }).remove().draw();
            //dataTableAsociado.rows(id).remove().draw();
            //dataTableAsociado.rows(id).remove().draw();
            //dataTableAsociado.rows.row.rut.remove().draw();
            //dataTable.rows($('table tr').has('input:checked')).remove().draw();
        }
        else
            alert('sin datos en la tabla');
    }


}
function limpiarLugarTrabajo() {
    document.getElementById('txtLugarTrabajo').removeAttribute("disabled");
    document.getElementById('txtDirTrabajo').removeAttribute("disabled");
    document.getElementById('ddlComuna').removeAttribute("disabled");
    document.getElementById('txtLugarTrabajo').value = '';
    document.getElementById('txtDirTrabajo').value = '';
    //document.getElementById('ddlComuna').value = '-1';
}
////EVENTOS



////CARGAS DE DDLS
function CargaSelectCuentaReferidos(ddl, div) {

    var url = host() + 'RequerimientoContrato/CargaDDLCuentas_X_RutUsuario/';

    var rutUsuario = document.getElementById('rut').value;
    //var texto_inicial = "";
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    const valores = new FormData();
    valores.append('rutUsuario', rutUsuario);
    //valores.append('texto_inicial', texto_inicial);

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
                    crearDropDownListEvento(datos, ddl, div, 'eventoDdlCuentaReferido()', true);
                    //crearValidacionDropDownList(ddl, true);
                    validarObligatorio(document.getElementById(ddl));
                }
            },
            (error) => {
                //crearDropDownList.log(error);
            }
        )
}
function CargaSelectCuentaNuevoReq(ddl, div) {
    esperando();
    var url = host() + 'RequerimientoContrato/CargaDDLCuentas_X_RutUsuario/';

    var rutUsuario = document.getElementById('rut').value;
    //var texto_inicial = "";
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    const valores = new FormData();
    valores.append('rutUsuario', rutUsuario);
    //valores.append('texto_inicial', texto_inicial);

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
                    crearDropDownListEvento(datos, ddl, div, 'eventoDdlCuentaNuevoReq()', false);
                    terminoEspera();
                }
            },
            (error) => {
                //crearDropDownList.log(error);
                terminoEspera();
            }
        )
}
function CargaSelectEmpresaReferidos(ddl, div) {

    var url = host() + 'RequerimientoContrato/CargarDDLEmpresas_X_RutCuenta/';

    var rutCuenta = document.getElementById('ddlCuenta').value;
    var texto_inicial = "";
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    const valores = new FormData();
    valores.append('rutCuenta', rutCuenta);
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
                        crearDropDownListEvento(datos, ddl, div, 'eventoDdlEmpresaReferido()', true);
                        validarObligatorio(document.getElementById(ddl));
                    }
                    else {
                        crearDropDownListVacio(ddl, div, true);
                    }
                    eventoDdlEmpresaReferido();
                }
            },
            (error) => {
                crearDropDownList.log(error);
            }
        )
}
function CargaSelectEmpresaNuevoReq(ddl, div,opt = 0) {

    var url = host() + 'RequerimientoContrato/CargarDDLEmpresas_X_RutCuenta/';

    var rutCuenta = document.getElementById('ddlCuenta').value;
    var texto_inicial = "";
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    const valores = new FormData();
    valores.append('rutCuenta', rutCuenta);
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
                        crearDropDownListEvento(datos, ddl, div, 'eventoDdlEmpresaNuevoReq()', false);
                        //validarObligatorio(document.getElementById(ddl));
                    }
                    else {
                        crearDropDownListVacio(ddl, div, false);
                    }
                    if (opt == 0) {
                        eventoDdlEmpresaNuevoReq();
                    }
                    
                }
            },
            (error) => {
                crearDropDownList.log(error);
            }
        )
}
function CargaSelectEstructuraReferidos(ddl, div) {

    var url = host() + 'RequerimientoContrato/CargarDDLEstructura_X_RutCuenta_Y_Empresa/';

    var rutCuenta = document.getElementById('ddlCuenta').value;
    var empresa = document.getElementById('ddlEmpresa').value;
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
                        crearDropDownListEvento(datos, ddl, div, 'eventoDdlEstructuraReferido()', true);
                        validarObligatorio(document.getElementById(ddl));
                    }
                    else {
                        crearDropDownListVacio(ddl, div, true);
                        eventoDdlEstructuraReferido();
                    }
                    eventoDdlEstructuraReferido();
                }
            },
            (error) => {
                crearDropDownList.log(error);
            }
        )
}
function CargaSelectEstructuraNuevoReq(ddl, div) {

    var url = host() + 'RequerimientoContrato/CargarDDLEstructura_X_RutCuenta_Y_Empresa/';

    var rutCuenta = document.getElementById('ddlCuenta').value;
    var empresa = document.getElementById('ddlEmpresa').value;
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
                        crearDropDownListEvento(datos, ddl, div, 'eventoDdlEstructuraNuevoReq()', false);
                    }
                    else {
                        crearDropDownListVacio(ddl, div, false);
                        eventoDdlEstructuraNuevoReq();
                    }
                    eventoDdlEstructuraNuevoReq();
                }
            },
            (error) => {
                crearDropDownList.log(error);
            }
        )
}
function CargaSelectCargoReferidos(ddl, div) {

    var url = host() + 'RequerimientoContrato/CargarDDLCargo_X_Empresa_Y_Estructura/';

    var empresa = document.getElementById('ddlEmpresa').value;
    var estructura = document.getElementById('ddlEstructura').value;
    var texto_inicial = "";
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

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
                        crearDropDownListEvento(datos, ddl, div, 'eventoDdlCargoReferido()', true);
                        validarObligatorio(document.getElementById(ddl));
                    }
                    else {
                        crearDropDownListVacio(ddl, div, true);
                    }
                    eventoDdlCargoReferido();
                }
            },
            (error) => {
                crearDropDownList.log(error);
            }
        )
}
function CargaSelectCargoNuevoReq(ddl, div) {

    var url = host() + 'RequerimientoContrato/CargarDDLCargo_X_Empresa_Y_Estructura/';

    var empresa = document.getElementById('ddlEmpresa').value;
    var estructura = document.getElementById('ddlEstructura').value;
    var texto_inicial = "";
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

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
                        crearDropDownListEvento(datos, ddl, div, 'eventoDdlCargoNuevoRef()', false);
                    }
                    else {
                        crearDropDownListVacio(ddl, div, false);
                    }
                    eventoDdlCargoNuevoRef();
                }
            },
            (error) => {
                crearDropDownList.log(error);
            }
        )
}
function CargaSelectCentroCostoReferidos(ddl, div) {

    var url = host() + 'RequerimientoContrato/CargarDDLCentroCosto_X_Empresa_Y_Estructura/';

    var empresa = document.getElementById('ddlEmpresa').value;
    var estructura = document.getElementById('ddlEstructura').value;
    var texto_inicial = "";
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

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
                        crearDropDownListEvento(datos, ddl, div, 'eventoDdlCentroCostoReferido()', true);
                        validarObligatorio(document.getElementById(ddl));
                    }
                    else {
                        crearDropDownListVacio(ddl, div, true);
                    }
                    eventoDdlCentroCostoReferido();
                }
            },
            (error) => {
                crearDropDownList.log(error);
            }
        )
}
function CargaSelectCentroCostoNuevoReq(ddl, div) {

    var url = host() + 'RequerimientoContrato/CargarDDLCentroCosto_X_Empresa_Y_Estructura/';

    var empresa = document.getElementById('ddlEmpresa').value;
    var estructura = document.getElementById('ddlEstructura').value;
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
                        crearDropDownListEvento(datos, ddl, div, 'eventoDdlCentroCostoNuevoReq()', false);
                    }
                    else {
                        crearDropDownListVacio(ddl, div, true);
                    }
                    eventoDdlCentroCostoNuevoReq();
                }
            },
            (error) => {
                crearDropDownList.log(error);
            }
        )
}
function CargaSelectJornadaReferidos(ddl, div) {

    var url = host() + 'RequerimientoContrato/CargarDDLJornada_X_Empresa_Estructura_Cargo_CentroCosto/';

    var empresa = document.getElementById('ddlEmpresa').value;
    var estructura = document.getElementById('ddlEstructura').value;
    var cargo = document.getElementById('ddlCargo').value;
    var centroCosto = document.getElementById('ddlCentroCosto').value;
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
                        crearDropDownListEvento(datos, ddl, div, 'eventoDdlJornadaReferidos()', true);
                        validarObligatorio(document.getElementById(ddl));
                        //crearDropDownList(datos, ddl, div);
                        document.getElementById('superMensajeVitoco').style.display = "none";
                    }
                    else {
                        crearDropDownListVacio(ddl, div, true);
                        document.getElementById('superMensajeVitoco').style.display = "block";

                    }
                    eventoDdlJornadaReferidos();
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
function CargaSelectJornadaNuevoReq(ddl, div) {

    var url = host() + 'RequerimientoContrato/CargarDDLJornada_X_Empresa_Estructura_Cargo_CentroCosto/';

    var empresa = document.getElementById('ddlEmpresa').value;
    var estructura = document.getElementById('ddlEstructura').value;
    var cargo = document.getElementById('ddlCargo').value;
    var centroCosto = document.getElementById('ddlCentroCosto').value;
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
                        crearDropDownListEvento(datos, ddl, div, 'eventoDdlJornadaReferidos()', false);
                        //crearDropDownListEvento(datos, ddl, div, 'eventoInfoJornada()', false);
                        //crearDropDownList(datos, ddl, div);
                        document.getElementById('superMensajeVitoco').style.display = "none";
                    }
                    else {
                        crearDropDownListVacio(ddl, div, false);
                        document.getElementById('superMensajeVitoco').style.display = "block";

                    }
                    //eventoInfoJornada();
                    eventoDdlJornadaReferidos();
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
function CargaSelectSupervisorReferidos(ddl, div) {

    var url = host() + 'RequerimientoContrato/SP_RC_Encargado_Listar/';

    //var empresa = document.getElementById('ddlEmpresa').value;
    //var estructura = document.getElementById('ddlEstructura').value;
    //var cargo = document.getElementById('ddlCargo').value;
    var cuenta = document.getElementById('ddlCuenta').value;
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

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
                        crearDropDownList(datos, ddl, div, true);
                        validarObligatorio(document.getElementById(ddl));
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
function CargaSelectSupervisorReqNuevo(ddl, div) {

    var url = host() + 'RequerimientoContrato/SP_RC_Encargado_Listar/';

    //var empresa = document.getElementById('ddlEmpresa').value;
    //var estructura = document.getElementById('ddlEstructura').value;
    //var cargo = document.getElementById('ddlCargo').value;
    var cuenta = document.getElementById('ddlCuenta').value;
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

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
                        crearDropDownList(datos, ddl, div, false);
                        //validarObligatorio(document.getElementById(ddl));
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
function CargaSelectTipoVacante(ddl, div) {

    var url = host() + 'RequerimientoContrato/CargaDDLTipoVacante/';

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
                        crearDropDownList(datos, ddl, div, true);
                        validarObligatorio(document.getElementById(ddl));
                    }
                    else {
                        crearDropDownListVacio(ddl, div, false);
                    }
                }
            },
            (error) => {
                console.log(error);
            }
        )
}
function CargaSelectTipoOperacion(ddl, div) {

    var url = generico() + 'Parametro/CargaDDLParametrizados/';

    var idTabla = 153;
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
                        crearDropDownList(datos, ddl, div, true);  
                        validarObligatorio(document.getElementById(ddl));
                        //crearValidacionDropDownList(ddl, true);
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

function CargaSelectTipoOperacionNuevoReq(ddl, div) {

    var url = generico() + 'Parametro/CargaDDLParametrizados/';

    var idTabla = 153;
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
                        crearDropDownList(datos, ddl, div, false);
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
function CargaSelectTurno(ddl, div) {

    var url = host() + 'RequerimientoContrato/CargaDDLTurno/';

    //var rutCuenta = document.getElementById('ddlCuenta').value;
    //var texto_inicial = "";
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    //const valores = new FormData();
    //valores.append('rutCuenta', rutCuenta);
    //valores.append('texto_inicial', texto_inicial);

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Origin': origin
        }//,
        //body: valores
    })
        .then(res => res.json())
        .then(
            (result) => {
                if (controlCarga(result)) {
                    var datos = result[1];
                    if (datos.length > 0) {
                        crearDropDownList(datos, ddl, div, true);
                        //crearDropDownListEvento(datos, ddl, div, 'eventoDdlTurnoReferido()', true);
                        validarObligatorio(document.getElementById(ddl));
                    }
                    else {
                        crearDropDownListVacio(ddl, div, true);
                    }
                    eventoDdlEmpresaReferido();
                }
            },
            (error) => {
                crearDropDownList.log(error);
            }
        )
}
function CargaSelectTurnoNuevoReq(ddl, div,opt ='') {

    var url = host() + 'RequerimientoContrato/CargaDDLTurno/';

    //var rutCuenta = document.getElementById('ddlCuenta').value;
    //var texto_inicial = "";
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    //const valores = new FormData();
    //valores.append('rutCuenta', rutCuenta);
    //valores.append('texto_inicial', texto_inicial);

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Origin': origin
        }//,
        //body: valores
    })
        .then(res => res.json())
        .then(
            (result) => {
                if (controlCarga(result)) {
                    var datos = result[1];
                    if (datos.length > 0) {
                        crearDropDownList(datos, ddl, div, false);
                        if (opt != '') {
                            document.getElementById('ddlTurno').value = opt;
                        }
                    }
                    else {
                        crearDropDownListVacio(ddl, div, false);
                    }
                    //eventoDdlEmpresaNuevoReq();
                }
            },
            (error) => {
                crearDropDownList.log(error);
            }
        )
}
function CargaSelectCiudadReferidos(ddl, div) {

    var url = generico() + 'Parametro/CargaDDLComunaCiudadRegionXCCosto/';

    var idCCosto = -1;
    var codCCosto = document.getElementById('ddlCentroCosto').value;
    var idTabla = 2;
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    const valores = new FormData();
    valores.append('idCCosto', idCCosto);
    valores.append('codCCosto', codCCosto);
    valores.append('idTabla', idTabla);

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
                        crearDropDownListEvento(datos, ddl, div, 'eventoDdlCiudadReferido()', true);
                        validarObligatorio(document.getElementById(ddl));
                        eventoDdlCiudadReferido();
                    }
                    else {
                        crearDropDownListVacio(ddl, div, true);
                    }
                    ////SE COMENTO 20220228 DEBIDO A QUE SE CAIA EN LA CONSOLA DEL NAVEGADOR 
                    //eventoDdlCiudadReferido();
                }
            },
            (error) => {
                crearDropDownList.log(error);
            }
        )
}
function CargaSelectCiudadReferidosOld(ddl, div) {

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
                        crearDropDownListEvento(datos, ddl, div, 'eventoDdlCiudadReferido()', true);
                        validarObligatorio(document.getElementById(ddl));
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

function CargaSelectComunaReferidos(ddl, div) {

    var url = generico() + 'Parametro/CargaDDLParametrizadosXValor/';

    var idTabla = 1;
    var valor = document.getElementById('ddlCiudad').value;
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
                        crearDropDownList(datos, ddl, div, true);
                        validarObligatorio(document.getElementById(ddl));
                        //eventoDdlEmpresaReferido();
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
function CargaSelectMotivoReferidos(ddl, div) {

    var url = host() + 'RequerimientoContrato/CargarDDLMotivoRequerimiento/';

    var empresa = document.getElementById('ddlEmpresa').value;;
    var todo = "0";
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    const valores = new FormData();
    valores.append('empresa', empresa);
    valores.append('todo', todo);

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
                        //crearDropDownList(datos, ddl, div, true);
                        crearDropDownListEvento(datos, ddl, div, 'motivoReqRef()', true);
                        validarObligatorio(document.getElementById(ddl));
                    }
                }
            },
            (error) => {
                crearDropDownList.log(error);
            }
        )
}
function CargaSelectMotivoNuevoReq(ddl, div,opt='') {
    esperando();
    var url = host() + 'RequerimientoContrato/CargarDDLMotivoRequerimiento/';

    var empresa = document.getElementById('ddlEmpresa').value;;
    var todo = "0";
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    const valores = new FormData();
    valores.append('empresa', empresa);
    valores.append('todo', todo);

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
                        //ojo q estas funciones con SPL son especiales para este ddl ojo al cambiarla por otra, cambiara tambien el value de este
                        //crearDropDownListSPL(datos, ddl, div, false);
                        crearDropDownListEventoSPL(datos, ddl, div,'motivoReq()', false);
                        if (opt != '') {
                            document.getElementById('ddlMotivoReq').value = opt;
                        }
                        //validarObligatorio(document.getElementById(ddl));
                        terminoEspera();
                    }
                }
            },
            (error) => {
                crearDropDownList.log(error);
                terminoEspera();
            }
        )
}
////CARGAS DE DDLS


////EVENTOS DDLS
//function eventoDdlTurnoReferido() {
//    if (document.getElementById('ddlTurno').value != "-1") {
//        //ROTATIVO
//        if (document.getElementById('ddlTurno').value == "4") {
//            document.getElementById('txtHorarioTrabajo').value = 'TURNO ROTATIVO 38 NUMERO 7';
//        }
//        else {
//            if (document.getElementById('ddlJornada').value == '-1')
//                cargarHorarioDefecto();
//            else
//                eventoCambioHoraTotalSemanal();
//        }
//    }
//}
function eventoDdlCuentaReferido() {
    if (document.getElementById('ddlCuenta').value != "-1") {
        CargaSelectEmpresaReferidos('ddlEmpresa', 'DivDdlEmpresa');
        //CargaSelectCiudadReferidos('ddlCiudad', 'DivDdlCiudad');
        CargaSelectTipoOperacion('ddlTipoOperacion', 'DivDdlTipoOperacion');
        CargaSelectTipoVacante('ddlTipoVacante', 'DivDdlTipoVacante');
        CargaSelectTurno('ddlTurno', 'DivDdlTurno');
        CargaSelectSupervisorReferidos('ddlSupervisor', 'DivDdlSupervisor');
        CargaSelectMotivoReferidos('ddlMotivoReq', 'DivDdlMotivoReq');
    }
    else {
        crearDropDownListVacio('ddlEmpresa', 'DivDdlEmpresa', true);
        eventoDdlEmpresaReferido();
        //crearDropDownListVacio('ddlCiudad', 'DivDdlCiudad', true);
        crearDropDownListVacio('ddlTipoOperacion', 'DivDdlTipoOperacion', true);
        crearDropDownListVacio('ddlTipoVacante', 'DivDdlTipoVacante', true);
        crearDropDownListVacio('ddlTurno', 'DivDdlTurno', true);
        crearDropDownListVacio('ddlSupervisor', 'DivDdlSupervisor', true);
        crearDropDownListVacio('ddlMotivoReq', 'DivDdlMotivoReq', true);
        document.getElementById('txtFonoSupervisor').value = '';
        document.getElementById('FecRequerimiento').value = '';
        document.getElementById('FecTerminoContrato').value = '';
        document.getElementById('txtObservacion').value = '';
    }
    validarCampos();
    document.getElementById('ddlCiudad').value = '-1';
    eventoDdlCiudadReferido();
}
function eventoDdlCuentaNuevoReq(sinReg = 0) {
    esperando();
    if (document.getElementById('ddlCuenta').value != "-1") {
        CargaSelectEmpresaNuevoReq('ddlEmpresa', 'DivDdlEmpresa', sinReg);
        if (sinReg == 0) {
            CargaSelectSupervisorReqNuevo('ddlSupervisor', 'DivDdlSupervisor');
            //CargaSelectCiudadReferidos('ddlCiudad', 'DivDdlCiudad');
            CargaSelectTipoOperacionNuevoReq('ddlTipoOperacion', 'DivDdlTipoOperacion');
        }
        //CargaSelectTipoVacante('ddlTipoVacante', 'DivDdlTipoVacante');
        //CargaSelectTurno('ddlTurno', 'DivDdlTurno');
        CargaSelectTurnoNuevoReq('ddlTurno', 'DivDdlTurno');
    }
    else {
        //crearDdlFormulariosObtenerReportesVacio('ddlFormulario', 'dvDdlFormulario');
        eventoDdlEmpresaNuevoReq();
        crearDropDownListVacio('ddlEstructura', 'DivDdlEstructura');
        crearDropDownListVacio('ddlCargo', 'DivDdlCargo');
        crearDropDownListVacio('ddlCentroCosto', 'DivDdlCentroCosto',false);
        crearDropDownListVacio('ddlJornada', 'DivDdlJornada',false);
        crearDropDownListVacio('ddlEmpresa', 'DivDdlEmpresa', false);
        //crearDropDownListVacio('ddlCiudad', 'DivDdlCiudad', false);
        crearDropDownListVacio('ddlTipoOperacion', 'DivDdlTipoOperacion', false);
        //crearDropDownListVacio('ddlTipoVacante', 'DivDdlTipoVacante', false);
        crearDropDownListVacio('ddlTurno', 'DivDdlTurno', false);
        crearDropDownListVacio('ddlSupervisor', 'DivDdlSupervisor', false);
    }
    eventoDdlCiudadReferido();
    
}
function eventoDdlEmpresaReferido() {
    if (document.getElementById('ddlEmpresa').value != "-1") {
        CargaSelectEstructuraReferidos('ddlEstructura', 'DivDdlEstructura');
    }
    else {
        crearDropDownListVacio('ddlEstructura', 'DivDdlEstructura', true);
        eventoDdlEstructuraReferido();
    }
}
function eventoDdlEmpresaNuevoReq() {
    if (document.getElementById('ddlEmpresa').value != "-1") {
        CargaSelectEstructuraNuevoReq('ddlEstructura', 'DivDdlEstructura');
    }
    else {
        crearDropDownListVacio('ddlEstructura', 'DivDdlEstructura', true);
        eventoDdlEstructuraNuevoReq();
    }
}
function eventoDdlEstructuraNuevoReq() {
    if (document.getElementById('ddlEstructura').value != "-1") {
        CargaSelectCargoNuevoReq('ddlCargo', 'DivDdlCargo');
    }
    else {
        crearDropDownListVacio('ddlCargo', 'DivDdlCargo', true);
        eventoDdlCargoNuevoRef();
    }
}
function eventoDdlEstructuraReferido() {
    if (document.getElementById('ddlEstructura').value != "-1") {
        CargaSelectCargoReferidos('ddlCargo', 'DivDdlCargo');
    }
    else {
        crearDropDownListVacio('ddlCargo', 'DivDdlCargo', true);
        eventoDdlCargoReferido();
    }
}
function eventoDdlCargoReferido() {
    if (document.getElementById('ddlCargo').value != "-1") {
        CargaSelectCentroCostoReferidos('ddlCentroCosto', 'DivDdlCentroCosto');
    }
    else {
        crearDropDownListVacio('ddlCentroCosto', 'DivDdlCentroCosto', true);
        eventoDdlCentroCostoReferido();
    }
}
function eventoDdlCargoNuevoRef() {
    if (document.getElementById('ddlCargo').value != "-1") {
        CargaSelectCentroCostoNuevoReq('ddlCentroCosto', 'DivDdlCentroCosto');
    }
    else {
        crearDropDownListVacio('ddlCentroCosto', 'DivDdlCentroCosto', true);
        eventoDdlCentroCostoNuevoReq();
    }
}
function eventoDdlCentroCostoNuevoReq() {
    if (document.getElementById('ddlCentroCosto').value != "-1") {
        CargaSelectJornadaNuevoReq('ddlJornada', 'DivDdlJornada');
        CargaSelectCiudadReferidos('ddlCiudad', 'DivDdlCiudad');
    }
    else {
        crearDropDownListVacio('ddlJornada', 'DivDdlJornada', true);
        crearDropDownListVacio('ddlCiudad', 'DivDdlCiudad', true);
        eventoDdlJornadaReferidos();
        //eventoInfoJornada();
    }
}
function eventoDdlCentroCostoReferido() {
    if (document.getElementById('ddlCentroCosto').value != "-1") {
        CargaSelectJornadaReferidos('ddlJornada', 'DivDdlJornada');
        CargaSelectCiudadReferidos('ddlCiudad', 'DivDdlCiudad');
        CargaSelectRecepcionFirma('ddlRecepcionFirma', 'DivDdlRecepcionFirma');
    }
    else {
        crearDropDownListVacio('ddlJornada', 'DivDdlJornada', true);
        crearDropDownListVacio('ddlCiudad', 'DivDdlCiudad', true);
        CargaSelectRecepcionFirma('ddlRecepcionFirma', 'DivDdlRecepcionFirma');
        eventoDdlJornadaReferidos();
    }
}
function eventoDdlJornadaReferidos() {
    //cargarHorarioDefecto();
    eventoLimpiarHorarioYTexto();
    eventoInfoJornada();
}
function eventoDdlCiudadReferido() {
    if (document.getElementById('ddlCiudad').value != "-1" && document.getElementById('ddlCiudad').value != "") {
        CargaSelectComunaReferidos('ddlComuna', 'DivDdlComuna');
        CargaSelectPDSAsociados('ddlPDSAsociados', 'DivDdlPDSAsociados');
    }
    else {
        crearDropDownListVacio('ddlComuna', 'DivDdlComuna', true);
        crearDropDownListVacio('ddlPDSAsociados', 'DivDdlPDSAsociados');
    }
    limpiarLugarTrabajo();
    terminoEspera();
}
function eventoInfoJornada() {
    esperando();

    var url = host() + 'RequerimientoContrato/ObtenerJornadasVacaciones/';

    var codJornada = document.getElementById('ddlJornada').value;
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

                        ////document.getElementById('lblTooltipJornada').setAttribute('data-original-title', 'La jornada ' + datos[0].codigoJornada + ' que tiene como nombre: ' + datos[0].nombreJornada + ' debe tener ' + datos[0].horasXDia + ' horas diarias en ' + datos[0].diaXSemana + ' días a la semana');
                        //document.getElementById('lblTooltipJornada').setAttribute('data-original-title', 'La jornada ' + datos[0].nombreJornada + ' debe tener ' + datos[0].horasXDia + ' horas diarias en ' + datos[0].diaXSemana + ' días a la semana, con ' + datos[0].horasXDia * datos[0].diaXSemana + ' hrs. totales semanales');
                        //document.getElementById('lblInfoJornadaModal').innerText = 'La jornada ' + datos[0].nombreJornada + ' debe tener ' + datos[0].horasXDia + ' horas diarias en ' + datos[0].diaXSemana + ' días a la semana, con ' + datos[0].horasXDia * datos[0].diaXSemana + ' hrs. totales semanales';
                        document.getElementById('lblTooltipJornada').setAttribute('data-original-title', 'La jornada ' + datos[0].nombreJornada + ' debe tener ' + datos[0].horasXDia + ' horas diarias en ' + datos[0].diaXSemana + ' días a la semana, con ' + datos[0].horasXSemana + ' hrs. totales semanales');
                        document.getElementById('lblInfoJornadaModal').innerText = 'La jornada ' + datos[0].nombreJornada + ' debe tener ' + datos[0].horasXDia + ' horas diarias en ' + datos[0].diaXSemana + ' días a la semana, con ' + datos[0].horasXSemana + ' hrs. totales semanales';
                        document.getElementById('txtHrasJornada').value = datos[0].horasXDia;
                    }
                    else {
                        document.getElementById('lblTooltipJornada').setAttribute('data-original-title', 'Información respectiva a la jornada seleccionada.');
                        document.getElementById('lblInfoJornadaModal').innerText = 'Información respectiva a la jornada seleccionada.';
                        document.getElementById('txtHrasJornada').value = 0;
                    }   
                }
            },
            (error) => {
                crearDropDownList.log(error);
                //$('#modal-espera-persona-lg').modal('hide');  
                terminoEspera();
            }
        )
}
////EVENTOS DDLS



////GRILLAS
function ArmaGrillaPersonasEncontradas(datosConsolidado) {//, datosNuevos) {
    //var datosConsolidado = agregarDato(datos, datosNuevos);

    $('#tbPersonasEncontradas').DataTable().destroy();

    dataTable = $('#tbPersonasEncontradas').DataTable({
        data: datosConsolidado,
        select: true,
        //dom: 'lrtip',
        //retrieve: true,
        columns: [
            //{ data: "Key" },
            //{ data: "Value", orderable: true }
            { data: "id" },
            { data: "rut", orderable: true },
            { data: "nombre", orderable: true },
            { data: "estado", orderable: true },
            { data: "jornada", orderable: true },
            { data: "fechaIngreso", orderable: true }
            //, { data: "idGrupo" }
            //, { data: "nombreGrupo" }
        ],
        columnDefs: [
            {
                'targets': [0],
                'checkboxes': {
                    'selectRow': true
                }
                //orderable: false,
                //className: 'select-checkbox',
                //targets: 0
            },
            {
                'targets': [1]
                //"searchable": true
            },
            {
                targets: [2],
                render: function (data, type, row, meta) {
                    data = '<span>' + row.apellidoPaterno + ' ' + row.apellidoMaterno + ', ' + data + '</span>';
                    return data;
                }
            },
            {
                'targets': [3]
                //"searchable": true
            },
            {
                'targets': [4]
                //,"searchable": true
            },
            {
                'targets': [5]
                //,"searchable": true
            }
        ],
        select: {
            'style': 'multi'
        },
        paging: true,
        //bFilter: true,
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
function ArmaGrillaPersonasSeleccionados(datosConsolidado) {
    $('#tbListaPersonas').DataTable().destroy();
    dataTableAsociado = $('#tbListaPersonas').DataTable({
        data: datosConsolidado,
        select: true,
        //dom: 'lrtip',
        columns: [
            { data: "id" },
            { data: "rut", orderable: true },
            { data: "nombre", orderable: true }
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
                    lala = '<i id="iEliminarPersona" style="cursor:pointer; font-weight: bold;" onclick="eventoBotonEliminarPersona(' + data + ')">Eliminar</i>';
                    return lala;
                }
                //orderable: false,
                //className: 'select-checkbox',
                //targets: 0
            },
            {
                'targets': [1]
                //"searchable": true
            },
            {
                targets: [2],
                render: function (data, type, row, meta) {
                    data = '<span>' + row.apellidoPaterno + ' ' + row.apellidoMaterno + ', ' + data + '</span>';
                    return data;
                }
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

    //$('#tbListaPersonas tbody').on('click', 'img.icon-delete', function () {
    //    dataTableAsociado
    //        .row($(this).parents('tr'))
    //        .remove()
    //        .draw();
    //});

    //$("#btnQuitarPDS").click(function () {
    //    if (dataTable != "") {
    //        var listaSeleccinados = dataTableAsociado.rows($('table tr').has('input:checked')).data();
    //        dataTableAsociado.rows($('table tr').has('input:checked')).remove().draw();
    //        agregarDato(dataTable, listaSeleccinados);
    //    }
    //    else {
    //        console.log('No se ha creado la tabla');
    //        //mensajeAlerta('No se ha creado la tabla');
    //    }
    //});
    ////Opcion 2, para usarla se debe comentar "data: datos," en el datatable de arriba
    //console.log(datos);
    //for (var i = 0; i < datos.length; i++) {
    //    var obj = { pxc: datos[i].pxcAutoid, nombre: datos[i].pdsNombreCodigo}
    //    //console.log(obj);
    //    //console.log(obj.nombre);
    //    dataTableAsociado.row.add({
    //        "pxcAutoid": obj.pxc,
    //        "pdsNombreCodigo": obj.nombre
    //    }).draw();
    //}

    ////Opcion 3, para usarla se debe comentar "data: datos," en el datatable de arriba
    //var listaObjetos = datos.split('|');
    //var listaSeleccinados = new Array();
    //for (var i = 0; i < listaObjetos.length - 1; i++) {
    //    //var obj = [ listaObjetos[i].split(';')[0], listaObjetos[i].split(';')[1] ];
    //    //console.log(obj);
    //    //console.log();
    //    //listaSeleccinados.push([listaObjetos[i].split(';')[0], listaObjetos[i].split(';')[1]]);
    //    dataTableAsociado.row.add({
    //        "pxcAutoid": listaObjetos[i].split(';')[0],
    //        "pdsNombreCodigo": listaObjetos[i].split(';')[1]
    //    }).draw();
    //}
    ////console.log(datos.split('|')[0].split(';')[0]);
    ////console.log(listaSeleccinados);


}
////GRILLAS


////METODO PARA QUE VALIDE LOS CAMPOS DDLS
function validarCampos() {
    //DDL
    validarObligatorio(document.getElementById('ddlCuenta'));
    validarObligatorio(document.getElementById('ddlEmpresa'));
    validarObligatorio(document.getElementById('ddlEstructura'));
    validarObligatorio(document.getElementById('ddlCargo'));
    validarObligatorio(document.getElementById('ddlCentroCosto'));
    validarObligatorio(document.getElementById('ddlJornada'));
    validarObligatorio(document.getElementById('ddlTipoOperacion'));
    validarObligatorio(document.getElementById('ddlTipoVacante'));
    validarObligatorio(document.getElementById('ddlTurno'));
    validarObligatorio(document.getElementById('ddlMotivoReq'));
    validarObligatorio(document.getElementById('ddlSupervisor'));
    validarObligatorio(document.getElementById('ddlCiudad'));
    validarObligatorio(document.getElementById('ddlComuna'));

    //TEXT
    validarObligatorio(document.getElementById('txtFonoSupervisor'));
    validarObligatorio(document.getElementById('txtLugarTrabajo'));
    validarObligatorio(document.getElementById('txtDirTrabajo'));
    validarObligatorio(document.getElementById('txtObservacion'));
    
    if (document.getElementById('ddlJornada').value != "AR22") {
        validarObligatorio(document.getElementById('txtTotalHorasSemanal'));
        validarObligatorio(document.getElementById('txtHorarioTrabajo'));
    }
        
    validarObligatorio(document.getElementById('FecRequerimiento'));
    validarObligatorio(document.getElementById('FecTerminoContrato'));

}
function motivoReq() {
    var asdf = document.getElementById('ddlMotivoReq').value.split(';')[0];
    if (asdf == '01' || asdf == '02' || asdf == '03' || asdf == '06' || asdf == '14' || asdf == '26') {
        document.getElementById('fecNewTerminoContrato').value = '';
        document.getElementById('fecNewTerminoContrato').disabled = true;
    } else {
        document.getElementById('fecNewTerminoContrato').disabled = false;
    }
}
function motivoReqRef() {
    var asdf = document.getElementById('ddlMotivoReq').value.split(';')[0];
    if (asdf == '01' || asdf == '02' || asdf == '03' || asdf == '06' || asdf == '14' || asdf == '26') {
        document.getElementById('FecTerminoContrato').value = '';
        document.getElementById('FecTerminoContrato').disabled = true;
    } else {
        document.getElementById('FecTerminoContrato').disabled = false;
    }
}
////METODO PARA QUE VALIDE LOS CAMPOS DDLS