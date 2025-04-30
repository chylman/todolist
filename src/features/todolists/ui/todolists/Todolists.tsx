import React from 'react';
import {Grid, Paper} from "@mui/material";
import {TodolistItem} from "@/TodolistItem.tsx";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/model/todolists-selectors.ts";
import {changeTodolistTitleAC, deleteTodolistAC} from "@/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {
    createTaskAC,
    deleteAllTasksAC,
} from "@/model/tasks-reducer.ts";

export const Todolists: React.FC = () => {
    const todolists = useAppSelector(selectTodolists);

    const dispatch = useAppDispatch();

    const deleteAllTasks = (todolistId: string) => {
        dispatch(deleteAllTasksAC({todolistId}));
    };

    const createTask = (title: string, todolistId: string) => {
        dispatch(createTaskAC({title, id: todolistId}));
    };

    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({id: todolistId}));
    };

    const changeTodolistTitle = (title: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC({id: todolistId, title: title}));
    };

    return (
        <>
            {
                todolists.map(tl => {


                        return (
                            <Grid key={tl.id}>
                                <Paper elevation={8} sx={{p: '20px'}}>
                                    <TodolistItem
                                        id={tl.id}
                                        title={tl.title}
                                        activeFilter={tl.filter}
                                        createTask={createTask}
                                        deleteTodolist={deleteTodolist}
                                        deleteAllTasks={deleteAllTasks}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        );
                    }
                )
            }
        </>
    );
};
