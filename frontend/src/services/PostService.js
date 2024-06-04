export default class PostService {
    constructor(userId) {
        this.userId = userId;
        this.mockPosts = [
            {'id': 1, 'userId': 1, 'personaId': 1, 'name': 'Karen Kirkland', 'timestamp': '2024-02-15 13:45:05', 'post': "Wow Costco never raised the price of the hotdog during COVID! #CostcoCares", 'posted': 0x7},
            {'id': 2, 'userId': 1, 'personaId': 1, 'name': 'Karen Kirkland', 'timestamp': '2024-03-17 17:16:47', 'post': "I hate it when people don't return their carts and leave them wherever in the parking lot. #Animals", 'posted': 0x3},
            {'id': 3, 'userId': 1, 'personaId': 2, 'name': 'Sam Dankman-Weed', 'timestamp': '2023-11-11 11:11:11', 'post': "Buy my crypto course now and become a COIN CHAMP before you miss out forever!", 'posted': 0x0},
            {'id': 4, 'userId': 1, 'personaId': 3, 'name': 'Eric Whinestein', 'timestamp': '2023-12-25 00:00:00', 'post': "Quantum gravity is like a startup that can't ship a product after 70 years! Michio Kaku is out of control!", 'posted': 0xF}
        ];
    }

    get(sel = (p) => true, proj = (p) => p) {
        return this.mockPosts.filter(p => p.userId === this.userId && sel(p)).map(p => proj(p));
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
}