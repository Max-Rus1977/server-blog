import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Определяем __dirname для ES-модуля
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
// Вернёт корень проекта
export const rootDir = resolve(__dirname, '../'); 