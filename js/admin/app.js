import { agregarContacto } from './abm.js';
import { cargarTabla } from './utils.js';
import {
  validateEmail,
  validateName,
  validateNumber,
  validateUrl,
} from './validators.js';

// ---------------------------------
// 1. Cargar tabla
// ---------------------------------

cargarTabla();

// ---------------------------------
// 2. Seleccionar elementos
// ---------------------------------

const $form = document.getElementById('form-contacto');
const $inputNombre = document.getElementById('input-nombre');
const $inputNumero = document.getElementById('input-numero');
const $inputEmail = document.getElementById('input-email');
const $inputImagen = document.getElementById('input-imagen');
const $inputNotas = document.getElementById('input-notas');

// ---------------------------------
// 3. Event listeners del blur
// ---------------------------------

$inputNombre.addEventListener('blur', () => {
  validateName($inputNombre);
});
$inputNumero.addEventListener('blur', () => {
  validateNumber($inputNumero);
});
$inputEmail.addEventListener('blur', () => {
  validateEmail($inputEmail);
});
$inputImagen.addEventListener('blur', () => {
  validateUrl($inputImagen);
});

// ---------------------------------
// 4. Event listener del submit
// ---------------------------------

$form.addEventListener('submit', (event) => {
  event.preventDefault();

  // A. Validar los campos

  if (
    !validateName($inputNombre) ||
    !validateNumber($inputNumero) ||
    !validateEmail($inputEmail) ||
    !validateUrl($inputImagen)
  ) {
    alert('Revisá los campos');
    return;
  }

  // B. Todo OK, conseguir valores

  const nombre = $inputNombre.value;
  const numero = $inputNumero.value;
  const email = $inputEmail.value;
  const imagen = $inputImagen.value;
  const notas = $inputNotas.value;

  agregarContacto(nombre, numero, email, imagen, notas);

  // C. Resetear formulario

  $form.reset();
  $inputNombre.classList.remove('is-valid', 'is-invalid');
  $inputNumero.classList.remove('is-valid', 'is-invalid');
  $inputEmail.classList.remove('is-valid', 'is-invalid');
  $inputImagen.classList.remove('is-valid', 'is-invalid');

  // D. Actualizar tabla
  
  cargarTabla();

  // E. Notificar al usuario

  alert(`Contacto creado bajo el nombre de ${nombre}`);
});
