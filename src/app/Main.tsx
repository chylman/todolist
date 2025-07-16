import { Navigate } from 'react-router'
import { Container, Grid } from '@mui/material'
import { CreateItemForm } from '@/common/components/AddItemForm/CreateItemForm'
import { useAppSelector } from '@/common/hooks/useAppSelector.ts'
import { selectIsLoggedIn } from '@/app/appSlice.ts'
import { Path } from '@/common/routing'
import { useAddTodolistMutation } from '@/features/todolists/api/todolistsApi.ts'
import { Todolists } from '@/features/todolists/ui/Todolists/Todolists.tsx'

export const Main = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const [addTodolist] = useAddTodolistMutation()

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
