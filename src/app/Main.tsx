import { Navigate } from 'react-router'
import { Container, Grid } from '@mui/material'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { createTodolist } from '@/features/todolists/model/todolistsSlice'
import { CreateItemForm } from '@/common/components/AddItemForm/CreateItemForm'
import { useAppSelector } from '@/common/hooks/useAppSelector.ts'
import { selectIsLoggedIn } from '@/app/appSlice.ts'
import { Path } from '@/common/routing'
import { useAddTodolistMutation } from '@/features/todolists/api/todolistsApi.ts'
import { Todolists } from '@/features/todolists/ui/todolists/Todolists'

export const Main = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const [addTodolist] = useAddTodolistMutation()

  const createTodolists = (title: string) => {
    dispatch(createTodolist({ title }))
  }

  if (!isLoggedIn) return <Navigate to={Path.Login} />

  return (
    <Container maxWidth="lg">
      <Grid container sx={{ p: '20px' }}>
        <CreateItemForm onCreateItem={addTodolist} maxTitleLength={10} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
