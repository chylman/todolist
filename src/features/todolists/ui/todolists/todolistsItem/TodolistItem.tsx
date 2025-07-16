import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts'
import { createTask } from '@/features/todolists/model/tasksSlice'
import { CreateItemForm } from '@/common/components/AddItemForm/CreateItemForm'
import React from 'react'
import type { FilterValuesType } from '@/features/todolists/model/todolistsSlice'
import { TodoListTitle } from './TodolistTitle/TodoListTitle'
import { Tasks } from './Tasks/Tasks'
import { FilterButtons } from '@/features/todolists/ui/Todolists/todolistsItem/FilterButtons/FilterButtons.tsx'

type Props = {
  id: string
  title: string
  activeFilter: FilterValuesType
}

export const TodolistItem: React.FC<Props> = ({ title, activeFilter, id }) => {
  const dispatch = useAppDispatch()

  const createTaskHandler = (title: string) => {
    dispatch(createTask({ title, id }))
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
