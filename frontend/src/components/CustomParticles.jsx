import React, { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function CustomParticles() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        // success
    };

    const options = useMemo(
        () => ({
            fullScreen: true,
            background: {
                color: {
                    value: '#121212',
                },
            },
            fpsLimit: 50,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: 'grab',
                    },
                    onClick: {
                        enable: false,
                        mode: 'push',
                    },
                    resize: true,
                },
                modes: {
                    grab: {
                        distance: 151.0282506733343,
                        line_linked: {
                            opacity: 1,
                        },
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3,
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                    push: {
                        quantity: 2,
                    },
                    remove: {
                        quantity: 2,
                    },
                },
            },
            particles: {
                number: {
                    value: 130,
                    limit: 160,
                    density: {
                        enable: true,
                        area: 993.6489272731785,
                    },
                },
                color: {
                    value: '#71797E',
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000',
                    },
                    polygon: {
                        sides: 6,
                    },
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false,
                    },
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false,
                    },
                },
                links: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    outModes: {
                        default: 'bounce',
                    },
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200,
                    },
                },
            },
            detectRetina: true,
        }),
        [],
    );

    if (init) {
        return <Particles id='tsparticles' particlesLoaded={particlesLoaded} options={options} />;
    }

    return <></>;
}
