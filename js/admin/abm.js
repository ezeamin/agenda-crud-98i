import { obtenerContactosDeLS } from '../utils.js';
import { Contacto } from './Contacto.js';
import {
  agregarContactoALS,
  cargarTabla,
} from './adminUtils.js';

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

export const eliminarContacto = (codigo) => {
  // 1. Confirmar eliminacion
  swal
    .fire({
      title: '¿Estas seguro?',
      text: 'Esta opcion no será reversible',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar',
    })
    .then((action) => {
      if (action.isConfirmed) {
        // 2. Traer lista
        const contactos = obtenerContactosDeLS();

        // 3. Filtrar lista (tambien se puede con splice)
        // # Guarda en listaFiltrada TODOS los contactos que
        // # COINCIDEN con la condicion de busqueda
        const listaFiltrada = contactos.filter(
          (item) => item.codigo !== codigo
        );

        // 4. Actualizamos la lista en LS
        localStorage.setItem('contactos', JSON.stringify(listaFiltrada));

        // 5. Mensaje de exito
        swal.fire({
          title: 'Exito',
          text: 'El contacto se eliminó correctamente',
          icon: 'success',
        });

        // 6. Recargar datos en tabla
        cargarTabla();
      }
    });
};
