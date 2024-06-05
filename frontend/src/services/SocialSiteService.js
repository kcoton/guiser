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

    get(selection = (site) => true, projection = (site) => site) {
        return this.mockSocialSites.filter(site => selection(site)).map(site => projection(site));
    }
}