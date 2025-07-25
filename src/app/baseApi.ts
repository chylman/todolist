import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AUTH_TOKEN } from '@/common/constants'
import { handleError } from '@/common/utils/handleError'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Todolist', 'Task'],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      prepareHeaders: (headers) => {
        headers.set('API-KEY', import.meta.env.VITE_API_KEY)
        headers.set(
          'Authorization',
          `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
        )
      },
    })(args, api, extraOptions)

    handleError(api, result)

    return result
  },
  endpoints: () => ({}),
})
