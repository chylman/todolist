import { Grid, Paper } from '@mui/material'
import { TodolistItem } from '@/features/todolists/ui/todolists/todolistsItem/TodolistItem'
import { selectTodolists } from '@/features/todolists/model/todolistsSlice'
import { useAppSelector } from '@/common/hooks/useAppSelector'

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)
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
