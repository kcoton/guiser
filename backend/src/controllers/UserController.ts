import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import { IPersona } from "../models/Persona";
import mongoose from "mongoose";
import { IContent } from "../models/Content";
import { validationResult, matchedData } from "express-validator";

export default class UserController {
    public getUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const reqData = matchedData(req);

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

            const reqData = matchedData(req);

            const user: IUser = (await User.create({ externalId: reqData.externalId })).toJSON();
            res.status(200).json({ result: user });
        } catch (error) {
            if ((error as any)?.code === 11000) {
                res.status(409).json({ error: 'user with externalId already exists' });
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
            const reqData = matchedData(req);
            const user: IUser | null = await User.findOne({ externalId: reqData.externalId })
                .lean()
                .exec();
            
            if (!user) {
                res.status(404).json({ errors: ['user with matching externalId not found'] });
                return;
            }
            const personas: IPersona[] = user?.personas || [];
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

            const reqData = matchedData(req);

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

            const reqData = matchedData(req);

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

            const reqData = matchedData(req);

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

    public createContent = async (req: Request, res: Response): Promise<void> => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }

            const reqData = matchedData(req);

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
            res.status(400).json({ error: 'userId is invalid' });
            return null;
        }

        const user: IUser | null = await User.findById(userId);
        if (!user) {
            res.status(404).json({ error: 'user with matching id not found' });
            return null;
        }

        return user;
    }

    private findPersonaById(personaId: string, personas: IPersona[], res: Response): IPersona | null {
        const persona: IPersona | undefined = personas?.find(p => 
            p._id == personaId && !p.deleted
        );
        if (!persona) {
            res.status(404).json({ error: 'persona with matching id not found' });
            return null;
        }

        return persona;
    }

    private handleGeneralError(res: Response, error: unknown): void {
        const errorMessage = (error as Error)?.message ?? 'An unexpected error occurred';
        res.status(500).json({ error: errorMessage });
    }
}
