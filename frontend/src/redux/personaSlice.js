// personaSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import PersonaService from '../services/PersonaService';

// TODO: Replace hardcoded externalId and _id values with dynamic values from GET /user
export const EXTERNAL_ID = '106396242553744029996';
export const _ID = '668c7ce0fc7c063ca7021e5b';

// Define the async thunk
export const fetchPersonas = createAsyncThunk(
  'persona/fetchPersonas',
  async () => {
    const personaService = new PersonaService(EXTERNAL_ID, _ID);
    const personas = await personaService.get();
    return personas;
  }
);

export const personaSlice = createSlice({
  name: 'persona',
  initialState: [],
  reducers: {
    createPersona: (state, action) => {
      state.push(action.payload);
    },
    updatePersona: (state, action) => {
      const updatedPersona = action.payload;
      const id = updatedPersona._id;
      const persona = state.find((persona) => persona._id === id);
      if (persona) {
        persona.name = updatedPersona.name;
        persona.text = updatedPersona.text;
      }
    },
    deletePersona: (state, action) => {
      const id = action.payload;
      return state.filter((persona) => persona._id !== id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPersonas.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { createPersona, updatePersona, deletePersona } = personaSlice.actions;

export default personaSlice.reducer;