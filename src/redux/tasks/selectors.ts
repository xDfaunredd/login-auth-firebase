import { RootState } from "../store";

export const selectTasks = (state: RootState) => state.tasks.items;
export const selectIsOpen = (state: RootState) => state.tasks.isOpen;
export const selectCurrentTask = (state: RootState) => state.tasks.currentTask;
