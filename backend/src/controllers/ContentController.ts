import { Request, Response } from "express";
import IPersonaStub from "../services/GenAi/IPersonaStub";
import IGenAiService from "../services/GenAi/IGenAiService";

export default class ContentController {
    private readonly genAiService: IGenAiService;

    constructor(genAiService: IGenAiService) {
        this.genAiService = genAiService;
    }

    public generateText = async (req: Request, res: Response): Promise<void> => {
        try {
            const { personaStub, promptContext } = req.body as { personaStub: IPersonaStub; promptContext: string };
            const content: string = await this.genAiService.getTextContent(personaStub, promptContext);
            res.status(200).json({ result: content });
        } catch (error) {
            res.status(500).json({ error: (error as Error)?.message ?? 'An unexpected error occured.'});
        }
    }
}
