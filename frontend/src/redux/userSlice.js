import { createSlice } from '@reduxjs/toolkit';
import PersonaService from '../services/PersonaService';
import ContentService from '../services/ContentService';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    sid: null
  },
  reducers: {
    sync: (state, action) => {
      state.user = action.payload.user;
      state.sid = action.payload.sid;
    },
    init: (state) => {
      const userId = state.user.uid;
      const personaService = new PersonaService(userId, '668c7ce0fc7c063ca7021e5b');
      const contentService = new ContentService(userId);
      state.user.nextContentId = contentService.get().length + 1;
      // TODO: replace mock call
      const personas = personaService.getMock().map(persona => ({
        ...persona,
        content: contentService.get(contentEntry => contentEntry.personaId === persona.id),
      }));
      state.user.personas = personas;
    },
    addContent: (state, action) => {
      const {personaId, text, isRejected} = action.payload;
      const persona = state.user.personas.find(p => p.id === personaId);
      const content = {
        id: state.user.nextContentId++,
        userId: state.user.uid,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        text: text,
        posted: 0,
        isRejected: isRejected
      };
      persona.content.push(content);
    },
    logout: (state) => {
      state.user = null;
      state.sid = null;
    }
  }
});

export const { sync, init, logout, addContent } = userSlice.actions;
export default userSlice.reducer;
