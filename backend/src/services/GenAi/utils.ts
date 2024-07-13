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
  return `Pretend your name is ${personaStub.name}. This is you: ${personaStub.text}. Now: ${promptContext}`;
}

