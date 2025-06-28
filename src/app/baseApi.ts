import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Todolist', 'Task'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('API-KEY', import.meta.env.VITE_API_KEY)
      headers.set('Authorization', `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`)
    },
  }),
  endpoints: () => ({}),
})
