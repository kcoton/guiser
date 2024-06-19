import { OAuth2Client } from 'google-auth-library';
import fs from 'fs';
import { google_clientID } from '../../../keys.js';

export const parseGoogleID = async (credential: string) => {
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: google_clientID as string
    });
    const payload = ticket.getPayload();
    return payload && {
        uid: payload['sub'],
        name: payload['name'],
        email: payload['email']
    }
}

export const getSessionUser = (sessionID: any) => {

    // TODO - lookup session ID in DB and return user if session alive
    const session = fs.readFileSync('session.json', 'utf8');
    return JSON.parse(session).uid;
};

export const setSessionUser = (dtls: any) => {

    // TODO - generate /unique/ session ID and associate with user ID in DB
    const sessionID = Math.random().toString(36);
    const session = JSON.stringify({ sid: sessionID, uid: dtls }, null, 2);
    console.log("SessionID: " + sessionID);
    fs.writeFileSync('session.json', session, 'utf8');
    console.log(`Logging in as: ${dtls && dtls.name}`);
    return sessionID;
};
