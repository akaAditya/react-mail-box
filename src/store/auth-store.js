import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: "",
  email: "",
  isLoggedIn: false
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    addTokenHandler(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", state.token);
      if(state.token){
        state.isLoggedIn = true;
      }
      // state.isLoggedIn = !!state.token
    },

    addEmailHandler(state, action) {
      state.email = action.payload;
      localStorage.setItem('email', state.email)
    },
    
    logoutHandler(){
      localStorage.removeItem('token','email')
    }
  },
});

export const authActions = authSlice.actions;
export default authSlice
