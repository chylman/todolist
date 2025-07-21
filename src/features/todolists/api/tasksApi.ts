import { baseApi } from '@/app/baseApi.ts'
import {
  DomainTask,
  GetTasksResponse,
  UpdateTaskModel,
} from '@/features/todolists/api/tasksApi.type.ts'
import { BaseResponse } from '@/common/types'
import { PAGE_SIZE } from '@/common/constants'

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<
      GetTasksResponse,
      { todolistId: string; params: { page: number } }
    >({
      query: ({ todolistId, params }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        params: { ...params, count: PAGE_SIZE },
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
      async onQueryStarted(
        { todolistId, taskId, model },
        { dispatch, queryFulfilled, getState },
      ) {
        const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(
          getState(),
          'getTasks',
        )

        let patchResults: any[] = []
        cachedArgsForQuery.forEach(({ params }) => {
          patchResults.push(
            dispatch(
              tasksApi.util.updateQueryData(
                'getTasks',
                { todolistId, params: { page: params.page } },
                (state) => {
                  const index = state.items.findIndex(
                    (task) => task.id === taskId,
                  )
                  if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...model }
                  }
                },
              ),
            ),
          )
        })
        try {
          await queryFulfilled
        } catch {
          patchResults.forEach((patchResult) => {
            debugger
            patchResult.undo()
          })
        }
      },
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
