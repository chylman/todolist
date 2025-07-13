import { configureStore } from '@reduxjs/toolkit'
import { appReducer, appSlice } from './appSlice'
import { todolistsApi } from '@/features/todolists/api/todolistsApi.ts'
import {
  todolistsReducer,
  todolistsSlice,
} from '@/features/todolists/model/todolistsSlice.ts'
import {
  tasksSlice,
  tasksReducer,
} from '@/features/todolists/model/tasksSlice.ts'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [todolistsSlice.name]: todolistsReducer,
    [tasksSlice.name]: tasksReducer,
    [todolistsApi.reducerPath]: todolistsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todolistsApi.middleware),
})

// создание store

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
