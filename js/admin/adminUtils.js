export const obtenerContactosDeLS = () => {
  //   Traer contactos desde LS, PERO, si es null, que tome un valor por defecto ([])
  return JSON.parse(localStorage.getItem('contactos')) || [];
};

export const agregarContactoALS = (nuevoContacto) => {
  const contactos = obtenerContactosDeLS();

  contactos.push(nuevoContacto);

  // guardar el contacto
  localStorage.setItem('contactos', JSON.stringify(contactos));
};
