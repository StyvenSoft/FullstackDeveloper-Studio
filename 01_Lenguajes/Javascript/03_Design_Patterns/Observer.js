// ========================================
// El patrón Observer en JavaScript
// ========================================

/* 
El patrón Observer es uno de los patrones de diseño más utilizados en el desarrollo de software. 
Permite que un objeto (el sujeto) mantenga una lista de dependientes (observadores) y los notifique 
automáticamente de cualquier cambio de estado, generalmente mediante la llamada a un método. 
Este patrón es ideal para situaciones donde múltiples componentes necesitan reaccionar ante un cambio en un objeto central.

Permitir que múltiples objetos escuchen y reaccionen a eventos o cambios de estado en otro objeto.

Componentes principales:
    - Sujeto (Subject): El objeto que mantiene el estado y notifica a los observadores cuando hay un cambio.
    - Observadores (Observers): Los objetos que desean ser notificados sobre los cambios en el sujeto.

Ventajas:
    - Promueve un diseño desacoplado.
    - Fácil de escalar al agregar más observadores.

Desventajas:
    - Puede volverse complejo si hay demasiados observadores o notificaciones.

*/

/**
 * Ejemplo avanzado: Sistema de Notificaciones
 * Implementación de un sistema donde las notificaciones se envían a los usuarios (observadores) cuando ocurre 
 * un evento en el sistema (sujeto).
 */

// Clase Subject (Sujeto)
class Subject {
    constructor() {
        this.observers = []; // Lista de observadores
    }

    // Añadir un observador
    addObserver(observer) {
        this.observers.push(observer);
    }

    // Eliminar un observador
    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    // Notificar a todos los observadores
    notify(event) {
        this.observers.forEach(observer => observer.update(event));
    }
}

// Clase Observer (Observador)
class Observer {
    constructor(name) {
        this.name = name;
    }

    // Método que será llamado cuando el sujeto notifique
    update(event) {
        console.log(`${this.name} recibió la notificación: ${event}`);
    }
}

// Ejemplo de uso
const notificationSystem = new Subject();

const user1 = new Observer("Usuario 1");
const user2 = new Observer("Usuario 2");
const user3 = new Observer("Usuario 3");

// Añadir observadores
notificationSystem.addObserver(user1);
notificationSystem.addObserver(user2);
notificationSystem.addObserver(user3);

// Notificar evento
notificationSystem.notify("Se ha añadido un nuevo producto al catálogo.");
notificationSystem.notify("El sistema estará en mantenimiento esta noche.");

/**
 * Ejemplo avanzado: Sistema de Stock de Productos
 * Sistema donde los clientes y proveedores reciben 
 * notificaciones sobre cambios en el stock de productos. 
 */

// clase productos (Sujeto)

class Product {
    constructor(nameProduct, stock) {
        this.nameProduct = nameProduct;
        this.stock = stock;
        this.observers = [];
    }

    // Añadir un observador
    addObserver(observer) {
        this.observers.push(observer);
    }

    // Notificar a todos los observer
    notify() {
        this.observers.forEach(observer =>
            observer.update(this.nameProduct, this.stock)
        );
    }

    // Actualizar el stock y notificar
    updateStock(newStock) {
        console.log(`Stock del producto: (${this.nameProduct}) se actualizó a : ${newStock}.`);
        this.stock = newStock;
        this.notify();
    }
}

// Clase observer (Cliente o proveedor)

class Observer {
    constructor(role, email) {
        this.role = role;
        this.email = email;
    }

    // Método llamado al recibir una notificación
    update(productName, stock) {
        console.log(`${this.role} (${this.email}) ha sido notificado: El stock actual de ${productName} es: ${stock}`);
    }
}

// Uso
const laptop = new Product("Laptop DELL", 10);

const client1 = new Observer("Cliente", "cliente1@correo.com");
const suppier1 = new Observer("Proveedor", "supplier1@correo.com");

// Añadir observadores
laptop.addObserver(client1);
laptop.addObserver(suppier1);

// Actualizar el stock
laptop.updateStock(15);
laptop.updateStock(5);
