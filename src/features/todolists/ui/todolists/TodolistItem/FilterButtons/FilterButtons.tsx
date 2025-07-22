import { Box, Button } from '@mui/material'
import React from 'react'
import { todolistsApi } from '@/features/todolists/api/todolistsApi'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { FilterValuesType } from '@/features/todolists/lib/types'

type Props = {
  activeFilter: FilterValuesType
  todolistId: string
}

export const FilterButtons: React.FC<Props> = ({
  activeFilter,
  todolistId,
}) => {
  const dispatch = useAppDispatch()

  const changeTodoListFilterHandler = (newFilterValue: FilterValuesType) => {
    dispatch(
      todolistsApi.util.updateQueryData('getTodolists', undefined, (state) => {
        const todolist = state.find((todolist) => todolist.id === todolistId)
        if (todolist) {
          todolist.filter = newFilterValue
        }
      }),
    )
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
