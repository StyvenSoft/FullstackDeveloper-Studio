// 2.1. Exportación nombrada
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// 2.3. Renombrar al importar
// Puedes usar un alias para evitar conflictos de nombres o mejorar la legibilidad.
export const multiply = (a, b) => a * b;

// 2.4. Exportar todo desde otro módulo
// Archivo: mathUtils.js
export * from './constants.js';