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
      state.value.tasks = state.value.tasks.filter((e) => e.id !== action.payload);
    },
  }
});

export const { addShowList, deleteShowList, addTaskShow, deleteTaskShow } = showListSlice.actions;
export default showListSlice.reducer;
