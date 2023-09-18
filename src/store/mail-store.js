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
      console.log(state.mailItems, "from redux mail");
    },

    sentMailHandler(state, action) {
      state.sentMails = action.payload;
      // console.log(state.sentMails,'mailitems ID')
    },
    countMailHandler(state, action) {
      state.count = state.count + action.payload;
    },

    removeEmailHandler(state, action) {
      //   state.mailItems = state.mailItems.filter(
      //     (item) => item.id !== action.payload
      //   );
      // state.mailItems = state.mailItems.map(item=>item)
    },
  },
});

export const emailActions = emailSlice.actions;
export default emailSlice;
