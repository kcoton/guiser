import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import { IPersona } from "../models/Persona";
import mongoose from "mongoose";
import { IContent } from "../models/Content";
import { validationResult, matchedData } from "express-validator";
import { IAuthToken } from "../models/AuthToken";
import axios from 'axios';
import QueryString from "qs";
import { addSeconds } from "date-fns";

export default class UserController {
    public getUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const reqData: Record<string, any> = matchedData(req);

            const user: IUser | null = await User.findOne({ externalId: reqData.externalId })
                .lean()
                .exec();
            
            if (!user) {
                res.status(404).json({ errors: ['user with matching externalId not found'] });
                return;
            }

            res.status(200).json({ result: user });
        } catch (error) {
            this.handleGeneralError(res, error);
        }
    }

    public createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const reqData: Record<string, any> = matchedData(req);

            const user: IUser = (await User.create({ externalId: reqData.externalId })).toJSON();
            res.status(200).json({ result: user });
        } catch (error) {
            if ((error as any)?.code === 11000) {
                res.status(409).json({ errors: ['user with externalId already exists'] });
            } else {
                this.handleGeneralError(res, error);
            }
        }
    }

    public getPersonas = async (req: Request, res: Response): Promise<void> => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }
            const reqData: Record<string, any> = matchedData(req);
            const user: IUser | null = await User.findOne({ externalId: reqData.externalId })
                .lean()
                .exec();
            
            if (!user) {
                res.status(404).json({ errors: ['user with matching externalId not found'] });
                return;
            }
            const personas: IPersona[] = user.personas.filter(p => !p.deleted);
            res.status(200).json({ result: personas });
        } catch (error) {
            this.handleGeneralError(res, error);
        }
    }

    public createPersona = async (req: Request, res: Response): Promise<void> => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const reqData: Record<string, any> = matchedData(req);

            const user: IUser | null = await this.findUserById(reqData.userId, res);
            if (!user) { return; }

            let newPersona: IPersona = { name: reqData.name, text: reqData.text } as IPersona;
            user.personas.push(newPersona);
            await user.save();
            newPersona = user.personas[user.personas.length - 1].toJSON();
            res.status(201).json({ result: newPersona });
        } catch (error) {
            this.handleGeneralError(res, error);
        }
    }

    public updatePersona = async (req: Request, res: Response): Promise<void> => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const reqData: Record<string, any> = matchedData(req);

            const user = await this.findUserById(reqData.userId, res);
            if (!user) { return; }

            const persona: IPersona | null = this.findPersonaById(reqData.personaId, user.personas, res);
            if (!persona) { return; }

            if (reqData.name) { persona.name = reqData.name; }
            if (reqData.text) { persona.text = reqData.text; }

            await user.save();
            res.status(200).json({ result: persona });
        } catch (error) {
            this.handleGeneralError(res, error);
        }
    }

    public deletePersona = async (req: Request, res: Response): Promise<void> => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const reqData: Record<string, any> = matchedData(req);

            const user: IUser | null = await this.findUserById(reqData.userId, res);
            if (!user) { return; }

            const persona: IPersona | null = this.findPersonaById(reqData.personaId, user.personas, res);
            if (!persona) { return; }

            persona.delete();
            await user.save();
            res.status(200).json({ result: reqData.personaId });
        } catch (error) {
            this.handleGeneralError(res, error);
        }
    }

    public createLinkedInAuthToken = async (req: Request, res: Response): Promise<void> => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const reqData: Record<string, any> = matchedData(req);

            const user: IUser | null = await this.findUserById(reqData.userId, res);
            if (!user) { return; }

            const persona: IPersona | null = this.findPersonaById(reqData.personaId, user.personas, res);
            if (!persona) { return; }

            const response: axios.AxiosResponse | undefined = await this.getLinkedInToken(res, reqData.code);
            if (!response) { return; }

            if (!response.data?.access_token) {
                res.status(400).json({ errors: ['failed to get token in endpoint response'] });
                return;
            }

            if (!response.data?.expires_in) {
                res.status(400).json({ errors: ['failed to get expiry in endpoint response'] });
                return;
            }
            
            let newAuthToken: IAuthToken = { 
                platform: 'LinkedIn', 
                token: response.data.access_token,
                expiry: this.getTokenExpiryDate(response.data.expires_in)
            } as IAuthToken;

            newAuthToken = this.upsertAuthToken(persona, newAuthToken);
            await user.save();
            res.status(200).json({ result: newAuthToken });
        } catch (error) {
            this.handleGeneralError(res, error);
        }
    }

    public createContent = async (req: Request, res: Response): Promise<void> => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const reqData: Record<string, any> = matchedData(req);

            const user: IUser | null = await this.findUserById(reqData.userId, res);
            if (!user) { return; }

            const persona: IPersona | null = this.findPersonaById(reqData.personaId, user.personas, res);
            if (!persona) { return; }

            let newContent: IContent = { text: reqData.text, isRejected: reqData.isRejected } as IContent;
            persona.content.push(newContent);
            newContent = persona.content[persona.content.length - 1];
            await user.save();
            res.status(200).json({ result: newContent });
        } catch (error) {
            this.handleGeneralError(res, error);
        }
    }

    private async findUserById(userId: string, res: Response): Promise<IUser | null> {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400).json({ errors: ['userId is invalid'] });
            return null;
        }

        const user: IUser | null = await User.findById(userId);
        if (!user) {
            res.status(404).json({ errors: ['user with matching id not found'] });
            return null;
        }

        return user;
    }

    private findPersonaById(personaId: string, personas: IPersona[], res: Response): IPersona | null {
        const persona: IPersona | undefined = personas?.find(p => 
            p._id == personaId && !p.deleted
        );
        if (!persona) {
            res.status(404).json({ errors: ['persona with matching id not found'] });
            return null;
        }

        return persona;
    }

    private async getLinkedInToken(res: Response, code: string) : Promise<axios.AxiosResponse | undefined> {
        try {
            return await axios.post(
                'https://www.linkedin.com/oauth/v2/accessToken', 
                QueryString.stringify({
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: process.env.LINKED_IN_REDIRECT_URI,
                    client_id: process.env.LINKED_IN_CLIENT_ID,
                    client_secret: process.env.LINKED_IN_SECRET
                }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );
        } catch (err) {
            res.status(400).json({ errors: ['failed to resolve OAuth code to token'] });
            return;
        }
    }

    private upsertAuthToken(persona: IPersona, newAuthToken: IAuthToken): IAuthToken {
        const matchingPlatformTokenIndex = persona.authTokens.findIndex(token => 
            token.platform === newAuthToken.platform
        );

        if (matchingPlatformTokenIndex > -1) {
            persona.authTokens[matchingPlatformTokenIndex] = newAuthToken;
        } else {
            persona.authTokens.push(newAuthToken);
        }

        return persona.authTokens[
            matchingPlatformTokenIndex > -1 ?
            matchingPlatformTokenIndex :
            persona.authTokens.length - 1
        ];
    }

    private getTokenExpiryDate(expires_in: number): Date {
        const currentDatetime: Date = new Date();
        return addSeconds(currentDatetime, expires_in);
    }

    private handleGeneralError(res: Response, error: unknown): void {
        const errorMessage = (error as Error)?.message ?? 'An unexpected error occurred';
        res.status(500).json({ errors: [errorMessage] });
    }
}
