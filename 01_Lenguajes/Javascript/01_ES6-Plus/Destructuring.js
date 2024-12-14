// Destructuring en JavaScript

// El destructuring es una técnica de JavaScript que permite extraer valores de arrays o propiedades de objetos 
// y asignarlos a variables de manera más sencilla y legible.

// Ejemplo básico con arrays
const [n1, n2] = [10, 20]; 
console.log(n1, n2); // Salida: 10, 20

// Ejemplo básico con objetos
const client = { fullName: "Steveen", ageClient: 25 };
const { fullName, ageClient } = client; 
console.log(fullName, ageClient); //Salida  Steveen/25


// 1.1. Destructuring con arrays
// Extrae valores por posición en un array.

const [a, b] = [10, 20];
console.log(a, b); // Salida: 10, 20

// Skip (omitir) elementos en el destructuring:
const [, second, third] = [1, 2, 3];
console.log(second, third); // Salida: 2, 3

// Uso con valores predeterminados:
const [x = 5, y = 10] = [undefined];
console.log(x, y); // Salida: 5, 10

// Intercambio de valores (swap):
let num1 = 1, num2 = 2;
[num1, num2] = [num2, num1];
console.log(num1, num2); // Salida: 2, 1

// 1.2. Destructuring con objetos
// Extrae valores por nombre de propiedad.

const user = { name: "Steveen", age: 25 };
const { name, age } = user;
console.log(name, age); // Salida: Steveen, 25

// Renombrar variables:
const { name: username, age: userAge } = user;
console.log(username, userAge); // Salida: Steveen, 25

// Valores predeterminados:
const { role = "Guest" } = user;
console.log(role); // Salida: Guest

// Anidación:
const nestedObject = { user: { id: 1, info: { name: "Julio" } } };
const {
  user: {
    info: { name: nestedName },
  },
} = nestedObject;
console.log(nestedName); // Salida: Julio

// 1.3. Destructuring en funciones
// Uso para descomponer parámetros de objetos y arrays.

const displayUser = ({ name, age }) => {
  console.log(`Nombre: ${name}, Edad: ${age}`);
};
displayUser(user); // Salida: Nombre: Steveen, Edad: 25

// Con arrays:
const sumFirstTwo = ([first, second]) => first + second;
console.log(sumFirstTwo([3, 4])); // Salida: 7

// --- Sección 2: Ejercicios avanzados ---
// ---------------------------------------

// 2.1. Mezcla de destructuring con arrays y objetos:
const data = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];
const [, { name: secondName }] = data;
console.log(secondName); // Salida: Jane

// 2.2. Destructuring combinado con el operador rest:
const [first, ...rest] = [10, 20, 30, 40];
console.log(first); // Salida: 10
console.log(rest); // Salida: [20, 30, 40]

// 2.3. Destructuring en un objeto con parámetros dinámicos:
const dynamicKey = "email";
const userProfile = {
  name: "Steveen",
  [dynamicKey]: "Steveen@example.com",
};
const { [dynamicKey]: email } = userProfile;
console.log(email); // Salida: Steveen@example.com

// --- Ejercicios prácticos para implementar ---
// ---------------------------------------------

// Ejercicio 1:
// Extraer las primeras dos ciudades y la última ciudad de este array.
const cities = ["New York", "Paris", "Tokyo", "Berlin", "Sydney"];
// Resultado esperado: "New York", "Paris", "Sydney"

// Ejercicio 2:
// Renombrar las propiedades de un objeto y crear una nueva variable para un valor predeterminado.
// Objeto base:
const product = { id: 101, name: "Laptop", price: 1500 };
// Resultado esperado: id -> productId, name -> productName, stock -> 100 (predeterminado)

// Ejercicio 3:
// Crear una función que reciba un objeto con `title`, `author`, y `year`, y devuelva un string formateado.
// Ejemplo de entrada:
// { title: "1984", author: "George Orwell", year: 1949 }
// Resultado esperado: "1984 fue escrito por George Orwell en 1949"