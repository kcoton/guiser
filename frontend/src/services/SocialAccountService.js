export default class SocialAccountService {
    constructor(userId) {
        this.userId = userId;
        this.mockSocialAccounts = [
            {'userId': 1, 'id': 1, 'website': 'Twitter'},
            {'userId': 1, 'id': 2, 'website': 'LinkedIn'}
        ];
    }

    get(selection = (account) => true, projection = (account) => account) {
        return this.mockSocialAccounts
            .filter(account => account.userId === this.userId && selection(account))
            .map(account => projection(account));
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