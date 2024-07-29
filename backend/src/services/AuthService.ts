import { OAuth2Client } from 'google-auth-library';

export const parseGoogleID = async (credential: string) => {
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENTID as string
    });
    const payload = ticket.getPayload();
    return payload && {
        externalId: payload['sub'],
        name: payload['name'],
        email: payload['email']
    }
}
