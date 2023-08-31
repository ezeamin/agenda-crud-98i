// -----------------------------------------
// 1. Seleccion el boton
// -----------------------------------------

const botonSalir = document.getElementById('boton-salir');

// -----------------------------------------
// 2. Mostrar u ocultar el boton
// -----------------------------------------

const estaLogueado = JSON.parse(sessionStorage.getItem('estaLogueado'));
if (estaLogueado) {
  botonSalir.classList.remove('d-none');
}

// -----------------------------------------
// 3. Agregarle acción al boton
// -----------------------------------------

botonSalir.addEventListener('click', (e) => {
  swal
    .fire({
      title: '¿Estás seguro?',
      text: 'Cerrarás tu sesión',
      confirmButtonText: 'Si, salir',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        // 1. Limpiar sessionStorage
        sessionStorage.removeItem('estaLogueado');
        sessionStorage.removeItem('usuario');

        // 2. Redireccionar
        window.location.href = '/';

        // Listo :)
      }
    });
});
