export default class SocialAccountService {
    constructor(userId) {
        this.userId = userId;
        this.mockSocialAccounts = [
            {'userId': 1, 'id': 1, 'website': 'Twitter'},
            {'userId': 1, 'id': 2, 'website': 'LinkedIn'}
        ];
    }

    get(sel = (p) => true, proj = (p) => p) {
        return this.mockSocialAccounts.filter(p => p.userId === this.userId && sel(p)).map(p => proj(p));
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