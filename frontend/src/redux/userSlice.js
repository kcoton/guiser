import { createSlice } from '@reduxjs/toolkit';
import PersonaService from '../services/PersonaService';
import PostService from '../services/PostService';

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
      const personaService = new PersonaService(userId);
      const postService = new PostService(userId);
      state.user.nextPostId = postService.get().length + 1;
      const personas = personaService.get().map(persona => ({
        ...persona,
        posts: postService.get(post => post.personaId === persona.id),
      }));
      state.user.personas = personas;
    },
    addPost: (state, action) => {
      const {personaId, content, isRejected} = action.payload;
      const persona = state.user.personas.find(p => p.id === personaId);
      const post = {
        id: state.user.nextPostId++,
        userId: state.user.uid,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        content: content,
        posted: 0,
        isRejected: isRejected
      };
      persona.posts.push(post);
    },
    logout: (state) => {
      state.user = null;
      state.sid = null;
    }
  }
});

export const { sync, init, logout, addPost } = userSlice.actions;
export default userSlice.reducer;
