import { Request, Response } from "express";
import SocialApp from "../models/SocialApp";

export default class SocialAppController {
    public getAll = async (req: Request, res: Response) => {
        try {
            const result: any = await SocialApp.find();
            res.status(200).json({ result: result });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    public create = async (req: Request, res: Response) => {
        try {
            const { name } = req.body;
            let socialApp: any = await SocialApp.create({ name: name });
            res.status(200).json({ result: socialApp });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}
