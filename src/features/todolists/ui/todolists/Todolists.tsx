import { Box, Card, Grid } from '@mui/material'
import { useGetTodolistsQuery } from '@/features/todolists/api/todolistsApi.ts'
import { containerSx } from '@/common/styles'
import { TodolistSkeleton } from '@/features/todolists/ui/Todolists/TodolistSkeleton/TodolistSkeleton.tsx'
import { TodolistItem } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx'
import { AnimatePresence, motion } from 'motion/react'

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
    <AnimatePresence>
      {todolists?.map((tl) => {
        return (
          <Grid key={tl.id}>
            <motion.div layout>
              <Card elevation={8} sx={{ p: '20px' }}>
                <TodolistItem
                  id={tl.id}
                  title={tl.title}
                  activeFilter={tl.filter}
                />
              </Card>
            </motion.div>
          </Grid>
        )
      })}
    </AnimatePresence>
  )
}
