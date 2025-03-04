import {FilterValuesType} from "./App.tsx";

type Props = {
    title: string,
    changeTodoListFilter?: (newFilterValue: FilterValuesType) => void
    filtredValue?: FilterValuesType
    deleteAllTasks?: () => void
}

export const Button = ({title, changeTodoListFilter, filtredValue, deleteAllTasks}: Props) => {
    return <button onClick={() =>{
        changeTodoListFilter && filtredValue && changeTodoListFilter(filtredValue)
        deleteAllTasks && deleteAllTasks()
    }}>{title}</button>
};
