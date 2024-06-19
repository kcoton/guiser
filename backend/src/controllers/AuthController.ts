// Stub
import { Request, Response } from 'express';
import * as AuthService from '../services/AuthService';

/*
export async function getMasterUserDtls(req: Request, res: Response) {
    try {
        const dtls = await AuthService.getMasterUserDtls();
        res.json(dtls);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
}
 */

export async function setGoogleUserDtls(req: Request, res: Response) {
    // Verify CSRF safe
    const cookieToken = req.cookies.g_csrf_token;
    const bodyToken = req.body.g_csrf_token;
    if (!(cookieToken && bodyToken && cookieToken === bodyToken)) {
        res.status(403).send('CSRF token invalid');
        return;
    }
    try {
        const dtls = await AuthService.parseGoogleID(req.body.credential);
        AuthService.setMasterUserDtls(dtls);
        res.status(200).send('Internal server login successful.');        
    } catch (error) {
        res.status(500).json({ error: `Internal server error`});
    }
}
