import { Box, Button } from '@mui/material'
import {
  changeTodolistFilterAC,
  type FilterValuesType,
} from '@/features/todolists/model/todolistsSlice'
import { useDispatch } from 'react-redux'
import { deleteAllTasksAC } from '@/features/todolists/model/tasks-reducer'
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
  const changeTodoListFilter = (newFilterValue: FilterValuesType) =>
    dispatch(changeTodolistFilterAC({ filter: newFilterValue, id: todolistId }))

  const deleteAllTasks = (todolistId: string) => {
    dispatch(deleteAllTasksAC({ todolistId }))
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button
        variant={'contained'}
        size="small"
        disableElevation
        onClick={() => deleteAllTasks(todolistId)}
      >
        {'DELETE ALL'}
      </Button>
      <Button
        variant={'contained'}
        size="small"
        color={activeFilter === 'all' ? 'secondary' : 'primary'}
        disableElevation
        onClick={() => changeTodoListFilter('all')}
      >
        All
      </Button>
      <Button
        variant={'contained'}
        size="small"
        color={activeFilter === 'active' ? 'secondary' : 'primary'}
        disableElevation
        onClick={() => changeTodoListFilter('active')}
      >
        Active
      </Button>
      <Button
        variant={'contained'}
        size="small"
        color={activeFilter === 'completed' ? 'secondary' : 'primary'}
        disableElevation
        onClick={() => changeTodoListFilter('completed')}
      >
        Completed
      </Button>
    </Box>
  )
}
