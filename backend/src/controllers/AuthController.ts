import { Request, Response } from 'express';
import * as AuthService from '../services/AuthService';
import axios from 'axios';
import fs from 'fs';

export async function loginGoogleUser(req: Request, res: Response) {
    // Verify CSRF safe
    const cookieToken = req.cookies.g_csrf_token;
    const bodyToken = req.body.g_csrf_token;
    if (!(cookieToken && bodyToken && cookieToken === bodyToken)) {
        res.status(403).json( { error: 'CSRF token validation failed' } );
        return;
    }
    // Parse/validate then interpret by redirect into joint session with client
    try {
        const dtls = await AuthService.parseGoogleID(req.body.credential);
        const sessionID = AuthService.setSessionUser(dtls);

        const baseURL = process.env.BASEURL_FRONT;
        const pageURL = baseURL + "/login";
        const qStr = `?token=${encodeURIComponent(sessionID)}`;

        res.set('Location', pageURL + qStr);
        res.status(302).send();
    } catch (error) {
        res.status(500).json({ error: `Internal server error`});
    }
}

export async function authorizeThreadsUser(req: Request, res: Response) {
    const timestamp = new Date().getTime(); 
    const randy = Math.floor(Math.random() * 1000000); 
    const requestID = timestamp.toString() + randy.toString();
    const code = req.query.code;

    // exchange oauth code for short term token
    var url = process.env.THREADS_GRAPH_API_BASE_URL as string;
    url += '/oauth/access_token';
    var qstr = (new URLSearchParams({
	client_id: process.env.THREADS_APP_ID,
	client_secret: process.env.THREADS_SECRET,
	grant_type: 'authorization_code',
	redirect_uri: process.env.THREADS_REDIRECT_URI,
	code
    } as any)).toString();
    try {
	var response = await axios.post(url, qstr, {
	    headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
	});
	var token = response.data.access_token as string;
	console.log("Short term access token:"+token);
	
	// exchange short term token for long term
	url = process.env.THREADS_GRAPH_API_BASE_URL as string;
	url += '/access_token';
	qstr = (new URLSearchParams({
	    client_secret: process.env.THREADS_SECRET,
	    grant_type: 'th_exchange_token',
	    access_token: token,
	} as any)).toString();
	response = await axios.get(url + '?' + qstr);
	token = response.data.access_token as string;
	console.log("Long term access token:"+token);

	// TODO service method to associate requestID in db with obtained access_token
	const reqRecord = JSON.stringify({
	    reqID: requestID,
	    type: 'THREADS',
	    token: token
	}, null, 2);	
	fs.writeFileSync('requestRecord.json', reqRecord, 'utf8');

	// construct final response
	const baseURL = process.env.BASEURL_FRONT;
	const pageURL = baseURL + "/threadsResolver";	
	res.redirect(pageURL + `?reqID=${encodeURIComponent(requestID)}`);
    } catch (error) {
	console.error(error);	
        res.status(500).json({ error: 'Internal server error.' });	
    }
}

export async function linkThreadsUser(req: Request, res: Response) {
    // TODO service to verify session id in request

    // TODO service method to get request log from DB, and selected request (or false)
    const reqRecord = JSON.parse(fs.readFileSync('requestRecord.json', 'utf8'));    
    if (reqRecord.reqID = req.body.reqID) {
	
	// TODO service method to associate personaID with access_token in DB
	const assocRecord = JSON.stringify({
	    pid: req.body.pid,
	    type: 'THREADS',
	    token: reqRecord.token
	}, null, 2);
	fs.writeFileSync('associationRecord.json', assocRecord, 'utf8');
	res.json({sid: req.body.sid, pid: req.body.pid}); // ??? anything better
	res.status(200).send();
    } else {
	// Redirect to home page ???
	console.error("no matching request record");
	res.redirect(process.env.BASEURL_FRONT + '/');
    }
}
    
export async function getSessionUser(req: Request, res: Response) {
    try {
        const dtls = await AuthService.getSessionUser(req.headers.token);
        res.set('Content-Type', 'application/json');
        res.json(dtls);
	res.status(302).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
}
