import { baseApi } from '@/app/baseApi'
import { BaseResponse, DomainTodolist } from '@/common/types'
import { Todolist } from '@/features/todolists/api/todolistApi.types'

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
    }),
    removeTodolist: builder.mutation<BaseResponse, string>({
      query: (id) => ({
        url: `/todo-lists/${id}`,
        method: 'DELETE',
      }),
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
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useAddTodolistMutation,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} = todolistsApi

// export const _todolistsApi = {
//   getTodolists() {
//     return instance.get('/todo-lists')
//   },
//   createTodolist({ title }: { title: string }) {
//     return instance.post(`/todo-lists/`, { title })
//   },
//   changeTodolistTitle({ id, title }: { id: string; title: string }) {
//     return instance.post(`/todo-lists`, { id, title })
//   },
//   deleteTodolistFilter({ id }: { id: string }) {
//     return instance.post(`/todo-lists/${id}`)
//   },
// }
