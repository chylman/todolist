import {TaskStateType} from "../App.tsx";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC
} from "./todolists-reducer.ts";
import {createReducer, nanoid} from "@reduxjs/toolkit";

// type ActionType =
//     ReturnType<typeof deleteTodolistAC>
//     | ReturnType<typeof createTodolistAC>
//     | ReturnType<typeof changeTaskStatusAC>
//     | ReturnType<typeof changeTaskTitleAC>
//     | ReturnType<typeof deleteAllTasksAC>

const initialState = {}

export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = [];
        })
})

// export const tasksReducer = (tasks: TaskStateType = {}, action: ActionType) => {
//     switch (action.type) {
//         case 'create_task' : {
//             const {id, title} = action.payload;
//             return {...tasks, [id]: [...tasks[id], {id: nanoid(), title, isDone: false}]};
//         }
//         case 'delete_task' : {
//             const {taskId, todolistId} = action.payload;
//             return {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)};
//         }
//         case 'change_task_status': {
//             const {taskId, isDone, todolistId} = action.payload;
//             return {...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)};
//         }
//         case 'change_task_title': {
//             const {taskId, title, todolistId} = action.payload;
//             return {...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)};
//         }
//         case 'delete_all_tasks' : {
//             const {todolistId} = action.payload;
//             return {...tasks, [todolistId]: []};
//         }
//         default:
//             return tasks;
//     }
// };

export const createTaskAC = (title: string, id: string) => ({
    type: 'create_task',
    payload: {id, title}
} as const);

export const deleteTaskAC = (taskId: string, todolistId: string) => ({
    type: 'delete_task',
    payload: {todolistId, taskId}
} as const);

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => ({
    type: 'change_task_status',
    payload: {taskId, isDone, todolistId}
} as const);

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({
    type: 'change_task_title',
    payload: {taskId, title, todolistId}
} as const);

export const deleteAllTasksAC = (todolistId: string) => ({
    type: 'delete_all_tasks',
    payload: {todolistId}
} as const);
