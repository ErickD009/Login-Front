////esta sirve para que cuando tenga un solo elemento sea un span
//function crearDropDownList(data, id, div) {
//    var construccion = '';

//    var datos = data.length;

//    if (datos > 1) {

//        construccion += '<select id="' + id + '" class="form-control">';

//        for (var d in data) {
//            construccion += '<option value="' + data[d].Key + '">' + data[d].Value + '</option>';
//        }

//        construccion += '</select >';
//    } else {
//        construccion += '<span class="link-black mr-2">' + data[0].Value + '</span>';
//        construccion += '<input id="' + id + '" type="hidden" value="' + data[0].Key + '">';
//    }

//    document.getElementById(div).innerHTML = construccion;

//}



function validarObligatorio(ddl) {
    var control = ddl;
    if (seValidoAnteriormente == true && (ddl.value == "-1" || ddl.value == "" || ddl.value == "-") ) {
        //if (control.classList.contains('is-invalid'))
        //    control.classList.remove('is-invalid');
        //else
        //    control.className = 'form-control is-invalid';
        if (!control.classList.contains('is-invalid') && control.disabled == false)
            control.className = 'form-control is-invalid';
    }
    else {
        if (control.classList.contains('is-invalid'))
            control.classList.remove('is-invalid');
    }
} 

function crearDropDownList(data, id, div, obligatorio = false) {
    var construccion = '';

    var datos = data.length;

    if (datos > 1) {
        //if (obligatorio == true && seValidoAnteriormente == true)
        if (obligatorio == true)
            construccion += '<select id="' + id + '" name="' + id + '" class="form-control" onchange="validarObligatorio(' + id + ');">';
        else
            construccion += '<select id="' + id + '" name="' + id + '" class="form-control">';


        for (var d in data) {
            construccion += '<option value="' + data[d].Key + '">' + data[d].Value + '</option>';
        }

        construccion += '</select>';
    } else {
        construccion += '<select id="' + id + '" name="' + id + '" class="form-control">';
        construccion += '<option value="' + data[0].Key + '">' + data[0].Value + '</option>';
        construccion += '</select>';
    }

    document.getElementById(div).innerHTML = construccion;

    
}
function crearDropDownListSPL(data, id, div, obligatorio = false) {
    var construccion = '';

    var datos = data.length;

    if (datos > 1) {
        //if (obligatorio == true && seValidoAnteriormente == true)
        if (obligatorio == true)
            construccion += '<select id="' + id+ '" name="' + id + '" class="form-control" onchange="validarObligatorio(' + id + ');">';
        else
            construccion += '<select id="' + id + '" name="' + id + '" class="form-control">';


        for (var d in data) {
            construccion += '<option value="' + data[d].Key.substring(0, 2) + '">' + data[d].Value + '</option>';
        }

        construccion += '</select>';
    } else {
        construccion += '<select id="' + id + '" name="' + id + '" class="form-control">';
        construccion += '<option value="' + data[0].Key.substring(0, 2) + '">' + data[0].Value + '</option>';
        construccion += '</select>';
    }

    document.getElementById(div).innerHTML = construccion;


}
function crearDropDownListEventoSPL(data, id, div, funcion, obligatorio = false) {
    var construccion = '';

    var datos = data.length;

    if (datos > 1) {

        //if (obligatorio == true && seValidoAnteriormente == true)
        if (obligatorio == true)
            construccion += '<select id="' + id + '" name="' + id + '" class="form-control is-invalid" onchange="validarObligatorio(' + id + ');' + funcion + ';">';
        else
            construccion += '<select id="' + id + '" name="' + id + '" class="form-control" onchange="' + funcion + ';">';

        for (var d in data) {
            construccion += '<option value="' + data[d].Key.substring(0, 2) + '">' + data[d].Value + '</option>';
        }

        construccion += '</select>';
    } else {
        construccion += '<select id="' + id + '" name="' + id + '" class="form-control">';
        construccion += '<option value="' + data[d].Key.substring(0, 2) + '">' + data[0].Value + '</option>';
        construccion += '</select>';
    }

    document.getElementById(div).innerHTML = construccion;

}
function crearDropDownListEvento(data, id, div, funcion, obligatorio = false) {
    var construccion = '';

    var datos = data.length;

    if (datos > 1) {

        //if (obligatorio == true && seValidoAnteriormente == true)
        if (obligatorio == true)
            construccion += '<select id="' + id + '" name="' + id + '" class="form-control is-invalid" onchange="validarObligatorio(' + id + ');' + funcion + ';">';
        else
            construccion += '<select id="' + id + '" name="' + id + '" class="form-control" onchange="' + funcion + ';">';

        for (var d in data) {
            construccion += '<option value="' + data[d].Key + '">' + data[d].Value + '</option>';
        }

        construccion += '</select>';
    } else {
        construccion += '<select id="' + id + '" name="' + id + '" class="form-control">';
        construccion += '<option value="' + data[0].Key + '">' + data[0].Value + '</option>';
        construccion += '</select>';
    }

    document.getElementById(div).innerHTML = construccion;
   
}

function crearDropDownListMultiple(data, id, div) {
    var construccion = '';

    var datos = data.length;

    if (datos > 1) {

        //construccion += '<select id="' + id + '" name="' + id + '" multiple="multiple">';
        construccion += '<select id="' + id + '" name="' + id + '" multiple="multiple" data-placeholder="-- SELECCIONE --">';
        //construccion += '<option value="-1">-- SELECCIONE --</option>';
        for (var d in data) {
            if (d != 0)
                construccion += '<option value="' + data[d].Key + '">' + data[d].Value + '</option>';
        }

        construccion += '</select>';
    }

    $("#ddlTipoPerfil").html(construccion);
    $("#ddlTipoPerfil").multiselect("rebuild");
}

function crearDropDownListVacio(id, div, obligatorio = false) {
    var construccion = '';
    if (obligatorio == true && seValidoAnteriormente == true)
        construccion += '<select id="' + id + '" name="' + id + '" class="form-control is-invalid">';
    else
        construccion += '<select id="' + id + '" name="' + id + '" class="form-control">';
    construccion += '<option value="-1">-- SELECCIONE --</option>';
    construccion += '</select>';
    document.getElementById(div).innerHTML = construccion;
}