import { RootState } from "../../app/store";

export const selectAllTasks = (state: RootState) => state.tasks.tasks;
export const selectEditedTask = (state: RootState) => {
  const id = state.tasks.editedTaskId;
  return state.tasks.tasks.find((task) => task.id === id) || null;
};
