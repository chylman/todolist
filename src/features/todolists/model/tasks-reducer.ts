import {
  createAction,
  createReducer,
  createSlice,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit'
import { type TaskType } from '@/app/App.tsx'
import { createTodolist } from '@/features/todolists/model/todolistsSlice.ts'

export type TaskStateType = {
  [todolistId: string]: TaskType[]
}

const initialState: TaskStateType = {}

// export const createTaskAC = createAction<{ title: string; id: string }>(
//   'tasks/createTask',
// )

export const deleteTaskAC = createAction<{
  taskId: string
  todolistId: string
}>('tasks/deleteTask')

export const changeTaskStatusAC = createAction<{
  taskId: string
  isDone: boolean
  todolistId: string
}>('tasks/changeTaskStatus')

export const changeTaskTitleAC = createAction<{
  taskId: string
  title: string
  todolistId: string
}>('tasks/changeTaskTitle')

export const deleteAllTasksAC = createAction<{ todolistId: string }>(
  'tasks/deleteAllTasks',
)

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
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
  }),
  extraReducers: (builder) => {
    builder.addCase(
      createTodolist,
      (state, action: PayloadAction<{ id: string }>) => {
        state[action.payload.id] = []
      },
    )
  },
})

export const _tasksReducer = createReducer(initialState, (builder) => {
  builder
    // .addCase(deleteTodolistAC, (state, action) => {
    //   delete state[action.payload.id]
    // })
    // .addCase(createTodolistAC, (state, action) => {
    //   state[action.payload.id] = []
    // })
    // .addCase(createTaskAC, (state, action) => {
    //   state[action.payload.id].unshift({
    //     title: action.payload.title,
    //     id: nanoid(),
    //     isDone: false,
    //   })
    // })
    .addCase(deleteTaskAC, (state, action) => {
      const index = state[action.payload.todolistId].findIndex(
        (t) => t.id === action.payload.taskId,
      )
      if (index !== -1) {
        state[action.payload.todolistId].splice(index, 1)
      }
    })
    .addCase(changeTaskStatusAC, (state, action) => {
      const task = state[action.payload.todolistId].find(
        (t) => t.id === action.payload.taskId,
      )
      if (task) {
        task.isDone = action.payload.isDone
      }
    })
    .addCase(changeTaskTitleAC, (state, action) => {
      const task = state[action.payload.todolistId].find(
        (t) => t.id === action.payload.taskId,
      )
      if (task) {
        task.title = action.payload.title
      }
    })
    .addCase(deleteAllTasksAC, (state, action) => {
      state[action.payload.todolistId] = []
    })
})

export const { createTask } = taskSlice.actions

export const tasksReducer = taskSlice.reducer
