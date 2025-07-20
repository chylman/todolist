import { baseApi } from '@/app/baseApi'
import { BaseResponse } from '@/common/types'
import { Todolist } from '@/features/todolists/api/todolistApi.types'
import { DomainTodolist } from '@/features/todolists/lib/types'

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodolists: builder.query<DomainTodolist[], void>({
      query: () => '/todo-lists',
      transformResponse: (todolists: Todolist[]): DomainTodolist[] =>
        todolists.map((todolist) => ({
          ...todolist,
          filter: 'all',
          entityStatus: 'idle',
        })),
      providesTags: ['Todolist'],
    }),
    addTodolist: builder.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => ({
        url: 'todo-lists',
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: ['Todolist'],
    }),
    removeTodolist: builder.mutation<BaseResponse, string>({
      query: (id) => ({
        url: `/todo-lists/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todolist'],
    }),
    updateTodolistTitle: builder.mutation<
      BaseResponse,
      { id: string; title: string }
    >({
      query: ({ id, title }) => ({
        url: `/todo-lists/${id}`,
        method: 'PUT',
        body: { title },
      }),
      invalidatesTags: ['Todolist'],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useAddTodolistMutation,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} = todolistsApi
