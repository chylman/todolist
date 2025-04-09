import {TaskType} from "./App.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

type Props = {
    tasks: TaskType[]
    deleteTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, title: string) => void
}

export const TasksList = ({tasks, deleteTask, changeTaskStatus, changeTaskTitle}: Props) => {


    return (
        <div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(t => {
                        const taskClass = t.isDone ? 'task-done' : 'task';
                        return (
                            <li key={t.id}>
                                <input onChange={(e) => changeTaskStatus(t.id, e.currentTarget.checked)} type="checkbox" checked={t.isDone}/>
                                <EditableSpan
                                    title={t.title}
                                    classes={taskClass}
                                    changeTitle={(title: string) => changeTaskTitle(t.id, title)}/>
                                <button onClick={() => deleteTask(t.id)}>x</button>
                            </li>
                        );
                    })}
                </ul>)}
        </div>
    );
};
