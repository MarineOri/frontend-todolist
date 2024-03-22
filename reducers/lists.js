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
    addManyList: (state, action) => {
      [...state.value, ...action.payload];
    },
    completeList: (state, action) => {
      state.value.push(action.payload);
    },
    deleteList: (state, action) => {
      state.value = state.value.filter((e) => e._id !== action.payload);
    },
    deleteLists: (state, action) => {
      state.value = [];
    },
    // completeTask: (state, action) => {
    //   const taskIndex = state.value.findIndex(
    //     (e) => e.id === action.payload.id
    //   );
    //   state.value[taskIndex].tasks.push(action.payload.task);
    // },
    deleteTask: (state, action) => {
      state.value = state.value.filter((e) => e.id !== action.payload);
    },
  },
});

export const { addList, addManyList, completeList, deleteList, deleteLists } =
  listsSlice.actions;
export default listsSlice.reducer;
