// ========================================
// El patrón Factory Method en JavaScript
// ========================================

/* 
El patrón de diseño Factory (Fábrica) es un patrón creacional que proporciona una interfaz para crear objetos 
en una superclase, pero permite a las subclases alterar el tipo de objetos que se crean. 
Este patrón es útil para situaciones donde no se sabe de antemano qué tipo de objeto debe ser creado.

    - Encapsula la lógica de creación de objetos en un único lugar (la fábrica).
    - Reduce la duplicación de código para la creación de objetos.
    - Facilita la escalabilidad y mantenimiento del código.

Componentes principales:

Fábrica: Clase o función que se encarga de crear instancias de objetos según el contexto o los parámetros proporcionados.
Productos: Las clases de objetos que se crean mediante la fábrica.

Ventajas:
    - Facilita la reutilización del código.
    - Desacopla la lógica de creación del cliente que usa los objetos.
    - Proporciona flexibilidad para cambiar la lógica de creación sin afectar a otras partes del sistema.

Desventajas:
    - Puede introducir complejidad adicional si no se utiliza correctamente.

*/

/**
 * Ejemplo avanzado: Sistema de Usuarios
 * Un sistema que crea diferentes tipos de usuarios según su rol (Cliente, Proveedor, Administrador).
 */

class User {
    constructor(nameUser, roleUser) {
        this.nameUser = nameUser;
        this.roleUser = roleUser;
    }

    // Método para todos los usuarios
    infoUser() {
        console.log(`Usuario: ${this.nameUser}, rol: ${this.roleUser}`);
    }
}

class Client extends User {
    constructor(nameUser) {
        super(nameUser, "Cliente");
    }
    // Método compra
    purchase() {
        console.log(`${this.nameUser} está realizando una compra`);
    }
}

// Clase proveedor
class Supplier extends User {
    constructor(nameUser) {
        super(nameUser, "Proveedor")
    }

    supply() {
        console.log(`${this.nameUser} está suministrando productos`);
    }
}

class Admin extends User {
    constructor(nameUser) {
        super(nameUser, "Administrador");
    }

    manage() {
        console.log(`${this.nameUser} está gestionando el sistema`);
    }
}

// Clase Factory
class UserFactory {
    static createUser(nameUser, roleUser) {
        switch (roleUser) {
            case "Cliente":
                return new Client(nameUser);
            case "Proveedor":
                return new Supplier(nameUser);
            case "Administrador":
                return new Admin(nameUser);
            default:
                throw new Error("Rol no válido!");
        }
    }
}

const user1 = UserFactory.createUser("Steveen", "Cliente");
const user2 = UserFactory.createUser("Pablo", "Proveedor");
const user3 = UserFactory.createUser("Adrian", "Administrador");

user1.infoUser();
user1.purchase();

user2.infoUser();
user2.supply();

user3.infoUser();
user3.manage();

/*
Usuario: Steveen, rol: Cliente
Steveen está realizando una compra
Usuario: Pablo, rol: Proveedor
Pablo está suministrando productos
Usuario: Adrian, rol: Administrador
Adrian está gestionando el sistema
*/
