import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import personaReducer from './personaSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    personas: personaReducer
  }
});

export default store;
