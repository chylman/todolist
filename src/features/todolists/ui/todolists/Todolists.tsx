import { Grid, Paper } from '@mui/material'
import { TodolistItem } from '@/features/todolists/ui/Todolists/todolistsItem/TodolistItem.tsx'
import { useGetTodolistsQuery } from '@/features/todolists/api/todolistsApi.ts'

export const Todolists = () => {
  const { data: todolists } = useGetTodolistsQuery()
  return (
    <>
      {todolists?.map((tl) => {
        return (
          <Grid key={tl.id}>
            <Paper elevation={8} sx={{ p: '20px' }}>
              <TodolistItem
                id={tl.id}
                title={tl.title}
                activeFilter={tl.filter}
              />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
