import { Box, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan'
import {
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} from '@/features/todolists/api/todolistsApi.ts'
import Typography from '@mui/material/Typography'

type Props = {
  title: string
  todolistId: string
}

export const TodoListTitle = ({ title, todolistId }: Props) => {
  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTitle] = useUpdateTodolistTitleMutation()

  const deleteTodolistHandler = () => {
    removeTodolist(todolistId)
  }

  const changeTodolistTitleHandler = (title: string) => {
    updateTitle({ id: todolistId, title })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        columnGap: '10px',
        marginBottom: '20px',
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          textTransform: 'uppercase',
        }}
        variant={'h4'}
        component="h2"
      >
        <EditableSpan
          changeTitle={changeTodolistTitleHandler}
          classes={''}
          title={title}
        />
      </Typography>

      <IconButton onClick={deleteTodolistHandler}>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}
