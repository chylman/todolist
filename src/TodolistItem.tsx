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
}

export const TodolistItem = ({title, tasks, deleteTask, changeTodoListFilter, deleteAllTasks, createTask}: Props) => {


    return (
        <div>
            <TodoListTitle title={title}></TodoListTitle>
            <AddTaskForm createTask={createTask}></AddTaskForm>
            <TasksList tasks={tasks} deleteTask={deleteTask}></TasksList>
            <FilterButtons deleteAllTasks={deleteAllTasks} changeTodoListFilter={changeTodoListFilter}></FilterButtons>
        </div>
    );
};
