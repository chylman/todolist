import {FilterValuesType, TaskType} from "./App.tsx";
import {TodoListTitle} from "./TodoListTitle.tsx";
import {AddItemForm} from "./AddItemForm.tsx";
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
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void

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
                                 deleteTodolist,
                                 changeTaskTitle,
                                 changeTodolistTitle
                             }: Props) => {
    return (
        <div>
            <TodoListTitle title={title}
                           deleteTodolistCallback={() => deleteTodolist(id)}
                           changeTodolistTitle={(title: string) => changeTodolistTitle(title, id)}
            ></TodoListTitle>
            <AddItemForm maxTitleLength={12} createItem={(title: string) => createTask(title, id)}></AddItemForm>
            <TasksList changeTaskStatus={(taskId, isDone) => changeTaskStatus(taskId, isDone, id)} tasks={tasks}
                       deleteTask={(taskId: string) => deleteTask(taskId, id)}
                       changeTaskTitle={(taskId: string, title: string) => changeTaskTitle(taskId, title, id)}
            ></TasksList>
            <FilterButtons activeFilter={activeFilter} deleteAllTasks={() => deleteAllTasks(id)}
                           changeTodoListFilter={(newFilterValue: FilterValuesType) => changeTodoListFilter(newFilterValue, id)}></FilterButtons>
        </div>
    );
};
