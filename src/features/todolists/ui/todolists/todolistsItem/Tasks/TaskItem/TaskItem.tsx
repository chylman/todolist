import React from 'react'
import { Box, Checkbox, IconButton, ListItem } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { useDispatch } from 'react-redux'
import { getListItemSx } from '@/TaskList.styles'
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan'
import {
  changeTaskStatus,
  changeTaskTitle,
} from '@/features/todolists/model/tasksSlice'
import { DomainTask } from '@/features/todolists/api/tasksApi.type.ts'
import { TaskStatus } from '@/common/enums'
import { useDeleteTaskMutation } from '@/features/todolists/api/tasksApi.ts'

type Props = {
  task: DomainTask
  todolistId: string
}

export const TaskItem: React.FC<Props> = ({ task, todolistId }) => {
  const dispatch = useDispatch()
  const isDone = task.status === TaskStatus.Completed
  const [deleteTask] = useDeleteTaskMutation()

  const deleteTaskHanler = (taskId: string) => {
    deleteTask({ todolistId, taskId })
  }

  const changeTaskTitleHandler = (taskId: string, title: string) =>
    dispatch(changeTaskTitle({ taskId, title, todolistId }))

  const changeTaskStatusHanler = (taskId: string, isDone: boolean) =>
    dispatch(changeTaskStatus({ taskId, isDone, todolistId }))

  return (
    <ListItem disablePadding sx={getListItemSx(isDone)}>
      <Box>
        <label>
          <Checkbox
            size="small"
            onChange={(e) =>
              changeTaskStatusHanler(task.id, e.currentTarget.checked)
            }
            checked={isDone}
          />
          <EditableSpan
            title={task.title}
            changeTitle={(title: string) =>
              changeTaskTitleHandler(task.id, title)
            }
          />
        </label>
      </Box>
      <IconButton size="small" onClick={() => deleteTaskHanler(task.id)}>
        <ClearIcon />
      </IconButton>
    </ListItem>
  )
}
