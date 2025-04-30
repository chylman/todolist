import {RootState} from "@/app/store.ts";
import {TaskStateType} from "@/app/App.tsx";

export const selectTasks = (state: RootState): TaskStateType => state.tasks
