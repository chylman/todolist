import React from 'react'
import { Box, Checkbox, IconButton, ListItem } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import type { TaskType } from '@/app/App'
import { useDispatch } from 'react-redux'
import { getListItemSx } from '@/TaskList.styles'
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan'
import {
  changeTaskStatus,
  changeTaskTitle,
  deleteTask,
} from '@/features/todolists/model/tasksSlice'

type Props = {
  task: TaskType
  todolistId: string
}

export const TaskItem: React.FC<Props> = ({ task, todolistId }) => {
  const dispatch = useDispatch()

  const deleteTaskHanler = (taskId: string) => {
    dispatch(deleteTask({ taskId, todolistId }))
  }

  const changeTaskTitleHandler = (taskId: string, title: string) =>
    dispatch(changeTaskTitle({ taskId, title, todolistId }))

  const changeTaskStatusHanler = (taskId: string, isDone: boolean) =>
    dispatch(changeTaskStatus({ taskId, isDone, todolistId }))

  return (
    <ListItem disablePadding sx={getListItemSx(task.isDone)}>
      <Box>
        <label>
          <Checkbox
            size="small"
            onChange={(e) =>
              changeTaskStatusHanler(task.id, e.currentTarget.checked)
            }
            checked={task.isDone}
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
