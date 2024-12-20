// ========================================
// EventLoop en JavaScript
// ========================================

/* 
El Event Loop (bucle de eventos) es el mecanismo que permite a JavaScript manejar tareas asíncronas 
y coordinar la ejecución del código, los eventos y las operaciones no bloqueantes.
JavaScript es monohilo, pero gracias al Event Loop, puede manejar múltiples tareas "aparentemente al mismo tiempo".

Componentes clave:
1. Call Stack (Pila de Llamadas): Almacena las funciones que se están ejecutando.
2. Web APIs: Proveen funcionalidades asíncronas como `setTimeout`, `fetch`, etc.
3. Task Queue (Cola de Tareas): Cola donde se colocan las tareas asíncronas para ser ejecutadas.
4. Microtask Queue (Cola de Microtareas): Prioritaria sobre la Task Queue, incluye `Promises` y `MutationObservers`.

El Event Loop revisa constantemente:
- Si el Call Stack está vacío.
- Si hay tareas en la Microtask Queue o en la Task Queue para moverlas al Call Stack.
*/

// ### Ejemplo Avanzado 1: Priorización de Promesas sobre setTimeout ###
console.log("Inicio");

setTimeout(() => {
    console.log("Timeout 1");
}, 0);

Promise.resolve().then(() => {
    console.log("Promesa 1");
}).then(() => {
    console.log("Promesa 2");
});

setTimeout(() => {
    console.log("Timeout 2");
}, 0);

console.log("Fin");

/* 
Salida:
Inicio
Fin
Promesa 1
Promesa 2
Timeout 1
Timeout 2

Explicación:
1. "Inicio" y "Fin" se ejecutan primero porque están en el Call Stack.
2. Las Promesas se colocan en la Microtask Queue y tienen prioridad sobre los `setTimeout`.
3. Los `setTimeout` se colocan en la Task Queue y se ejecutan después de las Microtareas.
*/

// ### Ejemplo Avanzado 2: Simulación de Procesos Empresariales ###
console.log("Inicio del Proceso");

function fetchClientData(clientId) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ id: clientId, name: "Cliente A", email: "clienteA@mail.com" });
        }, 1000);
    });
}

function fetchOrders(clientId) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { orderId: 1, product: "Producto A", amount: 3 },
                { orderId: 2, product: "Producto B", amount: 5 }
            ]);
        }, 500);
    });
}

setTimeout(() => {
    console.log("Timeout 1: Notificación enviada al cliente");
}, 0);

fetchClientData(1).then(client => {
    console.log("Cliente obtenido:", client);
    return fetchOrders(client.id);
}).then(orders => {
    console.log("Pedidos obtenidos:", orders);
});

console.log("Fin del Proceso");

/* 
Salida esperada:
Inicio del Proceso
Fin del Proceso
Timeout 1: Notificación enviada al cliente
Cliente obtenido: { id: 1, name: 'Cliente A', email: 'clienteA@mail.com' }
Pedidos obtenidos: [ { orderId: 1, product: 'Producto A', amount: 3 }, { orderId: 2, product: 'Producto B', amount: 5 } ]

Explicación:
1. `console.log("Inicio del Proceso")` y `console.log("Fin del Proceso")` se ejecutan primero.
2. `setTimeout` (Timeout 1) entra en la Task Queue y espera.
3. Las Promesas obtienen los datos del cliente y los pedidos en paralelo, pero son manejadas como Microtareas.
*/

// ### Ejercicios Avanzados/Complejos ###

// Ejercicio 1: Priorización entre tareas
// Intenta predecir la salida del siguiente código.
console.log("Inicio");

setTimeout(() => {
    console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
    console.log("Promesa");
});

console.log("Fin");

// Ejercicio 2: Gestión de Inventario con Reporte Asíncrono
// Implementa un flujo asíncrono que realice las siguientes tareas:
// 1. Obtener la información de inventario disponible.
// 2. Verificar si hay suficiente stock para cumplir con un pedido.
// 3. Generar un reporte detallado del pedido, incluyendo productos rechazados por falta de stock.

dataProducts = [
    { name: "Producto A", quantity: 5 },
    { name: "Producto B", quantity: 3 },
    { name: "Producto C", quantity: 1 }
]

async function manageInventory(order) {
    const fetchInventory = async () =>
        new Promise(resolve =>
            setTimeout(() => resolve([
                { name: "Producto A", stock: 10, price: 50 },
                { name: "Producto B", stock: 2, price: 20 },
                { name: "Producto C", stock: 0, price: 100 },
            ]), 1000)
        );

    const checkStock = async (inventory, order) =>
        new Promise(resolve =>
            setTimeout(() => {
                const result = order.map(item => {
                    const product = inventory.find(p => p.name === item.name);
                    if (product && product.stock >= item.quantity) {
                        return { ...item, available: true, total: item.quantity * product.price };
                    }
                    return { ...item, available: false, total: 0 };
                });
                resolve(result);
            }, 500)
        );

    const generateReport = async (verifiedOrder) =>
        new Promise(resolve =>
            setTimeout(() => {
                const successful = verifiedOrder.filter(item => item.available);
                const rejected = verifiedOrder.filter(item => !item.available);
                resolve({
                    successful,
                    rejected,
                    total: successful.reduce((sum, item) => sum + item.total, 0),
                });
            }, 700)
        );

    try {
        console.log("Obteniendo inventario...");
        const inventory = await fetchInventory();

        console.log("Verificando stock...");
        const verifiedOrder = await checkStock(inventory, order);

        console.log("Generando reporte...");
        const report = await generateReport(verifiedOrder);

        console.log("Reporte generado:");
        console.log("Productos procesados con éxito:", report.successful);
        console.log("Productos rechazados por falta de stock:", report.rejected);
        console.log("Total a facturar:", report.total);
    } catch (error) {
        console.error("Error al gestionar inventario:", error);
    }
}

// Prueba del ejercicio:
manageInventory(dataProducts);