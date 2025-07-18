import { baseApi } from '@/app/baseApi.ts'
import {
  DomainTask,
  GetTasksResponse,
} from '@/features/todolists/api/tasksApi.type.ts'
import { BaseResponse } from '@/common/types'

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GetTasksResponse, string>({
      query: (todolistId) => `/todo-lists/${todolistId}/tasks`,
      providesTags: ['Task'],
    }),
    createTask: builder.mutation<
      BaseResponse<DomainTask>,
      { todolistId: string; title: string }
    >({
      query: ({ todolistId, title }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: builder.mutation<
      BaseResponse,
      { todolistId: string; taskId: string }
    >({
      query: ({ todolistId, taskId }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
})

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
} = taskApi
