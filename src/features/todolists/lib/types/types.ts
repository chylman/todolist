import { Todolist } from '@/features/todolists/api/todolistApi.types'
import { RequestStatus } from '@/common/types'

export type FilterValuesType = 'all' | 'active' | 'completed'
export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}
