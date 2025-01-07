// ========================================
// Union Types (Tipos de Unión) en TypeScript
// ========================================

/* 
Los Union Types permiten que una variable pueda tener más de un tipo, proporcionando flexibilidad y control 
sobre los valores que puede almacenar una variable. Este concepto es muy útil cuando trabajamos con datos 
que pueden variar en tipo, como ID que pueden ser números o cadenas, o resultados que pueden ser datos o errores.

Características principales:

    - Permite manejar múltiples tipos posibles para una variable.
    - Mejora la claridad y precisión del código mediante anotaciones de tipos.
    - Obliga a los desarrolladores a manejar los casos en que el valor pueda tener diferentes tipos.

*/

// Un tipo de unión en TypeScript se define usando el símbolo |, que indica que una variable puede ser de cualquiera 
// de los tipos especificados.
let idUser: string | number;
idUser = 101;
idUser = "A101";

// Ejemplo básico: Gestión de ID
type ID = string | number;

// Función que acepta un ID y lo procesa
function getUserById(id:ID): void {
    if (typeof id == "string") {
        console.log(`Buscando usuario por ID de texto: ${id}`);
    } else {
        console.log(`Buscando usuario por ID numérico: ${id}`);
    }
}

// Uso de función
getUserById("USR123");
getUserById("456")

// Ejemplo avanzado: Facturación con múltiples métodos de pago

// Un tipo de unión que define los métodos de pago aceptados

type PaymentMethod = "credit" | "debit" | "cash";

// Función que procesa un pago
function processPayment(amount:number, method: PaymentMethod):void {
    switch (method) {
        case "credit":
            console.log(`Procesando pago de: $${amount} con tarjeta de crédito.`);
            break;
        case "debit":
            console.log(`Procesando pago de $${amount} con tarjeta de débito.`);
            break;
        case "cash":
            console.log(`Procesando pago de $${amount} en efectivo.`);
            break;
        default:
            console.log("Método de pago no válido.");
    }
}

// Uso de la función
processPayment(11000, "credit");
processPayment(25000, "debit");
processPayment(35000, "cash");
