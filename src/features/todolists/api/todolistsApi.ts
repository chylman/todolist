import { baseApi } from '@/app/baseApi'
import { DomainTodolist } from '@/common/types'
import { Todolist } from '@/features/todolists/api/todolistApi.types'

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodolists: builder.query<DomainTodolist[], void>({
      query: () => 'todolists',
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
