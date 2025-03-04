import './App.css'
import {TodolistItem} from './TodolistItem.tsx';
import {useState} from 'react';

export type Task = {
    title: string,
    id: number,
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export const App = () => {
    const todoListTitle = 'What to learn'

    const [tasks, setTasks] = useState<Array<Task>>([
            {id: 1, title: 'HTML&CSS', isDone: true},
            {id: 2, title: 'JS', isDone: true},
            {id: 3, title: 'ReactJS', isDone: false},
            {id: 4, title: 'Redux', isDone: false},
            {id: 5, title: 'Typescript', isDone: false},
            {id: 6, title: 'RTK query', isDone: false},
        ]
    )

    const deleteAllTasks = () => {
        setTasks([]);
    }
    const deleteTask = (taskId: number) => {
        const nextState: Array<Task> = tasks.filter(t => t.id !== taskId)
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
            />
        </div>
    )
}
