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

export const crearFilaTabla = (contacto, indice) => {
  const tbody = document.getElementById('tbody-contactos');

  const tr = document.createElement('tr');

  // INDICE

  const tdIndice = document.createElement('td');
  tdIndice.innerText = indice;
  tr.appendChild(tdIndice);

  // IMAGEN

  const tdImagen = document.createElement('td');
  const img = document.createElement('img');

  img.src = contacto.imagen;
  img.alt = contacto.nombre;
  img.classList.add('imagen-tabla');

  tdImagen.appendChild(img);
  tr.appendChild(tdImagen);

  // NOMBRE

  const tdNombre = document.createElement('td');
  tdNombre.innerText = contacto.nombre;
  tr.appendChild(tdNombre);

  // NUMERO

  const tdNumero = document.createElement('td');
  tdNumero.innerText = contacto.telefono;
  tr.appendChild(tdNumero);

  // EMAIL

  const tdEmail = document.createElement('td');
  tdEmail.innerText = contacto.email;
  tr.appendChild(tdEmail);

  // NOTAS

  const tdNotas = document.createElement('td');
  tdNotas.innerText = contacto.notas;
  tr.appendChild(tdNotas);

  // BOTONES

  const tdBotones = document.createElement('td');

  const btnEditar = document.createElement('button');
  const btnEliminar = document.createElement('button');

  btnEditar.type = 'button';
  btnEliminar.type = 'button';
  btnEditar.classList.add('btn', 'btn-warning', 'btn-sm', 'me-2');
  btnEliminar.classList.add('btn', 'btn-danger', 'btn-sm');
  btnEditar.innerText = 'Editar';
  btnEliminar.innerText = 'Eliminar';

  btnEditar.onclick = () => {
    console.log(`Editar ${contacto.codigo}`);
  };

  btnEliminar.onclick = () => {
    console.log(`Eliminar ${contacto.codigo}`);
  };

  tdBotones.appendChild(btnEditar);
  tdBotones.appendChild(btnEliminar);

  tr.appendChild(tdBotones);

  // Añadir todo al tbody

  tbody.appendChild(tr);
};

export const cargarTabla = () => {
  const contactos = obtenerContactosDeLS();

  // Vaciar tabla
  const tbody = document.getElementById('tbody-contactos');
  tbody.innerHTML = '';

  // Cargar tabla
  contactos.forEach((contacto, indice) => {
    crearFilaTabla(contacto, indice);
  });
};
