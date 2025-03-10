import {Button} from "./Button.tsx";
import {FilterValuesType} from "./App.tsx";

type FilterButtonsType = {
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void
    deleteAllTasks: () => void
}

export const FilterButtons = ({changeTodoListFilter, deleteAllTasks}:FilterButtonsType) => {
    return (
        <div>
            <Button title={'DELETE ALL TASKS'} onClickHandler={() => deleteAllTasks()}/>
            <Button title={'All'} onClickHandler={() => changeTodoListFilter('all')}></Button>
            <Button title={'Active'} onClickHandler={() => changeTodoListFilter('active')}></Button>
            <Button title={'Completed'} onClickHandler={() => changeTodoListFilter('completed')}></Button>
        </div>
    );
};
