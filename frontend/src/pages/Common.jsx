import { getUser, createUser } from '../services/UserService.js';

export const getDbUser = async (externalId) => {
    try {
        return (await getUser(externalId)) ?? (await createUser(externalId));
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};