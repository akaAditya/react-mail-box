import { createSlice } from "@reduxjs/toolkit";

const initialEmailState = {
  mailItems: [],
  sentMails: [],
  count: 0,
};

const emailSlice = createSlice({
  name: "email",
  initialState: initialEmailState,
  reducers: {
    sendMailHandler(state, action) {
      state.mailItems = action.payload;
    },

    sentMailHandler(state, action) {
      state.sentMails = action.payload;
    },
    removeEmailHandler(state, action) {
      let id = action.payload;
      state.sentMails = Object.keys(state.sentMails).filter(
        (item) => item !== id
      );
    },
    countMailHandler(state, action) {
    state.count = action.payload;
    },
  },
});

export const emailActions = emailSlice.actions;
export default emailSlice;
