import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const showListSlice = createSlice({
  name: "showList",
  initialState,
  reducers: {
    addShowList: (state, action) => {
      state.value = action.payload;
    },
    deleteShowList: (state) => {
      state.value = {};
    },
    addTaskShow: (state, action) => {
    state.value.tasks.push(action.payload);
    },
    deleteTaskShow: (state, action) => {
      state.value.tasks = state.value.tasks.filter((e) => e._id !== action.payload);
    },
    updateTask: (state, action) => {
      state.value.tasks.map((task) => (task._id === action.payload.id) && (task.name = action.payload.name));
    }
  }
});

export const { addShowList, deleteShowList, addTaskShow, deleteTaskShow, updateTask } = showListSlice.actions;
export default showListSlice.reducer;
