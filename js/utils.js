export const obtenerContactosDeLS = () => {
  return JSON.parse(localStorage.getItem('contactos')) || [];
};
