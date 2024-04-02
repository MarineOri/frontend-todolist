import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { id: null, title: null, tasks: [] },
};

export const newlistSlice = createSlice({
  name: "newlist",
  initialState,
  reducers: {
    addIdTtitle: (state, action) => {
      state.value.id = action.payload.id;
      state.value.title = action.payload.title;
    },
    deleteNewList: (state) => {
      state.value = { id: null, title: null, tasks: [] };
    },
    addTask: (state, action) => {
      state.value.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.value.tasks = state.value.tasks.filter(
        (e) => e._id !== action.payload
      );
    },
  },
});

export const { addIdTtitle, deleteNewList, addTask, deleteTask } =
  newlistSlice.actions;
export default newlistSlice.reducer;
