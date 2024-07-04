import GenAiServiceError from './GenAiServiceError';
import IPersona from '../../models/IPersona';

export function makePrompt(persona: IPersona, promptContext: string): string {
  const errMsg = (fieldName: string) => `${fieldName} is required to make a prompt.`; 
  if (!persona.name) {
    throw new GenAiServiceError(errMsg('persona.name'));
  }
  if (!persona.content) {
    throw new GenAiServiceError(errMsg('persona.content'));
  }
  if (!promptContext) {
    throw new GenAiServiceError(errMsg('promptContext'));
  }
  return `Pretend your name is ${persona.name}. This is you: ${persona.content}. Now: ${promptContext}`;
}

