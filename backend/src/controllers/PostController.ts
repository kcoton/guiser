import { Request, Response } from "express";
import IPersona from "../models/IPersona";
import IGenAiService from "../services/GenAi/IGenAiService";

export default class PostController {
    private readonly genAiService: IGenAiService;

    constructor(genAiService: IGenAiService) {
        this.genAiService = genAiService;
    }

    public generateText = async (req: Request, res: Response) => {
        const { persona, promptContext } = req.body as { persona: IPersona; promptContext: string };

        try {
            const content = await this.genAiService.getContent(persona, promptContext);
            res.status(200).json({ result: content });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}
