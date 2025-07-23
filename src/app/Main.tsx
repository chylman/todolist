import { Container, Grid } from '@mui/material'
import { CreateItemForm } from '@/common/components/AddItemForm/CreateItemForm'
import { useAddTodolistMutation } from '@/features/todolists/api/todolistsApi.ts'
import { Todolists } from '@/features/todolists/ui/Todolists/Todolists'
import { AnimatePresence } from 'motion/react'

export const Main = () => {
  const [addTodolist] = useAddTodolistMutation()

  return (
    <Container maxWidth="lg">
      <Grid container sx={{ p: '20px' }}>
        <CreateItemForm onCreateItem={addTodolist} maxTitleLength={10} />
      </Grid>
      <Grid container spacing={4}>
        <AnimatePresence>
          <Todolists />
        </AnimatePresence>
      </Grid>
    </Container>
  )
}
