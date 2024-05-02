export class Contacto {
  constructor(nombre, numero, email, imagen, notas) {
    this.codigo = window.self.crypto.randomUUID();
    this.nombre = nombre;
    this.numero = numero;
    this.email = email;
    this.imagen = imagen;
    this.notas = notas;
  }
}
