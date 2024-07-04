import IPersona from "../../models/IPersona";
import GenAiServiceError from "./GenAiServiceError";
import IGenAiService from "./IGenAiService";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

export default class GoogleGenAiService implements IGenAiService {
    private readonly apiKey: string;
    private readonly modelType: string
    private readonly model: GenerativeModel;
    
    constructor() {
        this.apiKey = "" + process.env.GOOGLE_AI_API_KEY;
	if (this.apiKey === "undefined") { console.error("Missing Google AI API key") };
        this.modelType = 'gemini-1.5-flash';
        this.model = new GoogleGenerativeAI(this.apiKey).getGenerativeModel({ model: this.modelType});
    }
    
    private makePrompt(persona: IPersona, promptContext: string): string {
        const errMsg = (fieldName: string) => `${fieldName} is required to make a prompt.`; 
        if (!persona.name) {
            throw new GenAiServiceError(errMsg('persona.name'));
        }
        if (!persona.content) {
            throw new GenAiServiceError(errMsg('persona.content'));
        }
        if (!promptContext) {
            throw new GenAiServiceError(errMsg('promptContext'));
        }
        return `Pretend your name is ${persona.name} and you are ${persona.content}: ${promptContext}`;
    }

    public async getTextContent(persona: IPersona, promptContext: string): Promise<string> {
        const prompt = this.makePrompt(persona, promptContext);
        let content;
        try {
            content = (await this.model.generateContent(prompt))?.response?.text();
        }
        catch (err) {
            throw new GenAiServiceError(`Failure to get text response from GoogleGenerativeAI model ${this.modelType}`);
        }

        return content;
    }
}
