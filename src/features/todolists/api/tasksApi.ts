import { baseApi } from '@/app/baseApi.ts'
import {
  DomainTask,
  GetTasksResponse,
  UpdateTaskModel,
} from '@/features/todolists/api/tasksApi.type.ts'
import { BaseResponse } from '@/common/types'

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<
      GetTasksResponse,
      { todolistId: string; params: { count: number; page: number } }
    >({
      query: ({ todolistId, params }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        params,
      }),
      providesTags: (_res, _err, { todolistId }) => [
        { type: 'Task', id: todolistId },
      ],
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
      invalidatesTags: (_res, _err, { todolistId }) => [
        { type: 'Task', id: todolistId },
      ],
    }),
    deleteTask: builder.mutation<
      BaseResponse,
      { todolistId: string; taskId: string }
    >({
      query: ({ todolistId, taskId }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, { todolistId }) => [
        { type: 'Task', id: todolistId },
      ],
    }),
    updateTask: builder.mutation<
      BaseResponse<DomainTask>,
      {
        todolistId: string
        taskId: string
        model: UpdateTaskModel
      }
    >({
      query: ({ todolistId, taskId, model }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'PUT',
        body: { ...model },
      }),
      invalidatesTags: (_res, _err, { todolistId }) => [
        { type: 'Task', id: todolistId },
      ],
    }),
  }),
})

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = tasksApi
