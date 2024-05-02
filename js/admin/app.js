import { agregarContacto } from './abm.js';
import {
  validateEmail,
  validateName,
  validateNumber,
  validateUrl,
} from './validators.js';

// ---------------------------------
// 1. Seleccionar elementos
// ---------------------------------

const $form = document.getElementById('form-contacto');
const $inputNombre = document.getElementById('input-nombre');
const $inputNumero = document.getElementById('input-numero');
const $inputEmail = document.getElementById('input-email');
const $inputImagen = document.getElementById('input-imagen');
const $inputNotas = document.getElementById('input-notas');

// ---------------------------------
// 2. Event listener del submit
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
});
