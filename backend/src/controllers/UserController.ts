import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import { IPersona } from "../models/Persona";
import mongoose from "mongoose";

export default class UserController {
    public getUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const externalId: string | null = this.extractExternalId(req, res, true);
            if (!externalId) { return; }

            const user: IUser | null = await User.findOne({ externalId: externalId }).lean().exec();
            if (!user) {
                res.status(404).json({ error: 'user with matching externalId not found' });
                return;
            }

            res.status(200).json({ result: user });
        } catch (error) {
            this.handleGeneralError(res, error);
        }
    }

    public createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const externalId: string | null = this.extractExternalId(req, res, false);
            if (!externalId) { return; }

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
            const { userId, name, text } = this.extractPersonaFields(req, res);
            if (!userId || !name || !text) { return; }

            const user: IUser | null = await this.findUserById(userId, res);
            if (!user) { return; }

            let newPersona: IPersona = { name, text } as IPersona;
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
            const { userId, personaId } = this.extractObjectIds(req, res);
            if (!userId || !personaId) return;

            const { name, text } = req.body as { name: string, text: string };
            if (!name && !text) {
                res.status(400).json({ error: 'at least one of name or text are required' });
                return;
            }

            const user = await this.findUserById(userId, res);
            if (!user) { return; }

            const persona: IPersona | null = this.findPersonaById(personaId, user, res);
            if (!persona) { return; }

            if (name) { persona.name = name; }
            if (text) { persona.text = text; }

            await user.save();
            res.status(200).json({ result: persona });
        } catch (error) {
            this.handleGeneralError(res, error);
        }
    }

    public deletePersona = async (req: Request, res: Response): Promise<void> => {
        try {
            const { userId, personaId } = this.extractObjectIds(req, res);
            if (!userId || !personaId) { return; }

            const user: IUser | null = await this.findUserById(userId, res);
            if (!user) { return; }

            const persona: IPersona | null = this.findPersonaById(personaId, user, res);
            if (!persona) { return; }

            persona.delete();
            await user.save();
            res.status(200).json({ result: personaId });
        } catch (error) {
            this.handleGeneralError(res, error);
        }
    }

    private extractExternalId(
        req: Request, res: Response, isQuerySource: boolean
    ): string | null {
        const externalId: string = (isQuerySource ? req.query : req.body).externalId as string;
        if (!externalId) {
            res.status(400).json({ error: 'externalId is required' });
            return null;
        }

        return externalId;
    }

    private extractExternalIdFromBody(req: Request, res: Response): string | null {
        const externalId: string = req.body.externalId as string;
        if (!externalId) {
            res.status(400).json({ error: 'externalId is required' });
            return null;
        }

        return externalId;
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

    private findPersonaById(personaId: string, user: IUser, res: Response): IPersona | null {
        const persona: IPersona | undefined = user.personas?.find(
            p => p._id == personaId && !p.deleted
        );
        if (!persona) {
            res.status(404).json({ error: 'persona with matching id not found' });
            return null;
        }

        return persona;
    }

    private extractPersonaFields(
        req: Request, res: Response
    ): { userId: string | null, name: string | null, text: string | null } {
        const userId: string = req.params.userId as string;
        const { name, text } = req.body as { name: string, text: string };
        
        for (const [fieldName, fieldValue] of Object.entries({ userId, name, text })) {
            if (!fieldValue) {
                res.status(400).json({ error: `${fieldName} is required` });
                return { userId: null, name: null, text: null };
            }
        }

        return { userId, name, text };
    }

    private extractObjectIds(
        req: Request, res: Response
    ): { userId: string | null, personaId: string | null } {
        const userId: string = req.params.userId as string;
        const personaId = req.query.personaId as string;
        
        for (const [fieldName, fieldValue] of Object.entries({ userId, personaId })) {
            if (!fieldValue || !mongoose.Types.ObjectId.isValid(fieldValue)) {
                res.status(400).json(
                    { error: `${fieldName} is ${fieldValue ? 'invalid' : 'required'}` }
                );
                return { userId: null, personaId: null };
            }
        }

        return { userId, personaId };
    }

    private handleGeneralError(res: Response, error: unknown): void {
        const errorMessage = (error as Error)?.message ?? 'An unexpected error occurred';
        res.status(500).json({ error: errorMessage });
    }
}
