// ========================================
// El patrón Singleton en JavaScript
// ========================================

/* 
El patrón Singleton es uno de los patrones de diseño más utilizados en programación orientada a objetos. 
Este patrón asegura que una clase tenga una sola instancia y proporciona un punto de acceso global a esa instancia.

¿Qué es un Singleton?

- Es un patrón de diseño que restringe la instanciación de una clase a un único objeto.
- Es útil para gestionar recursos compartidos como conexiones de bases de datos, configuraciones globales o servicios centralizados.

2. Características principales:

    -Garantiza que solo haya una instancia de la clase.
    -Proporciona un punto de acceso global a esa instancia.
    -Es capaz de mantener su estado a lo largo de todo el ciclo de vida de la aplicación.

3. Cuándo usar un Singleton:

Cuando necesitas exactamente una instancia de una clase para gestionar un recurso compartido.
Ejemplos: Manejo de configuración global, registro de logs, o conexiones a bases de datos.

*/

// Singleton básico en JavaScript
class Singleton {
    constructor() {
        if (Singleton.instance) {
            return Singleton.instance; // Devuelve la instancia existente
        }
        Singleton.instance = this; // Guarda la instancia actual
        this.data = {}; // Almacén de datos compartidos
        return this;
    }

    setData(key, value) {
        this.data[key] = value;
    }

    getData(key) {
        return this.data[key];
    }
}

// Uso del Singleton
const instance1 = new Singleton();
instance1.setData("appName", "Sistema de Facturación");

const instance2 = new Singleton();
console.log(instance2.getData("appName")); // "Sistema de Facturación"

console.log(instance1 === instance2); // true

// Ejemplo 1: Singleton para Configuración Global
// Simula un sistema donde varias partes de una aplicación acceden a la misma configuración.

class Config {
    constructor() {
        if (Config.instance) return Config.instance;
        Config.instance = this;

        // Configuración inicial
        this.settings = {
            apiUrl: "https://api.empresa.com",
            version: "1.0.0"
        };
        return this;
    }

    getSetting(key) {
        return this.settings[key];
    }

    setSetting(key, value) {
        this.settings[key] = value;
    }
}

// Uso del Singleton de Configuración
const globalConfig = new Config();
console.log(globalConfig.getSetting("apiUrl")); // "https://api.empresa.com"

const anotherConfig = new Config();
anotherConfig.setSetting("version", "1.1.0");

console.log(globalConfig.getSetting("version")); // "1.1.0"

// Ejemplo 2: Singleton para Manejo de Usuarios
// Sistema donde el Singleton controla la sesión actual del usuario.

class UserSession {
    constructor() {
        if (UserSession.instance) return UserSession.instance;
        UserSession.instance = this;

        this.currentUser = null; // Usuario actual
        return this;
    }

    login(user) {
        this.currentUser = user;
    }

    logout() {
        this.currentUser = null;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

// Uso del Singleton de Usuario
const session = new UserSession();
session.login({ id: 1, name: "Steveen Silva" });

const anotherSession = new UserSession();
console.log(anotherSession.getCurrentUser()); // { id: 1, name: "Steveen Silva" }

// Ejercicio 1: Sistema de Registro de Logs
// Singleton que administra un sistema de logs centralizado. Cada vez que un componente registre un mensaje, 
// se almacena y es accesible globalmente.

class Logger {
    constructor() {
        if (Logger.instance) return Logger.instance;
        Logger.instance = this;

        this.logs = [];
        return this;
    }

    addLog(message) {
        const timestamp = new Date().toISOString();
        this.logs.push({ message, timestamp });
        console.log(`[${timestamp}] ${message}`);
    }

    getLogs() {
        return this.logs;
    }
}

// Uso del Singleton de Logs
const logger = new Logger();
logger.addLog("Iniciando aplicación...");

const anotherLogger = new Logger();
anotherLogger.addLog("Conexión a base de datos establecida.");

console.log(logger.getLogs());

// Ejercicio 2: Gestión de Productos con Singleton
// Singleton que administra el inventario de productos.
// Permite agregar productos, obtener la lista completa y buscar productos por ID.

class Inventory {
    constructor() {
        if (Inventory.instance) return Inventory.instance;
        Inventory.instance = this;

        this.products = [];
        return this;
    }

    addProduct(product) {
        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    findProductById(id) {
        return this.products.find(p => p.id === id);
    }
}

// Uso del Singleton de Inventario
const inventory = new Inventory();
inventory.addProduct({ id: 1, name: "Laptop", stock: 10 });
inventory.addProduct({ id: 2, name: "Teclado", stock: 50 });

const anotherInventory = new Inventory();
console.log(anotherInventory.getProducts());
console.log(anotherInventory.findProductById(1));


// Ejercicio 3: Sistema de Facturación
// Singleton que administra una lista de facturas generadas por un sistema de ventas.

class InvoiceManager {
    constructor() {
        if (InvoiceManager.instance) return InvoiceManager.instance;
        InvoiceManager.instance = this;

        this.invoices = [];
        return this;
    }

    addInvoice(invoice) {
        this.invoices.push(invoice);
    }

    getInvoices() {
        return this.invoices;
    }

    findInvoiceById(id) {
        return this.invoices.find(inv => inv.id === id);
    }
}

// Uso del Singleton de Facturación
const invoiceManager = new InvoiceManager();
invoiceManager.addInvoice({ id: 1, client: "Steveen Silva", total: 1500 });
invoiceManager.addInvoice({ id: 2, client: "Maria Lopez", total: 2000 });

const anotherInvoiceManager = new InvoiceManager();
console.log(anotherInvoiceManager.getInvoices());
