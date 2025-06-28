import { baseApi } from '@/app/baseApi'
import { DomainTodolist } from '@/common/types'
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
  }),
})

export const { useGetTodolistsQuery } = todolistsApi

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
