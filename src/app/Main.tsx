import React from 'react';
import {Container, Grid} from "@mui/material";
import {AddItemForm} from "@/AddItemForm.tsx";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {createTodolistAC} from "@/model/todolists-reducer.ts";
import {Todolists} from "@/Todolists.tsx";

export const Main: React.FC = () => {
    const dispatch = useAppDispatch();

    const createTodolists = (title: string) => {
        dispatch(createTodolistAC(title));
    };

    return (
        <Container maxWidth="lg">
            <Grid container sx={{p: '20px'}}>
                <AddItemForm
                    createItem={createTodolists}
                    maxTitleLength={10}
                />
            </Grid>
            <Grid container spacing={4}>
                <Todolists/>
            </Grid>
        </Container>
    );
};
