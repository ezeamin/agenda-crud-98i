import { User, UserWithoutPassword } from './User.js';
import { validatePassword, validateUsername } from './validators.js';

// -----------------------------------------
// 1. Crear usuario por defecto
// -----------------------------------------

const usuarioAdmin = new User('admin', 'admin', 'admin@gmail.com');

// -----------------------------------------
// 2. Seleccionar elementos del DOM
// -----------------------------------------

const formLogin = document.getElementById('form-login');
const campoUsuario = document.getElementById('input-usuario');
const campoContraseña = document.getElementById('input-contraseña');
const alertCredenciales = document.getElementById('alert-login');

// -----------------------------------------
// 3. Manejar el submit
// -----------------------------------------

formLogin.addEventListener('submit', (e) => {
  // A. Prevenimos comportamiento por defecto
  e.preventDefault();

  // B. Leer valores de los campos
  const usuario = campoUsuario.value;
  const contraseña = campoContraseña.value;

  // C. Validar los campos (solo el contenido)
  if (
    validateUsername(usuario, campoUsuario) &&
    validatePassword(contraseña, campoContraseña)
  ) {
    // los campos estan OK pero no sabemos aun si son las credenciales

    // i. Resetear las clases
    campoUsuario.classList.remove('is-invalid');
    campoContraseña.classList.remove('is-invalid');

    // ii. Validamos credenciales
    if (
      usuario === usuarioAdmin.usuario &&
      contraseña === usuarioAdmin.contraseña
    ) {
      // SOLO ACA el login está ok

      // 1. Ocultar alert
      alertCredenciales.classList.add('d-none');

      // 2. Crear usuario sin contraseña p/ guardarlo
      const usuarioLogueado = new UserWithoutPassword(
        usuario,
        'admin@gmail.com'
      );

      // 3. Guardar estado
      sessionStorage.setItem('estaLogueado', true);
      sessionStorage.setItem('usuario', JSON.stringify(usuarioLogueado));

      // 4. Mensaje de exito
      swal
        .fire({
          title: 'Bienvenido',
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
        .then(() => {
          // 5. Redireccion a admin
          window.location.href = './admin.html';
        });
    } else {
      // Credenciales no validas
      alertCredenciales.classList.remove('d-none');
    }
  }
});
