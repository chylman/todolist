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

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
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

    // Crud tasks

    const deleteAllTasks = (todolistId: string) => {
        setTasks({...tasks, [todolistId]: []});
    };

    // Delete task
    const deleteTask = (taskId: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
        });
    };
    // Create task
    const createTask = (title: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: [...tasks[todolistId], {id: v1(), title, isDone: false}]
        });
    };

    // Update task status
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        });
    };

    // Update task title

    const changeTaskTitle = () => {
    };

    // CRUD todolist

    // Update todolist filter

    const changeTodoListFilter = (newFilterValue: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: newFilterValue} : tl));
    };

    // Delete todolist

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId));
        delete tasks[todolistId];
    };

    // Create todolist

    const createTodolists = (title: string) => {
        const newTodolistId = v1();
        setTodolists([...todolists, {id: newTodolistId, title, filter: 'all'}]);
        setTasks({...tasks, [newTodolistId]: []});
    };


    // Update todolist title

    const changeTodolistTitle = () => {
    };


    const todolistsCoponents = todolists.map(tl => {
            let filtredTasks: Array<TaskType> = [];

            if (tl.filter === 'all') {
                filtredTasks = tasks[tl.id];
            }

            if (tl.filter === 'active') {
                filtredTasks = tasks[tl.id].filter(t => !t.isDone);
            }

            if (tl.filter === 'completed') {
                filtredTasks = tasks[tl.id].filter(t => t.isDone);
            }

            return <TodolistItem
                key={tl.id}
                id={tl.id}
                title={tl.title}
                activeFilter={tl.filter}
                tasks={filtredTasks}
                createTask={createTask}
                deleteTask={deleteTask}
                changeTaskStatus={changeTaskStatus}
                changeTodoListFilter={changeTodoListFilter}
                deleteTodolist={deleteTodolist}
                deleteAllTasks={deleteAllTasks}
            />;
        }
    );

    return (
        <div className="app">
            {todolistsCoponents}
        </div>
    );
};
