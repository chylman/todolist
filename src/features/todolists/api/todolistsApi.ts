import { instance } from '@/common/instance'

export const todolistsApi = {
  getTodolists() {
    return instance.get('/todo-lists')
  },
  createTodolist({ title }: { title: string }) {
    return instance.post(`/todo-lists/`, { title })
  },
  changeTodolistTitle({ id, title }: { id: string; title: string }) {
    return instance.post(`/todo-lists`, { id, title })
  },
  deleteTodolistFilter({ id }: { id: string }) {
    return instance.post(`/todo-lists/${id}`)
  },
}
