import IPersona from "../../models/IPersona";

export default interface IGenAiService {
    getContent(persona: IPersona, promptContext: string): Promise<string>;
}