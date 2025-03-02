import {Task} from "./App.tsx";
import {TodoListTitle} from "./TodoListTitle.tsx";
import {AddTaskForm} from "./AddTaskForm.tsx";
import {TasksList} from "./TasksList.tsx";
import {FilterButtons} from "./FilterButtons.tsx";

type Props = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: number) => void
}

export const TodolistItem = ({title, tasks, deleteTask}:Props) => {


    return (
        <div>
            <TodoListTitle title={title}></TodoListTitle>
            <AddTaskForm></AddTaskForm>
            <TasksList tasks={tasks} deleteTask={deleteTask}></TasksList>
            <FilterButtons></FilterButtons>
        </div>
    );
};
