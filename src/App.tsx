import './App.css';
import {TodolistItem} from './TodolistItem.tsx';
import {useReducer, useState} from 'react';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm.tsx";
import {
    AppBar,
    Box,
    Container,
    createTheme,
    CssBaseline,
    Grid,
    IconButton,
    Paper, Switch,
    ThemeProvider,
    Toolbar
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {NavButton} from "./NavButton.tsx";
import {lime, purple} from '@mui/material/colors';
import {
    changeTodolistFilterAC, changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTaskAC, deleteAllTasksAC,
  deleteTaskAC,
  tasksReducer
} from "./model/tasks-reducer.ts";

export type TaskType = {
    title: string,
    id: string,
    isDone: boolean
}

export type TaskStateType = {
    [todolistId: string]: TaskType[]
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const App = () => {
    const todolistId_1: string = v1();
    const todolistId_2: string = v1();

    const initialTodolistsState: TodolistType[] = [
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'},
    ]

    const initialTaskState: TaskStateType = {
      [todolistId_1]: [
        {id: `${v1()}`, title: 'HTML&CSS', isDone: true},
        {id: `${v1()}`, title: 'JS', isDone: true},
        {id: `${v1()}`, title: 'ReactJS', isDone: false},
        {id: `${v1()}`, title: 'Redux', isDone: false},
        {id: `${v1()}`, title: 'Typescript', isDone: false},
        {id: `${v1()}`, title: 'RTK query', isDone: false},
      ],
      [todolistId_2]: [
        {id: `${v1()}`, title: 'Water', isDone: true},
        {id: `${v1()}`, title: 'Bread', isDone: true},
        {id: `${v1()}`, title: 'Fish', isDone: false},
        {id: `${v1()}`, title: 'Milk', isDone: false},
      ],
    }

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, initialTodolistsState);

    // const [tasks, setTasks] = useState<TaskStateType>(initialTaskState);
    const [tasks, dispatchTasks] = useReducer(tasksReducer, initialTaskState);

    // Crud tasks

    const deleteAllTasks = (todolistId: string) => {
      const action = deleteAllTasksAC(todolistId)
      dispatchTasks(action)
    };

    // Delete task
    const deleteTask = (taskId: string, todolistId: string) => {
      const action = deleteTaskAC(taskId, todolistId)
      dispatchTasks(action)
    };
    // Create task
    const createTask = (title: string, todolistId: string) => {
      const action = createTaskAC(title, todolistId)
      dispatchTasks(action)
    };

    // Update task status
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
      const action =  changeTaskStatusAC(taskId, isDone, todolistId)
      dispatchTasks(action)
    };

    // Update task title

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
      const action = changeTaskTitleAC(taskId, title, todolistId)
      dispatchTasks(action)
    };

    // CRUD todolist

    // Update todolist filter

    const changeTodoListFilter = (newFilterValue: FilterValuesType, todolistId: string) => {
        dispatchTodolists(changeTodolistFilterAC({id: todolistId, filter: newFilterValue}));
    };

    // Delete todolist

    const deleteTodolist = (todolistId: string) => {
        const action = deleteTodolistAC(todolistId)
        dispatchTodolists(action)
        delete tasks[todolistId];
    };

    // Create todolist

    const createTodolists = (title: string) => {
        const newTodolistId = v1();
        const action = createTodolistAC(title, newTodolistId);
        dispatchTodolists(action);
        dispatchTasks(action);
    };


    // Update todolist title

    const changeTodolistTitle = (title: string, todolistId: string) => {
        dispatchTodolists(changeTodolistTitleAC({id: todolistId, title: title}));
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

            return (
                <Grid key={tl.id}>
                    <Paper elevation={8} sx={{p: '20px'}}>
                        <TodolistItem
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
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    </Paper>
                </Grid>
            );
        }
    );

    const [isDarkMode, setDarkMode] = useState(false);

    const theme = createTheme({
        palette: {
            primary: lime,
            secondary: purple,
            mode: isDarkMode ? 'dark' : 'light',
        }
    });

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static">
                    <Toolbar>
                        <Container maxWidth="lg" sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <Box>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.secondary.light}>Faq</NavButton>
                                <Switch color="secondary" onChange={() => setDarkMode(!isDarkMode)}/>
                            </Box>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="lg">
                    <Grid container sx={{p: '20px'}}>
                        <AddItemForm
                            createItem={createTodolists}
                            maxTitleLength={10}
                        />
                    </Grid>
                    <Grid container spacing={4}>
                        {todolistsCoponents}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
};
