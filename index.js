const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const rutas = require('./routes/GeosysRoute')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.static(__dirname +'/public'))
app.set('view engine', 'ejs')
app.set('views', __dirname+'/views')

app.use(rutas)

app.listen(4000, () => {
    console.log('Server On')
})