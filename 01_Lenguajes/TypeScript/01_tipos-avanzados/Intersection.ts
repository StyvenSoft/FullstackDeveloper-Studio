// ========================================
// Intersection Types (Tipos de Intersección) en TypeScript
// ========================================

/* 
Los Intersection Types permiten combinar múltiples tipos en uno solo, creando un tipo que posee todas 
las propiedades de los tipos combinados. Esto es útil cuando queremos modelar objetos o entidades que 
deben cumplir múltiples roles o tener propiedades de diferentes tipos.

Características principales:

    - Los tipos de intersección permiten modelar objetos que combinan varias responsabilidades.
    - Un valor debe cumplir con todos los tipos combinados para ser válido.
    - Son útiles para crear entidades más específicas o complejas.

*/

// Los tipos de intersección en TypeScript se crean utilizando el operador &. 
// El resultado es un tipo que combina las propiedades y métodos de todos los tipos involucrados.

type A = { propA: string };
type B = { propB: number };

type AB = A & B;
const obj: AB = { propA: "Hello", propB: 42 };

// Ejemplo básico: Usuario y Empleado

type User = {
    username: string;
    email: string;
};

type Employee = {
    employeeId: number;
    departament: string;
};

// Creamos un tipo que combine ambos
type UserEmployee = User & Employee;

const employee: UserEmployee = {
    username: "steveen",
    email: "steveen@gmail.com",
    employeeId: 12354,
    departament: "IT",
};

console.log(employee);
