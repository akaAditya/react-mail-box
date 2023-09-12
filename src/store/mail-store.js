import { createSlice } from "@reduxjs/toolkit";

const initialEmailState = {
    mailItems: []
}

const emailSlice = createSlice({
name: 'email',
initialState: initialEmailState,
reducers: {
    sendMailHandler(state, action) {
        state.mailItems= action.payload;
        console.log(state.mailItems, 'from redux mail')
    }
}
});


export const emailActions = emailSlice.actions;
export default emailSlice