import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import { IPersona } from "../models/Persona";
import mongoose from "mongoose";

export default class UserController {
    public getUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const externalId = req.query.externalId as string;
            if (!externalId) {
                res.status(400).json({ error: 'externalId is required' });
                return;
            }

            const user: IUser | null = await User.findOne({ externalId: externalId }).lean();
            if (!user) {
                res.status(404).json({ error: `user with matching externalId not found` });
                return;
            }

            res.status(200).json({ result: user });
        } catch (error) {
            this.handleGeneralError(res, error);
        }
    }

    public createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const externalId: string = req.body.externalId as string;
            if (!externalId) {
                res.status(400).json({ error: 'externalId is required' });
                return;
            }

            const user: IUser = (await User.create({ externalId: externalId })).toJSON();
            res.status(200).json({ result: user });
        } catch (error) {
            if ((error as any)?.code === 11000) {
                res.status(409).json({ error: 'user with externalId already exists' });
            } else {
                this.handleGeneralError(res, error);
            }
        }
    }

    public createPersona = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId: string = req.params.userId as string;
            const { name, text } = req.body as { name: string, text: string };
            for (const [key, value] of Object.entries({ 'userId': userId, 'name': name, 'text': text })) {
                if (!value) {
                    res.status(400).json({ error: `${key} is required` });
                    return;
                }
            }

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                res.status(400).json({ error: 'userId is invalid' });
                return;
            }

            const user: IUser | null = await User.findById(userId);
            if (!user) {
                res.status(404).json({ error: 'user with matching id not found' });
                return;
            }

            let newPersona: IPersona = { name: name, text: text } as IPersona;
            user.personas.push(newPersona);
            await user.save();
            newPersona = user.personas[user.personas.length - 1];
            res.status(201).json({ result: newPersona });
        } catch (error) {
            this.handleGeneralError(res, error);
        } 
    }

    public deletePersona = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId: string = req.params.userId as string;
            const personaId = req.query.personaId as string;
            for (const [key, value] of Object.entries({ 'userId': userId, 'personaId': personaId })) {
                if (!value) {
                    res.status(400).json({ error: `${key} is required` });
                    return;
                }
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    res.status(400).json({ error: `${key} is invalid` });
                    return;
                }
            }

            const user: IUser | null = await User.findById(userId);
            if (!user) {
                res.status(404).json({ error: 'user with matching id not found' });
                return;
            }

            const persona: IPersona | undefined = user.personas.find(p => p._id == personaId);
            if (!persona) {
                res.status(404).json({ error: 'persona with matching id not found' });
                return;
            }

            persona.delete();
            user.save();
            res.status(200).json({ result: personaId });
        } catch (error) {
            this.handleGeneralError(res, error);
        } 
    }

    private handleGeneralError = (res: Response, error: unknown): void => {
        const errorMessage = (error as Error)?.message ?? 'An unexpected error occurred';
        res.status(500).json({ error: errorMessage });
    }
}
