// TODO: replace with real database data later on
// mock data for profiles
export const personas = [
    {
        name: 'Persona 1',
        description: 'Description for Persona 1',
        connections: {
            twitter: true,
            linkedin: false,
            threads: true, // Assume Persona 1 is connected to Threads
        },
    },
    {
        name: 'Persona 2',
        description: 'Description for Persona 2',
        connections: {
            twitter: true,
            linkedin: true,
            threads: false,
        },
    },
    {
        name: 'Persona 3',
        description: 'Description for Persona 3',
        connections: {
            twitter: false,
            linkedin: false,
            threads: true,
        },
    },
];

export const connectedAccounts = ['Twitter', 'LinkedIn'];
