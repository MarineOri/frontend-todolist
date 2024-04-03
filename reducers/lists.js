import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {lists: [], share: []},
};

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList: (state, action) => {
     state.value.lists = action.payload;
    },
    addShare: (state, action) => {
      state.value.share = action.payload;
    },
    completeList: (state, action) => {
      state.value.lists.push(action.payload);
    },
    deleteList: (state, action) => {
      state.value.lists = state.value.lists.filter((e) => e._id !== action.payload);
    },
    deleteLists: () => {
      return initialState;
    },
    deleteTaskLists: (state, action) => {
      state.value.tasks = state.value.tasks.filter((e) => e._id !== action.payload);
    },
  },
});

export const { addList, addShare, completeList, deleteList, deleteLists, deleteTaskLists } =
  listsSlice.actions;
export default listsSlice.reducer;
