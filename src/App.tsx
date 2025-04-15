import './App.css';
import {TodolistItem} from './TodolistItem.tsx';
import {useState} from 'react';
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
import {lime, purple } from '@mui/material/colors';

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

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)
        });
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

    const changeTodolistTitle = (title: string, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl));
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
                                <Switch color='secondary' onChange={() => setDarkMode(!isDarkMode)}/>
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
