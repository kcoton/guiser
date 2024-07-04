import Together from "together-ai";
import IPersona from "../../models/IPersona";
import IGenAiService from './IGenAiService';
import * as util from './utils';

export default class TogetherService implements IGenAiService {
  

  // more or less copied from their docs
  public async getTextContent(persona: IPersona, promptContext: string): Promise<string> { 
    const together = new Together({
      apiKey: process.env.TOGETHER_API_KEY,
    });
    const content = util.makePrompt(persona, promptContext);
    const response = await together.chat.completions.create({
      model: "meta-llama/Llama-3-8b-chat-hf",
      messages: [{ role: "user", content: content }],
    });    
    return (response as {choices: [{message: {content: string}}]}).choices[0].message.content;    
  }
}
