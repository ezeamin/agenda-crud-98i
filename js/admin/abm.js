import { Contacto } from './Contacto.js';
import { agregarContactoALS, obtenerContactosDeLS } from './adminUtils.js';

export const añadirContacto = (nombre, numero, email, imagen, notas) => {
  const nuevoContacto = new Contacto(nombre, numero, email, imagen, notas);

  agregarContactoALS(nuevoContacto);

  swal.fire({
    title: 'Exito',
    text: 'Contacto agregado exitosamente',
    icon: 'success',
  });
};

export const editarContacto = (nombre, numero, email, imagen, notas) => {
  // 1. Traer lista de contactos y el codigo del contacto a editar
  const codigo = sessionStorage.getItem('codigoContacto');
  const contactos = obtenerContactosDeLS();

  // # Si no hay codigo (es null)
  if (!codigo) {
    swal.fire({
      title: 'Error',
      text: 'No se encontró el contacto',
      icon: 'error',
    });
    return;
  }

  // 2. Buscar posicion del contacto
  const posicionContacto = contactos.findIndex(
    (item) => item.codigo === codigo
  );

  // # Si no se encontró el contacto
  if (posicionContacto === -1) {
    swal.fire({
      title: 'Error',
      text: 'No se encontró el contacto',
      icon: 'error',
    });
    return;
  }

  // 3. Crear el contacto editado
  const contactoEditado = new Contacto(nombre, numero, email, imagen, notas);

  // 4. Eliminar contacto anterior y agregar el nuevo
  contactos.splice(posicionContacto, 1, contactoEditado);

  // 5. Guardar en LS
  localStorage.setItem('contactos', JSON.stringify(contactos));

  // 6. Mostrar mensaje de exito
  swal.fire({
    title: 'Exito',
    text: 'El contacto se modificó correctamente',
    icon: 'success',
  });

  // 7. Resetear estado previo a edicion
  sessionStorage.removeItem('codigoContacto');
};

export const eliminarContacto = () => {};
