import { Request, Response } from "express";
import User, { IUser } from "../models/User";

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
                res.status(404).json({ error: `User with externalId ${externalId} not found.` });
                return;
            }

            res.status(200).json({ result: user });
        } catch (error) {
            this.handleError(res, error);
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
            this.handleError(res, error);
        }
    }

    private handleError = (res: Response, error: unknown): void => {
        const errorMessage = (error as Error)?.message ?? 'An unexpected error occurred.';
        res.status(500).json({ error: errorMessage });
    }
}
