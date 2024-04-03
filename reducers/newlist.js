import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { _id: null, title: null, tasks: [] },
};

export const newlistSlice = createSlice({
  name: "newlist",
  initialState,
  reducers: {
    addIdTtitle: (state, action) => {
      state.value._id = action.payload.id;
      state.value.title = action.payload.title;
    },
    deleteNewList: (state) => {
      state.value = { _id: null, title: null, tasks: [] };
    },
    addTask: (state, action) => {
      state.value.tasks.push(action.payload);
    },
    deleteTaskNew: (state, action) => {
      state.value.tasks = state.value.tasks.filter(
        (e) => e._id !== action.payload
      );
    },
  },
});

export const { addIdTtitle, deleteNewList, addTask, deleteTaskNew } =
  newlistSlice.actions;
export default newlistSlice.reducer;
