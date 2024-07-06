export default class ContentService {
    constructor(userId) {
        this.userId = userId;
        this.mockContent = [
            {'id': 1, 'personaId': 1, 'userId': '106396242553744029996', 'timestamp': '2024-02-15 13:45:05', 'text': "Wow Costco never raised the price of the hotdog during COVID! #CostcoCares", 'posted': 0x7, 'isRejected': false},
            {'id': 2, 'personaId': 1, 'userId': '106396242553744029996', 'timestamp': '2024-03-17 17:16:47', 'text': "I hate it when people don't return their carts and leave them wherever in the parking lot. #Animals", 'posted': 0x3, 'isRejected': false},
            {'id': 3, 'personaId': 2, 'userId': '106396242553744029996', 'timestamp': '2023-11-11 11:11:11', 'text': "Buy my crypto course now and become a COIN CHAMP before you miss out forever!", 'posted': 0x0, 'isRejected': false},
            {'id': 4, 'personaId': 3, 'userId': '106396242553744029996', 'timestamp': '2023-12-25 00:00:00', 'text': "Quantum gravity is like a startup that can't ship a product after 70 years! Michio Kaku is out of control!", 'posted': 0xF, 'isRejected': false}
        ];
    }

    get(selection = (content) => true, projection = (content) => content) {
        return this.mockContent
            .filter(content => content.userId === this.userId && selection(content))
            .map(content => projection(content));
    }

    create() {
        console.log('TODO: implement ContentService.create');
    }

    update(socialId) {
        console.log('TODO: implement ContentService.update');
    }

    delete(socialId) {
        console.log('TODO: implement ContentService.delete');
    }

  async generateText(persona, promptContext) {
      const { content, ...partialPersona } = persona;
      console.log(partialPersona);
      const response = await fetch(import.meta.env.VITE_BASEURL_BACK + '/content/generate/text', {
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
