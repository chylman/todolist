import { Box, Grid, Paper } from '@mui/material'
import { useGetTodolistsQuery } from '@/features/todolists/api/todolistsApi.ts'
import { TodolistItem } from '@/features/todolists/ui/todolists/todolistsItem/TodolistItem'
import { containerSx } from '@/common/styles'
import { TodolistSkeleton } from '@/features/todolists/ui/todolists/TodolistSkeleton/TodolistSkeleton'

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery()

  if (isLoading) {
    return (
      <Box sx={containerSx} style={{ gap: '32px' }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Box>
    )
  }

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
