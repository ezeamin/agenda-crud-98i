import { añadirContacto, editarContacto } from './abm.js';
import { cargarTabla, estaEditando } from './adminUtils.js';
import {
  validateEmail,
  validateImage,
  validateName,
  validateNumber,
} from './validators.js';

// -----------------------------------------
// 1. Proteger ruta
// -----------------------------------------

const estaLogueado = JSON.parse(sessionStorage.getItem('estaLogueado'));
if (!estaLogueado) {
  // No deberia poder ver la página
  window.location.href = './login.html';
}

// -----------------------------------------
// 2. Cargar datos en tabla
// -----------------------------------------

cargarTabla();

// -----------------------------------------
// 3. Seleccion de elementos
// -----------------------------------------

const form = document.getElementById('form-contacto');
const campoNombre = document.getElementById('input-nombre');
const campoNumero = document.getElementById('input-numero');
const campoEmail = document.getElementById('input-email');
const campoImagen = document.getElementById('input-imagen');
const campoNotas = document.getElementById('input-notas');

// -----------------------------------------
// 4. Event listeners
// -----------------------------------------

campoNombre.addEventListener('blur', (e) => {
  const value = e.target.value;

  validateName(value, campoNombre);
});

campoNumero.addEventListener('blur', (e) => {
  const value = e.target.value;

  validateNumber(value, campoNumero);
});

campoEmail.addEventListener('blur', (e) => {
  const value = e.target.value;

  validateEmail(value, campoEmail);
});

campoImagen.addEventListener('blur', (e) => {
  const value = e.target.value;

  validateImage(value, campoImagen);
});

// -----------------------------------------
// 5. Event listener del form
// -----------------------------------------

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Extraemos los valores
  const nombre = campoNombre.value;
  const numero = campoNumero.value;
  const email = campoEmail.value;
  const imagen = campoImagen.value;
  const notas = campoNotas.value;

  // Repetimos validacion por si no se produjo el blur
  if (
    validateName(nombre, campoNombre) &&
    validateNumber(numero, campoNumero) &&
    validateEmail(email, campoEmail) &&
    validateImage(imagen, campoImagen)
  ) {
    // Entra SOLAMENTE si TODAS son validas

    if (estaEditando()) {
      editarContacto(nombre, numero, email, imagen, notas);
    } else {
      añadirContacto(nombre, numero, email, imagen, notas);
    }

    // Recargar tabla
    cargarTabla();

    // Vaciar campos
    form.reset();

    // Resetear clases
    campoNombre.classList.remove('is-valid', 'is-invalid');
    campoNumero.classList.remove('is-valid', 'is-invalid');
    campoEmail.classList.remove('is-valid', 'is-invalid');
    campoImagen.classList.remove('is-valid', 'is-invalid');
  }
});
