import axios from 'axios';

export default class PersonaService {
    constructor(userId, id) {
        this.url = `${import.meta.env.VITE_BASEURL_BACK}/user`;
        this.userId = userId;
        this.id = id;
        this.personas = [];
        this.mockPersonas = [
            {'userId': '106396242553744029996', 'id': 1, 'name': 'Karen Kirkland', 'text': "Costco is your favourite store in the world. You love nothing more than going to Costco every Sunday to buy sale items and get a rotisserie chicken."},
            {'userId': '106396242553744029996', 'id': 2, 'name': 'Sam Dankman-Weed', 'text': "You're a crypto bro who sells useless courses to naive people. You are also a cannabis company investor that never misses a chance to promote your brand."},
            {'userId': '106396242553744029996', 'id': 3, 'name': 'Eric Whinestein', 'text': "You completed a PhD in physics at Harvard but never ended up becoming a physicst. You resent the current state of physics and have proposed your own alternative theory of everything."},
            {'userId': '106396242553744029996', 'id': 4, 'name': 'First Foobar', 'text': "You are a Fizz Buzz!"},
            {'userId': '106396242553744029996', 'id': 5, 'name': 'Second Foobar', 'text': "You are also a Fizz Buzz!"}
        ];
    }

    async get(selection = (persona) => true, projection = (persona) => persona) {
            try {
                const url = `${this.url}/personas?externalId=${this.userId}`;
                const response = await axios.get(url);
                this.personas = response.result;
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
            const newPersona = response.result;
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
            const updatedPersona = response.result;
            return updatedPersona;
        } catch (error) {
            console.error('Error updating persona:', error);
        }
    }

    async delete(personaId) {
        try {
            const url = `${this.url}/${this.id}/persona?personaId=${personaId}`;
            const response = await axios.delete(url);
            const deletedId = response.result;
            return deletedId;
        } catch (error) {
            console.error('Error deleting persona:', error);
        }    }
}