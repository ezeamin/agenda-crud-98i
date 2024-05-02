import { obtenerContactosDeLS } from '../utils.js';
import { Contacto } from './Contacto.js';

export const agregarContacto = (nombre, numero, email, imagen, notas) => {
  const contacto = new Contacto(nombre, numero, email, imagen, notas);

  // 1. Traemos desde LS lo que haya guardado
  const contactos = obtenerContactosDeLS();

  // 2. Agregamos a lo que estaba guardado, lo nuevo
  contactos.push(contacto);

  // 3. Actualizamos los contactos en LS con los valores nuevos
  localStorage.setItem('contactos', JSON.stringify(contactos));
};

export const editarContacto = () => {};

export const eliminarContacto = () => {};
