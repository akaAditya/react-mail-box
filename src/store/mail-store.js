import { createSlice } from "@reduxjs/toolkit";

const initialEmailState = {
    mailItems: [],
    count: 0
}

const emailSlice = createSlice({
name: 'email',
initialState: initialEmailState,
reducers: {
    sendMailHandler(state, action) {
        state.mailItems= action.payload;
        console.log(state.mailItems, 'from redux mail')
    },

    countMailHandler(state, action){
        state.count = state.count+action.payload
    }
}
});


export const emailActions = emailSlice.actions;
export default emailSlice