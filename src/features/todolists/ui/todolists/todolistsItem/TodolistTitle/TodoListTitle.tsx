import styled from 'styled-components'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan'
import { useDispatch } from 'react-redux'
import {
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} from '@/features/todolists/api/todolistsApi.ts'

type Props = {
  title: string
  todolistId: string
}

export const TodoListTitle = ({ title, todolistId }: Props) => {
  const dispatch = useDispatch()
  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTitle] = useUpdateTodolistTitleMutation()

  const deleteTodolistHandler = () => {
    dispatch(removeTodolist(todolistId))
  }

  const changeTodolistTitleHandler = (title: string) => {
    dispatch(updateTitle({ id: todolistId, title }))
  }

  return (
    <TitleWrapper>
      <Title>
        <EditableSpan
          changeTitle={changeTodolistTitleHandler}
          classes={''}
          title={title}
        />
      </Title>
      <IconButton onClick={deleteTodolistHandler}>
        <DeleteIcon />
      </IconButton>
    </TitleWrapper>
  )
}

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
`

const Title = styled.h2`
  margin: 0 10px 10px 0;
`
