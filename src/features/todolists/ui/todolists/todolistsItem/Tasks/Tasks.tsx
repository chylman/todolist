import { List } from '@mui/material'
import type { FilterValuesType } from '@/features/todolists/model/todolistsSlice'
import { TaskItem } from './TaskItem/TaskItem'
import { useGetTasksQuery } from '@/features/todolists/api/tasksApi.ts'
import { TaskStatus } from '@/common/enums'

type Props = {
  todolistId: string
  activeFilter: FilterValuesType
}

export const Tasks = ({ todolistId, activeFilter }: Props) => {
  const { data } = useGetTasksQuery(todolistId)
  let filtredTasks = data?.items

  if (activeFilter === 'active') {
    filtredTasks = filtredTasks?.filter((t) => t.status === TaskStatus.New)
  }

  if (activeFilter === 'completed') {
    filtredTasks = filtredTasks?.filter(
      (t) => t.status === TaskStatus.Completed,
    )
  }

  return (
    <div>
      {filtredTasks?.length === 0 || filtredTasks === undefined ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filtredTasks?.map((t) => {
            return <TaskItem key={t.id} task={t} todolistId={todolistId} />
          })}
        </List>
      )}
    </div>
  )
}
