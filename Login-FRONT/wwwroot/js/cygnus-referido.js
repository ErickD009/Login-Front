const fill = (number, len) => "0".repeat(len - number.toString().length) + number.toString();
var dataTablePersonaPostulante = "";
var dataTableDocumentos = "";

//function CargaSelectOrigenCurricular(id, div, obligatorio = false) {
//    var construccion = '';

//    if (obligatorio == true)
//        construccion += '<select id="' + id + '" name="' + id + '" class="form-control" onchange="validarObligatorio(' + id + ');">';
//    else
//        construccion += '<select id="' + id + '" name="' + id + '" class="form-control">';

//    construccion += '<option value="-1">-- SELECCIONE --</option>';
//    construccion += '<option value="CYGNUS">CYGNUS</option>';
//    construccion += '<option value="CLIENTE">CLIENTE</option>';

//    construccion += '</select>';

//    document.getElementById(div).innerHTML = construccion;
//}

////HORARIOS
function cargarHorarioDefecto() {

    esperando();

    var url = origen() + 'RequerimientoContrato/CrearHorarioDefecto/';

    fetch(url, {
        method: 'POST',
        headers: {
            //'Authorization': 'Bearer ' + token,
            'Origin': origin
        }
    })
        .then(res => res.json())
        .then(
            (result) => {
                var datos = result[1];
                ArmaGrillaHorario(datos);
                //eventoCambioHoraTotalSemanal(0);
                eventoCambioHoraTotalSemanal();
                terminoEspera();
            },
            (error) => {
                terminoEspera();
            }
        )
}
function ArmaGrillaHorario(datos) {//, datosNuevos) {
    //var datosConsolidado = agregarDato(datos, datosNuevos);

    $('#tbHorario').DataTable().destroy();

    dataTableHorario = $('#tbHorario').DataTable({
        data: datos,
        //select: true,
        //dom: 'lrtip',
        //retrieve: true,
        columns: [
            //{ data: "Key" },
            //{ data: "Value", orderable: true }
            { data: "id" },
            { data: "dia" },
            { data: "entrada" },
            { data: "salida" },
            { data: "colacion" },
            { data: "tiempo" },
            { data: "tiempoReal" },
            { data: "id" },
            { data: "id" }
            //, { data: "idGrupo" }
            //, { data: "nombreGrupo" }
        ],
        columnDefs: [
            {
                'targets': [0],
                visible: false
            },
            {
                'targets': [1],
                render: function (data, type, row, meta) {
                    data = '<span style="font-weight:bold;">' + data + '</span>';
                    return data;
                }
            },
            {
                'targets': [2],
                render: function (data, type, row, meta) {
                    ////data = '<input type="text" id="txt_' + row.id + '_entrada" name="txt_' + row.id + '_entrada" class="form-control" value="' + data + '" onchange="eventoCambioHoraTotalSemanal();" maxlength="5" onkeypress="return event.charCode >= 48 && event.charCode <= 57" />';
                    //data = '<input type="time" id="txt_' + row.id + '_entrada" name="txt_' + row.id + '_entrada" class="form-control" value="' + data + '" onchange="eventoCambioHoraTotalSemanal(' + row.id + ');" maxlength="5" />';
                    data = '<input type="time" id="txt_' + row.id + '_entrada" name="txt_' + row.id + '_entrada" class="form-control" value="' + data + '" onchange="eventoActualizacionHoras();" maxlength="5" />';
                    return data;
                }
            },
            {
                targets: [3],
                render: function (data, type, row, meta) {
                    ////data = '<input type="text" id="txt_' + row.id + '_salida" name="txt_' + row.id + '_salida" class="form-control" value="' + data + '" onchange="eventoCambioHoraTotalSemanal();" maxlength="5" onkeypress="return event.charCode >= 48 && event.charCode <= 57" />';
                    //data = '<input type="time" id="txt_' + row.id + '_salida" name="txt_' + row.id + '_salida" class="form-control" value="' + data + '" onchange="eventoCambioHoraTotalSemanal();" maxlength="5" />';
                    data = '<input type="time" id="txt_' + row.id + '_salida" name="txt_' + row.id + '_salida" class="form-control" value="' + data + '" onchange="eventoActualizacionHoras();" maxlength="5" />';
                    return data;
                }
            },
            {
                'targets': [4],
                render: function (data, type, row, meta) {
                    ////data = '<input type="text" id="txt_' + row.id + '_colacion" name="txt_' + row.id + '_colacion" class="form-control" value="' + data + '" onchange="eventoCambioHoraTotalSemanal();" maxlength="5" onkeypress="return event.charCode >= 48 && event.charCode <= 57" />';
                    //data = '<input type="time" id="txt_' + row.id + '_colacion" name="txt_' + row.id + '_colacion" class="form-control" value="' + data + '" onchange="eventoCambioHoraTotalSemanal();" maxlength="5" />';
                    data = '<input type="time" id="txt_' + row.id + '_colacion" name="txt_' + row.id + '_colacion" class="form-control" value="' + data + '" onchange="eventoActualizacionHoras();" maxlength="5" />';

                    return data;
                }
            },
            {
                'targets': [5],
                render: function (data, type, row, meta) {
                    ////data = '<input type="text" id="txt_' + row.id + '_tiempo" name="txt_' + row.id + '_tiempo" class="form-control" value="' + data + '" onchange="eventoCambioHoraTotalSemanal();" maxlength="5" onkeypress="return event.charCode >= 48 && event.charCode <= 57" />';
                    ////data = '<input type="time" id="txt_' + row.id + '_tiempo" name="txt_' + row.id + '_tiempo" class="form-control" value="' + data + '" onchange="eventoCambioHoraTotalSemanal();" maxlength="5" />';
                    //data = '<input type="time" id="txt_' + row.id + '_tiempo" name="txt_' + row.id + '_tiempo" class="form-control" onchange="eventoCambioHoraTotalSemanal();" maxlength="5" readonly />';
                    data = '<input type="time" id="txt_' + row.id + '_tiempo" name="txt_' + row.id + '_tiempo" class="form-control" maxlength="5" readonly />';
                    return data;
                }
            },
            {
                'targets': [6],
                render: function (data, type, row, meta) {
                    ////data = '<input type="text" id="txt_' + row.id + '_tiempoReal" name="txt_' + row.id + '_tiempoReal" class="form-control" value="' + data + '" onchange="eventoCambioHoraTotalSemanal();" maxlength="5" onkeypress="return event.charCode >= 48 && event.charCode <= 57" />';
                    //data = '<input type="time" id="txt_' + row.id + '_tiempoReal" name="txt_' + row.id + '_tiempoReal" class="form-control" value="' + data + '" onchange="eventoCambioHoraTotalSemanal();" maxlength="5" readonly/>';
                    data = '<input type="time" id="txt_' + row.id + '_tiempoReal" name="txt_' + row.id + '_tiempoReal" class="form-control" value="' + data + '" maxlength="5" readonly/>';
                    return data;
                }
            },
            {
                'targets': [7],
                "className": "dt-center",
                render: function (data, type, row, meta) {
                    //////data = '<button type="button" id="btn_' + row.id + '_limpiar" class="btn accionCygnus" onclick="limpiarHorario(' + row.id + ')">Limpiar</button>';
                    ////data = '<i id="img_' + row.id + '_limpiar" class="fa fa-trash" onclick="limpiarHorario(' + row.id + ')" title="Limpiar valores de la fila"></a>';
                    //////data = '<button type="button" id="btn_' + row.id + '_limpiar" class="btn accionCygnus">Limpiar</button>';
                    //data = '<a href="#" rel="no-refresh" id="img_' + row.id + '_limpiar" onclick="limpiarHorario(' + row.id + ')" style="cursor: pointer">Limpiar</a>';
                    data = '<i id="img_' + row.id + '_limpiar" onclick="limpiarHorario(' + row.id + ')" style="cursor:pointer; font-weight: bold;">Limpiar</i>';
                    return data;
                }
            },
            {
                'targets': [8],
                "className": "dt-center",
                render: function (data, type, row, meta) {
                    //////data = '<button type="button" id="btn_' + row.id + '_Defecto" class="btn accionCygnus" onclick="defaultHorario(' + row.id + ')">Valores Defecto</button>';
                    ////data = '<i id="img_' + row.id + '_Defecto" class="fa fa-hourglass-half" onclick="defaultHorario(' + row.id + ')" title="Reestablecer valores por defecto de la fila"></a>';
                    //data = '<a href="#" rel="no-refresh" id="img_' + row.id + '_Defecto" onclick="defaultHorario(' + row.id + ')" style="cursor: pointer">Reestablecer</a>';
                    data = '<i id="img_' + row.id + '_Defecto" onclick="defaultHorario(' + row.id + ')" style="cursor:pointer; font-weight: bold;">Reestablecer</i>';
                    return data;
                }
            }
        ],
        //select: {
        //    'style': 'multi'
        //},
        paging: false,
        bFilter: false,
        "language": {
            //select: {
            //    rows: {
            //        _: '%d filas seleccionadas',
            //        1: '1 fila seleccionada'
            //    }
            //},
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "",
            "infoEmpty": "",
            "infoFiltered": "",
            "infoPostFix": "",
            "thousands": ",",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            //"search": "Búsqueda",
            "zeroRecords": ""
            //,"paginate": {
            //    "first": "Primero",
            //    "last": "Ultimo",
            //    "next": "Siguiente",
            //    "previous": "Anterior"
            //}
        }
        , 'order': [[0, 'asc']]
    });
}
function limpiarHorario(id) {
    document.getElementById("txt_" + id + "_entrada").value = "00:00";
    document.getElementById("txt_" + id + "_salida").value = "00:00";
    document.getElementById("txt_" + id + "_colacion").value = "00:00";
    document.getElementById("txt_" + id + "_tiempo").value = "00:00";
    document.getElementById("txt_" + id + "_tiempoReal").value = "00:00";

    //cambiarTexto();
    eventoActualizacionHoras();
}
function defaultHorario(id) {
    document.getElementById("txt_" + id + "_entrada").value = "07:00";
    document.getElementById("txt_" + id + "_salida").value = "15:00";
    document.getElementById("txt_" + id + "_colacion").value = "00:30";
    document.getElementById("txt_" + id + "_tiempo").value = "09:30";
    document.getElementById("txt_" + id + "_tiempoReal").value = "09:00";

    //cambiarTexto();
    eventoActualizacionHoras();
}
function eventoCambioHoraTotalSemanalV2() {
    //var listaHorario = dataTableHorario.rows($('table tr').has('input')).data();
    //alert(document.getElementById("txt_" + id + "_entrada").value);
    var listaHorario = dataTableHorario.rows($('table tr')).data();

    var inputEntrada;
    var inputSalida;
    var inputColacion;
    var total1;
    var total2;
    var total3;
    var total4;
    var total5;
    var total6;
    var total7;
    var inputTotal;

    for (var i = 1; i < listaHorario.length + 1; i++) {
        //if (i != 6 && i != 7) {
        inputEntrada = document.getElementById("txt_" + i + "_entrada");
        inputSalida = document.getElementById("txt_" + i + "_salida");
        inputColacion = document.getElementById("txt_" + i + "_colacion");
        inputTotal = document.getElementById("txtTotalHorasSemanal");


        var horaEntrada = inputEntrada.valueAsDate;
        var horaSalida = inputSalida.valueAsDate;
        var horaColacion = inputColacion.valueAsDate;
        var horaTotal = inputTotal.valueAsDate;

        var s = (horaSalida.getTime() - horaEntrada.getTime());
        var s2 = (horaSalida.getTime() - horaEntrada.getTime() - horaColacion.getTime());

        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;
        hrs = fill(hrs, 2);
        mins = fill(mins, 2);
        document.getElementById("txt_" + i + "_tiempo").value = hrs + ':' + mins;

        ms = s2 % 1000;
        s2 = (s2 - ms) / 1000;
        secs = s2 % 60;
        s2 = (s2 - secs) / 60;
        mins = s2 % 60;
        hrs = (s2 - mins) / 60;
        hrs = fill(hrs, 2);
        mins = fill(mins, 2);
        document.getElementById("txt_" + i + "_tiempoReal").value = hrs + ':' + mins;



        strMsg = hrs + ':' + mins + ':' + secs;
        
    }

    total1 = document.getElementById("txt_1_tiempoReal");
    total2 = document.getElementById("txt_2_tiempoReal");
    total3 = document.getElementById("txt_3_tiempoReal");
    total4 = document.getElementById("txt_4_tiempoReal");
    total5 = document.getElementById("txt_5_tiempoReal");
    total6 = document.getElementById("txt_6_tiempoReal");
    total7 = document.getElementById("txt_7_tiempoReal");

    var hora1 = total1.valueAsDate;
    var hora2 = total2.valueAsDate;
    var hora3 = total3.valueAsDate;
    var hora4 = total4.valueAsDate;
    var hora5 = total5.valueAsDate;
    var hora6 = total6.valueAsDate;
    var hora7 = total7.valueAsDate;
    var horaTotal = inputTotal.valueAsDate;

    var s = (hora1.getTime() + hora2.getTime() + hora3.getTime() + hora4.getTime() + hora5.getTime() + hora6.getTime() + hora7.getTime());


    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    hrs = fill(hrs, 2);
    mins = fill(mins, 2);
    document.getElementById("txtTotalHorasSemanal").value = hrs + ':' + mins;
    if (document.getElementById('ddlJornada').value != "AR22")
        validarObligatorio(document.getElementById('txtTotalHorasSemanal'));
    
    cambiarTexto();
    if (document.getElementById('ddlJornada').value != "AR22")
        validarObligatorio(document.getElementById('txtHorarioTrabajo'));
    //document.getElementById("txtTotalHorasSemanal").value = hrs + ':' + mins;
    //alert(totalHoras);
    //$('#txtTotalHorasSemanal').val(totalHoras);
    //var lala = listaHorario[0];
    //if (listaHorario.length > 1)
    //    alert('paso' + lala.entrada);
    //else
    //    alert('no');
    //$('#txtTotalHorasSemanal').val(28);
}
function eventoActualizacionHoras() {
    
    var listaHorario = dataTableHorario.rows($('table tr')).data();

    //document.getElementById('txtTotalDiasSemanalJornada').value = '0';
    var contadorDiasSemana = 0;
    
    var inputEntrada;
    var inputSalida;
    var inputColacion;
    var total1;
    var total2;
    var total3;
    var total4;
    var total5;
    var total6;
    var total7;
    var inputTotal;

    for (var i = 1; i < listaHorario.length + 1; i++) {
        //if (i != 6 && i != 7) {
        inputEntrada = document.getElementById("txt_" + i + "_entrada");
        inputSalida = document.getElementById("txt_" + i + "_salida");
        inputColacion = document.getElementById("txt_" + i + "_colacion");
        inputTotal = document.getElementById("txtTotalHorasSemanal");

        var horaEntrada = inputEntrada.valueAsDate;
        var horaSalida = inputSalida.valueAsDate;
        var horaColacion = inputColacion.valueAsDate;

        if (horaEntrada != null && horaSalida != null && horaColacion != null) {
            ////SI LA HORA DE ENTRADA ES MAYOT QUE LA SALIDA (PARA QUE FUNCIONE CON EL FORMATO 24 HRS)
            if (horaEntrada.getTime() > horaSalida.getTime())
                horaEntrada.setDate(horaEntrada.getDate() - 1);
            var s = (horaSalida.getTime() - horaEntrada.getTime());
            var s2 = (s - horaColacion.getTime());
            ////SI LA HORA TRABAJADA ES MENOR QUE LA HORA DE COLACION
            if (s2 <= 0) {
                if (horaEntrada.getTime() > 0 || horaSalida.getTime() > 0) {
                    s2 = 0;
                    //mensajeValidacion = 'El tiempo de colación no puede ser mayor que el tiempo de trabajo';
                }
                //break;
            }

            var ms = s % 1000;
            s = (s - ms) / 1000;
            var secs = s % 60;
            s = (s - secs) / 60;
            var mins = s % 60;
            var hrs = (s - mins) / 60;
            hrs = fill(hrs, 2);
            mins = fill(mins, 2);
            document.getElementById("txt_" + i + "_tiempo").value = hrs + ':' + mins;

            ms = s2 % 1000;
            s2 = (s2 - ms) / 1000;
            secs = s2 % 60;
            s2 = (s2 - secs) / 60;
            mins = s2 % 60;
            hrs = (s2 - mins) / 60;
            hrs = fill(hrs, 2);
            mins = fill(mins, 2);
            document.getElementById("txt_" + i + "_tiempoReal").value = hrs + ':' + mins;

            strMsg = hrs + ':' + mins + ':' + secs;
        }
        else {
            mensajeValidacion = 'No puede existir horas ni minutos vacios';
            break;
        }   
    }

    document.getElementById('txtTotalDiasSemanalJornada').value = contadorDiasSemana;
    total1 = document.getElementById("txt_1_tiempoReal");
    total2 = document.getElementById("txt_2_tiempoReal");
    total3 = document.getElementById("txt_3_tiempoReal");
    total4 = document.getElementById("txt_4_tiempoReal");
    total5 = document.getElementById("txt_5_tiempoReal");
    total6 = document.getElementById("txt_6_tiempoReal");
    total7 = document.getElementById("txt_7_tiempoReal");

    var hora1 = total1.valueAsDate;
    var hora2 = total2.valueAsDate;
    var hora3 = total3.valueAsDate;
    var hora4 = total4.valueAsDate;
    var hora5 = total5.valueAsDate;
    var hora6 = total6.valueAsDate;
    var hora7 = total7.valueAsDate;
    var horaTotal = inputTotal.valueAsDate;


    var s = (hora1.getTime() + hora2.getTime() + hora3.getTime() + hora4.getTime() + hora5.getTime() + hora6.getTime() + hora7.getTime());

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    hrs = fill(hrs, 2);
    mins = fill(mins, 2);

    document.getElementById("txtHorasSemanalesModal").value = hrs + ':' + mins;
    
}
function eventoCambioHoraTotalSemanal(desdeBoton = 1) {

    var listaHorario = dataTableHorario.rows($('table tr')).data();

    //document.getElementById('txtTotalDiasSemanalJornada').value = '0';
    var contadorDiasSemana = 0;
    var mensajeValidacion = '';

    var inputEntrada;
    var inputSalida;
    var inputColacion;
    var total1;
    var total2;
    var total3;
    var total4;
    var total5;
    var total6;
    var total7;
    var inputTotal;

    for (var i = 1; i < listaHorario.length + 1; i++) {
        //if (i != 6 && i != 7) {
        inputEntrada = document.getElementById("txt_" + i + "_entrada");
        inputSalida = document.getElementById("txt_" + i + "_salida");
        inputColacion = document.getElementById("txt_" + i + "_colacion");
        inputTotal = document.getElementById("txtTotalHorasSemanal");

        var horaEntrada = inputEntrada.valueAsDate;
        var horaSalida = inputSalida.valueAsDate;
        var horaColacion = inputColacion.valueAsDate;

        if (horaEntrada != null && horaSalida != null && horaColacion != null) {
            ////SI LA HORA DE ENTRADA ES MAYOT QUE LA SALIDA (PARA QUE FUNCIONE CON EL FORMATO 24 HRS)
            if (horaEntrada.getTime() > horaSalida.getTime())
                horaEntrada.setDate(horaEntrada.getDate() - 1);
            var s = (horaSalida.getTime() - horaEntrada.getTime());
            if (s == 0) {
                //s = 86400000;
                /////SI LA HORA DE ENTRADA Y SALIDA SON IGUALES (24 HRS, COMO ES UN CAMPO TIME NO PERMITE 24, POR ESO MANDA MENSAJE Y LIMPIAR LOS DATOS POR DEFECTO DE ESE DIA)
                if (horaEntrada.getTime() > 0 || horaSalida.getTime() > 0) {
                    //s = 86400000;
                    mensajeValidacion = 'La hora de entrada no puede ser igual a la hora de salida, se va a dejar los valores por defecto para este día en particular';
                    //defaultHorario(i);
                    //break;
                }
            }

            if (mensajeValidacion == '') {

                var s2 = (s - horaColacion.getTime());
                ////SI LA HORA TRABAJADA ES MENOR QUE LA HORA DE COLACION
                if (s2 <= 0) {
                    if (horaEntrada.getTime() > 0 || horaSalida.getTime() > 0) {
                        s2 = 0;
                        mensajeValidacion = 'El tiempo de colación no puede ser mayor que el tiempo de trabajo';
                    }
                    //break;
                }

                var hrsXDia = document.getElementById('txtHrasJornada').value;
                if (hrsXDia > 4) {
                    if (horaEntrada.getTime() > 0 || horaSalida.getTime() > 0) {
                        if (horaColacion.getTime() < 1800000)
                            mensajeValidacion = 'Para jornadas con mayores a 4 hrs diarias de trabajo, debe al menos tener 30 minutos de colación';
                    }
                }

                var ms = s % 1000;
                s = (s - ms) / 1000;
                var secs = s % 60;
                s = (s - secs) / 60;
                var mins = s % 60;
                var hrs = (s - mins) / 60;
                hrs = fill(hrs, 2);
                mins = fill(mins, 2);
                document.getElementById("txt_" + i + "_tiempo").value = hrs + ':' + mins;

                ms = s2 % 1000;
                s2 = (s2 - ms) / 1000;
                secs = s2 % 60;
                s2 = (s2 - secs) / 60;
                mins = s2 % 60;
                hrs = (s2 - mins) / 60;
                hrs = fill(hrs, 2);
                mins = fill(mins, 2);
                document.getElementById("txt_" + i + "_tiempoReal").value = hrs + ':' + mins;

                strMsg = hrs + ':' + mins + ':' + secs;


                if (hrs > 0 || mins > 0 || secs > 0)
                    contadorDiasSemana++;
            }
            else
                break;
        }
        else {
            mensajeValidacion = 'No puede existir horas ni minutos vacios';
            break;
        }
    }

    if (contadorDiasSemana >= 7)
        mensajeValidacion = 'Debe tener al menos un día de descanso';

    if (mensajeValidacion == '') {
        document.getElementById('txtTotalDiasSemanalJornada').value = contadorDiasSemana;
        total1 = document.getElementById("txt_1_tiempoReal");
        total2 = document.getElementById("txt_2_tiempoReal");
        total3 = document.getElementById("txt_3_tiempoReal");
        total4 = document.getElementById("txt_4_tiempoReal");
        total5 = document.getElementById("txt_5_tiempoReal");
        total6 = document.getElementById("txt_6_tiempoReal");
        total7 = document.getElementById("txt_7_tiempoReal");

        var hora1 = total1.valueAsDate;
        var hora2 = total2.valueAsDate;
        var hora3 = total3.valueAsDate;
        var hora4 = total4.valueAsDate;
        var hora5 = total5.valueAsDate;
        var hora6 = total6.valueAsDate;
        var hora7 = total7.valueAsDate;
        var horaTotal = inputTotal.valueAsDate;

        ////validacion 10 hras maximas diarias

        if (hora1.getTime() > 36000000)
            mensajeValidacion = 'El día Lunes no puede sobre pasar las 10 horas diarias';
        if (hora2.getTime() > 36000000)
            mensajeValidacion = 'El día Martes no puede sobre pasar las 10 horas diarias';
        if (hora3.getTime() > 36000000)
            mensajeValidacion = 'El día Miércoles no puede sobre pasar las 10 horas diarias';
        if (hora4.getTime() > 36000000)
            mensajeValidacion = 'El día Jueves no puede sobre pasar las 10 horas diarias';
        if (hora5.getTime() > 36000000)
            mensajeValidacion = 'El día Viernes no puede sobre pasar las 10 horas diarias';
        if (hora6.getTime() > 36000000)
            mensajeValidacion = 'El día Sábado no puede sobre pasar las 10 horas diarias';
        if (hora7.getTime() > 36000000)
            mensajeValidacion = 'El día Domingo no puede sobre pasar las 10 horas diarias';


        if (mensajeValidacion == '') {
            var s = (hora1.getTime() + hora2.getTime() + hora3.getTime() + hora4.getTime() + hora5.getTime() + hora6.getTime() + hora7.getTime());

            var ms = s % 1000;
            s = (s - ms) / 1000;
            var secs = s % 60;
            s = (s - secs) / 60;
            var mins = s % 60;
            var hrs = (s - mins) / 60;
            hrs = fill(hrs, 2);
            mins = fill(mins, 2);

            ////validacions de 45 hrs semanales máximas
            if (hrs > 45)
                mensajeValidacion = 'No se puede sobrepasar las 45 horas semanales';
            else {
                if (hrs == 45 && mins > 0)
                    mensajeValidacion = 'No se puede sobrepasar las 45 horas semanales';
            }

            if (mensajeValidacion == '') {
                document.getElementById("txtTotalHorasSemanal").value = hrs + ':' + mins;
                if (document.getElementById('ddlJornada').value != "AR22")
                    validarObligatorio(document.getElementById('txtTotalHorasSemanal'));

                cambiarTexto();
                if (document.getElementById('ddlJornada').value != "AR22")
                    validarObligatorio(document.getElementById('txtHorarioTrabajo'));


                ////esto lo saque del boton de interfaz
                eventoBotonCargarHorario(desdeBoton);
            }
            else
                mensajeAlerta(mensajeValidacion);
        }
        else
            mensajeAlerta(mensajeValidacion);
    }
    else
        mensajeAlerta(mensajeValidacion);

}
function cambiarTexto_Old() {

    var strHorario = '';

    var strDiaInicio = '';
    var strDiaFin = '';
    var strDiaFinPaso = '';
    var strHoraInicio = '';
    var strHoraSalida = '';
    var strHoraColacion = '';

    var boolCorte = false;
    var boolSW = false;
    if (document.getElementById("txt_1_entrada").value != "" && document.getElementById("txt_1_entrada").value != "00:00") {
        strDiaInicio = "Lunes";
        strHoraInicio = document.getElementById("txt_1_entrada").value;
        strHoraSalida = document.getElementById("txt_1_salida").value;
        strHoraColacion = document.getElementById("txt_1_colacion").value;
        boolSW = true;
    }

    if (document.getElementById("txt_2_entrada").value != "") {
        if (boolSW) {
            if (strHoraInicio == document.getElementById("txt_2_entrada").value && strHoraSalida == document.getElementById("txt_2_salida").value && strHoraColacion == document.getElementById("txt_2_colacion").value) {
                strDiaFinPaso = "Martes";
            } else {

                if (strDiaFinPaso != "") {
                    strHorario += strDiaInicio + " a " + strDiaFinPaso + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
                    strDiaFinPaso = "";
                } else {
                    strHorario += strDiaInicio + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
                }

                strDiaInicio = "Martes";
                strHoraInicio = document.getElementById("txt_2_entrada").value;
                strHoraSalida = document.getElementById("txt_2_salida").value;
                strHoraColacion = document.getElementById("txt_2_colacion").value;
            }
        } else {
            strDiaInicio = "Martes";
            strHoraInicio = document.getElementById("txt_2_entrada").value;
            strHoraSalida = document.getElementById("txt_2_salida").value;
            strHoraColacion = document.getElementById("txt_2_colacion").value;
            boolSW = true;
        }
    }

    if (document.getElementById("txt_3_entrada").value != "") {
        if (boolSW) {
            if (strHoraInicio == document.getElementById("txt_3_entrada").value && strHoraSalida == document.getElementById("txt_3_salida").value && strHoraColacion == document.getElementById("txt_3_colacion").value) {
                strDiaFinPaso = "Miercoles";
            } else {
                if (strDiaFinPaso != "") {
                    strHorario += strDiaInicio + " a " + strDiaFinPaso + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
                    strDiaFinPaso = "";
                } else {
                    strHorario += strDiaInicio + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
                }
                strDiaInicio = "Miercoles";
                strHoraInicio = document.getElementById("txt_3_entrada").value;
                strHoraSalida = document.getElementById("txt_3_salida").value;
                strHoraColacion = document.getElementById("txt_3_colacion").value;
            }
        } else {
            strDiaInicio = "Miercoles";
            strHoraInicio = document.getElementById("txt_3_entrada").value;
            strHoraSalida = document.getElementById("txt_3_salida").value;
            strHoraColacion = document.getElementById("txt_3_colacion").value;
            boolSW = true;
        }
    }

    if (document.getElementById("txt_4_entrada").value != "") {
        if (boolSW) {
            if (strHoraInicio == document.getElementById("txt_4_entrada").value && strHoraSalida == document.getElementById("txt_4_salida").value && strHoraColacion == document.getElementById("txt_4_colacion").value) {
                strDiaFinPaso = "Jueves";
            } else {
                if (strDiaFinPaso != "") {
                    strHorario += strDiaInicio + " a " + strDiaFinPaso + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
                    strDiaFinPaso = "";
                } else {
                    strHorario += strDiaInicio + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
                }
                strDiaInicio = "Jueves";
                strHoraInicio = document.getElementById("txt_4_entrada").value;
                strHoraSalida = document.getElementById("txt_4_salida").value;
                strHoraColacion = document.getElementById("txt_4_colacion").value;
            }
        } else {
            strDiaInicio = "Jueves";
            strHoraInicio = document.getElementById("txt_4_entrada").value;
            strHoraSalida = document.getElementById("txt_4_salida").value;
            strHoraColacion = document.getElementById("txt_4_colacion").value;
            boolSW = true;
        }
    }

    //if (document.getElementById("txt_5_entrada").value != "") {
    if (document.getElementById("txt_5_entrada").value != "") {
        if (boolSW) {
            if (strHoraInicio == document.getElementById("txt_5_entrada").value && strHoraSalida == document.getElementById("txt_5_salida").value && strHoraColacion == document.getElementById("txt_5_colacion").value) {
                strDiaFinPaso = "Viernes";
            } else {
                if (strDiaFinPaso != "") {
                    strHorario += strDiaInicio + " a " + strDiaFinPaso + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
                    strDiaFinPaso = "";
                } else {
                    strHorario += strDiaInicio + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
                }
                strDiaInicio = "Viernes";
                strHoraInicio = document.getElementById("txt_5_entrada").value;
                strHoraSalida = document.getElementById("txt_5_salida").value;
                strHoraColacion = document.getElementById("txt_5_colacion").value;
            }
        } else {
            strDiaInicio = "Viernes";
            strHoraInicio = document.getElementById("txt_5_entrada").value;
            strHoraSalida = document.getElementById("txt_5_salida").value;
            strHoraColacion = document.getElementById("txt_5_colacion").value;
            boolSW = true;
        }
    }

    if (document.getElementById("txt_6_entrada").value != "") {
    //if (document.getElementById("txt_6_entrada").value != "" && document.getElementById("txt_6_entrada").value != "00:00") {
        if (boolSW) {
            if (strHoraInicio == document.getElementById("txt_6_entrada").value && strHoraSalida == document.getElementById("txt_6_salida").value && strHoraColacion == document.getElementById("txt_6_colacion").value) {
                strDiaFinPaso = "Sabado";
            } else {
                if (strDiaFinPaso != "") {
                    strHorario += strDiaInicio + " a " + strDiaFinPaso + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
                    strDiaFinPaso = "";
                } else {
                    strHorario += strDiaInicio + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
                }
                strDiaInicio = "Sabado";
                strHoraInicio = document.getElementById("txt_6_entrada").value;
                strHoraSalida = document.getElementById("txt_6_salida").value;
                strHoraColacion = document.getElementById("txt_6_colacion").value;
            }
        } else {
            strDiaInicio = "Sabado";
            strHoraInicio = document.getElementById("txt_6_entrada").value;
            strHoraSalida = document.getElementById("txt_6_salida").value;
            strHoraColacion = document.getElementById("txt_6_colacion").value;
            boolSW = true;
        }
    }

    if (document.getElementById("txt_7_entrada").value != "") {
    //if (document.getElementById("txt_7_entrada").value != "" && document.getElementById("txt_7_entrada").value != "00:00") {
        if (boolSW) {
            if (strHoraInicio == document.getElementById("txt_7_entrada").value && strHoraSalida == document.getElementById("txt_7_salida").value && strHoraColacion == document.getElementById("txt_7_colacion").value) {
                strDiaFinPaso = "Domingo";
            } else {
                if (strDiaFinPaso != "") {
                    strHorario += strDiaInicio + " a " + strDiaFinPaso + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
                    strDiaFinPaso = "";
                } else {
                    strHorario += strDiaInicio + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
                }
                strDiaInicio = "Domingo";
                strHoraInicio = document.getElementById("txt_7_entrada").value;
                strHoraSalida = document.getElementById("txt_7_salida").value;
                strHoraColacion = document.getElementById("txt_7_colacion").value;
            }
        } else {
            strDiaInicio = "Domingo";
            strHoraInicio = document.getElementById("ctl00_cphMainContent_DHI").value;
            strHoraSalida = document.getElementById("ctl00_cphMainContent_DHS").value;
            strHoraColacion = document.getElementById("ctl00_cphMainContent_DHC").value;
            boolSW = true;
        }
    }

    if (strDiaFinPaso != "") {
        strHorario += strDiaInicio + " a " + strDiaFinPaso + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
    } else {
        strHorario += strDiaInicio + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
    }


    document.getElementById("txtHorarioTrabajo").value = strHorario.substring(0, strHorario.length - 2) + ".";

}
function cambiarTexto() {

    var strHorario = '';

    var strDiaInicio = '';
    var strDiaFin = '';
    var strDiaFinPaso = '';
    var strHoraInicio = '';
    var strHoraSalida = '';
    var strHoraColacion = '';

    var boolCorte = false;
    var boolSW = false;
    if (document.getElementById("txt_1_entrada").value != "") {
        strDiaInicio = "Lunes";
        strHoraInicio = document.getElementById("txt_1_entrada").value;
        strHoraSalida = document.getElementById("txt_1_salida").value;
        strHoraColacion = document.getElementById("txt_1_colacion").value;
        boolSW = true;
    }

    if (document.getElementById("txt_2_entrada").value != "") {
        if (boolSW) {
            if (strHoraInicio != "00:00" && strHoraInicio == document.getElementById("txt_2_entrada").value && strHoraSalida == document.getElementById("txt_2_salida").value && strHoraColacion == document.getElementById("txt_2_colacion").value) {
                strDiaFinPaso = "Martes";
            } else {

                if (strDiaFinPaso != "") {
                    strHorario += strDiaInicio + " a " + strDiaFinPaso + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
                    strDiaFinPaso = "";
                } else {
                    if (strHoraInicio != "00:00")
                        strHorario += strDiaInicio + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
                }

                strDiaInicio = "Martes";
                strHoraInicio = document.getElementById("txt_2_entrada").value;
                strHoraSalida = document.getElementById("txt_2_salida").value;
                strHoraColacion = document.getElementById("txt_2_colacion").value;
            }
        } else {
            strDiaInicio = "Martes";
            strHoraInicio = document.getElementById("txt_2_entrada").value;
            strHoraSalida = document.getElementById("txt_2_salida").value;
            strHoraColacion = document.getElementById("txt_2_colacion").value;
            boolSW = true;
        }
    }
    

    if (document.getElementById("txt_3_entrada").value != "") {
        if (boolSW) {
            if (strHoraInicio != "00:00" && strHoraInicio == document.getElementById("txt_3_entrada").value && strHoraSalida == document.getElementById("txt_3_salida").value && strHoraColacion == document.getElementById("txt_3_colacion").value) {
                strDiaFinPaso = "Miercoles";
            } else {
                if (strDiaFinPaso != "") {
                    strHorario += strDiaInicio + " a " + strDiaFinPaso + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
                    strDiaFinPaso = "";
                } else {
                    if (strHoraInicio != "00:00")
                        strHorario += strDiaInicio + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
                }
                strDiaInicio = "Miercoles";
                strHoraInicio = document.getElementById("txt_3_entrada").value;
                strHoraSalida = document.getElementById("txt_3_salida").value;
                strHoraColacion = document.getElementById("txt_3_colacion").value;
            }
        } else {
            strDiaInicio = "Miercoles";
            strHoraInicio = document.getElementById("txt_3_entrada").value;
            strHoraSalida = document.getElementById("txt_3_salida").value;
            strHoraColacion = document.getElementById("txt_3_colacion").value;
            boolSW = true;
        }
    }
    

    if (document.getElementById("txt_4_entrada").value != "") {
        if (boolSW) {
            if (strHoraInicio != "00:00" && strHoraInicio == document.getElementById("txt_4_entrada").value && strHoraSalida == document.getElementById("txt_4_salida").value && strHoraColacion == document.getElementById("txt_4_colacion").value) {
                strDiaFinPaso = "Jueves";
            } else {
                if (strDiaFinPaso != "") {
                    strHorario += strDiaInicio + " a " + strDiaFinPaso + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
                    strDiaFinPaso = "";
                } else {
                    if (strHoraInicio != "00:00")
                        strHorario += strDiaInicio + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
                }
                strDiaInicio = "Jueves";
                strHoraInicio = document.getElementById("txt_4_entrada").value;
                strHoraSalida = document.getElementById("txt_4_salida").value;
                strHoraColacion = document.getElementById("txt_4_colacion").value;
            }
        } else {
            strDiaInicio = "Jueves";
            strHoraInicio = document.getElementById("txt_4_entrada").value;
            strHoraSalida = document.getElementById("txt_4_salida").value;
            strHoraColacion = document.getElementById("txt_4_colacion").value;
            boolSW = true;
        }
    }

    //if (document.getElementById("txt_5_entrada").value != "") {
    if (document.getElementById("txt_5_entrada").value != "") {
        if (boolSW) {
            if (strHoraInicio != "00:00" && strHoraInicio == document.getElementById("txt_5_entrada").value && strHoraSalida == document.getElementById("txt_5_salida").value && strHoraColacion == document.getElementById("txt_5_colacion").value) {
                strDiaFinPaso = "Viernes";
            } else {
                if (strDiaFinPaso != "") {
                    strHorario += strDiaInicio + " a " + strDiaFinPaso + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
                    strDiaFinPaso = "";
                } else {
                    if (strHoraInicio != "00:00")
                        strHorario += strDiaInicio + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
                }
                strDiaInicio = "Viernes";
                strHoraInicio = document.getElementById("txt_5_entrada").value;
                strHoraSalida = document.getElementById("txt_5_salida").value;
                strHoraColacion = document.getElementById("txt_5_colacion").value;
            }
        } else {
            strDiaInicio = "Viernes";
            strHoraInicio = document.getElementById("txt_5_entrada").value;
            strHoraSalida = document.getElementById("txt_5_salida").value;
            strHoraColacion = document.getElementById("txt_5_colacion").value;
            boolSW = true;
        }
    }

    if (document.getElementById("txt_6_entrada").value != "") {
        //if (document.getElementById("txt_6_entrada").value != "" && document.getElementById("txt_6_entrada").value != "00:00") {
        if (boolSW) {
            if (strHoraInicio != "00:00" && strHoraInicio == document.getElementById("txt_6_entrada").value && strHoraSalida == document.getElementById("txt_6_salida").value && strHoraColacion == document.getElementById("txt_6_colacion").value) {
                strDiaFinPaso = "Sabado";
            } else {
                if (strDiaFinPaso != "") {
                    strHorario += strDiaInicio + " a " + strDiaFinPaso + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
                    strDiaFinPaso = "";
                } else {
                    if (strHoraInicio != "00:00")
                        strHorario += strDiaInicio + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
                }
                strDiaInicio = "Sabado";
                strHoraInicio = document.getElementById("txt_6_entrada").value;
                strHoraSalida = document.getElementById("txt_6_salida").value;
                strHoraColacion = document.getElementById("txt_6_colacion").value;
            }
        } else {
            strDiaInicio = "Sabado";
            strHoraInicio = document.getElementById("txt_6_entrada").value;
            strHoraSalida = document.getElementById("txt_6_salida").value;
            strHoraColacion = document.getElementById("txt_6_colacion").value;
            boolSW = true;
        }
    }

    //if (document.getElementById("txt_7_entrada").value != "") {
    if (document.getElementById("txt_7_entrada").value != "") {
        if (boolSW) {
            if (strHoraInicio != "00:00" && strHoraInicio == document.getElementById("txt_7_entrada").value && strHoraSalida == document.getElementById("txt_7_salida").value && strHoraColacion == document.getElementById("txt_7_colacion").value) {
                strDiaFinPaso = "Domingo";
            } else {
                if (strDiaFinPaso != "") {
                    strHorario += strDiaInicio + " a " + strDiaFinPaso + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
                    strDiaFinPaso = "";
                } else {
                    if (strHoraInicio != "00:00")
                        strHorario += strDiaInicio + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
                }
                strDiaInicio = "Domingo";
                strHoraInicio = document.getElementById("txt_7_entrada").value;
                strHoraSalida = document.getElementById("txt_7_salida").value;
                strHoraColacion = document.getElementById("txt_7_colacion").value;
            }
        } else {
            strDiaInicio = "Domingo";
            strHoraInicio = document.getElementById("ctl00_cphMainContent_DHI").value;
            strHoraSalida = document.getElementById("ctl00_cphMainContent_DHS").value;
            strHoraColacion = document.getElementById("ctl00_cphMainContent_DHC").value;
            boolSW = true;
        }
    }

    if (strDiaFinPaso != "") {
        strHorario += strDiaInicio + " a " + strDiaFinPaso + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
    } else {
        if (strHoraInicio != "00:00")
            strHorario += strDiaInicio + " de " + strHoraInicio + " a " + strHoraSalida + " con " + strHoraColacion + " de colacion, ";
    }


    document.getElementById("txtHorarioTrabajo").value = strHorario.substring(0, strHorario.length - 2) + ".";

}
function minTommss(minutes) {
    var sign = minutes < 0 ? "-" : "";
    var min = Math.floor(Math.abs(minutes));
    var sec = Math.floor((Math.abs(minutes) * 60) % 60);
    return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
}
function eventoBotonCargarHorario(desdeBoton = 1) {

    if (desdeBoton == 2) {
        esperando();

        //var url = host() + 'RequerimientoContrato/ObtenerJornadas/';
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
                            //DST:20220411
                            /*var diasXSemana = datos[0].diaXSemana * datos[0].horasXDia;
                            var horasSemanal = minTommss(diasXSemana);*/
                            var horasXSemana = datos[0].horasXSemana;
                            var horasSemanal = minTommss(horasXSemana);

                            document.getElementById("txtTotalHorasSemanalJornada").value = horasSemanal;
                            if (horasSemanal != document.getElementById("txtTotalHorasSemanal").value)
                                mensajeAlerta('Por favor revisar los horarios con respecto a la jornada seleccionada, no cuadran las horas semanales totales. La jornada seleccionada debería tener: ' + horasSemanal + ' hrs. semanales');
                            else {
                                if (datos[0].codigoJornada.toUpperCase() == 'FULL') {
                                    //if (document.getElementById('txtTotalDiasSemanalJornada').value = datos[0].diaXSemana)
                                    if (document.getElementById('txtTotalDiasSemanalJornada').value >= 5 && document.getElementById('txtTotalDiasSemanalJornada').value <= 6)
                                        $('#modal-horario').modal('hide');
                                    else
                                        mensajeAlerta('Una jornada FULL puede tener una cantidad de 5 ó 6 días');
                                }
                                else {
                                    if (document.getElementById('txtTotalDiasSemanalJornada').value == datos[0].diaXSemana)
                                        $('#modal-horario').modal('hide');
                                    else
                                        mensajeAlerta('Los días asignados no corresponden a los representados en la jornada, por favor revisar. Se necesitan ' + datos[0].diaXSemana + ' días en la semana');
                                }
                               
                            }
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
}

function eventoLimpiarHorarioYTexto() {
    document.getElementById("txtTotalHorasSemanal").value = '';
    document.getElementById("txtHorarioTrabajo").value = '';
    if (document.getElementById('ddlJornada').value != "AR22") {
        validarObligatorio(document.getElementById('txtTotalHorasSemanal'));
        validarObligatorio(document.getElementById('txtHorarioTrabajo'));
    }
}
function eventoGuardarHorario() {
    var listaHorario = dataTableHorario.rows($('table tr')).data();
    var listaObjetoHorario = [];
   
    var inputEntrada;
    var inputSalida;
    var inputColacion;
    

    for (var i = 1; i < listaHorario.length + 1; i++) {
        //if (i != 6 && i != 7) {
        inputEntrada = document.getElementById("txt_" + i + "_entrada");
        inputSalida = document.getElementById("txt_" + i + "_salida");
        inputColacion = document.getElementById("txt_" + i + "_colacion");
        
        var horario = new Object();
        horario.id = i.toString();
        switch (i) {
            case 1:
                horario.dia = 'L';
                break;
            case 2:
                horario.dia = 'M';
                break;
            case 3:
                horario.dia= 'X';
                break;
            case 4:
                horario.dia= 'J';
                break;
            case 5:
                horario.dia= 'V';
                break;
            case 6:
                horario.dia= 'S';
                break;
            case 7:
                horario.dia= 'D';
                break;
            default:
        }
        horario.entrada = inputEntrada.value;
        horario.salida = inputSalida.value;
        horario.colacion = inputColacion.value;
        listaObjetoHorario.push(horario);
    }
    //console.log(listaObjetoHorario);
    return listaObjetoHorario;
}
function actualizarHorasXCabecera(texto) {
    
    if (document.getElementById("txt_1_" + texto).value != "00:00") { document.getElementById("txt_1_" + texto).value = document.getElementById("txtCabecera_" + texto).value };
    if (document.getElementById("txt_2_" + texto).value != "00:00") { document.getElementById("txt_2_" + texto).value = document.getElementById("txtCabecera_" + texto).value };
    if (document.getElementById("txt_3_" + texto).value != "00:00") { document.getElementById("txt_3_" + texto).value = document.getElementById("txtCabecera_" + texto).value };
    if (document.getElementById("txt_4_" + texto).value != "00:00") { document.getElementById("txt_4_" + texto).value = document.getElementById("txtCabecera_" + texto).value };
    if (document.getElementById("txt_5_" + texto).value != "00:00") { document.getElementById("txt_5_" + texto).value = document.getElementById("txtCabecera_" + texto).value };
    if (document.getElementById("txt_6_" + texto).value != "00:00") { document.getElementById("txt_6_" + texto).value = document.getElementById("txtCabecera_" + texto).value };
    if (document.getElementById("txt_7_" + texto).value != "00:00") { document.getElementById("txt_7_" + texto).value = document.getElementById("txtCabecera_" + texto).value };

    //cambiarTexto();
    eventoActualizacionHoras();
}
function actualizarHorasXCabeceraColacion(texto) {

    if (document.getElementById("txt_1_entrada").value != "00:00" && document.getElementById("txt_1_salida").value != "00:00") { document.getElementById("txt_1_" + texto).value = document.getElementById("txtCabecera_" + texto).value };
    if (document.getElementById("txt_2_entrada").value != "00:00" && document.getElementById("txt_2_salida").value != "00:00") { document.getElementById("txt_2_" + texto).value = document.getElementById("txtCabecera_" + texto).value };
    if (document.getElementById("txt_3_entrada").value != "00:00" && document.getElementById("txt_3_salida").value != "00:00") { document.getElementById("txt_3_" + texto).value = document.getElementById("txtCabecera_" + texto).value };
    if (document.getElementById("txt_4_entrada").value != "00:00" && document.getElementById("txt_4_salida").value != "00:00") { document.getElementById("txt_4_" + texto).value = document.getElementById("txtCabecera_" + texto).value };
    if (document.getElementById("txt_5_entrada").value != "00:00" && document.getElementById("txt_5_salida").value != "00:00") { document.getElementById("txt_5_" + texto).value = document.getElementById("txtCabecera_" + texto).value };
    if (document.getElementById("txt_6_entrada").value != "00:00" && document.getElementById("txt_6_salida").value != "00:00") { document.getElementById("txt_6_" + texto).value = document.getElementById("txtCabecera_" + texto).value };
    if (document.getElementById("txt_7_entrada").value != "00:00" && document.getElementById("txt_7_salida").value != "00:00") { document.getElementById("txt_7_" + texto).value = document.getElementById("txtCabecera_" + texto).value };

    //cambiarTexto();
    eventoActualizacionHoras();
}
////HORARIOS



////CARGAR DATOS CURRICULAR
function CargaSelectGeneroCurricular(ddl, div) {

    var url = host() + 'RequerimientoContrato/CargarDDLParametroCurricular_ID_PARAMETRO/';

    var tipo = '0';
    var tabla = '21';
    var parametro = '';
    var perfil = '';
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    const valores = new FormData();
    valores.append('tipo', tipo);
    valores.append('tabla', tabla);
    valores.append('parametro', parametro);
    valores.append('perfil', perfil);

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
function CargaSelectEstadoCivilCurricular(ddl, div) {

    var url = host() + 'RequerimientoContrato/CargarDDLParametroCurricular/';

    var tipo = '2';
    var tabla = '';
    var parametro = 'ESTADO_CIVIL';
    var perfil = '';
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    const valores = new FormData();
    valores.append('tipo', tipo);
    valores.append('tabla', tabla);
    valores.append('parametro', parametro);
    valores.append('perfil', perfil);

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
function CargaSelectNacionalidadCurricular(ddl, div) {

    var url = host() + 'RequerimientoContrato/CargarDDLParametroCurricular/';

    var tipo = '2';
    var tabla = '';
    var parametro = 'GENTILICIO';
    var perfil = '';
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    const valores = new FormData();
    valores.append('tipo', tipo);
    valores.append('tabla', tabla);
    valores.append('parametro', parametro);
    valores.append('perfil', perfil);

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
function CargaSelectAFPCurricular(ddl, div) {

    var url = host() + 'RequerimientoContrato/CargarDDLParametroCurricular/';

    var tipo = '2';
    var tabla = '';
    var parametro = 'DESTINO_APORTES';
    var perfil = '';
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    const valores = new FormData();
    valores.append('tipo', tipo);
    valores.append('tabla', tabla);
    valores.append('parametro', parametro);
    valores.append('perfil', perfil);

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
function CargaSelectIsapreCurricular(ddl, div) {

    var url = host() + 'RequerimientoContrato/CargarDDLParametroCurricular/';

    var tipo = '2';
    var tabla = '';
    var parametro = 'OBRA_SOCIAL';
    var perfil = '';
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    const valores = new FormData();
    valores.append('tipo', tipo);
    valores.append('tabla', tabla);
    valores.append('parametro', parametro);
    valores.append('perfil', perfil);

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
function CargaSelectTipoVisaCurricular(ddl, div) {

    var url = host() + 'RequerimientoContrato/CargarDDLParametroCurricular/';

    var tipo = '2';
    var tabla = '';
    var parametro = 'TIPO_VISA';
    var perfil = '';
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    const valores = new FormData();
    valores.append('tipo', tipo);
    valores.append('tabla', tabla);
    valores.append('parametro', parametro);
    valores.append('perfil', perfil);

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
                        //validarObligatorio(document.getElementById(ddl));
                    }
                    else {
                        crearDropDownListVacio(ddl, div);
                    }
                }
            },
            (error) => {
                crearDropDownList.log(error);
            }
        )
}
function CargaSelectPDSAsociados(ddl, div) {

    var url = host() + 'RequerimientoContrato/CargarDDLPDS_X_Cuenta_Y_Ciudad/';

    var CTA_RUT = document.getElementById('ddlCuenta').value;
    var PXC_AUTOID = '-1';
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
function CargaSelectComunaPos(ddl, div) {

    var url = generico() + 'Parametro/CargaDDLParametrizadosDescripcion/';
    
    var idTabla = 1;
    var modo_despliegue = 4; //SE DEJO FIJO EN 4 EN EL BACK DEBIDO A QUE CONCATENA EL ID DEL PARAMETRO CON EL COD DESRCIPCION PORQUE ESTA CON LOS ID ANTIGUOS
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
                        crearDropDownListEvento(datos, ddl, div, 'eventoDdlComunaPos()', true);
                        validarObligatorio(document.getElementById(ddl));
                    }
                }
            },
            (error) => {
                crearDropDownList.log(error);
            }
        )
}
function CargaSelectCiudadPosV3(ddl, div) {

    var url = generico() + 'Parametro/CargaDDLParametrizadosXValor/';

    var idTabla = 1;
    var valor = document.getElementById('ddlCiudad').value;;
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
                        //crearDropDownList(datos, ddl, div, true);
                        crearDropDownListEvento(datos, ddl, div, 'eventoDdlCiudadPos()', true);
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
function CargaSelectCiudadPos(ddl, div) {

    var url = generico() + 'Parametro/CargaDDLParametrizadosXValorPropiedad/';

    var idComuna = document.getElementById('ddlComunaPos').value;
    var idParametro = '-1'; 
    if (idComuna != "" && idComuna != "-1") {
        var listaIds = idComuna.split('|');
        //idParametro = listaIds[1]; //COD_DESCRIPCION
        idParametro = listaIds[0]; //ID_PARAMETRO
    }
    else 
        document.getElementById('ddlComunaPos').value = '-1';
    
    var showIdValor = false;
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    const valores = new FormData();
    valores.append('idParametro', idParametro);
    valores.append('showIdValor', showIdValor);
   
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
                        crearDropDownListEvento(datos, ddl, div, 'eventoDdlCiudadPos()', true);
                        validarObligatorio(document.getElementById(ddl));
                    }
                    else {
                        crearDropDownListVacio(ddl, div);
                    }
                    eventoDdlCiudadPos();
                }
            },
            (error) => {
                crearDropDownList.log(error);
            }
        )
}
function CargaSelectRegionPos(ddl, div) {

    var url = generico() + 'Parametro/CargaDDLParametrizadosXValorPropiedad/';

    var idParametro = document.getElementById('ddlCiudadPos').value;
    var showIdValor = false;
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    const valores = new FormData();
    valores.append('idParametro', idParametro);
    valores.append('showIdValor', showIdValor);

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
                        crearDropDownListVacio(ddl, div);
                    }
                    //eventoDdlCiudadPos();
                }
            },
            (error) => {
                crearDropDownList.log(error);
            }
        )
}
function CargaSelectRecepcionFirma(ddl, div) {

    var url = host() + 'RequerimientoContrato/CargarDDLParametroCurricular_ID_PARAMETRO/';

    var tipo = '3';
    var tabla = '';
    var parametro = '';
    if (document.getElementById('ddlCentroCosto').value != -1)
        parametro = document.getElementById('ddlCentroCosto').value;
    var perfil = '15';
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    const valores = new FormData();
    valores.append('tipo', tipo);
    valores.append('tabla', tabla);
    valores.append('parametro', parametro);
    valores.append('perfil', perfil);

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
////CARGAR DATOS CURRICULAR



////EVENTOS
function eventoFechaInicioContrato() {
    document.getElementById('FecFechaInicioContratoPos').value = document.getElementById('FecRequerimiento').value;
}
function eventoDdlComunaPos() {
    if (document.getElementById('ddlComunaPos').value != "-1") {
        CargaSelectCiudadPos('ddlCiudadPos', 'DivDdlCiudadPos');
    }
    else {
        crearDropDownListVacio('ddlCiudadPos', 'DivDdlCiudadPos', true);
        crearDropDownListVacio('ddlRegionPos', 'DivDdlRegionPos', true);
    }
}
function eventoDdlCiudadPos() {
    if (document.getElementById('ddlCiudadPos').value != "-1") {
        CargaSelectRegionPos('ddlRegionPos', 'DivDdlRegionPos');
    }
    else {
        crearDropDownListVacio('ddlRegionPos', 'DivDdlRegionPos', true);
    }
}
function eventoTxtRut() {
    limpiarPostulante();
    var msjRut = validarRut(document.getElementById('txtRut'));
    if (msjRut == "") {

        limpiarLey21015();
        esperando();

        var url = host() + 'RequerimientoContrato/ValidarPostulanteReferido/';

        var pos_rut = document.getElementById('txtRut').value.replace('-', '');
        var usuario = document.getElementById('usr').value;
        var accion = 'RU';
        var token = document.getElementById('token').value;

        const valores = new FormData();
        valores.append('pos_rut', pos_rut);
        valores.append('usuario', usuario);
        valores.append('accion', accion);

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
                        var mensaje = result[1];
                        var datos = result[2];
                        if (datos.length > 0)
                            cargarPostulante(datos);
                        else {
                            if (mensaje !== "") {
                                document.getElementById('txtRut').value = '';
                                document.getElementById('txtRut').focus();
                                mensajeInformativo(mensaje);
                            }
                                
                        }
                            
                        
                        //else
                        //    mensajeAlerta(mensaje);
                    }
                },
                (error) => {
                    terminoEspera();
                    mensajeError(error);
                }
            )
    }
    else
        mensajeAlerta(msjRut);
    
}
function eventoTxtRut_OLD() {
    document.getElementById("txtRutExiste").value = "";
    var msjRut = validarRut(document.getElementById('txtRut'));
    if (msjRut == "") {
        limpiarLey21015();
        esperando();
        //var pro_autoid = document.getElementById('txtFolioRequerimiento').value;

        //***esto debe cambiar revisarlo (NUMERO DEL PROCESO)
        if (true) { //pro_autoid != "" && pro_autoid != "0") {
            var url = host() + 'RequerimientoContrato/Postulaciones_Consultar/';

            var pst_autoid = '0';
            var pro_autoid = '0';
            var pos_rut = document.getElementById('txtRut').value.replace('-', '');
            var usuario = document.getElementById('usr').value;
            var accion = 'RU';
            var token = document.getElementById('token').value;

            const valores = new FormData();
            valores.append('pst_autoid', pst_autoid);
            valores.append('pro_autoid', pro_autoid);
            valores.append('pos_rut', pos_rut);
            valores.append('usuario', usuario);
            valores.append('accion', accion);

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
                            limpiarPostulante();
                            if (datos.length > 0) {
                                //limpiarPostulante();
                                cargarPostulante(datos);
                            }
                            else {
                                mensajeInformativo('Usuario no existe en nuestra base de datos');
                            }
                        }
                    },
                    (error) => {
                        terminoEspera();
                    }
                )
        }
    }
    else
        mensajeAlerta(msjRut);

}
function limpiarPostulante() {
    document.getElementById("txtRutExiste").value = "";
    document.getElementById("txtCorreoExiste").value = "";
    document.getElementById("txtBloqueadoExiste").value = "";
    document.getElementById("txtIdBPO").value = "";
    //document.getElementById("txtTokenBPO").value = "";


    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellidoPaterno").value = "";
    document.getElementById("txtApellidoMaterno").value = "";
    document.getElementById("txtDireccionPos").value = "";
    document.getElementById("ddlComunaPos").value = "-1";
    eventoDdlComunaPos();
    eventoDdlCiudadPos();
    //document.getElementById("ddlCiudadPos").value = "-1";
    //document.getElementById("ddlRegionPos").value = "-1";
    document.getElementById("txtFonoCasaPos").value = "";
    document.getElementById("txtFonoCelularPos").value = "";
    document.getElementById("txtCorreoPos").value = "";
    document.getElementById("txtContactoEmergencia").value = "";
    document.getElementById("txtFonoEmergenciaPos").value = "";
    document.getElementById("ddlGenero").value = "-1";
    document.getElementById("FecNacimiento").value = "";
    document.getElementById("ddlNacionalidad").value = "-1";
    document.getElementById("ddlEstadoCivil").value = "-1";
    //document.getElementById("ddlOrigen").value = "-1";
    document.getElementById("ddlAFP").value = "-1";
    document.getElementById("ddlIsapre").value = "-1";
    document.getElementById("txtCalzado").value = "";
    document.getElementById("txtPantalon").value = "";
    document.getElementById("txtCamisa").value = "";

    var timeElapsed = Date.now();
    var today = new Date(timeElapsed);
    if(document.getElementById('FecRequerimiento').value == "")
        document.getElementById("FecFechaInicioContratoPos").value = "";
    document.getElementById("FecFirmaContrato").value = today.toLocaleDateString();
    document.getElementById("txtHoraFirma").value = "12:00";
    document.getElementById("ddlRecepcionFirma").value = "-1";
}
function limpiarLey21015() {
    document.getElementById('chkLey21015Ref').checked = false;
    document.getElementById('chkAuditiva').checked = false;
    document.getElementById('chkCognitiva').checked = false;
    document.getElementById('chkFisica').checked = false;
    document.getElementById('chkPsiquica').checked = false;
    document.getElementById('chkVisceral').checked = false;
    document.getElementById('chkVisual').checked = false;
    document.getElementById('chkCredencial').checked = false;
    document.getElementById('chkPensionInvalidez').checked = false;
}
function limpiarBusquedaPersonaPostulante() {
    $('#dvPersonasEncontradasPos').collapse('hide');
    dataTablePersonaPostulante = "";
    $('#tbPersonasEncontradasPos').DataTable().destroy();

    document.getElementById('txtBusApellidoPaternoPos').value = "";
    document.getElementById('txtBusApellidoMaternoPos').value = "";
    document.getElementById('txtBusNombresPos').value = "";
    document.getElementById('txtBusRutPos').value = "";
}
function cargarLey21015(tipoInclusion, tipoCertificado) {
    var listaTipoInclusion = tipoInclusion.split(',');
    for (var i = 0; i < listaTipoInclusion.length; i++) {
        switch (listaTipoInclusion[i]) {
            case 'AUDITIVA':
                document.getElementById('chkAuditiva').checked = true;
                break;
            case 'COGNITIVA':
                document.getElementById('chkCognitiva').checked = true;
                break;
            case 'FISICA':
                document.getElementById('chkFisica').checked = true;
                break;
            case 'PSIQUICA':
                document.getElementById('chkPsiquica').checked = true;
                break;
            case 'VISCERAL':
                document.getElementById('chkVisceral').checked = true;
                break;
            case 'VISUAL':
                document.getElementById('chkVisual').checked = true;
                break;
            default:
        }
    }

    var listaTipoCertificado = tipoCertificado.split(',');
    for (var i = 0; i < listaTipoCertificado.length; i++) {
        switch (listaTipoCertificado[i]) {
            case 'CREDENCIAL':
                document.getElementById('chkCredencial').checked = true;
                break;
            case 'PENSION INVALIDEZ':
                document.getElementById('chkPensionInvalidez').checked = true;
                break;
            default:
        }
    }

    document.getElementById('chkLey21015Ref').checked = true;
}
function habilitarPostulante() {
    $('#btnCollapsePostulante').removeAttr('disabled');
    $('#divCardRequerimiento').addClass('collapsed-card');
    $('#imgCollapseRequerimiento').removeClass('fas fa-minus');
    $('#imgCollapseRequerimiento').addClass('fas fa-plus');
    $('#divCardPostulante').removeClass('collapsed-card');
    $('#imgCollapsePostulante').removeClass('fas fa-plus');
    $('#imgCollapsePostulante').addClass('fas fa-minus');
    document.getElementById('txtRut').focus();
    seValidoAnteriormente = false;
    ArmaGrillaDocumentosSeleccionados();
}
function eventoLimpiarLey() {
    limpiarLey21015();
}
////EVENTOS



