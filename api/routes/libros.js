const { Router } = require('express')

const rutaLibros = Router()

const {
  getBooks,
  getBook,
  postBook,
  putBook,
  deleteBook
} = require('../controllers/libros')

// Rutas
rutaLibros.get('/', getBooks)
rutaLibros.get('/:id', getBook)
rutaLibros.post('/', postBook)
rutaLibros.put('/:id', putBook)
rutaLibros.delete('/:id', deleteBook);

module.exports = {
  rutaLibros
}
