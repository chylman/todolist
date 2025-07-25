import { configureStore } from '@reduxjs/toolkit'
import { appReducer, appSlice } from './appSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from '@/app/baseApi.ts'

export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
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
