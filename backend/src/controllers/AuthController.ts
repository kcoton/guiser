import { Request, Response } from 'express';
import * as AuthService from '../services/AuthService';
import axios from 'axios';
import fs from 'fs';

const THREADS_TYPE = 'THREADS';

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
	const reqID = req.body.state;
        AuthService.newSessionUser(reqID, dtls);

	const baseURL = process.env.BASEURL_FRONT;
        const pageURL = baseURL + "/login";
	res.redirect(pageURL);
    } catch (error) {
        res.status(500).json({ error: `Internal server error`});
    }
}

export async function authorizeThreadsUser(req: Request, res: Response) {

    const code = req.query.code;
    const pid = req.query.state as string;
    
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

	// TODO service method to associate personaID with access_token in DB
	const assocRecord = {
	    pid: pid,
	    type: 'THREADS',
	    token: token
	};
	fs.writeFileSync('associationRecord.json', JSON.stringify(assocRecord), 'utf8');

	// construct final response
	const baseURL = process.env.BASEURL_FRONT;
	const pageURL = baseURL + "/resolver?dest=" + encodeURIComponent('/dashboard'); // TODO-update
	res.redirect(pageURL);
    } catch (error) {
	console.error(error);
        res.status(500).json({ error: 'Internal server error.' });	
    }
}

export async function getTwitterAuthCode(req: Request, res: Response) {
    const url = 'https://twitter.com/i/oauth2/authorize?response_type=code&client_id=' + process.env.TWITTER_CLIENT_ID + '&redirect_uri=' + process.env.TWITTER_REDIRECT_URI + '&scope=tweet.read%20tweet.write%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain';
    res.redirect(url);
}

export async function processTwitterAuthCode(req: Request, res: Response) {
    const authCode = req.query.code;
    console.log("AuthCode: " + authCode);
    
    const url = 'https://api.twitter.com/2/oauth2/token?grant_type=authorization_code&client_id=' + process.env.TWITTER_CLIENT_ID + '&redirect_uri=' + process.env.TWITTER_REDIRECT_URI + '&code=' + authCode + '&code_verifier=challenge' ;
    const basicSecret = Buffer.from(`${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_SECRET}`).toString('base64');
    console.log("BasicAuth: " + basicSecret);
    console.log(url);
    const headers = {
        'Authorization': `Basic ${basicSecret}`
    };
      
    try {
        const response = await axios.post(url, null, { headers: headers });
        const token = response.data.access_token as string;
        console.log("Token: " + token);
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.json(error);
    }
}

// function to be called once to exchange initial requestID for generated sessionID
export async function getSessionID(req: Request, res: Response) {
    try {
        const dtls = await AuthService.getSessionID(req.headers.token as string);
        res.set('Content-Type', 'application/json');
        res.json(dtls);
	res.status(302).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
}

// function to be called whenever to exchange sessionID for (up-to-date) user details
export async function getSessionUser(req: Request, res: Response) {
    try {
        const dtls = await AuthService.getSessionUser(req.headers.token as string);
        res.set('Content-Type', 'application/json');
        res.json(dtls);
	res.status(302).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
}
