/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: localStorage.getItem('mode')
    ? localStorage.getItem('mode')
    : window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeMode: (state) => {
      if (state.mode === 'light') {
        state.mode = 'dark';
        localStorage.setItem('mode', 'dark');
      } else {
        state.mode = 'light';
        localStorage.setItem('mode', 'light');
      }
    },
  },
});

export const { changeMode } =
  userSlice.actions;

export const selectMode = (state) => state.user.mode;

export default userSlice.reducer;
