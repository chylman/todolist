import { List } from '@mui/material'
import { TaskItem } from './TaskItem/TaskItem'
import { useGetTasksQuery } from '@/features/todolists/api/tasksApi.ts'
import { TaskStatus } from '@/common/enums'
import { TasksSkeleton } from '@/features/todolists/ui/todolists/todolistsItem/Tasks/TasksSkeleton/TasksSkeleton'
import { PAGE_SIZE } from '@/common/constants'
import { FilterValuesType } from '@/features/todolists/lib/types'
import { useState } from 'react'
import { TasksPagination } from '@/features/todolists/ui/todolists/TodolistItem/Tasks/TasksPagination/TasksPagination'

type Props = {
  todolistId: string
  activeFilter: FilterValuesType
}

export const Tasks = ({ todolistId, activeFilter }: Props) => {
  const [page, setPage] = useState<number>(1)
  const { data, isLoading } = useGetTasksQuery({
    todolistId,
    params: { page: page, count: PAGE_SIZE },
  })
  let filtredTasks = data?.items

  if (activeFilter === 'active') {
    filtredTasks = filtredTasks?.filter((t) => t.status === TaskStatus.New)
  }

  if (activeFilter === 'completed') {
    filtredTasks = filtredTasks?.filter(
      (t) => t.status === TaskStatus.Completed,
    )
  }

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <div>
      {filtredTasks?.length === 0 || filtredTasks === undefined ? (
        <p>Тасок нет</p>
      ) : (
        <>
          <List>
            {filtredTasks?.map((t) => {
              return <TaskItem key={t.id} task={t} todolistId={todolistId} />
            })}
          </List>
          <TasksPagination
            totalCount={data?.totalCount || 0}
            page={page}
            setPage={setPage}
          />
        </>
      )}
    </div>
  )
}
