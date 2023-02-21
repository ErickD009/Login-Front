function calendarioRango(nombre) {
    $('#' + nombre).daterangepicker({
        "singleDatePicker": "true",
        "locale": {
            "format": "DD/MM/YYYY",
            "separator": " - ",
            "applyLabel": "Aceptar",
            "cancelLabel": "Cancelar",
            "fromLabel": "Desde",
            "toLabel": "Hasta",
            "customRangeLabel": "Custom",
            "weekLabel": "W",
            "daysOfWeek": [
                "Do",
                "Lu",
                "Ma",
                "Mi",
                "Ju",
                "Vi",
                "Sa"
            ],
            "monthNames": [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre"
            ],
            "firstDay": 1
        },
        "startDate": "25/06/2020",
        "endDate": "26/06/2020"
    }, function (start, end, label) {
        console.log('Rango seleccionado, desde : ' + start.format('DD-MM-YYYY') + ' a ' + end.format('DD-MM-YYYY') + ' (predefined range: ' + label + ')');
    });
}

function calIndividual(nombre) {
    $('#' + nombre).daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 1933,
        maxYear: parseInt(moment().format('YYYY'), 10),
        locale: {
            "cancelLabel": "Clear",
            "format": "DD/MM/YYYY",
            "separator": " - ",
            "applyLabel": "Aceptar",
            "cancelLabel": "Cancelar",
            "fromLabel": "Desde",
            "toLabel": "Hasta",
            "customRangeLabel": "Custom",
            "weekLabel": "W",
            "daysOfWeek": [
                "Do",
                "Lu",
                "Ma",
                "Mi",
                "Ju",
                "Vi",
                "Sa"
            ],
            "monthNames": [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre"
            ],
            "firstDay": 1
        }
    });
}

function calIndividualBlanco(nombre) {
    $('#' + nombre).on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('DD/MM/YYYY'));
    });

    $('#' + nombre).on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });
    $('#' + nombre).daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: parseInt(moment().subtract(10, 'years').format('YYYY'), 10),
        maxYear: parseInt(moment().add(10, 'years').format('YYYY'), 10),
        autoUpdateInput: false,
        locale: {
            "cancelLabel": "Clear",
            "format": "DD/MM/YYYY",
            "separator": " - ",
            "applyLabel": "Aceptar",
            "cancelLabel": "Cancelar",
            "fromLabel": "Desde",
            "toLabel": "Hasta",
            "customRangeLabel": "Custom",
            "weekLabel": "W",
            "daysOfWeek": [
                "Do",
                "Lu",
                "Ma",
                "Mi",
                "Ju",
                "Vi",
                "Sa"
            ],
            "monthNames": [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre"
            ],
            "firstDay": 1
        }
    });
    
}
