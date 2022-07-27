// Array de libros -> Base de datos
let { libros } = require('../data/libros')

// Obtener todos los libros
const getBooks = (req, res) => {
  res.status(200).send({books: libros})
}

// Obtener un libro por su id
const getBook = (req, res) => {
  const { id } = req.params
  // Buscar el libro con su id
  const libro = libros.find(librox => librox.id == id)
  // Comprobar si el libro existe
  if(!libro) { // Si no existe el libro
    res.status(400).send({error: 'Libro no encontrado'})
  } else { // Si existe el libro
    res.status(200).send({book: libro})
  }
}

// Insertar un libro en el array
const postBook = (req, res) => {
  const { body } = req
  // Obtener la longitud del objeto pasado por el usuario
  const longitudLibro = Object.entries(body).length
  if (longitudLibro === 0) { // Si el objeto no tiene propiedades
    res.status(400).send({error: 'Libro sin datos'})
  } else { // Si el objeto tiene propiedades
    // Insertar el libro en el array de libros
    libros.push(body)
    // Enviar la respuesta al usuario
    res.status(200).send({
      message: 'Libro insertado',
      book: body
    })
  }
}

// Actualizar un libro por su id
const putBook = (req, res) => {
  const { id } = req.params
  const { body } = req
  // Obtener el indice del libro con el id pasado
  const indexLibro = libros.findIndex(librox => librox.id == id)
  if(indexLibro === -1) { // Si el indice no se encuentra
    res.status(400).send({error: 'Id no encontrado'})
  } else { // Si el indice fue encontrado
    // Modificar el libro
    libros[indexLibro] = body
    // Enviar la respuesta al usuario
    res.status(200).send({
      message: 'Libro actualizado',
      book: body
    })
  }
}

// Eliminar un libro por su id
const deleteBook = (req, res) => {
  const { id } = req.params
  // Obtener el indice del libro con el id pasado
  const indexLibro = libros.findIndex(librox => librox.id == id)
  // Buscar el libro con su id
  const libro = libros.find(librox => librox.id == id)
  if(indexLibro === -1) { // Si el indice no se encuentra
    res.status(400).send({error: 'Id no encontrado'})
  } else { // Si el indice fue encontrado
    // Obtener los libros que su id sean diferente al id pasado por el usuario
    libros = libros.filter(librox => librox.id != id)
    // Enviar la respuesta al usuario
    res.status(200).send({
      message: 'Libro eliminado',
      book: libro
    })
  }
}

// Módulos a exportar
module.exports = {
  getBooks,
  getBook,
  postBook,
  putBook,
  deleteBook
}
