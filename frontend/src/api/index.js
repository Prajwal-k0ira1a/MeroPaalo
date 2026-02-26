import authApi from './auth';
import tokenApi from './token';
import adminApi from './admin';

/**
 * Central Export for all API modules
 * This makes it very easy to import what you need in your components.
 * Example: import { authApi } from '@/api';
 */
export {
    authApi,
    tokenApi,
    adminApi
};
