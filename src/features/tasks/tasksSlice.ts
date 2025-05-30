import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, Priority } from "./types";
import { v4 as uuidv4 } from "uuid";

interface TasksState {
  tasks: Task[];
  editedTaskId: string | null;
}

const initialState: TasksState = {
  tasks: [],
  editedTaskId: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{
        title: string;
        description: string;
        priority: Priority;
      }>
    ) => {
      state.tasks.push({
        id: uuidv4(),
        title: action.payload.title,
        description: action.payload.description,
        priority: action.payload.priority,
        createdAt: new Date().toISOString(),
      });
    },
    editTask: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Task> }>
    ) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index],
          ...action.payload.updates,
        };
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setEditedTask: (state, action: PayloadAction<string | null>) => {
      state.editedTaskId = action.payload;
    },
  },
});

export const { addTask, editTask, deleteTask, setEditedTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
