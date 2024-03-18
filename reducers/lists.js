import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList: (state, action) => {
      state.value = action.payload;
    },
    deleteList: (state, action) => {
      state.value = state.value.filter((e) => e.id !== action.payload);
    },
    deleteLists: (state, action) => {
      state.value = [];
    },
  },
});

export const { addList, deleteList, deleteLists } = listsSlice.actions;
export default listsSlice.reducer;
