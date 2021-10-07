const {DBdomicilios, DBrepartidores} = require('../db')

const geosys = (req, res) => {
    try {
        let nombre = 'Juan Sebastian Gomez'
        
        return res.render('geosys', {nombre, DBdomicilios, DBrepartidores})
    } catch (error) {
        console.log(error)
    }
}

const listadomicilios = async(req, res) => {
    try {
        
        return await res.send(DBdomicilios)       
    } catch (error) {
        console.error(error)
    }
}

const creardomicilio = async(req, res) => {
    try {
        DBdomicilios.push(req.body)
        return req.body
    } catch (error) {
        console.error(error)
    }
}

const obtenerDomiRepartidor = async(req, res) => {
    try {
        let idRepartidor = req.params.idRpd
        let data = []
        for (let i = 0; i < DBdomicilios.length; i++) {
            if(DBdomicilios[i].idRepartidor == idRepartidor){
                data.push(DBdomicilios[i].idCliente)
            }
            
        }

        return res.json({"count": data.length})

    } catch (error) {
        console.error(error)
    }
}

const obtenerRepartidores = async(req, res) => {
    try {
        return res.send(DBrepartidores)
    } catch (error) {
        console.error(error)
    }
}

const crearRepartidor = async(req, res) => {
    try {
        DBrepartidores.push(req.body)
        return res.send(req.body)
    } catch (error) {
        console.log(error)
    }
}

module.exports ={geosys,crearRepartidor, listadomicilios, creardomicilio,obtenerDomiRepartidor, obtenerRepartidores}