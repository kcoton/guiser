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
    logout: (state) => {
      state.user = null;
      state.sid = null;
    }
  }
});

export const { sync, storeDbUser, storeUser, addAuthToken, addContent, logout } = userSlice.actions;
export default userSlice.reducer;
