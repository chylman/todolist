import { List } from '@mui/material'
import { type TaskType } from '@/app/App.tsx'
import { useSelector } from 'react-redux'
import { selectTasks } from '@/features/todolists/model/tasks-selectors'
import { TaskItem } from '@/features/todolists/ui/todolists/todolistsItem/Tasks/TaskItem/TaskItem'
import type { FilterValuesType } from '@/features/todolists/model/todolists-reducer'

type Props = {
  todolistId: string
  activeFilter: FilterValuesType
}

export const Tasks = ({ todolistId, activeFilter }: Props) => {
  const tasks = useSelector(selectTasks)
  const todolistTasks = tasks[todolistId]

  let filtredTasks: TaskType[] = todolistTasks

  if (activeFilter === 'all') {
    filtredTasks = tasks[todolistId]
  }

  if (activeFilter === 'active') {
    filtredTasks = tasks[todolistId].filter((t: TaskType) => !t.isDone)
  }

  if (activeFilter === 'completed') {
    filtredTasks = tasks[todolistId].filter((t: TaskType) => t.isDone)
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
