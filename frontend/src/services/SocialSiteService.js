export default class SocialSiteService {
    constructor(userId) {
        this.userId = userId;
        this.mockSocialSites = [
            {'id': 1, 'website': 'Twitter'},
            {'id': 2, 'website': 'Facebook'},
            {'id': 3, 'website': 'LinkedIn'},
            {'id': 4, 'website': 'Instagram'}
        ];
    }

    get(sel = (p) => true, proj = (p) => p) {
        return this.mockSocialSites.filter(p => sel(p)).map(p => proj(p));
    }
}