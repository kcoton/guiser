// Stub
import { Request, Response } from 'express';
import * as AuthService from '../services/AuthService';

export async function getSessionUser(req: Request, res: Response) {
    try {
        const dtls = await AuthService.getSessionUser(req.headers.token);
        res.set('Content-Type', 'application/json');
        res.json(dtls);
        console.log("req.headers.token = " + req.headers.token);
        console.log("req.json = " + JSON.stringify(dtls));
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
}

export async function loginGoogleUser(req: Request, res: Response) {
    // Verify CSRF safe
    const cookieToken = req.cookies.g_csrf_token;
    const bodyToken = req.body.g_csrf_token;
    if (!(cookieToken && bodyToken && cookieToken === bodyToken)) {
        res.status(403).json( { error: 'CSRF token invalid' } );
        return;
    }
    // Parse/validate then interpret by redirect into joint session with client
    try {
        const dtls = await AuthService.parseGoogleID(req.body.credential);
        const sessionID = AuthService.setSessionUser(dtls);

        // TODO - figure out better way to manage client side protocol and host
        const baseURL = "http://localhost:3000";

        const clientPage = baseURL + "/login";
        const qStr = `?token=${encodeURIComponent(sessionID)}`;

        res.set('Location', clientPage + qStr);
        res.status(302).send();
    } catch (error) {
        res.status(500).json({ error: `Internal server error`});
    }
}
