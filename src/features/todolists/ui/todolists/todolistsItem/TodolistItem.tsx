import {FilterValuesType, TaskType} from "@/app/App";
import {TodoListTitle} from "@/TodoListTitle";
import {AddItemForm} from "@/AddItemForm";
import {TasksList} from "@/TasksList";
import {FilterButtons} from "@/FilterButtons";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {changeTodolistFilterAC} from "@/model/todolists-reducer.ts";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "@/model/tasks-reducer.ts";

type Props = {
    id: string;
    title: string
    deleteAllTasks: (todolistId: string) => void
    createTask: (title: string, todolistId: string) => void
    activeFilter: FilterValuesType
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void

}

export const TodolistItem = ({
                                 title,
                                 deleteAllTasks,
                                 createTask,
                                 activeFilter,
                                 id,
                                 deleteTodolist,
                                 changeTodolistTitle
                             }: Props) => {
    const tasks = useAppSelector(selectTasks);
    const dispatch = useAppDispatch();


    let filtredTasks: Array<TaskType> = tasks;

    if (activeFilter === 'all') {
        filtredTasks = tasks[id];
    }

    if (activeFilter === 'active') {
        filtredTasks = tasks[id].filter((t: TaskType) => !t.isDone);
    }

    if (activeFilter === 'completed') {
        filtredTasks = tasks[id].filter((t: TaskType) => t.isDone);
    }

    return (
        <div>
            <TodoListTitle title={title}
                           deleteTodolistCallback={() => deleteTodolist(id)}
                           changeTodolistTitle={(title: string) => changeTodolistTitle(title, id)}
            ></TodoListTitle>
            <AddItemForm maxTitleLength={12} createItem={(title: string) => createTask(title, id)}></AddItemForm>
            <TasksList changeTaskStatus={(taskId, isDone) => dispatch(changeTaskStatusAC({taskId, isDone, todolistId: id}))} tasks={filtredTasks}
                       deleteTask={(taskId: string) => dispatch(deleteTaskAC({taskId, todolistId: id}))}
                       changeTaskTitle={(taskId: string, title: string) => dispatch(changeTaskTitleAC({taskId, title, todolistId: id}))}
            ></TasksList>
            <FilterButtons activeFilter={activeFilter} deleteAllTasks={() => deleteAllTasks(id)}
                           changeTodoListFilter={(newFilterValue: FilterValuesType) => dispatch(changeTodolistFilterAC({filter: newFilterValue, id}))}></FilterButtons>
        </div>
    );
};
