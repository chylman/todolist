import { Box, Button } from '@mui/material'
import {
  changeTodolistFilter,
  changeTodolistFilterAC,
  type FilterValuesType,
} from '@/features/todolists/model/todolistsSlice'
import { useDispatch } from 'react-redux'
import { deleteAllTasks } from '@/features/todolists/model/tasksSlice'
import React from 'react'

type Props = {
  activeFilter: FilterValuesType
  todolistId: string
}

export const FilterButtons: React.FC<Props> = ({
  activeFilter,
  todolistId,
}) => {
  const dispatch = useDispatch()
  const changeTodoListFilterHandler = (newFilterValue: FilterValuesType) =>
    dispatch(changeTodolistFilter({ filter: newFilterValue, id: todolistId }))

  const deleteAllTasksHandler = (todolistId: string) => {
    dispatch(deleteAllTasks({ todolistId }))
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button
        variant={'contained'}
        size="small"
        disableElevation
        onClick={() => deleteAllTasksHandler(todolistId)}
      >
        {'DELETE ALL'}
      </Button>
      <Button
        variant={'contained'}
        size="small"
        color={activeFilter === 'all' ? 'secondary' : 'primary'}
        disableElevation
        onClick={() => changeTodoListFilterHandler('all')}
      >
        All
      </Button>
      <Button
        variant={'contained'}
        size="small"
        color={activeFilter === 'active' ? 'secondary' : 'primary'}
        disableElevation
        onClick={() => changeTodoListFilterHandler('active')}
      >
        Active
      </Button>
      <Button
        variant={'contained'}
        size="small"
        color={activeFilter === 'completed' ? 'secondary' : 'primary'}
        disableElevation
        onClick={() => changeTodoListFilterHandler('completed')}
      >
        Completed
      </Button>
    </Box>
  )
}
