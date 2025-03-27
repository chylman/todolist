import './App.css';
import {TodolistItem} from './TodolistItem.tsx';
import {useState} from 'react';
import {v1} from "uuid";

export type TaskType = {
    title: string,
    id: string,
    isDone: boolean
}

export type TaskStateType = {
    [todolistId: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const App = () => {
    const todolistId_1 = v1();
    const todolistId_2 = v1();

    const [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'},
    ]);

    const [tasks, setTasks] = useState<TaskStateType>({
            [todolistId_1]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false},
                {id: v1(), title: 'Redux', isDone: false},
                {id: v1(), title: 'Typescript', isDone: false},
                {id: v1(), title: 'RTK query', isDone: false},
            ],
            [todolistId_2]: [
                {id: v1(), title: 'Water', isDone: true},
                {id: v1(), title: 'Bread', isDone: true},
                {id: v1(), title: 'Fish', isDone: false},
                {id: v1(), title: 'Milk', isDone: false},
            ],
        }
    );

    const deleteAllTasks = () => {
        // setTasks([]);
    };

    // Delete
    const deleteTask = (taskId: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(t=> t.id !== taskId)
        })};
    // Create
    const createTask = (title: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: [...tasks[todolistId], {id: v1(), title, isDone: false}]
        })
    };

    // Update status
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map()
        })

        // const nextState: Array<TaskType> = tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t);
        // setTasks(nextState);
    };

    let filtredTasks: TaskType[] = [];

    if (filter === 'all') {
        filtredTasks = tasks;
    }

    if (filter === 'active') {
        filtredTasks = tasks.filter(t => !t.isDone);
    }

    if (filter === 'completed') {
        filtredTasks = tasks.filter(t => t.isDone);
    }

    const changeTodoListFilter = (newFilterValue: FilterValuesType) => {
        setFilter(newFilterValue);
    };

    return (
        <div className="app">
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
    );
};
