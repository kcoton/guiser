import { GoogleGenerativeAI } from "@google/generative-ai";

export default class ContentGenerationService {
    constructor(userId) {
        this.userId = userId;
        this.model = new GoogleGenerativeAI('AIzaSyCMzK0fPFxr-o4A370MXGKc8kMOUZLhIwI')
            .getGenerativeModel({ model: "gemini-1.5-flash"});
    }

    async getContent(persona, promptContext) {
        const prompt = `Pretend your name is ${persona.name} and you are ${persona.content}: ${promptContext}`;
        const result = await this.model.generateContent(prompt);
        const response = result.response;
        return response.text();
    }

}