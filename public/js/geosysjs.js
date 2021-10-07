const iden = document.getElementById('identificacion')
const nom = document.getElementById('nombre')
const telefono = document.getElementById('telefono')
const repartidor = document.getElementById('repartidor')
const barrio = document.getElementById('barrio')
const transporte = document.getElementById('transporte')
const direccion = document.getElementById('direccion')

const limpiar = document.getElementById('limpiar')
const crearDomi = document.getElementById('crearDomi')

const idenR = document.getElementById('iden')
const nomR = document.getElementById('nom')

const crearRepartidor = document.getElementById('ingR')

const tipoGrafico = document.getElementById('tipoGrafico')
const pintarG = document.getElementById('pintarGrafico')
const limpiarG = document.getElementById('limpiarG')

let render


limpiar.addEventListener('click', () => {
    iden.value = 0
    nom.value = ""
    cod.value = ""
    fechaI = ""
    fehcaF = ""
})

crearDomi.addEventListener('click', async() => {
    let datos = {
        idCliente: iden.value,
        nombreCliente: nom.value,
        telefono: telefono.value,
        idRepartidor: repartidor.value,
        barrio: barrio.value,
        vehiculo: transporte.value,
        direccion: direccion.value
    }
    const res = await fetch('/crearDomi', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(datos)
    })
    const resJson = await res.json()
    console.log(resJson)
    console.log(datos)
    alert(`usuario ${resJson.nombreCliente} Ingresado santisfactoriamente`)
})

crearRepartidor.addEventListener('click', async() => {
    let datos = {
        identificacion: idenR.value,
        nombre: nomR.value
    }

    const res = await fetch('/crearRepartidor', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(datos)
    })
    const resJson = await res.json()
    alert('ingresado OK')
})

pintarG.addEventListener('click', async () => {
    render = await renderCharRepartidores("repartidor", tipoGrafico.value)
})

limpiarG.addEventListener('click', async () => {
    if (render) {
        render.destroy()
    }
})

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

async function renderCharRepartidores(tipoLabels, tipoGrafica) {

    let dataRender

    if (tipoLabels == 'repartidor') {
        const labelsR = []
        const labelsN = []
        let dataNomR = []
        let data = []

        const res = await fetch('/repartidores', {
            method: 'GET'
        })
        const resJson = await res.json()
        dataNomR = await resJson

        for (let i = 0; i < dataNomR.length; i++) {
            labelsR.push(dataNomR[i].identificacion)
            labelsN.push(dataNomR[i].nombre)
        }

        for (let d = 0; d < labelsR.length; d++) {
            const dataRpd = await fetch(`/domiRepartidor/${labelsR[d]}`)
            const resRjson = await dataRpd.json()
            let dt = await resRjson
            data.push(dt.count)
        }

        dataRender = {
            labels: labelsN,
            datasets: [{
                label: 'CANTIDAD DE DOMICILIOS',
                backgroundColor: 'rgb(255, 35, 47)',
                borderColor: 'rgb(0, 0, 0)',
                data: data,
            }]
        };
    }



    const configR = {
        type: tipoGrafica || 'line',
        data: dataRender,
        options: {}
    };
    let myChart = new Chart(
        document.getElementById('graficas'),
        configR
    );

    return myChart
}

