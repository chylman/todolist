import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";

export type Task = {
    title: string,
    id: number,
    isDone: boolean
}

export const App = () => {
    const todoListTitle_1 = "What to learn"
    const todoListTitle_2 = "Song"

    const tasks1:Task[] = [
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
        { id: 4, title: 'Redux', isDone: false },
        { id: 5, title: 'Typescript', isDone: false },
        { id: 6, title: 'RTK query', isDone: false },
    ]

    const tasks2:Task[] = []

    const deleteTask = (taskId: number) => {
        alert(taskId)
    }

  return (
      <div className="app">
        <TodolistItem title={todoListTitle_1} tasks={tasks1} deleteTask={deleteTask}/>
        <TodolistItem title={todoListTitle_2} tasks={tasks2} deleteTask={deleteTask}/>
      </div>
  )
}
