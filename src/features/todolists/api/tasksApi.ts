import { baseApi } from '@/app/baseApi.ts'
import { GetTasksResponse } from '@/features/todolists/api/tasksApi.type.ts'

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GetTasksResponse, string>({
      query: (todolistId) => `/todo-lists/${todolistId}/tasks`,
    }),
  }),
})

export const { useGetTasksQuery } = taskApi
