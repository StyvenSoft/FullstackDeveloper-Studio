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