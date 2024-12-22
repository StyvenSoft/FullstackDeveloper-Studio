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

// Ejemplo 2: Actualización de inventario

async function updateInventory(productId, newTitle) {
    try {
        // Actualizar el "producto" (título de un post)
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${productId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle })
        });

        if (!response.ok) throw new Error(`Error al actualizar producto: ${response.status}`);
        const updatedProduct = await response.json();
        console.log('Producto actualizado (simulado):', updatedProduct);

    } catch (error) {
        console.error('Error en la actualización de inventario:', error);
    }
}

updateInventory(1, 'Nuevo Título para el Producto 1');

// Ejercicio 1: Gestión de proveedores

async function manageSuppliers() {
    try {
        // Obtener proveedores (usando usuarios)
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Error al obtener proveedores');
        const suppliers = await response.json();

        // Filtrar proveedores que pertenezcan a una compañía con nombre largo
        const filteredSuppliers = suppliers.filter(supplier => supplier.company.name.length > 10);
        console.log('Proveedores seleccionados:', filteredSuppliers);

        // Simular envío de correo a proveedores seleccionados
        for (const supplier of filteredSuppliers) {
            console.log(`Enviando correo a: ${supplier.email}...`);
            await new Promise(resolve => setTimeout(resolve, 500)); // Simula un retardo
            console.log(`Correo enviado a ${supplier.name}`);
        }

    } catch (error) {
        console.error('Error en la gestión de proveedores:', error);
    }
}

manageSuppliers();

// Ejercicio 2: Generar reportes de ventas
async function generateSalesReport() {
    try {
        // Obtener "ventas" (usando tareas completadas)
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!response.ok) throw new Error('Error al obtener ventas');
        const sales = await response.json();

        // Generar un reporte con el número de tareas completadas por usuario
        const report = sales
            .filter(sale => sale.completed)
            .reduce((acc, sale) => {
                acc[sale.userId] = (acc[sale.userId] || 0) + 1;
                return acc;
            }, {});

        console.log('Reporte generado:', report);

        // Simular envío del reporte
        console.log('Enviando reporte...');
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('Reporte enviado con éxito.');

    } catch (error) {
        console.error('Error en la generación del reporte:', error);
    }
}

generateSalesReport();