import { OAuth2Client } from 'google-auth-library';

export const parseGoogleID = async (credential: string) => {
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: "440372252508-l6to260fq7m68vhrgvd50lmjl1tk6t7k.apps.googleusercontent.com"
    });
    const payload = ticket.getPayload();
    return payload && {
        uid: payload['sub'],
        name: payload['name'],
        email: payload['email']
    }
}

export const setMasterUserDtls = (dtls: any) => {
    console.log(`Logging in as: ${dtls && dtls.name}`);
    // stub
}
