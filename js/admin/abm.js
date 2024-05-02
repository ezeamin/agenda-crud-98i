import { Contacto } from './Contacto.js';
import { agregarContactoALS } from './utils.js';

export const agregarContacto = (nombre, numero, email, imagen, notas) => {
  const contacto = new Contacto(nombre, numero, email, imagen, notas);

  agregarContactoALS(contacto);
};

export const editarContacto = () => {};

export const eliminarContacto = () => {};
