import { getUser, createUser } from '../services/UserService.js'
import axios from 'axios';

export const requestSession = async () => {
    const reqID = sessionStorage.getItem("reqID");
    const baseURL = import.meta.env.VITE_BASEURL_BACK;
    const endpoint = baseURL + "/auth/login";
    try {
        const res = await axios.get(endpoint, {
            headers: { token: reqID }
        });
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getDbUser = async (externalId) => {
    try {
        return await getUser(externalId) ?? await createUser(externalId);
    } catch (err) {
        console.error(err);
        throw err;
    }
}