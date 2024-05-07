import { obtenerContactosDeLS } from '../utils.js';

export const agregarContactoALS = (contacto) => {
  // 1. Traemos desde LS lo que haya guardado
  const contactos = obtenerContactosDeLS();

  // 2. Agregamos a lo que estaba guardado, lo nuevo
  contactos.push(contacto);

  // 3. Actualizamos los contactos en LS con los valores nuevos
  localStorage.setItem('contactos', JSON.stringify(contactos));
};

/* <tr>
              <td>1</td>
              <td>
                <img
                  class="imagen-tabla"
                  src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT-G05IXgnSS6vTvk99mhXeuKAXBXHAh0O2dKCQWhXOAjNYJoiwTUvMgWmyEnAkcTaYyj99YQ"
                  alt="Imagen mario"
                />
              </td>
              <td>Juan</td>
              <td>12345678</td>
              <td>hola@gmail.com</td>
              <td>Esta es una nota</td>
              <td>
                <button class="btn btn-sm btn-warning">Editar</button>
                <button class="btn btn-sm btn-danger">Eliminar</button>
              </td>
            </tr> */

const cargarFilaTabla = (contacto, indice) => {
  const $tbody = document.getElementById('tbody-contactos');

  const $tr = document.createElement('tr');

  // INDICE
  const $tdIndice = document.createElement('td');
  $tdIndice.textContent = indice;
  $tr.appendChild($tdIndice);

  // IMAGEN
  const $tdImagen = document.createElement('td');
  const $imagen = document.createElement('img');
  $imagen.src = contacto.imagen;
  $imagen.alt = contacto.nombre;
  $imagen.classList.add('imagen-tabla');
  $tdImagen.appendChild($imagen);
  $tr.appendChild($tdImagen);

  // NOMBRE
  const $tdNombre = document.createElement('td');
  $tdNombre.textContent = contacto.nombre;
  $tr.appendChild($tdNombre);

  // NUMERO
  const $tdNumero = document.createElement('td');
  $tdNumero.textContent = contacto.numero;
  $tr.appendChild($tdNumero);

  // EMAIL
  const $tdEmail = document.createElement('td');
  $tdEmail.textContent = contacto.email;
  $tr.appendChild($tdEmail);

  // NOTAS
  const $tdNotas = document.createElement('td');
  $tdNotas.textContent = contacto.notas;
  $tr.appendChild($tdNotas);

  // ACCIONES
  const $tdAcciones = document.createElement('td');
  const $btnEditar = document.createElement('button');
  const $btnEliminar = document.createElement('button');
  $btnEditar.classList.add('btn', 'btn-sm', 'btn-warning', 'me-2');
  $btnEliminar.classList.add('btn', 'btn-sm', 'btn-danger');
  $btnEditar.textContent = 'Editar';
  $btnEliminar.textContent = 'Eliminar';
  $btnEditar.onclick = () => {
    console.log(`Editando contacto ${contacto.nombre}`);
  };
  $btnEliminar.onclick = () => {
    console.log(`Eliminando contacto ${contacto.nombre}`);
  };
  $tdAcciones.appendChild($btnEditar);
  $tdAcciones.appendChild($btnEliminar);
  $tr.appendChild($tdAcciones);

  $tbody.appendChild($tr);
};

export const cargarTabla = () => {
  // 1. Recuperar los contactos
  const contactos = obtenerContactosDeLS();

  // 2. Vaciar la tabla de los datos anteriores
  const $tbody = document.getElementById('tbody-contactos');
  $tbody.innerHTML = '';

  // 3. Crear una fila (tr) por cada contacto
  contactos.forEach((contacto, indice) => {
    // Crear fila para este elemento
    cargarFilaTabla(contacto, indice + 1);
  });
};
