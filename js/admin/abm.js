import { Contacto } from './Contacto.js';

export const añadirContacto = (nombre, numero, email, imagen, notas) => {
  const nuevoContacto = new Contacto(nombre, numero, email, imagen, notas);

  console.log('Contacto creado', '🙂');
  console.log(nuevoContacto);

  //   Traer contactos desde LS, PERO, si es null, que tome un valor por defecto ([])
  const contactos = JSON.parse(localStorage.getItem('contactos')) || [];

  contactos.push(nuevoContacto);

  // guardar el contacto
  localStorage.setItem('contactos', JSON.stringify(contactos));
};

export const editarContacto = () => {};

export const eliminarContacto = () => {};
