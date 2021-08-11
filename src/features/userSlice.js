import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    register: (state, action) => {
      state.user = action.payload;
    },
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },

  },

});

export const { register, login, logout } = userSlice.actions;


export const selectUser = (state) => state.user.user;



export default userSlice.reducer;
