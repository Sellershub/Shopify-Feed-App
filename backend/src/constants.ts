import { existsSync } from 'fs';
import { join } from 'path';

// Common
export const ROOT = __dirname;
export const IS_DEV = existsSync(join(ROOT, '..', '.development.env'));

// API
export const DEFAULT_API_PREFIX = 'api';
export const DEFAULT_API_PORT = 80;

// Swagger
export const DEFAULT_SWAGGER_PREFIX = 'docs';
