import { OAuth2Client } from 'google-auth-library';
import fs from 'fs';

export const newRequestRecord = (reqID: string, type: string, token: string) => {
    // TODO convert to DB write
    const reqRecord = {
	reqID: reqID,
	type: type,
	token: token	
    };
    fs.writeFileSync('requestRecord.json', JSON.stringify(reqRecord), 'utf8');
    return reqRecord;
}

export const parseGoogleID = async (credential: string) => {
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENTID as string
    });
    const payload = ticket.getPayload();
    return payload && {
        uid: payload['sub'],
        name: payload['name'],
        email: payload['email']
    }
}

export const getSessionID = (reqID: string) => {
    // TODO - lookup request in DB and get associated requestID
    const request = JSON.parse(fs.readFileSync('requestRecord.json', 'utf8'));
    if (request && request.reqID === reqID) {
	return request.sid;
    } else {
	throw new Error("Bad sessionID request");
    }
}

export const getSessionUser = (sessionID: string) => {

    // TODO - lookup sessionID in DB and return it and user if session alive
    const session = fs.readFileSync('session.json', 'utf8');
    return JSON.parse(session);
};

export const newSessionUser = (reqID: string, dtls: any) => {
    const timey = new Date().getTime(); 
    const randy = Math.floor(Math.random() * 1000000);     
    const sessionID = timey.toString() + randy.toString();
    const session = JSON.stringify({sid: sessionID, user: dtls });

    // TODO store session record in DB
    fs.writeFileSync('session.json', session, 'utf8');
    newRequestRecord(reqID, 'SESSION', sessionID);
};

