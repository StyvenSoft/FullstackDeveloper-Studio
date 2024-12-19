// ========================================
// Async/Await en JavaScript: Conceptos y Usos
// ========================================

/*
Descripción:
1. **¿Qué es Async/Await?**
   - `async/await` es una sintaxis que facilita el manejo de código asíncrono en JavaScript.
   - Fue introducido en ES2017 (ES8).
   - Se usa para trabajar con Promises de una manera más clara y parecida al código sincrónico.
   - `async` marca una función como asíncrona, devolviendo siempre una Promise.
   - `await` se usa dentro de funciones `async` para pausar la ejecución hasta que una Promise se resuelva o sea rechazada.

2. **Ventajas de Async/Await:**
   - Código más limpio y fácil de leer.
   - Evita el "callback hell" y simplifica cadenas de Promises.
*/

// ========================================
// Ejemplos avanzados de Async/Await
// ========================================

async function findClient(clientId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const clients = [
                { id: 1, name: "Juan Torrez", email: "juan@example.com" },
                { id: 2, name: "Maria Beltran", email: "maria@example.com" }
            ];
            const client = clients.find(c => c.id === clientId);
            client ? resolve(client) : reject("Cliente no encontrado");
        }, 2000);
    });
}

async function getClientDetails(clientId) {
    try {
        console.log("Buscando cliente...");
        const client = await findClient(clientId); // Espera a que la Promise se resuelva
        console.log("Cliente encontrado:", client);
    } catch (error) {
        console.error("Error:", error); // Maneja errores
    }
}

getClientDetails(1); // ID para probar ambos casos

// Ejemplo 2: Facturación con múltiples operaciones asíncronas
async function createInvoice(clientId, products) {
    const getClient = async id =>
        new Promise(resolve =>
            setTimeout(() => resolve({ id, name: "Empresa X", email: "contact@empresa.com" }), 500)
        );

    const calculateTotal = async products =>
        new Promise(resolve =>
            setTimeout(() => {
                const total = products.reduce((sum, p) => sum + p.price, 0);
                resolve(total);
            }, 700)
        );

    const sendInvoice = async invoice =>
        new Promise(resolve =>
            setTimeout(() => resolve(`Factura enviada a ${invoice.client.email}`), 300)
        );

    try {
        console.log("Generando factura...");
        const client = await getClient(clientId);
        const total = await calculateTotal(products);
        const invoice = { client, products, total, date: new Date() };
        const confirmation = await sendInvoice(invoice);
        console.log("Factura generada:", invoice);
        console.log(confirmation);
    } catch (error) {
        console.error("Error al generar factura:", error);
    }
}

createInvoice(1, [
    { name: "Producto A", price: 100 },
    { name: "Producto B", price: 200 }
]);

// ========================================
// Ejercicios avanzados/complejos
// ========================================

// Ejercicio 1: Gestión de usuarios y proveedores
async function manageUsersAndSuppliers() {
    const fetchUsers = async () =>
        new Promise(resolve =>
            setTimeout(() => resolve(["Usuario1", "Usuario2", "Usuario3"]), 1000)
        );

    const fetchSuppliers = async () =>
        new Promise(resolve =>
            setTimeout(() => resolve(["ProveedorA", "ProveedorB", "ProveedorC"]), 800)
        );

    try {
        console.log("Cargando usuarios y proveedores...");
        const [users, suppliers] = await Promise.all([fetchUsers(), fetchSuppliers()]);
        console.log("Usuarios:", users);
        console.log("Proveedores:", suppliers);
    } catch (error) {
        console.error("Error en la carga:", error);
    }
}

manageUsersAndSuppliers();

// Ejercicio 2: Proceso de aprobación de productos
async function approveProduct(productId) {
    const findProduct = async id =>
        new Promise((resolve, reject) =>
            setTimeout(() => {
                const products = [
                    { id: 1, name: "Producto A", status: "pendiente" },
                    { id: 2, name: "Producto B", status: "aprobado" }
                ];
                const product = products.find(p => p.id === id);
                product ? resolve(product) : reject("Producto no encontrado");
            }, 1000)
        );

    const approve = async product =>
        new Promise(resolve =>
            setTimeout(() => {
                product.status = "aprobado";
                resolve(product);
            }, 500)
        );

    try {
        console.log("Buscando producto...");
        const product = await findProduct(productId);
        console.log("Producto encontrado:", product);
        if (product.status !== "aprobado") {
            const updatedProduct = await approve(product);
            console.log("Producto aprobado:", updatedProduct);
        } else {
            console.log("El producto ya está aprobado.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

approveProduct(1); // Cambia el ID para probar ambos casos

// Ejercicio 3: Reporte combinado de clientes y facturación
async function generateCombinedReport(clientId) {
    const getClient = async id =>
        new Promise(resolve =>
            setTimeout(() => resolve({ id, name: "Cliente X", email: "cliente@x.com" }), 500)
        );

    const getInvoices = async clientId =>
        new Promise(resolve =>
            setTimeout(
                () =>
                    resolve([
                        { id: 1, total: 300, date: "2024-12-01" },
                        { id: 2, total: 150, date: "2024-12-05" }
                    ]),
                800
            )
        );

    try {
        const client = await getClient(clientId);
        const invoices = await getInvoices(clientId);
        console.log("Reporte combinado:");
        console.log("Cliente:", client);
        console.log("Facturas:", invoices);
    } catch (error) {
        console.error("Error al generar el reporte:", error);
    }
}

generateCombinedReport(1);

// `async/await` simplifica enormemente el manejo de Promises y es esencial para manejar flujos asíncronos complejos.