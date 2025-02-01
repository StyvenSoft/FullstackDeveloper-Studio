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

// Ejemplo práctico: Gestión de productos
// En un sistema de inventarios, podríamos querer separar los datos de productos para diferentes módulos como ventas o logística.
type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    supplier: string;
};

// Vista para ventas (solo datos relevantes)
type SalesView = Pick<Product, "id" | "name" | "price">;

// Vista para logística (solo datos de inventario)
type LogisticsView = Pick<Product, "id" | "name" | "stock" | "supplier">;

const salesProduct: SalesView = {
    id: 101,
    name: "Laptop",
    price: 1200,
};

const logisticsProduct: LogisticsView = {
    id: 101,
    name: "Laptop",
    stock: 50,
    supplier: "Tech Warehouse",
};

// Ejercicios avanzados/complejos
// Ejercicio 1: Vista de usuarios activos
// Crea un tipo que seleccione solo las propiedades necesarias para mostrar usuarios activos en una tabla.

type UserPerson = {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    lastLogin: Date;
};

type ActiveUserView = Pick<UserPerson, "id" | "name" | "isActive">;

const users: UserPerson[] = [
    { id: 1, name: "Hugo", email: "hugo@example.com", isActive: true, lastLogin: new Date("2025-01-01") },
    { id: 2, name: "Pilar", email: "pilar@example.com", isActive: false, lastLogin: new Date("2025-01-15") },
    { id: 3, name: "Charlie", email: "charlie@example.com", isActive: true, lastLogin: new Date("2025-01-10") },
];

// Filtrar usuarios activos
const getActiveUsers = (users: UserPerson[]): ActiveUserView[] => {
    return users
        .filter((user) => user.isActive)
        .map(({ id, name, isActive }) => ({ id, name, isActive }));
};

const activeUsers: ActiveUserView[] = getActiveUsers(users);
console.log('Usuarios activos: ', activeUsers);


// Ejercicio 2: Informe de proveedores
// Crea un tipo que represente un informe básico para proveedores, seleccionando solo las propiedades clave.

type Supplier = {
    id: number;
    name: string;
    contactEmail: string;
    contactPhone: string;
    rating: number;
    location: string;
};

type SupplierReport = Pick<Supplier, "id" | "name" | "rating">;

const suppliers: Supplier[] = [
    { id: 1, name: "Supplier A", contactEmail: "a@suppliers.com", contactPhone: "1234567890", rating: 4.5, location: "Bogotá" },
    { id: 2, name: "Supplier B", contactEmail: "b@suppliers.com", contactPhone: "9876543210", rating: 3.8, location: "Medellín" },
    { id: 3, name: "Supplier C", contactEmail: "c@suppliers.com", contactPhone: "5678901234", rating: 4.0, location: "Cali" },
];

// Generar informe básico de proveedores
const generateSupplierReport = (suppliers: Supplier[]): SupplierReport[] => {
    return suppliers.map(({ id, name, rating }) => ({ id, name, rating }));
}

const supplierReports: SupplierReport[] = generateSupplierReport(suppliers);
console.log('Informes de proveedores: ', supplierReports);

// Ejercicio 3: Configuración dinámica de campos

type ConfigurableFields = {
    id: number;
    label: string;
    placeholder: string;
    required: boolean;
    maxLength: number;
}

type TextFieldConfig = Pick<ConfigurableFields, "label" | "placeholder" | "required">;

const textFieldConfig: TextFieldConfig = {
    label: "Username",
    placeholder: "Ingrese su nombre de usuario",
    required: true,
}

// Función para generar un campo configurado
const generateField = (config: TextFieldConfig): string => {
    return `
        <label>${config.label}</label>
        <input type="text" placeholder="${config.placeholder}" ${config.required ? "required" : ""}>
    `;
}

// Ejemplo de uso con la configuración
const fieldHTML: string = generateField(textFieldConfig);
console.log("HTML generado para el campo: ");
console.log(fieldHTML);

// Crear múltiples configuraciones dinámicas
const multipleFieldConfigs: TextFieldConfig[] = [
    { label: "Email", placeholder: "Ingrese su email", required: true },
    { label: "password", placeholder: "Ingrese su password", required: true },
    { label: "Phone number", placeholder: "Ingrese su número de celular", required: false },
];

// Generar HTML para múltiples campos
const generateMultipleFields = (configs: TextFieldConfig[]): string => {
    return configs.map(generateField).join("\n");
}

const multipleFieldsHTML: string = generateMultipleFields(multipleFieldConfigs);
console.log("HTML generado para múltiples campos");
console.log(multipleFieldsHTML);
