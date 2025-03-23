import './App.css'
import {TodolistItem} from './TodolistItem.tsx';
import {useState} from 'react';
import {v1} from "uuid";

export type Task = {
    title: string,
    id: string,
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export const App = () => {
    const todoListTitle = 'What to learn'

    const [tasks, setTasks] = useState<Array<Task>>([
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false},
        ]
    )

    const deleteAllTasks = () => {
        setTasks([]);
    }

    // Delete
    const deleteTask = (taskId: string) => {
        const nextState: Array<Task> = tasks.filter(t => t.id !== taskId)
        setTasks(nextState);
    }
    // Create
    const createTask = (title: string) => {
        setTasks([...tasks, { id: v1(), title, isDone: false}])
    }

    // Update status
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const nextState: Array<Task> = tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t )
        setTasks(nextState);
    }


    const [filter, setFilter] = useState<FilterValuesType>('all');

    let filtredTasks: Task[] = [];

    if (filter === 'all') {
        filtredTasks = tasks;
    }

    if (filter === 'active') {
        filtredTasks = tasks.filter(t => !t.isDone)
    }

    if (filter === 'completed') {
        filtredTasks = tasks.filter(t => t.isDone)
    }

    const changeTodoListFilter = (newFilterValue: FilterValuesType) => {
        setFilter(newFilterValue);
    }

    return (
        <div className='app'>
            <TodolistItem
                title={todoListTitle}
                tasks={filtredTasks}
                deleteTask={deleteTask}
                deleteAllTasks={deleteAllTasks}
                changeTodoListFilter={changeTodoListFilter}
                createTask={createTask}
                changeTaskStatus={changeTaskStatus}
                activeFilter={filter}
            />
        </div>
    )
}
