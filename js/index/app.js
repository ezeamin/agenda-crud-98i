import { obtenerContactosDeLS } from '../utils.js';

const $select = document.getElementById('select-contactos');
const contactos = obtenerContactosDeLS();

contactos.forEach((contacto) => {
  const $option = document.createElement('option');
  $option.value = contacto.codigo;
  $option.innerText = contacto.nombre;
  $select.appendChild($option);
});
