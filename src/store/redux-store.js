import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-store";
import emailSlice from "./mail-store";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        email: emailSlice.reducer,
    }
})

export default store;