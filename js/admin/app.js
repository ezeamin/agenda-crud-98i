import { añadirContacto } from './abm.js';
import {
  validateEmail,
  validateImage,
  validateName,
  validateNumber,
} from './validators.js';

// -----------------------------------------
// 1. Seleccion de elementos
// -----------------------------------------

const form = document.getElementById('form-contacto');
const campoNombre = document.getElementById('input-nombre');
const campoNumero = document.getElementById('input-telefono');
const campoEmail = document.getElementById('input-email');
const campoImagen = document.getElementById('input-imagen');
const campoNotas = document.getElementById('input-notas');

// -----------------------------------------
// 2. Event listeners
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
// 3. Event listener del form
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

    añadirContacto(nombre, numero, email, imagen, notas);
  }
});
