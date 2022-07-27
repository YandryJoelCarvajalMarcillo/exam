import react from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

import './Form.css'

export const Crud = () => {
  const url = 'http://localhost:8000/libros'

  const [libros, setLibros] = useState([])

  const [sdnLibro, setSdnLibro] = useState('')
  const [nombreLibro, setNombreLibro] = useState('')
  const [autorLibro, setAutorLibro] = useState('')
  const [categoriaLibro, setCategoriaLibro] = useState('')
  const [nPaginasLibro, setNPaginasLibro] = useState('')

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        const librosConsultados = response.data.books
        setLibros(librosConsultados)
      })
  }, [])
  
  const crearLibro = () => {
    axios
      .post(url, {
        id: sdnLibro,
        nombre: nombreLibro,
        autor: autorLibro,
        categoria: categoriaLibro,
        nPaginas: nPaginasLibro
      })
      .then((response) => {
        const libro = response.data.book
        setLibros([...libros, libro])
      })
  }
  const actualizarLibro = () => {
    axios
    .put(`${url}/${sdnLibro}`, {
      id: sdnLibro,
      nombre: nombreLibro,
      autor: autorLibro,
      categoria: categoriaLibro,
      nPaginas: nPaginasLibro
    })
    .then((response) => {
      const libro = response.data.book
      const nuevosLibros = libros.filter(librox => librox.id != sdnLibro)
      nuevosLibros.push(libro)
      setLibros(nuevosLibros)
    })
  }
  const eliminarLibro = () => {
    axios
    .put(`${url}/${sdnLibro}`)
    .then((response) => {
      const nuevosLibros = libros.filter(librox => librox.id != sdnLibro)
      setLibros(nuevosLibros)
    })
  }

  return (
    <>
      <form>
        <div>
          <label htmlFor="sdn">SDN</label>
          <input type="text" id="sdn" onChange={({target}) => setSdnLibro(target.value)}/>
        </div>
        <div>
          <label htmlFor="nombre">Nombre</label>
          <input type="text" id="nombre" onChange={({target}) => setNombreLibro(target.value)}/>
        </div>
        <div>
          <label htmlFor="autor">Autor</label>
          <input type="text" id="autor" onChange={({target}) => setAutorLibro(target.value)}/>
        </div>
        <div>
          <label htmlFor="categoria">Categoría</label>
          <input type="text" id="categoria" onChange={({target}) => setCategoriaLibro(target.value)}/>
        </div>
        <div>
          <label htmlFor="nPaginas">Número de Páginas</label>
          <input type="text" id="nPaginas" onChange={({target}) => setNPaginasLibro(target.value)}/>
        </div>
        <div>
          <input
            type="button"
            id="btn__crear_libro"
            value="Crear Libro"
            onClick={crearLibro}
          />
          <input
            type="button"
            id="btn__editar_libro"
            value="Editar Libro"
            onClick={actualizarLibro}
          />
          <input
            type="button"
            id="btn__eliminar_libro"
            value="Eliminar Libro"
            onClick={eliminarLibro}
          />
        </div>
      </form>
      <table>
        <thead>
          <tr>
            <th>SND</th>
            <th>Nombre</th>
            <th>Autor</th>
            <th>Categoría</th>
            <th># de páginas</th>
          </tr>
        </thead>
        <tbody>
          {
            libros.map((librox, index) => {
              return (
                <tr>
                  <td>{librox.id}</td>
                  <td>{librox.nombre}</td>
                  <td>{librox.autor}</td>
                  <td>{librox.categoria}</td>
                  <td>{librox.nPaginas}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}
