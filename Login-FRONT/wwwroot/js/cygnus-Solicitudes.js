function initSol() {
    esperando();
    CargaSelectCuentaSolicitados('ddlCuenta', 'DivDdlCuenta');
    CargaSelectEstado('DivddlEstado', 'ddlEstado');
    CargaSelectCentroCosto('DivddlCentroCosto', 'ddlCentroCosto');
    terminoEspera();

    buscarSolicitudes();
}
function CargaSelectEstado(div, ddl) {

    var url = host() + 'Solicitud/CargaDDLEstadoReq/';

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
                        crearDropDownList(datos, ddl, div);
                    }
                }
            },
            (error) => {
                console.log(error);
            }
        )
}
function CargaSelectCentroCosto(div, ddl) {

    var url = host() + 'Solicitud/CargarDDLCentroCosto/';

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
                        crearDropDownList(datos, ddl, div);
                    }
                }
            },
            (error) => {
                console.log(error);
            }
        )
}
function CargaSelectCuentaSolicitados(ddl, div) {

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
                    crearDropDownListEvento(datos, ddl, div, 'eventoDdlCuentaSolicitado()');
                }
            },
            (error) => {
                //crearDropDownList.log(error);
            }
        )
}
function CargaSelectSupervisorSolicitados(ddl, div) {

    var url = host() + 'RequerimientoContrato/SP_RC_Encargado_Listar/';

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
                    if (datos.length > 0) 
                        crearDropDownList(datos, ddl, div);
                    else 
                        crearDropDownListVacio(ddl, div, true);
                }
            },
            (error) => {
                crearDropDownList.log(error);
            }
        )
}
function eventoDdlCuentaSolicitado() {
    if (document.getElementById('ddlCuenta').value != "-1") 
        CargaSelectSupervisorSolicitados('ddlSupervisor', 'DivDdlSupervisor');
    else
        crearDropDownListVacio('ddlSupervisor', 'DivDdlSupervisor', true);
}
function buscarSolicitudes() {
    esperando();
    var token = document.getElementById('token').value;
    var idUsuario = '';
    var rutCuenta = document.getElementById('ddlCuenta').value = '' ? '-1' : document.getElementById('ddlCuenta').value;
    var idSistema = 115;
    var estado = document.getElementById('ddlEstado').value;
    var rutUsuario = document.getElementById('rut').value.trim();//document.getElementById('rut').value;
    var supervisor = document.getElementById('ddlSupervisor').value.trim() == '' ? '-1' : document.getElementById('ddlSupervisor').value.trim() ;//document.getElementById('rut').value;
    var centroCosto = document.getElementById('ddlCentroCosto').value == '' ? '-1': document.getElementById('ddlCentroCosto').value;
    //if (rutUsuario == '')
    //    rutUsuario = document.getElementById('rut').value;
    var dias = 150;
    var folio = document.getElementById('txtFolio').value == ''? '0':document.getElementById('txtFolio').value;

    //DST_20220401 Se agrego esto para que valide si tiene o no permiso para ver las lista de solicitudes.
    var uxs = document.getElementById('uxs').value;
    //DST_20220401

    //console.log(rutUsuario);
    //console.log(estado);
    $.ajax({
        type: "POST",
        //url: host() + "Solicitud/buscarSolicitudes/",
        url: host() + "Solicitud/buscarSolicitudesXCuenta/",
        data: JSON.stringify({
            //"idUsuario": idUsuario,
            //"estado": estado,
            //"rutUsuario": rutUsuario,
            //"dias": dias,
            //"folio": folio
            "rutCuenta": rutCuenta,
            "idSistema": idSistema,
            "dias": dias,
            "estado": estado,
            "folio": folio,
            "rutUsuario": rutUsuario,
            "centroCosto": centroCosto,
            "supervisor": supervisor,
            "uxs": uxs
        }),
        headers: {
            'Authorization': 'Bearer ' + token,
            //'Origin': origin
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var dataTable;
            var datos = data[1];
            if (data[0].codigo == '200') {
                $('#tbl_sol').DataTable().destroy();
                dataTable = $('#tbl_sol').DataTable({
                    data: datos,
                    pageLength: 10,
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            text: 'Descargar Excel',
                            title: 'Solicitudes',
                            exportOptions: {
                                columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,14,16]
                            }
                        }
                    ],
                    "language": {
                        "decimal": "",
                        "emptyTable": "No hay información",
                        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                        //"info": "",
                        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                        "infoPostFix": "",
                        "thousands": ",",
                        "lengthMenu": "Mostrar _MENU_ Entradas",
                        "loadingRecords": "Cargando...",
                        "processing": "Procesando...",
                        "search": "Busqueda rapida:",
                        "zeroRecords": "Sin resultados encontrados",
                        "paginate": {
                            "first": "Primero",
                            "last": "Ultimo",
                            "next": "Siguiente",
                            "previous": "Anterior"
                        }
                    },
                    "columns": [
                        {
                            targets: [0],
                            data: 'folio',
                            data2: 'estado',
                            className: 'dt-center',
                            orderable: true,
                            render: function (data, data2, type, row, meta) {
                                //if (type.estado == '01' && type.esReferido == '0' && type.esNuevo == '1') {
                                if (type.estado == '01' && type.esReferido == '0' && type.esNuevo == '1' && type.editarSolicitud == true) {
                                    return '<td><a href="#" onclick="buscarFolio(' + data + ');" style="color:#0d6cb3;">' + data + '</a></td>';
                                } else {
                                    return '<td>' + data + '</td>';
                                }
                            }
                        },
                        { data: 'fechaSol', className: "dt-center", 'width':'80px'},
                        { data: 'cuenta', className: "dt-center" },
                        //{ data: 'empresa', className: "dt-center" },
                        { data: 'estrLiq', className: "dt-center" },
                        { data: 'cant', className: "dt-center" },
                        { data: 'cargo', className: 'dt-center' },
                        { data: 'jornada', className: "dt-center" },
                        { data: 'turno', className: "dt-center" },
                        //{ data: 'tipoContrato', className: "dt-center" },
                        { data: 'centroCosto', className: "dt-center" },
                        { data: 'fechaReq', className: "dt-center" },
                        { data: 'lugarTrabajo', className: "dt-center" },
                        { data: 'nombreUsuario', className: "dt-center" },
                        { data: 'ley21015', className: "dt-center" },
                        //{ data: 'estado', className: "dt-center" },
                        {
                            targets: [13],
                            data: 'estado',
                            data2: 'estado',
                            className: 'dt-center',
                            orderable: true,
                            render: function (data, data2, type, row, meta) {
                                return '<td><input type="image" src="/Content/images/' + data + '.gif" title="'+traetooltip(data)+'"/ ></td>';
                            }
                        },
                        
                        {
                            targets: [14],
                            data: 'estado',
                            className: 'dt-center',
                            orderable: true,
                            visible:false,
                            render: function (data, data2, type, row, meta) {
                                //return '<td><a href="#" onclick="buscarPersonaSolicitud(' + data + ');" style="color:#0d6cb3;">' + data + '</a></td>';
                                //return '<button class="btn"><i class="fa fa-trash"></i></button>';
                                return traetooltip(data);
                            }
                        },
                        {
                            targets: [15],
                            data: 'observaciones',
                            className: 'dt-center',
                            orderable: true,
                            render: function (data, data2, type, row, meta) {
                                //return '<td><a href="#" onclick="buscarPersonaSolicitud(' + data + ');" style="color:#0d6cb3;">' + data + '</a></td>';
                                //return '<button class="btn"><i class="fa fa-trash"></i></button>';
                                return '<td><input type="image" src="/Content/images/Libro.png" style="cursor: help;" title="'+data+'"/ ></td>';
                            }
                        },
                        {
                            targets: [16],
                            data: 'observaciones',
                            className: 'dt-center',
                            orderable: true,
                            visible: false,
                            render: function (data, data2, type, row, meta) {
                                //return '<td><a href="#" onclick="buscarPersonaSolicitud(' + data + ');" style="color:#0d6cb3;">' + data + '</a></td>';
                                //return '<button class="btn"><i class="fa fa-trash"></i></button>';
                                return data;
                            }
                        },
                        {
                            targets: [17],
                            data: 'folio',
                            data2: 'estado',
                            className: 'dt-center',
                            orderable: true,
                            render: function (data, data2, type, row, meta) {
                                //return '<td><a href="#" onclick="buscarPersonaSolicitud(' + data + ');" style="color:#0d6cb3;">' + data + '</a></td>';
                                return '<button class="btn" onclick="buscarPersonaSolicitud(' + data + ');"><i class="fa fa-search"></i></button>';
                            }
                        }
                        //{ data: 'folio', className: "dt-center" },
                        //{
                        //    targets: [18],
                        //    data: 'postulantes',
                        //    className: 'text-nowrap',
                        //    orderable: true,
                        //    render: function (data, data2, type, row, meta) {
                        //        //return '<td><a href="#" onclick="buscarPersonaSolicitud(' + data + ');" style="color:#0d6cb3;">' + data + '</a></td>';
                        //        return '';
                        //    }
                        //}
                        //{ data: 'postulantes', className: "dt-center" }
                    ],
                    columnDefs: [
                        
                        {
                            "targets": "_all"
                        }
                    ],
                    'order': [[0, 'desc'], [1, "desc"]],
                });
            } else {

                $('#tbl_sol').DataTable().destroy();

                dataTable = $('#tbl_sol').DataTable({
                    data: datos,
                    pageLength: 10,
                    dom: 'lrtip',
                    "language": {
                        "decimal": "",
                        "emptyTable": "No hay información",
                        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                        //"info": "",
                        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                        "infoPostFix": "",
                        "thousands": ",",
                        "lengthMenu": "Mostrar _MENU_ Entradas",
                        "loadingRecords": "Cargando...",
                        "processing": "Procesando...",
                        "search": "Busqueda rapida:",
                        "zeroRecords": "Sin resultados encontrados",
                        "paginate": {
                            "first": "Primero",
                            "last": "Ultimo",
                            "next": "Siguiente",
                            "previous": "Anterior"
                        }
                    }
                });
            }

            //$('#tbl_sol').css("font-size", "14px");
            //document.getElementById('dvVacacionesPendientes').style.display = "block";
            //$("[data-widget='pushmenu']").click();
            //DetenerAnimacion();
            terminoEspera();
        },
        error: function (xhr, textStatus, errorThrown) {
            //DetenerAnimacion();
            console.log('Error: ' + xhr.responseText);
            terminoEspera();
        },
        
    });
}
function buscarFolio(folio) {
    //console.log(folio);
    //cargaFuncionalidad('' );
    //$.ajax({
    //    type: "GET",
    //    url: origen() + "RequerimientoContrato/RequerimientoContrato",
    //    data: JSON.stringify({
    //        "folio": folio
    //    }),
    //    headers: {
    //        'Authorization': 'Bearer ' + token,
    //        //'Origin': origin
    //    },
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (data) {
    //        cargaSolicitudSegunFolio(folio);
    //    },
    //    error: function (xhr, textStatus, errorThrown) {
    //        console.log('Error: ' + xhr.responseText);
    //    }
    //});
    var url = origen() + "RequerimientoContrato/RequerimientoContrato?f="+folio;

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
        .then()
}
function buscarPersonaSolicitud(folio) {
    var token = document.getElementById('token').value;

    $.ajax({
        type: "POST",
        url: host() + "Solicitud/buscarPersonasdeSolicitud/",
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

            var dataTable;
            var datos = data[1];
            if (data[0].codigo == '200') {
                $('#tbPersonasSolicitud').DataTable().destroy();
                dataTable = $('#tbPersonasSolicitud').DataTable({
                    data: datos,
                    pageLength: 10,
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            text: 'Descargar Excel',
                            title: 'Peronas Solicitud '+folio
                            //exportOptions: {
                            //    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                            //}
                        }
                    ],
                    "language": {
                        "decimal": "",
                        "emptyTable": "No hay información",
                        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                        //"info": "",
                        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                        "infoPostFix": "",
                        "thousands": ",",
                        "lengthMenu": "Mostrar _MENU_ Entradas",
                        "loadingRecords": "Cargando...",
                        "processing": "Procesando...",
                        "search": "Busqueda rapida:",
                        "zeroRecords": "Sin resultados encontrados",
                        "paginate": {
                            "first": "Primero",
                            "last": "Ultimo",
                            "next": "Siguiente",
                            "previous": "Anterior"
                        }
                    },
                    "columns": [
                        { data: 'Num', className: "dt-nowrap" },
                        { data: 'id', className: "dt-center" },
                        { data: 'LugardeTrabajo', className: "dt-center" },
                        { data: 'rutEmpleado', className: "dt-center" },
                        { data: 'Empleado', className: "dt-center" },
                        { data: 'UsuarioAsigna', className: 'dt-center' },
                        { data: 'fechaAsigna', className: "dt-center" },
                        { data: 'Estado', className: "dt-center" },
                        { data: 'FecInicio', className: "dt-center" },
                        { data: 'Dirección', className: "dt-center" },
                        { data: 'Comuna', className: "dt-center" },
                        { data: 'Fonos', className: "dt-center" },
                        { data: 'Cal', className: "dt-center" },
                        { data: 'Cam', className: "dt-center" },
                        { data: 'Pan', className: "dt-center" },
                        { data: 'Supervisor', className: "dt-center" },
                        { data: 'FSupervisor', className: "dt-center" },
                        { data: 'Motivo', className: "dt-center" },
                        { data: 'FecFirma', className: "dt-center" },
                    ],
                    columnDefs: [

                        {
                            "targets": "_all"
                        }
                    ],
                    'order': [[0, 'desc'], [1, "desc"]],
                });
            } else {
                //console.log(data);
                $('#tbPersonasSolicitud').DataTable().destroy();

                dataTable = $('#tbPersonasSolicitud').DataTable({
                    data: datos,
                    pageLength: 10,
                    dom: 'lrtip',
                    "language": {
                        "decimal": "",
                        "emptyTable": "No hay información",
                        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                        //"info": "",
                        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                        "infoPostFix": "",
                        "thousands": ",",
                        "lengthMenu": "Mostrar _MENU_ Entradas",
                        "loadingRecords": "Cargando...",
                        "processing": "Procesando...",
                        "search": "Busqueda rapida:",
                        "zeroRecords": "Sin resultados encontrados",
                        "paginate": {
                            "first": "Primero",
                            "last": "Ultimo",
                            "next": "Siguiente",
                            "previous": "Anterior"
                        }
                    }
                });
            }

            $('#modalPersonasSolicitud').modal('show');
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error: ' + xhr.responseText);
        }
    });
}
function traetooltip(estado) {
    if (estado == '00') {
        return 'Registrada'
    } else if (estado == '01') {
        return 'En Selección'
    } else if (estado == '02') {
        return 'Con Asignación de Trabajador(es)'
    } else if (estado == '09') {
        return 'Anulada'
    } else {
        return ''
    }
}

function cargaPantallaSolicitudes() {
    var url = origen() + "Solicitudes/Solicitudes";

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
        .then()
}