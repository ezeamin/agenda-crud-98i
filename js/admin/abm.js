import { Contacto } from './Contacto.js';

const contactos = [];

export const agregarContacto = (nombre, numero, email, imagen, notas) => {
  const contacto = new Contacto(nombre, numero, email, imagen, notas);

  //  Agregar a algun lado el contacto!!!
  console.log(contacto);
  contactos.push(contacto);
  console.log(contactos);

  //   localStorage
};

export const editarContacto = () => {};

export const eliminarContacto = () => {};
