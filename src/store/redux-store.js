import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-store";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
})

export default store;