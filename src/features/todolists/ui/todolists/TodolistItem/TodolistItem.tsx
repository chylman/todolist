import { CreateItemForm } from '@/common/components/AddItemForm/CreateItemForm'
import { useCreateTaskMutation } from '@/features/todolists/api/tasksApi.ts'
import { FilterValuesType } from '@/features/todolists/lib/types'

import { Box } from '@mui/material'
import { TodoListTitle } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodoListTitle.tsx'
import { Tasks } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx'
import { FilterButtons } from '@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx'

type Props = {
  id: string
  title: string
  activeFilter: FilterValuesType
}

export const TodolistItem = ({ title, activeFilter, id }: Props) => {
  const [create] = useCreateTaskMutation()

  const createTaskHandler = (title: string) => {
    create({ todolistId: id, title })
  }

  return (
    <div>
      <TodoListTitle title={title} todolistId={id}></TodoListTitle>
      <Box sx={{ marginBottom: '20px' }}>
        <CreateItemForm
          onCreateItem={createTaskHandler}
          maxTitleLength={12}
        ></CreateItemForm>
      </Box>
      <Tasks todolistId={id} activeFilter={activeFilter}></Tasks>
      <FilterButtons
        activeFilter={activeFilter}
        todolistId={id}
      ></FilterButtons>
    </div>
  )
}
