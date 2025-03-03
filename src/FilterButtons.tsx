import {Button} from "./Button.tsx";
import {FilterValuesType} from "./App.tsx";

type FilterButtonsType = {
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void
}

export const FilterButtons = ({changeTodoListFilter}:FilterButtonsType) => {
    return (
        <div>
            <Button title={'All'} changeTodoListFilter={changeTodoListFilter} filtredValue={'all'}></Button>
            <Button title={'Active'} changeTodoListFilter={changeTodoListFilter} filtredValue={'active'}></Button>
            <Button title={'Completed'} changeTodoListFilter={changeTodoListFilter} filtredValue={'completed'}></Button>
        </div>
    );
};
