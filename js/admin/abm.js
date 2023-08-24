import { Contacto } from './Contacto.js';
import { agregarContactoALS } from './adminUtils.js';

export const añadirContacto = (nombre, numero, email, imagen, notas) => {
  const nuevoContacto = new Contacto(nombre, numero, email, imagen, notas);

  agregarContactoALS(nuevoContacto);

  alert('Se agregó el contacto con exito');
};

export const editarContacto = () => {};

export const eliminarContacto = () => {};
