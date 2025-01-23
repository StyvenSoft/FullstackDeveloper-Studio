// ========================================
//  Utility Type Pick en TypeScript
// ========================================

/* 
El utility type Pick es una herramienta de TypeScript que permite crear un nuevo tipo seleccionando 
un subconjunto de las propiedades de un tipo existente. Esto es útil cuando quieres trabajar
con solo una parte de un objeto, mejorando la reutilización y claridad del código.

Pick<T, K>
T: El tipo base del que se extraerán las propiedades.
K: Un conjunto de claves (en forma de string literal o unión) que existen en T.

*/

// Ejemplo básico
// Supongamos que tienes un tipo de usuario completo, pero solo necesitas un subconjunto de propiedades para cierta operación:

type User = {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
};

type UserPreview = Pick<User, "id" | "name">;

const preview: UserPreview = {
    id: 1,
    name: "Steveen Echeverri"
};

// Ejemplo avanzado: Gestión de facturación

// En un sistema de facturación, puede ser útil trabajar con diferentes vistas o representaciones de un cliente según el contexto.

// Tipo completo del cliente
type Client = {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    creditLimit: number;
};

// Vista reducida para una lista de clientes
type ClientListView = Pick<Client, "id" | "name" | "email">;

// Vista detallada para administración de crédito
type ClientCreditView = Pick<Client, "id" | "name" | "creditLimit">;

const clientList: ClientListView[] = [
    { id: 1, name: "Tech Corp", email: "contact@techcorp.com" },
    { id: 2, name: "Agro Supplies", email: "sales@agrosupplies.com" },
];

const creditDetails: ClientCreditView = {
    id: 1,
    name: "Tech Corp",
    creditLimit: 50000,
};
