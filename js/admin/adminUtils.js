import { obtenerContactosDeLS, ordenarLista } from '../utils.js';
import { eliminarContacto } from './abm.js';

export const agregarContactoALS = (nuevoContacto) => {
  const contactos = obtenerContactosDeLS();

  contactos.push(nuevoContacto);

  // guardar el contacto
  localStorage.setItem('contactos', JSON.stringify(contactos));
};

export const crearFilaTabla = (contacto, indice) => {
  const tbody = document.getElementById('tbody-contactos');

  const tr = document.createElement('tr');

  // INDICE

  const tdIndice = document.createElement('td');
  tdIndice.innerText = indice;
  tr.appendChild(tdIndice);

  // IMAGEN

  const tdImagen = document.createElement('td');
  const img = document.createElement('img');

  img.src = contacto.imagen;
  img.alt = contacto.nombre;
  img.classList.add('imagen-tabla');

  tdImagen.appendChild(img);
  tr.appendChild(tdImagen);

  // NOMBRE

  const tdNombre = document.createElement('td');
  tdNombre.innerText = contacto.nombre;
  tr.appendChild(tdNombre);

  // NUMERO

  const tdNumero = document.createElement('td');
  tdNumero.innerText = contacto.numero;
  tr.appendChild(tdNumero);

  // EMAIL

  const tdEmail = document.createElement('td');
  tdEmail.innerText = contacto.email;
  tr.appendChild(tdEmail);

  // NOTAS

  const tdNotas = document.createElement('td');
  tdNotas.innerText = contacto.notas;
  tr.appendChild(tdNotas);

  // BOTONES

  const tdBotones = document.createElement('td');

  const btnEditar = document.createElement('button');
  const btnEliminar = document.createElement('button');

  btnEditar.type = 'button';
  btnEliminar.type = 'button';
  btnEditar.classList.add('btn', 'btn-warning', 'btn-sm', 'me-2');
  btnEliminar.classList.add('btn', 'btn-danger', 'btn-sm');
  btnEditar.innerText = 'Editar';
  btnEliminar.innerText = 'Eliminar';

  btnEditar.onclick = () => {
    prepararEdicionContacto(contacto.codigo);
  };

  btnEliminar.onclick = () => {
    eliminarContacto(contacto.codigo);
  };

  tdBotones.appendChild(btnEditar);
  tdBotones.appendChild(btnEliminar);

  tr.appendChild(tdBotones);

  // Añadir todo al tbody

  tbody.appendChild(tr);
};

export const cargarTabla = () => {
  const contactos = ordenarLista(obtenerContactosDeLS());

  // Vaciar tabla
  const tbody = document.getElementById('tbody-contactos');
  tbody.innerHTML = '';

  // Cargar tabla
  contactos.forEach((contacto, indice) => {
    crearFilaTabla(contacto, indice + 1);
  });
};

const prepararEdicionContacto = (codigo) => {
  // 1. Traer lista
  const contactos = obtenerContactosDeLS();

  // 2. Buscar el contacto a editar
  // const contactoSeleccionado = contactos.find(item => {
  //   return item.codigo === codigo;
  // });
  const contactoSeleccionado = contactos.find((item) => item.codigo === codigo);

  // 3. Seleccionar los elementos (campos)
  const campoNombre = document.getElementById('input-nombre');
  const campoNumero = document.getElementById('input-numero');
  const campoEmail = document.getElementById('input-email');
  const campoImagen = document.getElementById('input-imagen');
  const campoNotas = document.getElementById('input-notas');

  // 4. Cargar los datos en el formulario
  campoNombre.value = contactoSeleccionado.nombre;
  campoNumero.value = contactoSeleccionado.numero;
  campoEmail.value = contactoSeleccionado.email;
  campoImagen.value = contactoSeleccionado.imagen;
  campoNotas.value = contactoSeleccionado.notas;

  // 5. Guardar codigo
  sessionStorage.setItem('codigoContacto', codigo);
};

export const estaEditando = () => {
  const codigo = sessionStorage.getItem('codigoContacto');

  if (codigo === null) {
    return false;
  } else {
    return true;
  }

  // return !!codigo;
};
