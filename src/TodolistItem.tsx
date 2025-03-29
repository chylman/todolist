import {FilterValuesType, TaskType} from "./App.tsx";
import {TodoListTitle} from "./TodoListTitle.tsx";
import {AddTaskForm} from "./AddTaskForm.tsx";
import {TasksList} from "./TasksList.tsx";
import {FilterButtons} from "./FilterButtons.tsx";

type Props = {
    id: string;
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: string, todolistId: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, todolistId: string) => void
    deleteAllTasks: (todolistId: string) => void
    createTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    activeFilter: FilterValuesType
    deleteTodolist: (todolistId: string) => void
}

export const TodolistItem = ({
                                 title,
                                 tasks,
                                 deleteTask,
                                 changeTodoListFilter,
                                 deleteAllTasks,
                                 createTask,
                                 changeTaskStatus,
                                 activeFilter,
                                 id,
                                 deleteTodolist
                             }: Props) => {
    return (
        <div>
            <TodoListTitle title={title} deleteTodolistCallback={() => deleteTodolist(id)}></TodoListTitle>
            <AddTaskForm maxTitleLength={12} createTask={(title: string) => createTask(title, id)}></AddTaskForm>
            <TasksList changeTaskStatus={(taskId, isDone) => changeTaskStatus(taskId, isDone, id)} tasks={tasks}
                       deleteTask={(taskId: string) => deleteTask(taskId, id)}></TasksList>
            <FilterButtons activeFilter={activeFilter} deleteAllTasks={() => deleteAllTasks(id)}
                           changeTodoListFilter={(newFilterValue: FilterValuesType) => changeTodoListFilter(newFilterValue, id)}></FilterButtons>
        </div>
    );
};
