import React from 'react'
import { Container, Grid } from '@mui/material'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { createTodolist } from '@/features/todolists/model/todolistsSlice'
import { CreateItemForm } from '@/common/components/AddItemForm/CreateItemForm'
import { Todolists } from '@/features/todolists/ui/todolists/Todolists'

export const Main: React.FC = () => {
  const dispatch = useAppDispatch()

  const createTodolists = (title: string) => {
    dispatch(createTodolist({ title }))
  }

  return (
    <Container maxWidth="lg">
      <Grid container sx={{ p: '20px' }}>
        <CreateItemForm onCreateItem={createTodolists} maxTitleLength={10} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
