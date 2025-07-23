import { Box, Checkbox, IconButton, ListItem } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { getListItemSx } from '@/TaskList.styles'
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan'
import {
  DomainTask,
  UpdateTaskModel,
} from '@/features/todolists/api/tasksApi.type.ts'
import { TaskPriority, TaskStatus } from '@/common/enums'
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from '@/features/todolists/api/tasksApi.ts'
import { motion } from 'motion/react'

type Props = {
  task: DomainTask
  todolistId: string
}

export const TaskItem = ({ task, todolistId }: Props) => {
  const isDone = task.status === TaskStatus.Completed
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const deleteTaskHanler = (taskId: string) => {
    deleteTask({ todolistId, taskId })
  }

  const changeTaskTitleHandler = (taskId: string, title: string) => {
    const model: UpdateTaskModel = {
      title: title,
      status: TaskStatus.New,
      deadline: task.deadline,
      priority: TaskPriority.Low,
      description: task.description,
      startDate: task.startDate,
    }
    updateTask({ todolistId, taskId, model })
  }

  const changeTaskStatusHanler = (taskId: string, status: TaskStatus) => {
    const model: UpdateTaskModel = {
      title: task.title,
      status,
      deadline: task.deadline,
      priority: TaskPriority.Low,
      description: task.description,
      startDate: task.startDate,
    }
    updateTask({ todolistId, taskId, model })
  }

  return (
    <ListItem disablePadding sx={getListItemSx(isDone)}>
      <motion.div exit={{ opacity: 0 }} layout>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            size="small"
            onChange={(e) =>
              changeTaskStatusHanler(
                task.id,
                e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
              )
            }
            checked={isDone}
          />
          <EditableSpan
            title={task.title}
            changeTitle={(title: string) =>
              changeTaskTitleHandler(task.id, title)
            }
          />
        </Box>
      </motion.div>
      <IconButton size="small" onClick={() => deleteTaskHanler(task.id)}>
        <ClearIcon />
      </IconButton>
    </ListItem>
  )
}
