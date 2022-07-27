const express = require('express')
const cors = require('cors')

const app = express()
const port = 8000

const { rutaLibros } = require('./routes/libros')

app.use(cors())
app.use(express.json())

app.use('/libros', rutaLibros)

app.listen(port, () => {
  console.log(`Servicio corriendo en el : ${port}`)
})
