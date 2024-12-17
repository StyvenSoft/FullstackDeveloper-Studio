// Nullish Coalescing y Optional Chaining: Conceptos Fundamentales

/*
Descripción:
1. **Nullish Coalescing (`??`)**:
   - Es un operador lógico que devuelve el operando derecho si el operando izquierdo es `null` o `undefined`.
   - Es más específico que el operador OR (`||`), que evalúa falsy values como `0`, `''`, o `false`.

2. **Optional Chaining (`?.`)**:
   - Permite acceder a propiedades anidadas de objetos sin causar errores si alguna propiedad intermedia es `null` o `undefined`.
   - Se utiliza para evitar comprobaciones manuales repetitivas en estructuras complejas.
*/

// =====================================
// Ejemplos avanzados de Nullish Coalescing
// =====================================

// 1. Diferencia entre `??` y `||`
const userAge = 0; // Edad valida pero falsy
console.log(userAge || 18); // 18 (|| considera 0 como falsy)
console.log(userAge ?? 18); // 0 (?? evalúa solo null o undefined)

// 2. Valores predeterminados con objetos
const settings = {
    theme: null,
    notification: true,
}

const selectedTheme = settings.theme ?? 'light'; // Usar 'light' si theme es null/undefined
console.log(selectedTheme); // 'light'

// 3. Uso combinado con valores dinámicos

const imput = undefined;
const processedInput = input ?? 'Valor predeterminado';
console.log(processedInput); // 'Valor predeterminado'

// =====================================
// Ejercicios avanzados/complejos
// =====================================

// Ejercicio 1: Configuración de opciones predeterminadas
function configureSettings(customSettings) {
    const defaultSettings = {
        theme: 'light',
        notifications: true,
        layout: 'grid',
    };
    return {
        theme: customSettings?.theme ?? defaultSettings.theme,
        notifications: customSettings?.notifications ?? defaultSettings.notifications,
        layout: customSettings?.layout ?? defaultSettings.layout,
    };
}
console.log(configureSettings({ theme: 'dark', layout: null }));
// { theme: 'dark', notifications: true, layout: 'grid' }

// Ejercicio 2: Acceso seguro a datos anidados
function getCity(userData) {
    return userData?.profile?.address?.city ?? 'City not found';
}
const userWithAddress = { profile: { address: { city: 'Metropolis' } } };
console.log(getCity(userWithAddress)); // 'Metropolis'
const userWithoutAddress = {};
console.log(getCity(userWithoutAddress)); // 'City not found'

// Ejercicio 3: Manejo de listas opcionales
function getUserNames(userList) {
    return userList?.map(user => user.name) ?? [];
}
const existingUsers = [{ name: 'Steveen' }, { name: 'Daniela' }];
console.log(getUserNames(existingUsers)); // ['Steveen', 'Daniela']
console.log(getUserNames(null)); // []

// Ejercicio 4: Evaluar configuraciones dinámicas
const configs = {
    apiEndpoint: null,
    timeout: 5000,
};
function getAPIEndpoint(config) {
    return config?.apiEndpoint ?? 'https://default-api.com';
}
console.log(getAPIEndpoint(configs)); // 'https://default-api.com'

// Ejercicio 5: Verificar disponibilidad de propiedades
const library = {
    books: [
        { title: 'JavaScript: The Good Parts' },
        { title: 'Eloquent JavaScript' },
    ],
};
function findBook(library, index) {
    return library?.books?.[index]?.title ?? 'Book not found';
}
console.log(findBook(library, 0)); // 'JavaScript: The Good Parts'
console.log(findBook(library, 5)); // 'Book not found'

/*
- Nullish Coalescing (`??`) y Optional Chaining (`?.`) son herramientas que mejoran la legibilidad y robustez del código.
- `??` debe usarse en lugar de `||` cuando se quieran considerar solo `null` o `undefined` como valores "vacíos".
- `?.` evita errores en estructuras anidadas, especialmente útil en datos provenientes de APIs o configuraciones dinámicas.
*/