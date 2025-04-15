import {FilterValuesType} from "./App.tsx";
import {Box, Button} from "@mui/material";

type FilterButtonsType = {
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void
    deleteAllTasks: () => void
    activeFilter: FilterValuesType
}

export const FilterButtons = ({changeTodoListFilter, deleteAllTasks, activeFilter}: FilterButtonsType) => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Button
                variant={'contained'}
                size="small"
                disableElevation
                onClick={() => deleteAllTasks()}>{'DELETE ALL'}
            </Button>
            <Button
                variant={'contained'}
                size="small"
                color={activeFilter === 'all' ? 'secondary' : 'primary'}
                disableElevation
                onClick={() => changeTodoListFilter('all')}>
                All
            </Button>
            <Button
                variant={'contained'}
                size="small"
                color={activeFilter === 'active' ? 'secondary' : 'primary'}
                disableElevation
                onClick={() => changeTodoListFilter('active')}>
                Active
            </Button>
            <Button
                variant={'contained'}
                size="small"
                color={activeFilter === 'completed' ? 'secondary' : 'primary'}
                disableElevation
                onClick={() => changeTodoListFilter('completed')}>
                Completed
            </Button>
        </Box>
    );
};
