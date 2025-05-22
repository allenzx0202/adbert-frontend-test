import { createSlice } from "@reduxjs/toolkit";

const clickSlice = createSlice({
  name: "click",
  initialState: {
    count: 0,
    clickDisabled: false,
  },
  reducers: {
    increment: (state) => {
      if (!state.clickDisabled) {
        state.count += 1;
      }
    },
    clear: (state) => {
      state.count = 0;
    },
    toggleDisabled: (state) => {
      state.clickDisabled = !state.clickDisabled;
    },
  },
});

export const { increment, clear, toggleDisabled } = clickSlice.actions;
export default clickSlice.reducer;
