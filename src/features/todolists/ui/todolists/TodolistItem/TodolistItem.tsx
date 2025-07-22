import { CreateItemForm } from '@/common/components/AddItemForm/CreateItemForm'
import React from 'react'
import { useCreateTaskMutation } from '@/features/todolists/api/tasksApi.ts'
import { FilterValuesType } from '@/features/todolists/lib/types'
import { TodoListTitle } from '@/features/todolists/ui/todolists/TodolistItem/TodolistTitle/TodoListTitle.tsx'
import { Tasks } from '@/features/todolists/ui/todolists/TodolistItem/Tasks/Tasks.tsx'
import { FilterButtons } from '@/features/todolists/ui/todolists/TodolistItem/FilterButtons/FilterButtons.tsx'

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
