import { agregarContacto, editarContacto } from './abm.js';
import { cargarTabla, estaEditando } from './utils.js';
import {
  validateEmail,
  validateName,
  validateNumber,
  validateUrl,
} from '../validators.js';
import { estaLogueado } from '../utils.js';

// ----------------------------------
// 1. Protección de ruta
// ----------------------------------

if (!estaLogueado()) {
  window.location.replace('/pages/login.html');
}

// ---------------------------------
// 2. Cargar tabla
// ---------------------------------

cargarTabla();

// ---------------------------------
// 3. Seleccionar elementos
// ---------------------------------

const $form = document.getElementById('form-contacto');
const $inputNombre = document.getElementById('input-nombre');
const $inputNumero = document.getElementById('input-numero');
const $inputEmail = document.getElementById('input-email');
const $inputImagen = document.getElementById('input-imagen');
const $inputNotas = document.getElementById('input-notas');

// ---------------------------------
// 4. Event listeners del blur
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
// 5. Event listener del submit
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

  if (estaEditando()) {
    editarContacto(nombre, numero, email, imagen, notas);
  } else {
    agregarContacto(nombre, numero, email, imagen, notas);
  }

  // C. Resetear formulario

  $form.reset();
  $inputNombre.classList.remove('is-valid', 'is-invalid');
  $inputNumero.classList.remove('is-valid', 'is-invalid');
  $inputEmail.classList.remove('is-valid', 'is-invalid');
  $inputImagen.classList.remove('is-valid', 'is-invalid');

  // D. Actualizar tabla

  cargarTabla();

  // E. Notificar al usuario

  let mensaje = `Contacto creado bajo el nombre de ${nombre}`;
  if (estaEditando()) mensaje = 'Contacto editado exitosamente';

  swal.fire({
    title: 'Exito',
    text: mensaje,
    icon: 'success',
    showConfirmButton: true,
    showCancelButton: false,
    confirmButtonText: 'Tremen2',
  });
});
