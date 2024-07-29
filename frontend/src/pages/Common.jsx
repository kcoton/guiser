import { getUser, createUser } from '../services/UserService.js'

export const getDbUser = async (externalId) => {
    try {
        return await getUser(externalId) ?? await createUser(externalId);
    } catch (err) {
        console.error(err);
        throw err;
    }
}
