import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASEURL_BACK;

async function getSocialApps() {
    const response = await axios.get(
        `${baseUrl}/social-app`
    );

    if (!response.data) {
        throw new Error('malformed response does not contain data');
    }

    if (!response.data.result) {
        throw new Error('response does not contain result');
    }

    return response.data.result;
}

export { getSocialApps };
