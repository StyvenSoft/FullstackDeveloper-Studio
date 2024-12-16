// Spread y Rest: Conceptos Fundamentales

/*
Descripción:
1. **Spread (`...`)**:
   - Permite "expandir" un iterable (como un array o un objeto) en elementos individuales.
   - Útil para copiar, combinar o desestructurar datos.

2. **Rest (`...`)**:
   - Permite "agrupar" múltiples elementos en una sola variable.
   - Se usa en parámetros de funciones y en desestructuración para manejar valores restantes.

Ambos utilizan la misma sintaxis (`...`), pero su propósito varía según el contexto.
*/

// =====================================
// Ejemplos de Spread
// =====================================

// 1. Combinar arrays
const arr1 = [1, 2, 3, 5];
const arr2 = [4, 5, 6, 9];
const combined = [...arr1, ...arr2]; // Combina arr1 y arr2
console.log(combined); // [1, 2, 3, 5, 4, 5, 6, 9]

// 2. Copiar arrays (shallow copy)
const originalArray = [10, 20, 30];
const copyArray = [...originalArray] // Crear una copia superficial
console.log(copyArray); // [10, 20, 30]

// Modificar la copia no afecta el original

copyArray[0] = 100;
console.log(originalArray); // [10, 20, 30]
console.log(copyArray); // [100, 20, 30]

// 3. Expandir argumentos en funciones
const numbers = [2, 6, 7, 8, 2, 3, 4, 9, 12, 15, 13, 11, 5, 6, 7];
const maxNumber = Math.max(...numbers);
console.log(maxNumber); // 15

// 4. Combinar objetos
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const combinedObj = { ...obj1, ...obj2 }; // Combina propiedades
console.log(combinedObj); // { a: 1, b: 2, c: 3, d: 4 }

// Sobrescribir propiedades en objetos
const updatedObj = { ...obj1, b: 20 };
console.log(updatedObj); // { a: 1, b: 20 }


// =====================================
// Ejemplos avanzados de Rest
// =====================================

// 1. Agrupar argumentos en funciones
function sum(...args) {
    return args.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// 2. Desestructuración en arrays
const [first, ...rest] = [1, 2, 3, 4];
console.log(first); // 1
console.log(rest); // [2, 3, 4]

// 3. Desestructuración en objetos
const user = { id: 1, name: 'Steveen', age: 25 };
const { id, ...userDetails } = user; // Extrae 'id' y agrupa el resto en 'userDetails'
console.log(id); // 1
console.log(userDetails); // { name: 'Steveen', age: 25 }

// 4. Combinar Rest y parámetros
function introduce(name, ...traits) {
    return `Hello, I am ${name}. My traits: ${traits.join(', ')}`;
}
console.log(introduce('Steveen', 'kind', 'intelligent', 'funny'));
// "Hello, I am Steveen. My traits: kind, intelligent, funny"

// =====================================
// Ejercicios avanzados/complejos
// =====================================

// Ejercicio 1: Combinar y filtrar arrays únicos
// Crear una función que combine múltiples arrays y elimine duplicados.
function mergeUnique(...arrays) {
    return [...new Set(arrays.flat())];
}
console.log(mergeUnique([1, 2], [2, 3], [3, 4, 5])); // [1, 2, 3, 4, 5]

// Ejercicio 2: Filtrar propiedades de un objeto
// Crear una función que reciba un objeto y excluya ciertas claves.
function excludeKeys(obj, ...keysToExclude) {
    const { ...rest } = obj;
    keysToExclude.forEach(key => delete rest[key]);
    return rest;
}
const person = { name: 'Alice', age: 25, job: 'Developer' };
console.log(excludeKeys(person, 'age', 'job')); // { name: 'Alice' }

// Ejercicio 3: Spread en arrays multidimensionales
// Crear una función que aplique spread en una matriz y devuelva una versión plana.
function flattenMatrix(matrix) {
    return matrix.reduce((flat, row) => [...flat, ...row], []);
}
const matrix = [
    [1, 2],
    [3, 4],
    [5, 6],
];
console.log(flattenMatrix(matrix)); // [1, 2, 3, 4, 5, 6]

// Ejercicio 4: Agrupación dinámica
// Crear una función que agrupe elementos de un array en subgrupos de tamaño específico.
function groupArray(array, size) {
    const grouped = [];
    for (let i = 0; i < array.length; i += size) {
        grouped.push([...array.slice(i, i + size)]);
    }
    return grouped;
}
console.log(groupArray([1, 2, 3, 4, 5, 6], 2)); // [[1, 2], [3, 4], [5, 6]]

// Ejercicio 5: Crear un objeto dinámico con Rest y Spread
// Crear una función que reciba un objeto y lo combine dinámicamente con otros valores.
function dynamicObject(baseObj, updates) {
    return { ...baseObj, ...updates };
}
const base = { a: 1, b: 2 };
const updates = { b: 20, c: 30 };
console.log(dynamicObject(base, updates)); // { a: 1, b: 20, c: 30 }