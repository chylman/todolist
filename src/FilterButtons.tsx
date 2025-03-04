import {Button} from "./Button.tsx";
import {FilterValuesType} from "./App.tsx";

type FilterButtonsType = {
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void
    deleteAllTasks: () => void
}

export const FilterButtons = ({changeTodoListFilter, deleteAllTasks}:FilterButtonsType) => {
    return (
        <div>
            <Button title={'DELETE ALL TASKS'} deleteAllTasks={deleteAllTasks}/>
            <Button title={'All'} changeTodoListFilter={changeTodoListFilter} filtredValue={'all'}></Button>
            <Button title={'Active'} changeTodoListFilter={changeTodoListFilter} filtredValue={'active'}></Button>
            <Button title={'Completed'} changeTodoListFilter={changeTodoListFilter} filtredValue={'completed'}></Button>
        </div>
    );
};
