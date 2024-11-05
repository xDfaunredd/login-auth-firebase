// tasks/slice.js
import { createSlice } from "@reduxjs/toolkit";

type Task = {
  id: string;
  taskText: string;
};

type InitialState = {
  items: Array<Task>;
  isOpen: boolean;
  currentTask: Task;
};

const initialState: InitialState = {
  items: [],
  isOpen: false,
  currentTask: { id: "", taskText: "" },
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    setTasks: (state, action) => {
      state.items = action.payload;
    },
    deleteAllTasks: (state) => {
      state.items = [];
    },
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload;
    },
  },
});

export const tasksReducer = tasksSlice.reducer;
export const {
  addTask,
  deleteTask,
  editTask,
  setTasks,
  deleteAllTasks,
  openModal,
  closeModal,
  setCurrentTask,
} = tasksSlice.actions;
