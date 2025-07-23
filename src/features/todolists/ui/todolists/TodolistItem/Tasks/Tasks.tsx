import { List } from '@mui/material'
import { useGetTasksQuery } from '@/features/todolists/api/tasksApi.ts'
import { TaskStatus } from '@/common/enums'
import { FilterValuesType } from '@/features/todolists/lib/types'
import { useState } from 'react'
import { PAGE_SIZE } from '@/common/constants'
import { TasksSkeleton } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton.tsx'
import { TaskItem } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx'
import { TasksPagination } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksPagination/TasksPagination.tsx'
import { AnimatePresence, motion } from 'motion/react'

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
      <AnimatePresence>
        {filtredTasks?.length === 0 || filtredTasks === undefined ? (
          <motion.p exit={{ opacity: 0 }}>Тасок нет</motion.p>
        ) : (
          <>
            <List>
              <AnimatePresence>
                {filtredTasks?.map((t) => {
                  return (
                    <TaskItem key={t.id} task={t} todolistId={todolistId} />
                  )
                })}
              </AnimatePresence>
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
      </AnimatePresence>
    </div>
  )
}
