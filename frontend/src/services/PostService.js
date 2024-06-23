export default class PostService {
    constructor(userId) {
        this.userId = userId;
        this.mockPosts = [
            {'id': 1, 'personaId': 1, 'userId': '106396242553744029996', 'timestamp': '2024-02-15 13:45:05', 'content': "Wow Costco never raised the price of the hotdog during COVID! #CostcoCares", 'posted': 0x7, 'isRejected': false},
            {'id': 2, 'personaId': 1, 'userId': '106396242553744029996', 'timestamp': '2024-03-17 17:16:47', 'content': "I hate it when people don't return their carts and leave them wherever in the parking lot. #Animals", 'posted': 0x3, 'isRejected': false},
            {'id': 3, 'personaId': 2, 'userId': '106396242553744029996', 'timestamp': '2023-11-11 11:11:11', 'content': "Buy my crypto course now and become a COIN CHAMP before you miss out forever!", 'posted': 0x0, 'isRejected': false},
            {'id': 4, 'personaId': 3, 'userId': '106396242553744029996', 'timestamp': '2023-12-25 00:00:00', 'content': "Quantum gravity is like a startup that can't ship a product after 70 years! Michio Kaku is out of control!", 'posted': 0xF, 'isRejected': false}
        ];
    }

    get(selection = (post) => true, projection = (post) => post) {
        return this.mockPosts
            .filter(post => post.userId === this.userId && selection(post))
            .map(post => projection(post));
    }

    create() {
        console.log('TODO: implement PostService.create');
    }

    update(socialId) {
        console.log('TODO: implement PostService.update');
    }

    delete(socialId) {
        console.log('TODO: implement PostService.delete');
    }

    async generateText(persona, promptContext) {
        const { posts, ...partialPersona } = persona;
        const response = await fetch('http://localhost:3001/post/generate/text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ persona: partialPersona, promptContext })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return data['result'];
    }
}
