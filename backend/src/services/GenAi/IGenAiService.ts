import IPersona from "../../models/IPersona";

export default interface IGenAiService {
    getTextContent(persona: IPersona, promptContext: string): Promise<string>;
}