import IPersonaStub from "./IPersonaStub";

export default interface IGenAiService {
    getTextContent(personaStub: IPersonaStub, promptContext: string): Promise<string>;
}