import React from 'react'
import { Grid, Paper } from '@mui/material'
import { useAppSelector } from '@/common/hooks/useAppSelector.ts'
import { selectTodolists } from '@/features/todolists/model/todolists-selectors'
import { TodolistItem } from '@/features/todolists/ui/todolists/todolistsItem/TodolistItem'

export const Todolists: React.FC = () => {
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