////EVENTOS BOTONES
function eventoBusquedaPersonaPostulante() {
    limpiarBusquedaPersonaPostulante();
    $('#modal-Persona-Postulante').modal({ backdrop: 'static', keyboard: false })
    $('#modal-Persona-Postulante').modal('show');
}
function eventoBotonCargarInfoPersonaPostulante() {
    //$('#modal-espera-persona-lg').modal('show');  
    esperando();

    var url = host() + 'RequerimientoContrato/BuscarPostulantes/';

    var nombre = document.getElementById('txtBusNombresPos').value;
    var paterno = document.getElementById('txtBusApellidoPaternoPos').value;
    var materno = document.getElementById('txtBusApellidoMaternoPos').value;
    var rut = document.getElementById('txtBusRutPos').value;
    var token = document.getElementById('token').value;

    //console.log("token: " + token);

    const valores = new FormData();
    valores.append('nombre', nombre);
    valores.append('paterno', paterno);
    valores.append('materno', materno);
    valores.append('rut', rut);

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
                    ArmaGrillaPersonasEncontradasPostulante(datos);
                    $('#dvPersonasEncontradasPos').collapse('show');
                    //$('#modal-espera-persona-lg').modal('hide');  

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
                $('#dvPersonasEncontradasPos').collapse('hide');
                terminoEspera();
            }
        )
}
function eventoBotonCargarListaPersonaPostulante() {
    if (dataTablePersonaPostulante != "") {
        var listaSeleccinados = dataTablePersonaPostulante.rows($('table tr').has('input:checked')).data();
        //dataTable.rows($('table tr').has('input:checked')).remove().draw();
        if (listaSeleccinados.length == 1) {
            var rutSinGuion = listaSeleccinados[0].rut.replace('-', '').trim();
            var guion = rutSinGuion[rutSinGuion.length - 1];
            var rutConGuion = rutSinGuion.substring(0, rutSinGuion.length - 1) + '-' + guion;
            document.getElementById('txtRut').value = rutConGuion;
            eventoTxtRut();
            $('#modal-Persona-Postulante').modal('hide');
            ///***debo cargar el rut en el campo txtrut
            //$('#dvListaPersonas').collapse('show');
        }
        else if (listaSeleccinados.length > 1) {
            mensajeAlerta('No puede seleccionar mas de una persona');
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
function eventoDiscapacidadYCredenciales() {
    var mensaje = validarDiscapacidad();
    if (mensaje == '') {
        document.getElementById('chkLey21015Ref').checked = true;
        //$('#modal-default').modal('hide');
        $('#modal-inclusion').modal('hide');
    }
    else {
        mensajeAlerta(mensaje);
    }
}
////EVENTOS BOTONES



////CARGA
function cargarPostulante(datos) {
    document.getElementById("txtRutExiste").value = datos[0].rut;
    document.getElementById("txtCorreoExiste").value = datos[0].correo;
    document.getElementById("txtBloqueadoExiste").value = datos[0].bloqueado;
    document.getElementById("txtIdBPO").value = datos[0].idBPO;
    //document.getElementById("txtTokenBPO").value = datos[0].tokenBPO;

    document.getElementById("txtNombre").value = datos[0].nombre;
    document.getElementById("txtApellidoPaterno").value = datos[0].paterno;
    document.getElementById("txtApellidoMaterno").value = datos[0].materno;
    document.getElementById("txtDireccionPos").value = datos[0].direccion;

    var idCom = datos[0].comuna;//'0638'; //datos[0].comuna;
    if (idCom != '' && idCom != '0' && idCom != undefined) {
        var listaComuna = document.getElementById("ddlComunaPos");
        var val = "";
        for (var i = 0; i < listaComuna.length; i++) {
            val = listaComuna[i].value;
            if (val.includes(idCom)) {
                break;
            }
        }
        document.getElementById("ddlComunaPos").value = val;
    }
    eventoDdlComunaPos();
    eventoDdlCiudadPos();
    
    document.getElementById("txtFonoCasaPos").value = datos[0].fonoCasa;
    document.getElementById("txtFonoCelularPos").value = datos[0].celular;
    document.getElementById("txtCorreoPos").value = datos[0].correo;
    document.getElementById("txtContactoEmergencia").value = datos[0].contactoEmergencia;
    document.getElementById("txtFonoEmergenciaPos").value = datos[0].fonoEmergencia;
    document.getElementById("ddlGenero").value = datos[0].genero;
    document.getElementById("FecNacimiento").value = datos[0].fechaNacimiento;
    document.getElementById("ddlNacionalidad").value = datos[0].nacionalidad;
    document.getElementById("ddlEstadoCivil").value = datos[0].estadoCivil;
    //document.getElementById("ddlOrigen").value = datos[0].origen;
    document.getElementById("ddlAFP").value = datos[0].afp;
    document.getElementById("ddlIsapre").value = datos[0].isapre;
    document.getElementById("txtCalzado").value = datos[0].tallaCalzado;
    document.getElementById("txtPantalon").value = datos[0].tallaPantalon;
    document.getElementById("txtCamisa").value = datos[0].tallaCamisa;

    

    var ley = datos[0].ley21015;
    if (ley == "1") 
        cargarLey21015(datos[0].tipoInclusion, datos[0].certificacionInclusion);
    else
        limpiarLey21015();
    //document.getElementById("FecFechaInicioContratoPos").value = "";
    //document.getElementById("FecFirmaContrato").value = "";
    //document.getElementById("txtHoraFirma").value = "";
    //document.getElementById("ddlRecepcionFirma").value = "-1";
}
function ArmaGrillaPersonasEncontradasPostulante(datosConsolidado) {//, datosNuevos) {
    
    $('#tbPersonasEncontradasPos').DataTable().destroy();

    dataTablePersonaPostulante = $('#tbPersonasEncontradasPos').DataTable({
        data: datosConsolidado,
        select: true,
        //dom: 'lrtip',
        //retrieve: true,
        columns: [
            //{ data: "Key" },
            //{ data: "Value", orderable: true }
            { data: "id" },
            { data: "rut", orderable: true },
            { data: "nombre", orderable: true }
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
                'targets': [1]
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
////CARGA


////VALIDACIONES
function validarRut(rut) {
    // Despejar Puntos
    var valor = rut.value.replace('.', '');
    // Despejar Guión
    valor = valor.replace('-', '');

    // Aislar Cuerpo y Dígito Verificador
    cuerpo = valor.slice(0, -1);
    dv = valor.slice(-1).toUpperCase();

    // Formatear RUN
    rut.value = cuerpo + '-' + dv

    //// Si no cumple con el mínimo ej. (n.nnn.nnn)
    //if (cuerpo.length < 7) { rut.setCustomValidity("RUT Incompleto"); return false; }
    if (cuerpo.length < 7) { return "El Rut ingresado se encuentra incompleto"; }

    // Calcular Dígito Verificador
    suma = 0;
    multiplo = 2;

    // Para cada dígito del Cuerpo
    for (i = 1; i <= cuerpo.length; i++) {

        // Obtener su Producto con el Múltiplo Correspondiente
        index = multiplo * valor.charAt(cuerpo.length - i);

        // Sumar al Contador General
        suma = suma + index;

        // Consolidar Múltiplo dentro del rango [2,7]
        if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }

    }

    // Calcular Dígito Verificador en base al Módulo 11
    dvEsperado = 11 - (suma % 11);

    // Casos Especiales (0 y K)
    dv = (dv == 'K') ? 10 : dv;
    dv = (dv == 0) ? 11 : dv;

    //// Validar que el Cuerpo coincide con su Dígito Verificador
    //if (dvEsperado != dv) { rut.setCustomValidity("RUT Inválido"); return false; }
    if (dvEsperado != dv) { return "El Rut ingresado no es correcto, por favor revisar"; }

    // Si todo sale bien, eliminar errores (decretar que es válido)
    rut.setCustomValidity('');
    return "";
}
function validarCorreo(correo, alerta = false) {
    //campo = event.target;
    //valido = document.getElementById('emailOK');
    var mensaje = "";
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (!emailRegex.test(correo.value)) 
        mensaje = "El correo registrado no es correcto, por favor revisar";

    if (mensaje != "" && alerta)
        mensajeAlerta(mensaje);
    return mensaje;
}
function validarDiscapacidad() {
    if (document.getElementById('chkLey21015Ref').checked == true) {
        var validadorLey = false;
        if (document.getElementById('chkAuditiva').checked == true) validadorLey = true;
        if (document.getElementById('chkCognitiva').checked == true) validadorLey = true;
        if (document.getElementById('chkFisica').checked == true) validadorLey = true;
        if (document.getElementById('chkPsiquica').checked == true) validadorLey = true;
        if (document.getElementById('chkVisceral').checked == true) validadorLey = true;
        if (document.getElementById('chkVisual').checked == true) validadorLey = true;
        if (validadorLey == false)
            return 'Fue seleccionada la opción Ley 21015, por lo que es necesario ingresar una discapacidad';
        validadorLey = false;
        if (document.getElementById('chkCredencial').checked == true) validadorLey = true;
        if (document.getElementById('chkPensionInvalidez').checked == true) validadorLey = true;
        if (validadorLey == false)
            return 'Fue seleccionada la opción Ley 21015, por lo que es necesario ingresar un certificado de discapacidad';
    }
    return '';
}
function validacionGuardarRequerimiento() {
    
    validarCampos();

    if (document.getElementById('ddlCuenta').value == '-1')
        return 'Debe seleccionar una cuenta'
    if (document.getElementById('ddlEmpresa').value == '-1')
        return 'Debe seleccionar una empresa'
    if (document.getElementById('ddlEstructura').value == '-1')
        return 'Debe seleccionar una estructura'
    if (document.getElementById('ddlCargo').value == '-1')
        return 'Debe seleccionar un cargo'
    if (document.getElementById('ddlCentroCosto').value == '-1')
        return 'Debe seleccionar un centro de costo'
    if (document.getElementById('ddlJornada').value == '-1')
        return 'Debe seleccionar una jornada'
    if (document.getElementById('ddlTipoOperacion').value == '-1')
        return 'Debe seleccionar un tipo de operación'
    if (document.getElementById('ddlTipoVacante').value == '-1')
        return 'Debe seleccionar un tipo de vacante'
    if (document.getElementById('ddlTurno').value == '-1')
        return 'Debe seleccionar un turno'
    if (document.getElementById('ddlMotivoReq').value == '-1')
        return 'Debe seleccionar un motivo del requerimiento'
    //else {
    //    //ojo aca pk si no es reemplazo no lo deberia solicitar, va a depender del motivo
    //    if (document.getElementById('txRutEmpleadoReemplazado').value.trim() == '')
    //        return 'Debe seleccionar el empleado que es reemplazado'
    //}



    if (document.getElementById('ddlSupervisor').value.trim() == '')
        return 'Debe seleccionar un supervisor'
    if (document.getElementById('txtFonoSupervisor').value.trim() == '')
        return 'Debe seleccionar un teléfono del supervisor'
    if (document.getElementById('FecRequerimiento').value == '')
        return 'Debe seleccionar una fecha de inicio de contrato'
    if (document.getElementById('ddlCiudad').value == '-1')
        return 'Debe seleccionar una ciudad'
    if (document.getElementById('ddlComuna').value == '-1')
        return 'Debe seleccionar una comuna'
    if (document.getElementById('txtLugarTrabajo').value.trim() == '')
        return 'Debe seleccionar un lugar de trabajo'
    if (document.getElementById('txtDirTrabajo').value.trim() == '')
        return 'Debe seleccionar una dirección de trabajo'
    if (document.getElementById('FecRequerimiento').value == '')
        return 'Debe seleccionar una fecha inicio de contrato'
    if (document.getElementById('FecTerminoContrato').value == '' && document.getElementById('FecTerminoContrato').disabled == false)
        return 'Debe seleccionar una fecha de término de contrato'
    if (document.getElementById('ddlJornada').value != "AR22") {
        if (document.getElementById('txtHorarioTrabajo').value.trim() == '')
            return 'Debe seleccionar el horario del trabajo'
    }
    

    if (document.getElementById('txtObservacion').value.trim() == '')
        return 'Debe ingresar un observación al requerimiento'

    ////ESTO SE VALIDA EN EL BACK
    //if (document.getElementById('FecTerminoContrato').value <= document.getElementById('FecRequerimiento').value)
    //    return 'La fecha término de contrato debe ser superior a la fecha inicio de contrato';

    return '';
}
function validacionGuardarPostulante() {
    validarCamposPostulante();

    var msjRut = validarRut(document.getElementById('txtRut'));
    if (msjRut != "")
        return msjRut;

    //LEY21015
    var validadorLeyMensaje = validarDiscapacidad();
    if (validadorLeyMensaje != '')
        return validadorLeyMensaje;

    var msjCorreo = validarCorreo(document.getElementById('txtCorreoPos'));
    if (msjCorreo != "")
        return msjCorreo;
    
    if (document.getElementById('ddlRegionPos').value == '-1')
        return 'Debe seleccionar una región'
    if (document.getElementById('ddlCiudadPos').value == '-1')
        return 'Debe seleccionar una ciudad'
    if (document.getElementById('ddlComunaPos').value == '-1')
        return 'Debe seleccionar una comuna'
    if (document.getElementById('ddlGenero').value == '-1')
        return 'Debe seleccionar un genero'
    if (document.getElementById('ddlEstadoCivil').value == '-1')
        return 'Debe seleccionar el estado civil'
    if (document.getElementById('ddlNacionalidad').value == '-1')
        return 'Debe seleccionar una nacionalidad'
    //if (document.getElementById('ddlOrigen').value == '-1')
    //    return 'Debe seleccionar un origen'
    if (document.getElementById('ddlAFP').value == '-1')
        return 'Debe seleccionar la AFP'
    if (document.getElementById('ddlIsapre').value == '-1')
        return 'Debe seleccionar un sistema de salud'
    if (document.getElementById('ddlRecepcionFirma').value == '-1')
        return 'Debe seleccionar una recepción de firma'
    
    
    if (document.getElementById('txtRut').value.trim() == '')
        return 'Debe registrar el rut del colaborador'
    if (document.getElementById('txtNombre').value.trim() == '')
        return 'Debe registrar el nombre del colaborador'
    if (document.getElementById('txtApellidoPaterno').value == '')
        return 'Debe registrar el apellido paterno del colaborador'
    if (document.getElementById('txtApellidoMaterno').value.trim() == '')
        return 'Debe registrar el apellido materno del colaborador'
    if (document.getElementById('txtDireccionPos').value.trim() == '')
        return 'Debe registrar la dirección'
    if (document.getElementById('txtFonoCasaPos').value.trim() == '')
        return 'Debe registrar el teléfono de casa'
    if (document.getElementById('txtFonoCelularPos').value.trim() == '')
        return 'Debe registrar el celular'
    if (document.getElementById('txtCorreoPos').value.trim() == '')
        return 'Debe registrar el correo'
    if (document.getElementById('txtContactoEmergencia').value.trim() == '')
        return 'Debe registrar el contacto de emergencia'
    if (document.getElementById('txtFonoEmergenciaPos').value.trim() == '')
        return 'Debe registrar el teléfono de emergencia'
    if (document.getElementById('FecNacimiento').value == '')
        return 'Debe seleccionar una fecha de nacimiento'
    if (document.getElementById('FecFirmaContrato').value == '')
        return 'Debe seleccionar una fecha firma de contrato'
    if (document.getElementById('txtCalzado').value.trim() == '')
        return 'Debe registrar la talla del calzado'
    else {
        if (document.getElementById('txtCalzado').value.trim() <= '0')
            return 'Debe registrar la talla del calzado correcta'
    }
    if (document.getElementById('txtPantalon').value.trim() == '')
        return 'Debe registrar la talla del pantalón'
    else {
        if (document.getElementById('txtPantalon').value.trim() <= '0')
            return 'Debe registrar la talla del pantalón correcta'
    }
    if (document.getElementById('txtCamisa').value.trim() == '')
        return 'Debe registrar la talla de la camisa'
    else {
        if (document.getElementById('txtCamisa').value.trim() <= '0')
            return 'Debe registrar la talla de la camisa correcta'
    }
    if (document.getElementById('txtHoraFirma').value.trim() == '')
        return 'Debe registrar la hora de firma contrato    '

    if (dataTableDocumentos == null)
        return 'Debe insgresar al menos 3 documento';
    else {
        if (dataTableDocumentos.rows().count() <= 2)
            return 'Debe insgresar al menos 3 documento';
    }   

    return '';
}
function validarCamposPostulante() {
    //DDL
    validarObligatorio(document.getElementById('ddlRegionPos'));
    validarObligatorio(document.getElementById('ddlCiudadPos'));
    validarObligatorio(document.getElementById('ddlComunaPos'));
    validarObligatorio(document.getElementById('ddlGenero'));
    validarObligatorio(document.getElementById('ddlEstadoCivil'));
    validarObligatorio(document.getElementById('ddlNacionalidad'));
    //validarObligatorio(document.getElementById('ddlOrigen'));
    validarObligatorio(document.getElementById('ddlAFP'));
    validarObligatorio(document.getElementById('ddlIsapre'));
    validarObligatorio(document.getElementById('ddlRecepcionFirma'));

    //TEXT
    validarObligatorio(document.getElementById('txtRut'));
    validarObligatorio(document.getElementById('txtNombre'));
    validarObligatorio(document.getElementById('txtApellidoPaterno'));
    validarObligatorio(document.getElementById('txtApellidoMaterno'));
    validarObligatorio(document.getElementById('txtDireccionPos'));
    validarObligatorio(document.getElementById('txtFonoCasaPos'));
    validarObligatorio(document.getElementById('txtFonoCelularPos'));
    validarObligatorio(document.getElementById('txtCorreoPos'));
    validarObligatorio(document.getElementById('txtContactoEmergencia'));
    validarObligatorio(document.getElementById('txtFonoEmergenciaPos'));
    validarObligatorio(document.getElementById('FecNacimiento'));
    validarObligatorio(document.getElementById('FecFirmaContrato'));
    validarObligatorio(document.getElementById('txtCalzado'));
    validarObligatorio(document.getElementById('txtPantalon'));
    validarObligatorio(document.getElementById('txtCamisa'));
    validarObligatorio(document.getElementById('txtHoraFirma'));
}
////VALIDACIONES


////GUARDAR REQUERIMIENTO
function GuardarRequerimiento() {
    seValidoAnteriormente = true;
    var mensaje = validacionGuardarRequerimiento();
    if (mensaje == '') 
        habilitarPostulante();
    else
        mensajeAlerta(mensaje);
}
function GuardarFormRequerimiento(valores) {
    var cantPersona = '1';
    var fechaRequerimiento = document.getElementById('FecRequerimiento').value;
    var usr = document.getElementById('rut').value.trim();
    var rutCuenta = document.getElementById('ddlCuenta').value;
    var empresa = document.getElementById('ddlEmpresa').value;
    var estructura = document.getElementById('ddlEstructura').value;
    var cargo = document.getElementById('ddlCargo').value;
    var tipoContrato = '001'; // FIJO
    var jornada = document.getElementById('ddlJornada').value;
    var centroCosto = document.getElementById('ddlCentroCosto').value;
    var fecInicioContrato = document.getElementById('FecRequerimiento').value;
    var supervisor = document.getElementById('ddlSupervisor').value;
    var fonoSup = '+56 9' + document.getElementById('txtFonoSupervisor').value;
    var lugarTrabajo = document.getElementById('txtLugarTrabajo').value;
    var arregloMotivo = document.getElementById('ddlMotivoReq').value.toString().split(';');
    var motivo = arregloMotivo[0];//document.getElementById('ddlMotivoReq').value;
    var estadoReq = '01';//EN SELECCION
    var observacion = document.getElementById('txtObservacion').value;
    var rutReemplazo = document.getElementById('txRutEmpleadoReemplazado').value;
    var fecTerminoContrato = document.getElementById('FecTerminoContrato').value;
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
    var experiencia = '';
    var comuna = document.getElementById('ddlComuna').value;
    var horario = document.getElementById('txtHorarioTrabajo').value;
    var reqPostulante = 'N';
    var estudios = '-1';
    var buses = 'N';
    var entrevista = 'N';
    var tipoOperacion = document.getElementById('ddlTipoOperacion').value;
    var tipoVacante = document.getElementById('ddlTipoVacante').value;
    
    
    valores.append('usr', usr);
    valores.append('cantPersona', cantPersona);
    valores.append('fechaRequerimiento', fechaRequerimiento);
    valores.append('rutCuenta', rutCuenta);
    valores.append('empresa', empresa);
    valores.append('estructura', estructura);
    valores.append('cargo', cargo);
    valores.append('tipoContrato', tipoContrato);
    valores.append('jornada', jornada);
    valores.append('centroCosto', centroCosto);
    valores.append('fecInicioContrato', fecInicioContrato);
    valores.append('supervisor', supervisor);
    valores.append('fonoSup', fonoSup);
    valores.append('lugarTrabajo', lugarTrabajo);
    valores.append('motivo', motivo);
    valores.append('estadoReq', estadoReq);
    valores.append('rutReemplazo', rutReemplazo);
    valores.append('fecTerminoContrato', fecTerminoContrato);
    valores.append('baseP', baseP);
    valores.append('movilizacion', movilizacion);
    valores.append('colacion', colacion);
    valores.append('gratificacion', gratificacion);
    valores.append('tipoGratificacion', tipoGratificacion);
    valores.append('cotizacion', cotizacion);
    valores.append('ciudad', ciudad);
    valores.append('turno', turno);
    valores.append('direccion', direccion);
    valores.append('experiencia', experiencia);
    valores.append('comuna', comuna);
    valores.append('nombreComuna', nombreComuna);
    //valores.append('genero', genero);
    valores.append('horario', horario);
    valores.append('reqPostulante', reqPostulante);
    valores.append('estudios', estudios);
    valores.append('buses', buses);
    valores.append('entrevista', entrevista);
    valores.append('tipoOperacion', tipoOperacion);
    valores.append('tipoVacante', tipoVacante);
    valores.append('observacion', observacion);
    //valores.append('ley', ley);
    valores.append('envioSeleccion', 1);

    var listaHorario = eventoGuardarHorario();
    valores.append('listaHorario', listaHorario);

    return valores;
}
function GuardarJsonRequerimiento(json) {
    var cantPersona = '1';
    var fechaRequerimiento = document.getElementById('FecRequerimiento').value;
    var usr = document.getElementById('rut').value.trim();
    var rutCuenta = document.getElementById('ddlCuenta').value;
    var ddlCta = document.getElementById('ddlCuenta');
    var nombreCuenta = ddlCta.options[ddlCta.selectedIndex].text;
    var empresa = document.getElementById('ddlEmpresa').value;
    var estructura = document.getElementById('ddlEstructura').value;
    var cargo = document.getElementById('ddlCargo').value;
    var tipoContrato = '001'; // FIJO
    var jornada = document.getElementById('ddlJornada').value;
    var centroCosto = document.getElementById('ddlCentroCosto').value;
    var fecInicioContrato = document.getElementById('FecRequerimiento').value;
    var supervisor = document.getElementById('ddlSupervisor').value;
    var fonoSup = '+56 9' + document.getElementById('txtFonoSupervisor').value;
    var lugarTrabajo = document.getElementById('txtLugarTrabajo').value;
    var arregloMotivo = document.getElementById('ddlMotivoReq').value.toString().split(';');
    var motivo = arregloMotivo[0];//document.getElementById('ddlMotivoReq').value;
    var ddlMot = document.getElementById('ddlMotivoReq')
    var nombreMotivo = ddlMot.options[ddlMot.selectedIndex].text;
    var estadoReq = '01';//EN SELECCION
    var observacion = document.getElementById('txtObservacion').value;
    var rutReemplazo = document.getElementById('txRutEmpleadoReemplazado').value;
    var fecTerminoContrato = document.getElementById('FecTerminoContrato').value;
    var baseP = '0';
    var movilizacion = '0';
    var colacion = '0';
    var gratificacion = '0';
    var tipoGratificacion = '';
    var cotizacion = '';
    var ciudad = document.getElementById('ddlCiudad').value;
    var turno = document.getElementById('ddlTurno').value;
    var ddlTur = document.getElementById('ddlTurno');
    var nombreTurno = ddlTur.options[ddlTur.selectedIndex].text;
    var direccion = document.getElementById('txtDirTrabajo').value;
    var ddlCom = document.getElementById('ddlComuna');
    var nombreComuna = ddlCom.options[ddlCom.selectedIndex].text;
    var experiencia = '';
    var comuna = document.getElementById('ddlComuna').value;
    var horario = document.getElementById('txtHorarioTrabajo').value;
    var reqPostulante = 'N';
    var estudios = '-1';
    var buses = 'N';
    var entrevista = 'N';
    var tipoOperacion = document.getElementById('ddlTipoOperacion').value;
    var tipoVacante = document.getElementById('ddlTipoVacante').value;
    var listaHorario = null;
    if (document.getElementById('ddlJornada').value != "AR22")
        listaHorario = eventoGuardarHorario();

    json['usr'] = usr;
    json['cantPersona'] = cantPersona;
    json['fechaRequerimiento'] = fechaRequerimiento;
    json['rutCuenta'] = rutCuenta;
    json['empresa'] = empresa;
    json['estructura'] = estructura;
    json['cargo'] = cargo;
    json['tipoContrato'] = tipoContrato;
    json['jornada'] = jornada;
    json['centroCosto'] = centroCosto;
    json['fecInicioContrato'] = fecInicioContrato;
    json['supervisor'] = supervisor;
    json['fonoSup'] = fonoSup;
    json['lugarTrabajo'] = lugarTrabajo;
    json['motivo'] = motivo;
    json['estadoReq'] = estadoReq;
    json['rutReemplazo'] = rutReemplazo;
    json['fecTerminoContrato'] = fecTerminoContrato;
    json['baseP'] = baseP;
    json['movilizacion'] = movilizacion;
    json['colacion'] = colacion;
    json['gratificacion'] = gratificacion;
    json['tipoGratificacion'] = tipoGratificacion;
    json['cotizacion'] = cotizacion;
    json['ciudad'] = ciudad;
    json['turno'] = turno;
    json['direccion'] = direccion;
    json['experiencia'] = experiencia;
    json['comuna'] = comuna;
    json['nombreComuna'] = nombreComuna;
    json['horario'] = horario;
    json['reqPostulante'] = reqPostulante;
    json['estudios'] = estudios;
    json['buses'] = buses;
    json['entrevista'] = entrevista;
    json['tipoOperacion'] = tipoOperacion;
    json['tipoVacante'] = tipoVacante;
    json['observacion'] = observacion;
    json['envioSeleccion'] = 1;
    json['listaHorario'] = listaHorario;
    json['nombreCuenta'] = nombreCuenta;
    json['nombreMotivo'] = nombreMotivo;
    json['nombreTurno'] = nombreTurno;
    //});

    return json;
}
////GUARDAR REQUERIMIENTO
////GUARDAR POSTULANTE
function GuardarFormPostulante(valores) {

    ////POSTULANTE
    var pos_rut = document.getElementById('txtRut').value.replace('-', '');
    var pos_apellido_paterno = document.getElementById('txtApellidoPaterno').value;
    var pos_apellido_materno = document.getElementById('txtApellidoMaterno').value;
    var pos_nombres = document.getElementById('txtNombre').value;
    var pos_direccion = document.getElementById('txtDireccionPos').value;
    var pos_numero = '';
    var pos_departamento = '';
    var pos_villapob = '';
    var pos_comuna = document.getElementById('ddlComunaPos').value;
    var pos_fono_casa = document.getElementById('txtFonoCasaPos').value;
    var pos_celular = '+56 9' + document.getElementById('txtFonoCelularPos').value;
    var pos_fono_emergencia = document.getElementById('txtFonoEmergenciaPos').value;
    var pos_contacto_emergencia = document.getElementById('txtContactoEmergencia').value;
    var pos_mail = document.getElementById('txtCorreoPos').value;
    var pos_genero = document.getElementById('ddlGenero').value;
    var pos_id_estado_civil = document.getElementById('ddlEstadoCivil').value;
    var pos_fecha_nacimiento = document.getElementById('FecNacimiento').value;
    var pos_nacionalidad = document.getElementById('ddlNacionalidad').value;
    var pos_tipovisa = '';
    var pos_fechaterminovisa = '';
    var pos_id_nivel_educacional = '0';
    var pos_isapre = document.getElementById('ddlIsapre').value;
    var pos_afp = document.getElementById('ddlAFP').value;
    var pos_numero_calzado = document.getElementById('txtCalzado').value;
    var pos_talla_camisa = document.getElementById('txtCamisa').value;
    var pos_talla_pantalon = document.getElementById('txtPantalon').value;
    
    //***tengo que guardar lo que venga en la bbdd, si esta bloqueado no cambiarlo a false, debido a que si es un usuario nuevo se va a setear en false por defecto.
    var pos_bloqueado = false;
    if (document.getElementById("txtBloqueadoExiste").value != "" && document.getElementById("txtBloqueadoExiste").value == "true")
        pos_bloqueado = true;

    var pos_origen = '';
    //se va a usar el usr_autoid que ya va en el parametro.
    //var pos_usuario_solicita_blo = document.getElementById('txtRut').value;
    var pos_observaciones_blo = '';
    var pos_observaciones = '';
    var pos_pasaporte = '';
    var pos_ley21015 = document.getElementById('chkLey21015Ref').checked;
    var pos_accionPos = 'I';
    if (document.getElementById("txtRutExiste").value.trim() != "")
        pos_accionPos = 'M';
    ////POSTULANTE


    ////POSTULACION
    var usrAutoid = document.getElementById('usr').value;
    ////POSTULACION


    ////CONTRATO
    var pos_uxs = document.getElementById('uxs').value;
    var pos_fecfirma = document.getElementById('FecFirmaContrato').value;
    var pos_horfirma = document.getElementById('txtHoraFirma').value;
    var pos_responsableFirma = document.getElementById('ddlRecepcionFirma').value;
    ////CONTRATO


    ////INCLUSION
    var pos_discapacidades = '';
    var pos_certificados = '';
    if (document.getElementById('chkLey21015Ref').checked == true) {
        if (document.getElementById('chkAuditiva').checked == true) pos_discapacidades = document.getElementById('chkAuditiva').value + ',' + pos_discapacidades;
        if (document.getElementById('chkCognitiva').checked == true) pos_discapacidades = document.getElementById('chkCognitiva').value + ',' + pos_discapacidades;
        if (document.getElementById('chkFisica').checked == true) pos_discapacidades = document.getElementById('chkFisica').value + ',' + pos_discapacidades;
        if (document.getElementById('chkPsiquica').checked == true) pos_discapacidades = document.getElementById('chkPsiquica').value + ',' + pos_discapacidades;
        if (document.getElementById('chkVisceral').checked == true) pos_discapacidades = document.getElementById('chkVisceral').value + ',' + pos_discapacidades;
        if (document.getElementById('chkVisual').checked == true) pos_discapacidades = document.getElementById('chkVisual').value + ',' + pos_discapacidades;
        if (pos_discapacidades != '') {
            if (pos_discapacidades[pos_discapacidades.length - 1] = ',')
                pos_discapacidades = pos_discapacidades.substring(0, pos_discapacidades.length - 1);
        }

        //alert(datosDiscapacidad);
        if (document.getElementById('chkCredencial').checked == true) pos_certificados = document.getElementById('chkCredencial').value + ',' + pos_certificados;
        if (document.getElementById('chkPensionInvalidez').checked == true) pos_certificados = document.getElementById('chkPensionInvalidez').value + ',' + pos_certificados;
        if (pos_certificados != '') {
            if (pos_certificados[pos_certificados.length - 1] = ',')
                pos_certificados = pos_certificados.substring(0, pos_certificados.length - 1);
        }
        //alert(datosCertificado);
    }
    ////INCLUSION





    ////POSTULANTE
    valores.append('pos_rut', pos_rut);
    valores.append('pos_apellido_paterno', pos_apellido_paterno);
    valores.append('pos_apellido_materno', pos_apellido_materno);
    valores.append('pos_nombres', pos_nombres);
    valores.append('pos_direccion', pos_direccion);
    valores.append('pos_numero', pos_numero);
    valores.append('pos_departamento', pos_departamento);
    valores.append('pos_villapob', pos_villapob);
    valores.append('pos_comuna', pos_comuna);
    valores.append('pos_fono_casa', pos_fono_casa);
    valores.append('pos_celular', pos_celular);
    valores.append('pos_fono_emergencia', pos_fono_emergencia);
    valores.append('pos_contacto_emergencia', pos_contacto_emergencia);
    valores.append('pos_mail', pos_mail);
    valores.append('pos_genero', pos_genero);
    valores.append('pos_id_estado_civil', pos_id_estado_civil);
    valores.append('pos_fecha_nacimiento', pos_fecha_nacimiento);
    valores.append('pos_nacionalidad', pos_nacionalidad);
    valores.append('pos_tipovisa', pos_tipovisa);
    valores.append('pos_fechaterminovisa', pos_fechaterminovisa);
    valores.append('pos_id_nivel_educacional', pos_id_nivel_educacional);
    valores.append('pos_isapre', pos_isapre);
    valores.append('pos_afp', pos_afp);
    valores.append('pos_numero_calzado', pos_numero_calzado);
    valores.append('pos_talla_camisa', pos_talla_camisa);
    valores.append('pos_talla_camisa', pos_talla_camisa);
    valores.append('pos_talla_pantalon', pos_talla_pantalon);
    valores.append('pos_bloqueado', pos_bloqueado);
    valores.append('pos_origen', pos_origen);
    valores.append('pos_observaciones_blo', pos_observaciones_blo);
    valores.append('pos_observaciones', pos_observaciones);
    valores.append('pos_pasaporte', pos_pasaporte);
    valores.append('pos_ley21015', pos_ley21015);
    valores.append('pos_accionPos', pos_accionPos);
    ////POSTULANTE


    ////POSTULACION
    valores.append('usrAutoid', usrAutoid);
    ////POSTULACION


    ////CONTRATO
    valores.append('pos_uxs', pos_uxs);
    valores.append('pos_fecfirma', pos_fecfirma);
    valores.append('pos_horfirma', pos_horfirma);
    valores.append('pos_responsableFirma', pos_responsableFirma);
    ////CONTRATO
    

    ////INCLUSION
    valores.append('pos_discapacidades', pos_discapacidades);
    valores.append('pos_certificados', pos_certificados);
    ////INCLUSION

    return valores; 

}
function GuardarJsonPostulante(json) {

    ////POSTULANTE
    var pos_rut = document.getElementById('txtRut').value.replace('-', '');
    var pos_apellido_paterno = document.getElementById('txtApellidoPaterno').value;
    var pos_apellido_materno = document.getElementById('txtApellidoMaterno').value;
    var pos_nombres = document.getElementById('txtNombre').value;
    var pos_direccion = document.getElementById('txtDireccionPos').value;
    var pos_numero = '';
    var pos_departamento = '';
    var pos_villapob = '';

    //var pos_comuna = document.getElementById('ddlComunaPos').value;
    var idComuna = document.getElementById('ddlComunaPos').value;
    if (idComuna != "" && idComuna != "-1") {
        var listaIds = idComuna.split('|');
        pos_comuna = listaIds[1]; //COD_DESCRIPCION
        //pos_comuna = listaIds[0]; //ID_PARAMETRO
    }

    var pos_fono_casa = document.getElementById('txtFonoCasaPos').value;
    var pos_celular = '+56 9' + document.getElementById('txtFonoCelularPos').value;
    var pos_fono_emergencia = document.getElementById('txtFonoEmergenciaPos').value;
    var pos_contacto_emergencia = document.getElementById('txtContactoEmergencia').value;
    var pos_mail = document.getElementById('txtCorreoPos').value;
    var pos_genero = document.getElementById('ddlGenero').value;
    var pos_id_estado_civil = document.getElementById('ddlEstadoCivil').value;
    var pos_fecha_nacimiento = document.getElementById('FecNacimiento').value;
    var pos_nacionalidad = document.getElementById('ddlNacionalidad').value;
    var pos_tipovisa = '';
    var pos_fechaterminovisa = '';
    var pos_id_nivel_educacional = '0';
    var pos_isapre = document.getElementById('ddlIsapre').value;
    var pos_afp = document.getElementById('ddlAFP').value;
    var pos_numero_calzado = document.getElementById('txtCalzado').value;
    var pos_talla_camisa = document.getElementById('txtCamisa').value;
    var pos_talla_pantalon = document.getElementById('txtPantalon').value;

    //***tengo que guardar lo que venga en la bbdd, si esta bloqueado no cambiarlo a false, debido a que si es un usuario nuevo se va a setear en false por defecto.
    var pos_bloqueado = false;
    if (document.getElementById("txtBloqueadoExiste").value != "" && document.getElementById("txtBloqueadoExiste").value == "true")
        pos_bloqueado = true;

    var pos_origen = '';
    //se va a usar el usr_autoid que ya va en el parametro.
    //var pos_usuario_solicita_blo = document.getElementById('txtRut').value;
    var pos_observaciones_blo = '';
    var pos_observaciones = '';
    var pos_pasaporte = '';
    var pos_ley21015 = document.getElementById('chkLey21015Ref').checked;
    var pos_accionPos = 'I';
    if (document.getElementById("txtRutExiste").value.trim() != "")
        pos_accionPos = 'M';
    ////POSTULANTE


    ////POSTULACION
    var usrAutoid = document.getElementById('usr').value;
    ////POSTULACION


    ////CONTRATO
    var pos_uxs = document.getElementById('uxs').value;
    var pos_fecfirma = document.getElementById('FecFirmaContrato').value;
    var pos_horfirma = document.getElementById('txtHoraFirma').value;
    var pos_responsableFirma = document.getElementById('ddlRecepcionFirma').value;

    var ddlResp = document.getElementById('ddlRecepcionFirma');
    var nombreResponsableFirma = ddlResp.options[ddlResp.selectedIndex].text;
    ////CONTRATO


    ////INCLUSION
    var pos_discapacidades = '';
    var pos_certificados = '';
    if (document.getElementById('chkLey21015Ref').checked == true) {
        if (document.getElementById('chkAuditiva').checked == true) pos_discapacidades = document.getElementById('chkAuditiva').value + ',' + pos_discapacidades;
        if (document.getElementById('chkCognitiva').checked == true) pos_discapacidades = document.getElementById('chkCognitiva').value + ',' + pos_discapacidades;
        if (document.getElementById('chkFisica').checked == true) pos_discapacidades = document.getElementById('chkFisica').value + ',' + pos_discapacidades;
        if (document.getElementById('chkPsiquica').checked == true) pos_discapacidades = document.getElementById('chkPsiquica').value + ',' + pos_discapacidades;
        if (document.getElementById('chkVisceral').checked == true) pos_discapacidades = document.getElementById('chkVisceral').value + ',' + pos_discapacidades;
        if (document.getElementById('chkVisual').checked == true) pos_discapacidades = document.getElementById('chkVisual').value + ',' + pos_discapacidades;
        if (pos_discapacidades != '') {
            if (pos_discapacidades[pos_discapacidades.length - 1] = ',')
                pos_discapacidades = pos_discapacidades.substring(0, pos_discapacidades.length - 1);
        }

        //alert(datosDiscapacidad);
        if (document.getElementById('chkCredencial').checked == true) pos_certificados = document.getElementById('chkCredencial').value + ',' + pos_certificados;
        if (document.getElementById('chkPensionInvalidez').checked == true) pos_certificados = document.getElementById('chkPensionInvalidez').value + ',' + pos_certificados;
        if (pos_certificados != '') {
            if (pos_certificados[pos_certificados.length - 1] = ',')
                pos_certificados = pos_certificados.substring(0, pos_certificados.length - 1);
        }
        //alert(datosCertificado);
    }
    ////INCLUSION

    var listaDocumentos = eventoGuardarDocumentos();



    ////POSTULANTE
    json['pos_rut'] = pos_rut;
    json['pos_apellido_paterno'] = pos_apellido_paterno;
    json['pos_apellido_materno'] = pos_apellido_materno;
    json['pos_nombres'] = pos_nombres;
    json['pos_direccion'] = pos_direccion;
    json['pos_numero'] = pos_numero;
    json['pos_departamento'] = pos_departamento;
    json['pos_villapob'] = pos_villapob;
    json['pos_comuna'] = pos_comuna;
    json['pos_fono_casa'] = pos_fono_casa;
    json['pos_celular'] = pos_celular;
    json['pos_fono_emergencia'] = pos_fono_emergencia;
    json['pos_contacto_emergencia'] = pos_contacto_emergencia;
    json['pos_mail'] = pos_mail;
    json['pos_genero'] = pos_genero;
    json['pos_id_estado_civil'] = pos_id_estado_civil;
    json['pos_fecha_nacimiento'] = pos_fecha_nacimiento;
    json['pos_nacionalidad'] = pos_nacionalidad;
    json['pos_tipovisa'] = pos_tipovisa;
    json['pos_fechaterminovisa'] = pos_fechaterminovisa;
    json['pos_id_nivel_educacional'] = pos_id_nivel_educacional;
    json['pos_isapre'] = pos_isapre;
    json['pos_afp'] = pos_afp;
    json['pos_numero_calzado'] = pos_numero_calzado;
    json['pos_talla_camisa'] = pos_talla_camisa;
    json['pos_talla_camisa'] = pos_talla_camisa;
    json['pos_talla_pantalon'] = pos_talla_pantalon;
    json['pos_bloqueado'] = pos_bloqueado;
    json['pos_origen'] = pos_origen;
    json['pos_observaciones_blo'] = pos_observaciones_blo;
    json['pos_observaciones'] = pos_observaciones;
    json['pos_pasaporte'] = pos_pasaporte;
    json['pos_ley21015'] = pos_ley21015;
    json['pos_accionPos'] = pos_accionPos;
    ////POSTULANTE


    ////POSTULACION
    json['usrAutoid'] = usrAutoid;
    ////POSTULACION


    ////CONTRATO
    json['pos_uxs'] = pos_uxs;
    json['pos_fecfirma'] = pos_fecfirma;
    json['pos_horfirma'] = pos_horfirma;
    json['pos_responsableFirma'] = pos_responsableFirma;
    json['nombreResponsableFirma'] = nombreResponsableFirma;
    ////CONTRATO


    ////INCLUSION
    json['pos_discapacidades'] = pos_discapacidades;
    json['pos_certificados'] = pos_certificados;
    ////INCLUSION


    json['listaDocumentos'] = listaDocumentos;

    return json;

}
////GUARDAR POSTULANTE


////GUARDADO COMPLETO
function guardarRequerimientoYPostulacion() {
    
    seValidoAnteriormente = true;


    ////VALIDA LOS DATOS DEL REQUERIMIENTO
    var mensaje = validacionGuardarRequerimiento();
    if (mensaje == '') {
        ////VALIDA LOS DATOS DEL POSTULANTE Y DOCUMENTOS
        mensaje = validacionGuardarPostulante();
        if (mensaje == '') {
            var rutExiste = document.getElementById('txtRutExiste').value;
            var correoAnterior = document.getElementById('txtCorreoExiste').value;
            var correoIngreso = document.getElementById('txtCorreoPos').value;
            var codIdBPO = document.getElementById('txtIdBPO').value;
            if (rutExiste != "" && codIdBPO != "" && correoAnterior != "" && correoAnterior != correoIngreso) {
                var opcion = confirm('La persona ya posee un correo electrónico enrolado en BPO: ' + correoAnterior + ' ¿Desea reemplazarlo por este nuevo correo:"' + correoIngreso + '"?');
                if (!opcion)
                    return;
            }

            //var valores = new FormData();
            //valores = GuardarFormRequerimiento(valores);
            //valores = GuardarFormPostulante(valores);
            esperando();
            var json = {};
            json = GuardarJsonRequerimiento(json);
            json = GuardarJsonPostulante(json);

            var token = document.getElementById('token').value;
            var url = host() + 'RequerimientoContrato/GuardarRequerimientoPostulanteReferido/';

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'Origin': origin
                },
                //body: valores
                body: JSON.stringify(json)
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        terminoEspera();
                        if (controlCarga(result)) {
                            var mensajeExito = result[3];
                            var mensaje = result[2];
                            var folio = result[1];
                            if (folio != 0) {
                                //document.getElementById('txtFolioRequerimiento').value = folio;
                                document.getElementById('lblMensajeCorreo').innerText = mensajeExito;
                                document.getElementById('lblMensajeFolio').innerText = folio;
                                $('#modal-mensajeFolio').modal({ backdrop: 'static', keyboard: false });
                                $('#modal-mensajeFolio').modal('show');
                            }
                            else {
                                if (mensaje != "")
                                    mensajeAlerta(mensaje);
                                else
                                    mensajeError('No se pudo guardar el requerimiento de contrato referido, por favor volver a intentar.');
                            }
                        }
                    },
                    (error) => {
                        terminoEspera();
                        mensajeError(error);
                        //guardarRequerimientoYPostulacion.log(error);
                    }
                )
        }
        else
            mensajeAlerta(mensaje);
    }
    else
        mensajeAlerta(mensaje);

}
function redireccionar() {
    seValidoAnteriormente = false;
    $('#imgCollapsePostulante').removeClass('fas fa-minus');
    $('#imgCollapsePostulante').addClass('fas fa-plus');
    cargaFuncionalidad('RequerimientoContrato/RequerimientoContratoReferido');
}
function pruebaListaAjax() {
    var url = host() + 'RequerimientoContrato/pruebaLista/';

    var lista = null;//eventoGuardarDocumentos();
   
    var token = document.getElementById('token').value;

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify({
            "lista": lista
            }),
        headers: {
            'Authorization': 'Bearer ' + token,
            //'Origin': origin
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //$("#ddlCentroCosto").empty();
            console.log(data);
            if (data[0].codigo == "200") {
                mensajeInformativo("ajax");

            } else {
                mensajeError(data[0].codigo + ' ' + data[0].mensaje);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error: arranca ctm');

        }
    });
}
function pruebaListaFetch() {
    var valores = new FormData();

    var listaHorario = eventoGuardarHorario();
    //listaHorario.forEach((item) => valores.append("listaHorario", item))
    //valores.append('listaHorario', JSON.stringify(listaHorario));
    //valores.append('listaHorario', listaHorario);


    ////funciona
    //var json = JSON.stringify({
    //    "listaHorario": listaHorario
    //});

    var json = { "listaHorario": listaHorario };
    var nana = "linda";

    json["nana"] = nana;
    
    var token = document.getElementById('token').value;
    var url = host() + 'RequerimientoContrato/pruebaLista/';

    //var object = {};
    //valores.forEach((value, key) => {
    //    if (!object.hasOwnProperty(key)) {
    //        object[key] = value;
    //        return;
    //    }
    //    if (!Array.isArray(object[key])) {
    //        object[key] = [object[key]];
    //    }
    //    object[key].Push(value);
    //});
    //var json = JSON.stringify(object);


    //const plainFormData = Object.fromEntries(valores.entries());
    //const formDataJsonString = JSON.stringify(plainFormData);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //"Accept": "application/json",
            'Authorization': 'Bearer ' + token,
            'Origin': origin
        },
        //body: valores
        //body: JSON.stringify(valores)
        //body: JSON.stringify(Object.fromEntries(valores))
        //body: json
        //body: valores
        ////funca
        //body: JSON.stringify({
        //    "listaHorario": listaHorario
        //})
        body: JSON.stringify(json)
    })
        .then(res => res.json())
        .then(
            (result) => {
                terminoEspera();
                if (controlCarga(result)) {
                    mensajeAlerta('probando');
                }
            },
            (error) => {
                terminoEspera();
                mensajeError(error);
                //guardarRequerimientoYPostulacion.log(error);
            }
        )

}
////GUARDAR COMPLETO


