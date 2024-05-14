import { estaLogueado } from '../utils.js';
import { validateEmail, validatePassword } from '../validators.js';
import { Usuario } from './Contacto.js';

// ----------------------------------
// 1. Protección de ruta
// ----------------------------------

if (estaLogueado()) {
  window.location.replace('/pages/admin.html');
}

// ----------------------------------
// 2. Crear un usuario por defecto
// ----------------------------------

const usuarioPorDefecto = new Usuario('admin@admin.com', 'admin');

// ----------------------------------
// 3. Seleccion de elementos
// ----------------------------------

const $inputEmail = document.getElementById('input-usuario');
const $inputContraseña = document.getElementById('input-contraseña');
const $form = document.getElementById('form-login');
const $alertCredenciales = document.getElementById('alert-login');

// ----------------------------------
// 4. Event listener del submit
// ----------------------------------

$form.addEventListener('submit', (e) => {
  e.preventDefault();

  // 1. Validar los campos
  if (validateEmail($inputEmail, false) && validatePassword($inputContraseña)) {
    // Campos válidos, falta verificar las credenciales

    // a. Traemos los valores
    const email = $inputEmail.value;
    const contraseña = $inputContraseña.value;

    // b. Validacion de credenciales
    if (usuarioPorDefecto.validarCredenciales(email, contraseña)) {
      // i. Ocultar el alert
      $alertCredenciales.classList.add('d-none');

      // ii. Guardar la sesión
      sessionStorage.setItem('estaLogueado', true);
      sessionStorage.setItem(
        'usuario',
        JSON.stringify({
          email: usuarioPorDefecto.email,
          id: usuarioPorDefecto.id,
        })
      );

      // iii. Notificar al usuario del éxito
      swal
        .fire({
          title: 'Bienvenido',
          timer: 1500,
          showCancelButton: false,
          showConfirmButton: false,
          timerProgressBar: true,
        })
        .then(() => {
          // iv. Redirigir al usuario a la página de admin
          window.location.assign('/pages/admin.html');

          // v.
          // Listo :3
        });
    } else {
      // Credenciales incorrectas
      $alertCredenciales.classList.remove('d-none');
    }
  }
});
