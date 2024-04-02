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
      const taskIndex = state.value.findIndex(
        (e) => e.id === action.payload.id
      );
      state.value[taskIndex].tasks.push(action.payload.task);
    },
    deleteTaskShow: (state, action) => {
      state.value.tasks = state.value.tasks.filter((e) => e.id !== action.payload);
    },
  }
});

export const { addShowList, deleteShowList, addTaskShow, deleteTaskShow } = showListSlice.actions;
export default showListSlice.reducer;
