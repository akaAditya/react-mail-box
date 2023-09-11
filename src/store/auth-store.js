import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: "",
  email: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    addTokenHandler(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", state.token);
    },

    addEmailHandler(state, action) {
      state.email = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice
