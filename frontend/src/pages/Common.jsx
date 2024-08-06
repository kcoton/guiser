import { getUser, createUser } from '../services/UserService.js';

export const getDbUser = async (externalId) => {
    try {
        return (await getUser(externalId)) ?? (await createUser(externalId));
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const sliderSettings = (slideLength) => {
    return {
        dots: true,
        infinite: slideLength >= 5 ? true : false,
        speed: 500,
        slidesToShow: slideLength >= 5 ? 5 : slideLength,
        slidesToScroll: 1,
        centerPadding: '10px',
        responsive: [
            {
                breakpoint: 768, // md
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true
                }
            },
            {
                breakpoint: 600, // sm
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true
                }
            }
        ]
    }
};