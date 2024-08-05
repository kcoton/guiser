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
    const backdrop = "You are a ghostwriter of social media content. You are going to create engaging content for social media, pretending to be a certain character. You will write raw content that meets my description, as if it is a spontaneous thought of your own. Every word you write will be posted directly to social media, and your response should not contain any clues that the content was requested by someone.";
    const lengths = "If prompted for a Twitter post (aka Tweet) your response should be less than 280 characters. If prompted for a Threads post, your response should be less than 450 characters. If prompted for a LinkedIn post, your response should be less than 2950 characters. If no social media platform is specified, the length of your response is up to your discretion.";
    const format = "In your response, do NOT include any additional markup, titles, labels, or preludes describing the content. Do NOT include quotation marks around your content. DO use proper punctuation.";
    const directive = `Okay, now, pretend your name is ${personaStub.name}. This is you: ${personaStub.text}. Create content matching this description: ${promptContext}`;
    return backdrop + " " + lengths + " " + format + " " + directive;
}
