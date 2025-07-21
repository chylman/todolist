import { List } from '@mui/material'
import { useGetTasksQuery } from '@/features/todolists/api/tasksApi.ts'
import { TaskStatus } from '@/common/enums'
import { FilterValuesType } from '@/features/todolists/lib/types'
import { useState } from 'react'
import { TasksPagination } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksPagination/TasksPagination.tsx'
import { TasksSkeleton } from '@/features/todolists/ui/Todolists/todolistsItem/Tasks/TasksSkeleton/TasksSkeleton.tsx'
import { TaskItem } from '@/features/todolists/ui/Todolists/todolistsItem/Tasks/TaskItem/TaskItem.tsx'
import { PAGE_SIZE } from '@/common/constants'

type Props = {
  todolistId: string
  activeFilter: FilterValuesType
}

export const Tasks = ({ todolistId, activeFilter }: Props) => {
  const [page, setPage] = useState<number>(1)
  const { data, isLoading } = useGetTasksQuery({
    todolistId,
    params: { page: page },
  })
  const isPaginationShow = data?.totalCount
    ? data?.totalCount >= PAGE_SIZE
    : false
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
          {isPaginationShow && (
            <TasksPagination
              totalCount={data?.totalCount || 0}
              page={page}
              setPage={setPage}
            />
          )}
        </>
      )}
    </div>
  )
}
