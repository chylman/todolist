import { CreateItemForm } from '@/common/components/AddItemForm/CreateItemForm'
import React from 'react'
import type { FilterValuesType } from '@/features/todolists/model/todolistsSlice'
import { TodoListTitle } from './TodolistTitle/TodoListTitle'
import { Tasks } from './Tasks/Tasks'
import { FilterButtons } from '@/features/todolists/ui/Todolists/todolistsItem/FilterButtons/FilterButtons.tsx'
import { useCreateTaskMutation } from '@/features/todolists/api/tasksApi.ts'

type Props = {
  id: string
  title: string
  activeFilter: FilterValuesType
}

export const TodolistItem: React.FC<Props> = ({ title, activeFilter, id }) => {
  const [create] = useCreateTaskMutation()

  const createTaskHandler = (title: string) => {
    create({ todolistId: id, title })
  }

  return (
    <div>
      <TodoListTitle title={title} todolistId={id}></TodoListTitle>
      <CreateItemForm
        onCreateItem={createTaskHandler}
        maxTitleLength={12}
      ></CreateItemForm>
      <Tasks todolistId={id} activeFilter={activeFilter}></Tasks>
      <FilterButtons
        activeFilter={activeFilter}
        todolistId={id}
      ></FilterButtons>
    </div>
  )
}
