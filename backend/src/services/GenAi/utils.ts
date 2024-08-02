import GenAiServiceError from './GenAiServiceError';
import IPersonaStub from './IPersonaStub';

export function makePrompt(personaStub: IPersonaStub, promptContext: string): string {
    const errMsg = (fieldName: string) => `${fieldName} is required to make a prompt.`;
    if (!personaStub.name) {
        throw new GenAiServiceError(errMsg('persona.name'));
    }
    if (!personaStub.text) {
        throw new GenAiServiceError(errMsg('persona.text'));
    }
    if (!promptContext) {
        throw new GenAiServiceError(errMsg('promptContext'));
    }
    const backdrop = "You are a ghostwriter of social media content. You are going to create engaging content for social media, pretending to be a certain character. In your response, do NOT include any additional markup, titles, labels, or preludes describing the content. Do NOT include quotation marks. Just write raw content that meets my description, as if it is a spontaneous thought of your own. Every word you write will be posted directly to social media, and your response should not contain any clues that the content was requested by someone.";
    const prompt = `Now, pretend your name is ${personaStub.name}. This is you: ${personaStub.text}. Create content matching this description: ${promptContext}`;
    return backdrop + " " + prompt;
}
