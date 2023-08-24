import { Contacto } from './Contacto.js';
import { agregarContactoALS } from './adminUtils.js';

export const añadirContacto = (nombre, numero, email, imagen, notas) => {
  const nuevoContacto = new Contacto(nombre, numero, email, imagen, notas);

  agregarContactoALS(nuevoContacto);

  swal.fire({
    title: 'Exito',
    text: 'Contacto agregado exitosamente',
    icon: 'success',
  });
};

export const editarContacto = () => {};

export const eliminarContacto = () => {};
