import {TaskType} from "./App.tsx";

type Props = {
    tasks: TaskType[]
    deleteTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const TasksList = ({tasks, deleteTask, changeTaskStatus}: Props) => {


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
                                <span className={taskClass}>{t.title}</span>
                                <button onClick={() => deleteTask(t.id)}>x</button>
                            </li>
                        );
                    })}
                </ul>)}
        </div>
    );
};
