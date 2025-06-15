import { createAction, createReducer, nanoid } from '@reduxjs/toolkit'
import { TodolistType } from '@/app/App.tsx'
import { createAppSlice } from '@/common/utils/createAppSlice.ts'

export type FilterValuesType = 'all' | 'active' | 'completed'

export const changeTodolistFilterAC = createAction<{
  id: string
  filter: FilterValuesType
}>('todolists/changeTodolistFilter')

const initialState: TodolistType[] = []

export const todolistsSlice = createAppSlice({
  name: 'todolists',
  initialState,
  reducers: (create) => ({
    createTodolist: create.reducer<{ title: string }>((state, action) => {
      state.push({ title: action.payload.title, filter: 'all', id: nanoid() })
    }),
    deleteTodolist: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state.splice(index, 1)
    }),
    changeTodolistTitle: create.reducer<{ id: string; title: string }>(
      (state, action) => {
        debugger
        const todolist = state.find((todo) => todo.id === action.payload.id)
        if (todolist) todolist.title = action.payload.title
      },
    ),
    changeTodolistFilter: create.reducer<{
      id: string
      filter: FilterValuesType
    }>((state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state[index].filter = action.payload.filter
    }),
  }),
})

export const _todolistsReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeTodolistFilterAC, (state, action) => {
    const index = state.findIndex((todo) => todo.id === action.payload.id)
    if (index !== -1) state[index].filter = action.payload.filter
  })
})

export const {
  createTodolist,
  deleteTodolist,
  changeTodolistTitle,
  changeTodolistFilter,
} = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer
