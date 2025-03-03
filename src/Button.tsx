import {FilterValuesType} from "./App.tsx";

type Props = {
    title: string,
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void
    filtredValue: FilterValuesType
}

export const Button = ({title, changeTodoListFilter, filtredValue}: Props) => {
    return <button onClick={() => changeTodoListFilter(filtredValue)}>{title}</button>
};
