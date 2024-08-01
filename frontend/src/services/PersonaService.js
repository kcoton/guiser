import axios from 'axios';

export default class PersonaService {
    constructor(userId, id) {
        this.url = `${import.meta.env.VITE_BASEURL_BACK}/user`;
        this.userId = userId;
        this.id = id;
        this.personas = [];
    }

    async get(selection = (persona) => true, projection = (persona) => persona) {
        try {
            const url = `${this.url}/personas?externalId=${this.userId}`;
            const response = await axios.get(url);
            this.personas = response.data.result;
            return this.personas;
        } catch (error) {
            console.error('Error fetching personas:', error);
            return [];
        }
    }

    async create(name, text) {
        try {
            const url = `${this.url}/${this.id}/persona`;
            const persona = { name, text };
            const response = await axios.post(url, persona);
            const newPersona = response.data.result;
            return newPersona;
        } catch (error) {
            console.error('Error creating persona:', error);
        }
    }

    async update(personaId, name, text) {
        try {
            const url = `${this.url}/${this.id}/persona?personaId=${personaId}`;
            const persona = { name, text };
            const response = await axios.patch(url, persona);
            const updatedPersona = response.data.result;
            return updatedPersona;
        } catch (error) {
            console.error('Error updating persona:', error);
        }
    }

    async delete(personaId) {
        try {
            const url = `${this.url}/${this.id}/persona?personaId=${personaId}`;
            const response = await axios.delete(url);
            const deletedId = response.data.result;
            return deletedId;
        } catch (error) {
            console.error('Error deleting persona:', error);
        }
    }
}
