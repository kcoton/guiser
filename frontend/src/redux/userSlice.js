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
    logout: (state) => {
      state.user = null;
      state.sid = null;
    }
  }
});

export const { sync, storeDbUser, logout } = userSlice.actions;
export default userSlice.reducer;
