import {Button} from "./Button.tsx";
import {FilterValuesType} from "./App.tsx";

type FilterButtonsType = {
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void
    deleteAllTasks: () => void
    activeFilter: FilterValuesType
}

export const FilterButtons = ({changeTodoListFilter, deleteAllTasks, activeFilter}:FilterButtonsType) => {
    return (
        <div>
            <Button title={'DELETE ALL TASKS'} onClickHandler={() => deleteAllTasks()}/>
            <Button className={activeFilter === 'all' ? 'btn-filter-active' : ''} title={'All'} onClickHandler={() => changeTodoListFilter('all')}></Button>
            <Button className={activeFilter === 'active' ? 'btn-filter-active' : ''} title={'Active'} onClickHandler={() => changeTodoListFilter('active')}></Button>
            <Button className={activeFilter === 'completed' ? 'btn-filter-active' : ''} title={'Completed'} onClickHandler={() => changeTodoListFilter('completed')}></Button>
        </div>
    );
};
