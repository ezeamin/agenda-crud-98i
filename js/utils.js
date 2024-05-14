export const obtenerContactosDeLS = () => {
  return JSON.parse(localStorage.getItem('contactos')) || [];
};

export const estaLogueado = () => {
  return sessionStorage.getItem('estaLogueado');
};
