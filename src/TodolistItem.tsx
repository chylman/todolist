import {FilterValuesType, Task} from "./App.tsx";
import {TodoListTitle} from "./TodoListTitle.tsx";
import {AddTaskForm} from "./AddTaskForm.tsx";
import {TasksList} from "./TasksList.tsx";
import {FilterButtons} from "./FilterButtons.tsx";

type Props = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void
    deleteAllTasks: () => void
    createTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    activeFilter: FilterValuesType
}

export const TodolistItem = ({title, tasks, deleteTask, changeTodoListFilter, deleteAllTasks, createTask, changeTaskStatus, activeFilter}: Props) => {


    return (
        <div>
            <TodoListTitle title={title}></TodoListTitle>
            <AddTaskForm maxTitleLength={12} createTask={createTask}></AddTaskForm>
            <TasksList changeTaskStatus={changeTaskStatus} tasks={tasks} deleteTask={deleteTask}></TasksList>
            <FilterButtons activeFilter={activeFilter} deleteAllTasks={deleteAllTasks} changeTodoListFilter={changeTodoListFilter}></FilterButtons>
        </div>
    );
};
