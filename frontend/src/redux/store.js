import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import resolverReducer from './resolverSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    resolver: resolverReducer
  }
});

export default store;
