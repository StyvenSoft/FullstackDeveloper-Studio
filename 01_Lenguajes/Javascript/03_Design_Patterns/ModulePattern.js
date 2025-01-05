// ========================================
// El Patrón de Módulo en JavaScript
// ========================================

/* 
El Module Pattern (Patrón de Módulo) es un patrón de diseño estructural en JavaScript que proporciona una 
manera de encapsular funcionalidades relacionadas, mantenerlas privadas o protegidas del alcance global, y exponer
solo una interfaz pública. Este patrón es especialmente útil para organizar código en 
aplicaciones grandes y mejorar la mantenibilidad.


    - Crear un espacio de nombres para evitar colisiones con otras variables en el ámbito global.
    - Proveer encapsulación para datos y métodos.
    - Ofrecer una interfaz pública para interactuar con el módulo mientras mantiene ciertos detalles privados.

Características principales:

    - Uso de funciones autoejecutables (IIFE) para crear un ámbito cerrado.
    - Definición de variables y métodos privados dentro del módulo.
    - Retorno de un objeto que expone los métodos o propiedades públicas del módulo.

Ventajas:

    - Encapsulación de datos y funcionalidad.
    - Reducción del riesgo de colisiones en el ámbito global.
    - Fácil organización de código en partes reutilizables.

Desventajas:

    - Puede volverse difícil de depurar si se abusa de él.
    - El manejo de dependencias puede complicarse en sistemas muy grandes.

*/

// Módulo de Clientes

// Definición del módulo usando una IIFE
const ClientModule = (function () {
    // Variables y métodos privados
    const clients = [];

    function addClient(name, email) {
        clients.push({ name, email });
        console.log(`Cliente agregado: ${name}`);
    }

    function listClients() {
        console.log("Lista de clientes: ");
        clients.forEach(client => {
            console.log(`- ${client.name} email: (${client.email})`);
        })
    }

    function findClient(email) {
        return clients.find(client => client.email === email) || null
    }

    return {
        addClient,
        listClients,
        findClient,
    }

})();

// Uso de módulo
ClientModule.addClient("Juan Perez", "juan@example.com");
ClientModule.addClient("Diana Gomez", "diana@example.com");
ClientModule.addClient("Pablo Beltran", "pablo@example.com");

const client = ClientModule.findClient("juan@example.com");
console.log("Cliente encontrado: ", client);
