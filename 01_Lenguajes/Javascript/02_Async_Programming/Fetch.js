// ========================================
// fetching en JavaScript
// ========================================

// La API `fetch` es una interfaz moderna para realizar solicitudes HTTP en JavaScript. 
// Es una alternativa más simple y flexible que `XMLHttpRequest` y permite trabajar con Promesas para manejar solicitudes de manera asíncrona.
// Con `fetch`, puedes realizar operaciones como obtener datos de una API, enviar datos al servidor o descargar archivos.

// Ejemplo 1: Gestión de clientes desde JSONPlaceholder
async function manageClients() {
    try {
        // Obtener lista de usuarios (clientes)
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error(`Error al obtener clientes: ${response.status}`);
        const clients = await response.json();
        console.log('Clientes obtenidos:', clients);

        // Agregar un nuevo cliente (no se guarda realmente en JSONPlaceholder)
        const newClient = {
            name: "Nuevo Cliente",
            email: "nuevo.cliente@example.com",
            phone: "123-456-789"
        };

        const addResponse = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newClient)
        });

        if (!addResponse.ok) throw new Error(`Error al agregar cliente: ${addResponse.status}`);
        const addedClient = await addResponse.json();
        console.log('Cliente agregado (simulado):', addedClient);

    } catch (error) {
        console.error('Error en la gestión de clientes:', error);
    }
}

manageClients();
