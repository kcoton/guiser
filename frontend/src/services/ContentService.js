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

    const response = await axios.post(
        `${baseUrl}/user/${userId}/persona/${personaId}/content`,
        { text, isRejected }
    );

    if (!response.data) {
        console.error('malformed response does not contain data');
    }

    if (!response.data.result) {
        throw new Error('response does not contain result');
    }

    return response.data.result;
}

async function generateText(persona, promptContext) {
    const { name, text } = persona;
    const response = await fetch(import.meta.env.VITE_BASEURL_BACK + '/content/generate/text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ personaStub: {name, text}, promptContext })
    });
    const data = await response.json();	 
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return data['result'];
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
        `${baseUrl}/user/${userId}/persona/${personaId}/content/${contentId}/${appSeqNo}`
    );

    if (!response.data) {
        console.error('malformed response does not contain data');
    }

    if (!response.data.result) {
        throw new Error('response does not contain result');
    }

    return response.data.result;    
}

export { createContent, generateText, postToApp };
