function traeLegajo() {

    var url = generico() + 'Usuario/legajosXRut/';
    var origin = origen();

    var rut = document.getElementById('rut').value;
    var token = document.getElementById('token').value;

    const valores = new FormData();
    valores.append('rut', rut);
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
            }
        },
        (error) => {
            console.log(error);
        }
    )
}