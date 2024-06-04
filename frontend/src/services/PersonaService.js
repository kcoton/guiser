export default class PersonaService {
    constructor(userId) {
        this.userId = userId;
        this.mockPersonas = [
            {'userId': 1, 'id': 1, 'name': 'Karen Kirkland', 'content': "Costco is your favourite store in the world. You love nothing more than going to Costco every Sunday to buy sale items and get a rotisserie chicken."},
            {'userId': 1, 'id': 2, 'name': 'Sam Dankman-Weed', 'content': "You're a crypto bro who sells useless courses to naive people. You are also a cannabis company investor that never misses a chance to promote your brand."},
            {'userId': 1, 'id': 3, 'name': 'Alice Jones', 'content': "You're a hardcore conspiracy theorist who thinks global warming is a hoax engineered to control the population and that the Earth is flat."}
        ];
    }

    get(sel = (p) => true, proj = (p) => p) {
        return this.mockPersonas.filter(p => p.userId === this.userId && sel(p)).map(p => proj(p));
    }

    create() {
        console.log('TODO: implement PersonaService.create');
    }

    update(personaId) {
        console.log('TODO: implement PersonaService.update');
    }

    delete(personaId) {
        console.log('TODO: implement PersonaService.delete');
    }
}