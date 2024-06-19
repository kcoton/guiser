import { GoogleGenerativeAI } from "@google/generative-ai";
import * as keys from "../../../keys";

export default class ContentGenerationService {
    constructor(userId) {
        this.userId = userId;
        this.model = new GoogleGenerativeAI(keys.google_genAI)
            .getGenerativeModel({ model: "gemini-1.5-flash"});
    }

    async getContent(persona, promptContext) {
        const prompt = `Pretend your name is ${persona.name} and you are ${persona.content}: ${promptContext}`;
        const result = await this.model.generateContent(prompt);
        const response = result.response;
        return response.text();
    }
}
