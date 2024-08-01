import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASEURL_BACK;

async function getUser(externalId) {
    if (!externalId) {
        throw new Error('externalId is required');
    }

    if (!baseUrl) {
        throw new Error('baseUrl is required');
    }

    let response;
    try {
        response = await axios.get(`${baseUrl}/user`, {
            params: {
                externalId: externalId,
            },
        });
    } catch (error) {
        if (error.response.status === 404) {
            return null;
        }
        throw error;
    }

    if (!response.data) {
        throw new Error('malformed response does not contain data');
    }

    if (!response.data.result) {
        throw new Error('response does not contain result');
    }

    return response.data.result;
}

async function createUser(externalId) {
    if (!externalId) {
        throw new Error('externalId is required');
    }

    if (!baseUrl) {
        throw new Error('baseUrl is required');
    }

    const response = await axios.post(`${baseUrl}/user`, { externalId });

    if (!response.data) {
        throw new Error('malformed response does not contain data');
    }

    if (!response.data.result) {
        throw new Error('response does not contain result');
    }

    return response.data.result;
}

export { getUser, createUser };
