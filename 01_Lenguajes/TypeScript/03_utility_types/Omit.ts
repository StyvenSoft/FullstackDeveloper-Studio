// ========================================
//  Omit<T, K> en TypeScript
// ========================================

/* 
Omit<T, K> es un Utility Type de TypeScript que nos permite crear un nuevo tipo
basado en `T`, excluyendo una o más propiedades especificadas en `K`.

Esto es útil cuando queremos reutilizar un tipo pero necesitamos eliminar ciertas propiedades.
*/

// Ejemplo básico
// Esto es útil cuando queremos mostrar datos de usuario sin exponer la contraseña.

interface UserBasic {
    id: number;
    name: string;
    email: string;
    password: string;
}

type PublicUser = Omit<UserBasic, 'password'>;

const userBasic: PublicUser = {
    id: 1,
    name: "Steveen",
    email: "steveen@gmail.com",
};

console.log(userBasic);

// Ejemplo de facturación
interface Invoice {
    invoiceId: string;
    custumerName: string;
    amount: number;
    paymentStatus: 'paid' | 'pending' | 'overdue';
    createdAt: Date;
    updatedAt: Date;
}

type InvoiceSummary = Omit<Invoice, 'createdAt' | 'updatedAt'>;

const invoice: InvoiceSummary = {
    invoiceId: "inv12234",
    custumerName: "Company FG",
    amount: 28000,
    paymentStatus: "pending",
};

console.log(invoice);
