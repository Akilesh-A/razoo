import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLogin = true; // Set login status to true when user logs in
    },
    clearUser: (state) => {
      state.user = null;
      state.isLogin = false; // Set login status to false when user logs out
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
