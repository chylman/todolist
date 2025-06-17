import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts'
import { createTask } from '@/features/todolists/model/tasks-reducer'
import { CreateItemForm } from '@/common/components/AddItemForm/CreateItemForm'
import { Tasks } from '@/features/todolists/ui/todolists/todolistsItem/Tasks/Tasks'
import { TodoListTitle } from '@/features/todolists/ui/todolists/todolistsItem/TodolistTitle/TodoListTitle'
import { FilterButtons } from '@/features/todolists/ui/todolists/todolistsItem/FilterButtons/FilterButtons'
import React from 'react'
import type { FilterValuesType } from '@/features/todolists/model/todolists-reducer'

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
