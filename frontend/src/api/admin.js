import apiClient from './apiClient';

/**
 * Admin related Endpoints
 */
const adminApi = {
    // Get dashboard statistics
    getStats: () => apiClient.get('/admin/stats'),

    // Manage departments
    getDepartments: () => apiClient.get('/departments'),
    createDepartment: (deptData) => apiClient.post('/departments', deptData),

    // Manage counters
    getCounters: () => apiClient.get('/counters'),
    createCounter: (counterData) => apiClient.post('/counters', counterData),
};

export default adminApi;
