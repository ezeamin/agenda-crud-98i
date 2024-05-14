import { obtenerContactosDeLS } from '../utils.js';

// ----------------------------------
// 1. Seleccion de elementos
// ----------------------------------

const $select = document.getElementById('select-contactos');
const $sectionContactos = document.getElementById('section-contactos');
const contactos = obtenerContactosDeLS();

// ----------------------------------
// 2. Carga en el select
// ----------------------------------

contactos.forEach((contacto) => {
  const $option = document.createElement('option');
  $option.value = contacto.codigo;
  $option.innerText = contacto.nombre;
  $select.appendChild($option);
});

// ----------------------------------
// 3. Carga en el body
// ----------------------------------

contactos.forEach((contacto) => {
  const $article = document.createElement('article');
  $article.innerText = contacto.nombre;
  $sectionContactos.appendChild($article);
});

// ----------------------------------
// 4. Lógica de búsqueda
// ----------------------------------

const $formBusqueda = document.getElementById('form-index-contactos');
const $inputBusqueda = document.getElementById('input-busqueda-contactos');
const $textoBusqueda = document.getElementById('texto-busqueda-contactos');
const $spanBusqueda = document.getElementById('busqueda-contactos');

$formBusqueda.addEventListener('submit', (e) => {
  e.preventDefault();

  $sectionContactos.innerHTML = '';

  const busqueda = $inputBusqueda.value.trim();

  const contactosFiltrados = contactos.filter((contacto) => {
    return contacto.nombre.toLowerCase().includes(busqueda.toLowerCase());
  });

  contactosFiltrados.forEach((contacto) => {
    const $article = document.createElement('article');
    $article.innerText = contacto.nombre;
    $sectionContactos.appendChild($article);
  });

  if (busqueda) $textoBusqueda.classList.remove('d-none');
  else $textoBusqueda.classList.add('d-none');

  $spanBusqueda.innerText = busqueda;
});
