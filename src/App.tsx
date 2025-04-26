import './App.css';
import {TodolistItem} from './TodolistItem.tsx';
import {useState} from 'react';
import {AddItemForm} from "./AddItemForm.tsx";
import {
    AppBar,
    Box,
    Container,
    createTheme,
    CssBaseline,
    Grid,
    IconButton,
    Paper,
    Switch,
    ThemeProvider,
    Toolbar
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {NavButton} from "./NavButton.tsx";
import {lime, purple} from '@mui/material/colors';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC
} from "./model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteAllTasksAC,
    deleteTaskAC
} from "./model/tasks-reducer.ts";
import {useAppSelector} from "./common/hooks/useAppSelector.ts";
import {useAppDispatch} from "./common/hooks/useAppDispatch.ts";
import {selectTasks} from "./model/tasks.selectors.ts";
import {selectTodolists} from "./model/todolists-selectors.ts";

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
    const todolists = useAppSelector(selectTodolists);

    const tasks = useAppSelector(selectTasks);

    const dispatch = useAppDispatch();
    // Crud tasks

    const deleteAllTasks = (todolistId: string) => {
        dispatch(deleteAllTasksAC(todolistId))
    };

    // Delete task
    const deleteTask = (taskId: string, todolistId: string) => {
        dispatch(deleteTaskAC(taskId, todolistId))
    };
    // Create task
    const createTask = (title: string, todolistId: string) => {
        dispatch(createTaskAC(title, todolistId))
    };

    // Update task status
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    };

    // Update task title

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todolistId))
    };

    // CRUD todolist

    // Update todolist filter

    const changeTodoListFilter = (newFilterValue: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC({id: todolistId, filter: newFilterValue}));
    };

    // Delete todolist

    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({id: todolistId}))
    };

    // Create todolist

    const createTodolists = (title: string) => {
        dispatch(createTodolistAC(title));
    };


    // Update todolist title

    const changeTodolistTitle = (title: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC({id: todolistId, title: title}));
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
