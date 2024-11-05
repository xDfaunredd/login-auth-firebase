import { RootState } from "../store";

export const selectTasks = (state: RootState) => state.tasks.items;
export const selectIsOpen = (state: RootState) => state.tasks.isOpen;
export const selectCurrentTask = (state: RootState) => state.tasks.currentTask;
export const selectTaskListId = (state: RootState) => state.tasks.taskListId;
export const selectTasksTitleData = (state: RootState) =>
  state.tasks.tasksTitleData;