////GRILLA DOCUMENTOS
function ArmaGrillaDocumentosSeleccionados() {
    $('#tbListaDocumentos').DataTable().destroy();
    dataTableDocumentos = $('#tbListaDocumentos').DataTable({
        columnDefs: [
            {
                'targets': [0],
                "className": "dt-center",
                render: function (data, type, row, meta) {
                    ////span = '<i id="iEliminarDocumento" class="fa fa-trash" onclick="eliminarDocumento(' + data + ')"></i>';
                    //span = '<a href="#" id="iEliminarDocumento" onclick="eliminarDocumento(' + data + ')" style="cursor: pointer">Eliminar</a>';
                    span = '<i id="iEliminarDocumento" onclick="eliminarDocumento(' + data + ')" style="cursor:pointer; font-weight: bold;">Eliminar</i>';
                    return span;
                }
            },
            //{
            //    'targets': [1],
            //    render: function (data, type, row, meta) {
            //        span = '<i id="iVerDocumento" class="fa fa-search" onclick="verDocumento(' + data + ')"></i>';
            //        return span;
            //    }
            //},
            {
                'targets': [1],
                visible: false
            },
            {
                'targets': [2]
            }
        ],
        //select: true,
        paging: false,
        bFilter: false,
        "language": {
            //select: {
            //    rows: {
            //        _: '%d filas seleccionadas',
            //        1: '1 fila seleccionada'
            //    }
            //},
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
function eliminarDocumento(id) {
    if (dataTableDocumentos != "") {
        var fileData = new FormData();
        var fila = dataTableDocumentos.rows(function (idx, data, node) { return data[0] === id; }).data();
        var path = fila[0];
        fileData.append('ruta', path[1]);
        fileData.append('nombre', path[2]);
        // Adding one more key to FormData object  
        //fileData.append('username', ‘Manas’);

        $.ajax({
            url: '/RequerimientoContrato/EliminarArchivo',
            type: "POST",
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: fileData,
            success: function (result) {

                if (result == '') {
                    if (dataTableDocumentos != "") {
                        dataTableDocumentos.rows(function (idx, data, node) {
                            return data[0] === id;
                        })
                            .remove()
                            .draw();
                    }

                }
                else
                    mensajeInformativo(result);
            },
            error: function (err) {
                mensajeError(err.statusText);
            }
        }); 
    }
    else
        alert('sin datos en la tabla');
}
function agregarDocumento() {

    var mensaje = "";

    if (document.getElementById('fuDocumento').value == "")
        mensaje = "Debe ingresar un documento";
    else {
        var archivo = document.getElementById('fuDocumento').value;
        var extension = archivo.substring(archivo.lastIndexOf('.'), archivo.length).toUpperCase();
        if (extension != ".PDF" && extension != ".JPG" && extension != ".JPEG" && extension != ".PNG" && extension != ".GIF") {
        //if (extension == ".pdf" || extension == ".jpg" || extension == ".jpge" || extension == ".png" || extension == ".doc" || extension == ".docx") {
            mensaje = "Sólo se permiten formatos imagen, pdf, doc y docx";
        }
    }

    //if (mensaje == "") {
    //    if (dataTableDocumentos != null) {
    //        if (dataTableDocumentos.rows().count() < 5) {
    //            var fileUpload = $("#fuDocumento").get(0);
    //            var files = fileUpload.files;
    //            dataTableDocumentos.row.add([
    //                cantidadAdjunto++,
    //                files[0].name,
    //                files[0].name
    //            ]).draw();
    //            document.getElementById('fuDocumento').value = "";
    //            document.getElementById('mascara').value = "";
    //        }
    //        else
    //            mensajeAlerta("No puede subir más de 5 documentos");
    //    }
    //}
    //else
    //    mensajeAlerta(mensaje);

    if (mensaje == "") {
        if (dataTableDocumentos != null) {
            if (dataTableDocumentos.rows().count() < 7) {
                var fileUpload = $("#fuDocumento").get(0);
                var files = fileUpload.files;

                // Create FormData object  
                var fileData = new FormData();

                // Looping over all files and add it to FormData object  
                for (var i = 0; i < files.length; i++) {
                    fileData.append(files[i].name, files[i]);
                }

                fileData.append('rut', document.getElementById('txtRut').value.replace('-', ''));
                // Adding one more key to FormData object  
                //fileData.append('username', ‘Manas’);

                $.ajax({
                    url: '/RequerimientoContrato/SubirArchivo',
                    type: "POST",
                    contentType: false, // Not to set any content header  
                    processData: false, // Not to process data  
                    data: fileData,
                    success: function (result) {

                        if (result[0] == '') {

                            if (dataTableDocumentos != "") {
                                var listaRutas = result[1];
                                for (var i = 0; i < files.length; i++)
                                {
                                    dataTableDocumentos.row.add([
                                        cantidadAdjunto++,
                                        listaRutas[i],
                                        files[i].name
                                    ]).draw();
                                }
                                document.getElementById('fuDocumento').value = "";
                                document.getElementById('mascara').value = "";
                            }

                            ////esperando();
                            //if (dataTableDocumentos != "") {
                            //    dataTableDocumentos.row.add([
                            //        cantidadAdjunto++,
                            //        result[1],
                            //        files[0].name
                            //    ]).draw();
                            //    document.getElementById('fuDocumento').value = "";
                            //    document.getElementById('mascara').value = "";
                            //}

                        }
                        else
                            mensajeInformativo(result[0]);
                        //mensajeCorrecto(result);
                        //terminoEspera();
                    },
                    error: function (err) {
                        mensajeError(err.statusText);
                        //alert(err.statusText);

                    }
                }); 
            }
            else
                mensajeAlerta("No puede subir más de 7 documentos");
        }
        else
            mensajeAlerta("No puede subir más de 7 documentos");
    }
    else
        mensajeAlerta(mensaje);
    

}
function eventoGuardarDocumentos() {
    if (dataTableDocumentos != null) {
        var listaDocumentos = dataTableDocumentos.rows($('table tr')).data();
        var listaObjetoDocumentos = [];
        var objTmp = [];
        for (var i = 0; i < listaDocumentos.length; i++) {
            //dataTableDocumentos.row(i).data();
            
            var documento = new Object();
            objTmp = listaDocumentos[i];
            documento.ruta = objTmp[1];
            listaObjetoDocumentos.push(documento);
        }
        return listaObjetoDocumentos;
    }
    return null;
}
////GRILLA DOCUMENTOS