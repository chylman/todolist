import {Task} from "./App.tsx";

type Props = {
    tasks: Task[]
    deleteTask: (taskId: string) => void
}

export const TasksList = ({tasks, deleteTask}: Props) => {
    return (
        <div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(t => {
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={() => deleteTask(t.id)}>x</button>
                            </li>
                        );
                    })}
                </ul>)}
        </div>
    );
};
