import { nanoid, PayloadAction } from '@reduxjs/toolkit'
import { TaskType } from '@/app/App'
import {
  createTodolist,
  deleteTodolist,
} from '@/features/todolists/model/todolistsSlice'
import { createAppSlice } from '@/common/utils/createAppSlice'

export type TaskStateType = {
  [todolistId: string]: TaskType[]
}

const initialState: TaskStateType = {}

export const tasksSlice = createAppSlice({
  name: 'tasks',
  initialState,
  selectors: {
    selectTasks: (state) => state,
  },
  reducers: (create) => ({
    createTask: create.reducer<{ title: string; id: string }>(
      (state, action) => {
        state[action.payload.id].unshift({
          title: action.payload.title,
          id: nanoid(),
          isDone: false,
        })
      },
    ),
    createTodolist: create.reducer<{ id: string }>(
      (state, action: PayloadAction<{ id: string }>) => {
        state[action.payload.id] = []
      },
    ),
    deleteTask: create.reducer<{ taskId: string; todolistId: string }>(
      (state, action) => {
        const index = state[action.payload.todolistId].findIndex(
          (t) => t.id === action.payload.taskId,
        )
        if (index !== -1) {
          state[action.payload.todolistId].splice(index, 1)
        }
      },
    ),
    changeTaskStatus: create.reducer<{
      taskId: string
      isDone: boolean
      todolistId: string
    }>((state, action) => {
      const task = state[action.payload.todolistId].find(
        (t) => t.id === action.payload.taskId,
      )
      if (task) {
        task.isDone = action.payload.isDone
      }
    }),
    changeTaskTitle: create.reducer<{
      taskId: string
      title: string
      todolistId: string
    }>((state, action) => {
      const task = state[action.payload.todolistId].find(
        (t) => t.id === action.payload.taskId,
      )
      if (task) {
        task.title = action.payload.title
      }
    }),
    deleteAllTasks: create.reducer<{
      todolistId: string
    }>((state, action) => {
      state[action.payload.todolistId] = []
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(
        createTodolist,
        (state, action: PayloadAction<{ id: string }>) => {
          state[action.payload.id] = []
        },
      )
      .addCase(
        deleteTodolist,
        (state, action: PayloadAction<{ id: string }>) => {
          delete state[action.payload.id]
        },
      )
  },
})

export const {
  createTask,
  deleteTask,
  changeTaskStatus,
  changeTaskTitle,
  deleteAllTasks,
} = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors

export const tasksReducer = tasksSlice.reducer
