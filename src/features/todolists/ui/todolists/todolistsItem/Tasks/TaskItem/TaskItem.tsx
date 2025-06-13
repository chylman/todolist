import React from 'react'
import { Box, Checkbox, IconButton, ListItem } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import type { TaskType } from '@/app/App'
import { useDispatch } from 'react-redux'
import { getListItemSx } from '@/TaskList.styles'
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan'
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  deleteTaskAC,
} from '@/features/todolists/model/tasks-reducer'

type Props = {
  task: TaskType
  todolistId: string
}

export const TaskItem: React.FC<Props> = ({ task, todolistId }) => {
  const dispatch = useDispatch()

  const deleteTask = (taskId: string) => {
    dispatch(deleteTaskAC({ taskId, todolistId }))
  }

  const changeTaskTitle = (taskId: string, title: string) =>
    dispatch(changeTaskTitleAC({ taskId, title, todolistId }))

  const changeTaskStatus = (taskId: string, isDone: boolean) =>
    dispatch(changeTaskStatusAC({ taskId, isDone, todolistId }))

  return (
    <ListItem disablePadding sx={getListItemSx(task.isDone)}>
      <Box>
        <label>
          <Checkbox
            size="small"
            onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked)}
            checked={task.isDone}
          />
          <EditableSpan
            title={task.title}
            changeTitle={(title: string) => changeTaskTitle(task.id, title)}
          />
        </label>
      </Box>
      <IconButton size="small" onClick={() => deleteTask(task.id)}>
        <ClearIcon />
      </IconButton>
    </ListItem>
  )
}
