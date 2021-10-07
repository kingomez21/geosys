const {Router} =require('express')
const {geosys, creardomicilio, obtenerDomiRepartidor, obtenerRepartidores, listadomicilios, crearRepartidor} = require('../controllers/GeosysController')

const rows = Router()

rows.get('/geosys', geosys)
    .post('/crearDomi', creardomicilio)
    .post('/crearRepartidor', crearRepartidor)
    .get('/domiRepartidor/:idRpd', obtenerDomiRepartidor)
    .get('/repartidores', obtenerRepartidores)
    .get('/listaDomi', listadomicilios)

module.exports = rows