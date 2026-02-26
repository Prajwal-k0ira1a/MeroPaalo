import apiClient from './apiClient';

/**
 * Token and Queue related Endpoints
 */
const tokenApi = {
    // Get all tokens
    getAllTokens: () => apiClient.get('/tokens'),

    // Issue a new token
    issueToken: (tokenData) => apiClient.post('/tokens', tokenData),

    // Get status of a specific token
    getTokenStatus: (tokenId) => apiClient.get(`/tokens/${tokenId}`),

    // Delete/Cancel a token
    cancelToken: (tokenId) => apiClient.delete(`/tokens/${tokenId}`),
};

export default tokenApi;
