// ========================================
// Tipos Condicionales (Conditional Types) en TypeScript
// ========================================

/* 
Los Conditional Types en TypeScript permiten definir tipos dinámicos basados en una condición. 
Esto agrega flexibilidad al sistema de tipos y se utiliza para crear tipos que dependen de otras estructuras o valores.

Casos de uso
    - Aplicar lógica condicional en los tipos.
    - Crear tipos más precisos o restringidos.
    - Modelar datos que varían según ciertos parámetros.
*/

// Ejemplo avanzado: Sistema de facturación

// Supongamos que queremos modelar un sistema donde los detalles de facturación dependen de si el cliente es una persona o una empresa.

type Person = {
    namePerson: string;
    agePerson: number;
};

type Company = {
    companyName: string;
    vatnumber: string;
};

type BillingDetails<T> = T extends Person
    ? { paymentMethod: "Credit Card" | "PayPal"; }
    : { bankAccount: string; swiftCode: string; };

type PersonBilling = BillingDetails<Person>;
type CompanyBilling = BillingDetails<Company>;

const johnBilling: PersonBilling = { paymentMethod: "Credit Card" };
const techCorpBilling: CompanyBilling = {
    bankAccount: "12345678",
    swiftCode: "TECH1234",
};
