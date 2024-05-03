import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.currentUser = null;
    },
    updateStart: (state, action) => {
      state.loading = true;
    },
    updateSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signInFailure,
  signInStart,
  signInSuccess,
  updateFailure,
  updateSuccess,
  updateStart,
} = userSlice.actions;
export default userSlice.reducer;
