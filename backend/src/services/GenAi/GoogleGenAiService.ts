import IPersonaStub from './IPersonaStub';
import GenAiServiceError from './GenAiServiceError';
import IGenAiService from './IGenAiService';
import * as util from './utils';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';

export default class GoogleGenAiService implements IGenAiService {
    private readonly apiKey: string;
    private readonly modelType: string;
    private readonly model: GenerativeModel;

    constructor() {
        this.apiKey = '' + process.env.GOOGLE_AI_API_KEY;
        if (this.apiKey === 'undefined') {
            console.error('Missing Google AI API key');
        }
        this.modelType = 'gemini-1.5-flash';
        this.model = new GoogleGenerativeAI(this.apiKey).getGenerativeModel({ model: this.modelType });
    }

    public async getTextContent(personaStub: IPersonaStub, promptContext: string): Promise<string> {
        const prompt = util.makePrompt(personaStub, promptContext);
        let content;
        try {
            content = (await this.model.generateContent(prompt)).response.text();
        } catch (error) {
            console.error(error); // one we want to see
            throw new GenAiServiceError(`Failure to get text response from GoogleGenerativeAI model ${this.modelType}`);
        }
        return content;
    }
}
