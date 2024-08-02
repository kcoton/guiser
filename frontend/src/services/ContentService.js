import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASEURL_BACK;

async function createContent(userId, personaId, text, isRejected) {
    if (!baseUrl) {
        throw new Error('baseUrl is required');
    }

    if (!userId) {
        throw new Error('userId is required');
    }

    if (!personaId) {
        throw new Error('personaId is required');
    }

    if (!text) {
        throw new Error('text is required');
    }

    if (typeof isRejected != 'boolean') {
        throw new Error('isRejected is required');
    }

    const response = await axios.post(`${baseUrl}/user/${userId}/persona/${personaId}/content`, { text, isRejected });

    if (!response.data) {
        throw new Error('malformed response does not contain data');
    }

    if (!response.data.result) {
        throw new Error('response does not contain result');
    }

    return response.data.result;
}

async function generateText(persona, promptContext) {
    if (!baseUrl) {
        throw new Error('baseUrl is required');
    }

    const { name, text } = persona;

    if (!name) {
        throw new Error('persona.name is required');
    }

    if (!text) {
        throw new Error('persona.text is required');
    }

    if (!promptContext) {
        throw new Error('promptContext is required');
    }

    const response = await axios.post(`${baseUrl}/content/generate/text`, {
        personaStub: { name, text },
        promptContext,
    });

    if (!response.data) {
        throw new Error('malformed response does not contain data');
    }

    if (!response.data.result) {
        throw new Error('response does not contain result');
    }

    return response.data.result;
}

async function postToApp(userId, personaId, contentId, appSeqNo) {
    if (!baseUrl) {
        throw new Error('baseUrl is required');
    }

    if (!userId) {
        throw new Error('userId is required');
    }

    if (!personaId) {
        throw new Error('personaId is required');
    }

    if (!contentId) {
        throw new Error('contentId is required');
    }

    if (!appSeqNo) {
        throw new Error('appSeqNo is required');
    }

    const response = await axios.patch(
        `${baseUrl}/user/${userId}/persona/${personaId}/content/${contentId}/${appSeqNo}`,
    );

    if (!response.data) {
        throw new Error('malformed response does not contain data');
    }

    if (!response.data.result) {
        throw new Error('response does not contain result');
    }

    return response.data.result;
}

export { createContent, generateText, postToApp };
