import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import userReducer from './userSlice';

const persistConfig = {
    key: 'guiser',
    storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
    reducer: {
        user: persistedReducer,
    },
});

const persistor = persistStore(store);

export { store, persistor };
