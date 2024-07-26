import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    db: null,
    sid: null
  },
  reducers: {
    sync: (state, action) => {
      state.user = action.payload.user;
      state.sid = action.payload.sid;
      state.db = action.payload.db;
    },
    storeDbUser: (state, action) => {
      state.db = action.payload;
    },
    storeUser: (state, action) => {
      state.user = action.payload.user;
      state.db = action.payload.db;
      state.sid = action.payload.sid;
    },
    addAuthToken: (state, action) => {
      const { personaId, authToken } = action.payload;
      const persona = state.db?.personas?.find(p => p._id === personaId);
      if (!persona) {
        console.error('persona not found');
        return;
      }
      persona.authTokens = persona.authTokens.filter(t => 
        t.platform !== authToken.platform
      );
      persona.authTokens.push(authToken);
    },
    addContent: (state, action) => {
      const { personaId, newContentEntry } = action.payload;
      const persona = state.db?.personas?.find((p) => p._id === personaId);
      if (!persona) {
        console.error('persona not found');
        return;
      }
      persona.content.push(newContentEntry);
    },
    addPersona: (state, action) => {
      state.db?.personas?.push(action.payload);
    },
    updatePersona: (state, action) => {
      const updatedPersona = action.payload;
      const personaId = updatedPersona._id;
      const persona = state.db?.personas?.find((p) => p._id === personaId);
      if (!persona) {
        console.error('persona not found');
        return;
      }
      persona.name = updatedPersona.name;
      persona.text = updatedPersona.text;
    },
    updatePosted: (state, action) => {
      const { personaId, contentId, posted } = action.payload;
      const persona = state.db?.personas?.find((p) => p._id === personaId);
      if (!persona) {
        console.error('persona not found');
        return;
      }
      const content = persona.content?.find((c) => c._id === contentId);
      if (!content) {
        console.error('content not found');
        return;
      }
      content.posted = posted;
    },
    deletePersona: (state, action) => {
      const personaId = action.payload;
      state.db.personas = state.filter((p) => p._id !== personaId);
    },
    logout: (state) => {
      state.user = null;
      state.sid = null;
    }
  }
});

export const { sync, storeDbUser, storeUser, addAuthToken, addContent, addPersona, updatePersona, updatePosted, deletePersona, logout } = userSlice.actions;
export default userSlice.reducer;
