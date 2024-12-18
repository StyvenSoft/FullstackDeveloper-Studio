// ========================================
// Promises en JavaScript: Conceptos y Usos
// ========================================

/*
1. **¿Qué es una Promise?**
   - Una Promise es un objeto en JavaScript que representa la eventual resolución (o rechazo) de una operación asíncrona.
   - Tiene tres estados posibles:
     - **Pending**: La operación aún no se ha completado.
     - **Fulfilled**: La operación se completó con éxito.
     - **Rejected**: La operación falló.
   - Métodos principales:
     - `then`: Maneja el caso de éxito.
     - `catch`: Maneja el caso de error.
     - `finally`: Se ejecuta independientemente del resultado.

2. **Ventajas de usar Promises:**
   - Facilitan la lectura y escritura de código asíncrono.
   - Evitan el "callback hell".
*/


// Ejemplos avanzados de Promises
// ========================================

// Ejemplo 1: Creación básica de una Promise

const myPromise = new Promise((resolve, reject) => {
    const success = Math.random() > 0.5; // Simula un éxito aleatorio
    setTimeout(() => {
        if (success) {
            resolve("¡Operación completada con éxito!");
        } else {
            reject("Hubo un error en la operación.");
        }
    }, 1000);
});

myPromise
    .then(result => console.log(result)) // Manejo de éxito
    .catch(error => console.error(error)) // Manejo de error
    .finally(() => console.log("Operación finalizada.")); // Se ejecuta siempre

// Ejemplo 2: Cadena de Promises

const fetchData = url =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({ data: [1, 2, 3, 4] });
            } else {
                reject("URL no válida");
            }
        }, 2000);
    });

fetchData("https://api.example.com/data")
    .then(response => {
        console.log("Datos obtenidos:", response.data);
        return response.data.map(x => x * 2); // Procesar datos
    })
    .then(processedData => console.log("Datos procesados:", processedData))
    .catch(error => console.error("Error:", error))
    .finally(() => console.log("Proceso completado."));

// Ejemplo 3: Uso de `Promise.all`
const task1 = new Promise(resolve => setTimeout(() => resolve("Tarea 1 lista"), 3000));
const task2 = new Promise(resolve => setTimeout(() => resolve("Tarea 2 lista"), 4000));
const task3 = new Promise((_, reject) => setTimeout(() => reject("Tarea 3 falló"), 3500));

Promise.all([task1, task2, task3])
    .then(results => console.log("Todas las tareas completadas:", results))
    .catch(error => console.error("Error en al menos una tarea:", error));

// Ejemplo 4: Uso de `Promise.race`
Promise.race([task1, task2, task3])
    .then(result => console.log("La primera en completarse fue:", result))
    .catch(error => console.error("La primera en fallar fue:", error));

// ========================================
// Ejercicios avanzados/complejos
// ========================================

// Ejercicio 1: Simular una API de login
function fakeLogin(username, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === "admin" && password === "1234") {
                resolve("Login exitoso");
            } else {
                reject("Credenciales inválidas");
            }
        }, 1500);
    });
}

fakeLogin("admin", "1234")
    .then(message => console.log(message)) // "Login exitoso"
    .catch(error => console.error(error)); // "Credenciales inválidas"

// Ejercicio 2: Crear una función que retorne datos con `Promise.all`
function getDataFromMultipleAPIs() {
    const api1 = new Promise(resolve => setTimeout(() => resolve("Datos de API 1"), 5000));
    const api2 = new Promise(resolve => setTimeout(() => resolve("Datos de API 2"), 6000));
    const api3 = new Promise(resolve => setTimeout(() => resolve("Datos de API 3"), 7000));

    return Promise.all([api1, api2, api3]);
}

getDataFromMultipleAPIs()
    .then(results => console.log("Datos combinados:", results))
    .catch(error => console.error("Error en alguna API:", error));

// Ejercicio 3: Reintentar una operación fallida
function retryPromise(promiseFn, retries) {
    return promiseFn().catch(error => {
        if (retries > 0) {
            console.log("Reintentando...", retries, "intentos restantes");
            return retryPromise(promiseFn, retries - 1);
        } else {
            throw error;
        }
    });
}

const unreliableTask = () =>
    new Promise((resolve, reject) => {
        Math.random() > 0.7 ? resolve("Éxito") : reject("Falló");
    });

retryPromise(unreliableTask, 3)
    .then(result => console.log("Tarea completada:", result))
    .catch(error => console.error("Tarea falló después de varios intentos:", error));

// Ejercicio 4: Encadenar operaciones asíncronas
function getUser(userId) {
    return new Promise(resolve => setTimeout(() => resolve({ id: userId, name: "Steveen" }), 8000));
}

function getPosts(userId) {
    return new Promise(resolve =>
        setTimeout(() => resolve([{ id: 1, content: "Hello" }, { id: 2, content: "World" }]), 8000)
    );
}

getUser(1)
    .then(user => {
        console.log("Usuario obtenido:", user);
        return getPosts(user.id);
    })
    .then(posts => console.log("Posts del usuario:", posts))
    .catch(error => console.error(error));

/*
- Las Promises son fundamentales para manejar operaciones asíncronas en JavaScript.
- Métodos como `Promise.all` y `Promise.race` permiten manejar múltiples Promises de manera eficiente.
*/