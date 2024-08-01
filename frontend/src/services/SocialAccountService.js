export default class SocialAccountService {
    constructor(userId) {
        this.userId = userId;
        this.mockSocialAccounts = [
            { userId: '106396242553744029996', id: 1, siteId: 1 },
            { userId: '106396242553744029996', id: 2, siteId: 3 },
            { userId: '106396242553744029996', id: 3, siteId: 4 },
            { userId: '106396242553744029996', id: 4, siteId: 2 },
        ];
    }

    get(selection = (account) => true, projection = (account) => account) {
        return this.mockSocialAccounts
            .filter((account) => account.userId === this.userId && selection(account))
            .map((account) => projection(account));
    }

    create() {
        console.log('TODO: implement SocialService.create');
    }

    update(socialId) {
        console.log('TODO: implement SocialService.update');
    }

    delete(socialId) {
        console.log('TODO: implement SocialService.delete');
    }
}
