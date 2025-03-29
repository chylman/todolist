import {Button} from "./Button.tsx";
import {ChangeEvent, useState, KeyboardEvent} from "react";

type AddTaskFormProps = {
    createTask: (title: string) => void
    maxTitleLength: number

}

export const AddTaskForm = ({createTask, maxTitleLength}: AddTaskFormProps) => {
    const [taskInput, setTaskInput] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const isAddBtnDisabled = !taskInput || taskInput.length > maxTitleLength;


    const createTaskHandler = () => {
        const trimmedTitle = taskInput.trim();
        if (trimmedTitle) {
            createTask(trimmedTitle);
        } else {
            setError(true);
        }

        setTaskInput('');
    }

    const setTaskInputHandler = (e: ChangeEvent<HTMLInputElement>)=> {
        error && setError(false);
        setTaskInput(e.currentTarget.value);
    }

    const onKeyDownTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isAddBtnDisabled) {
            createTaskHandler();
        }
    }


    return (
        <div>
            <input
                placeholder={`${maxTitleLength} charters max length`}
                value={taskInput}
                onChange={setTaskInputHandler}
                onKeyDown={onKeyDownTaskHandler}
                className={error ? 'error' : ''}
            />
            <Button disabled={isAddBtnDisabled} title={'+'}
                    onClickHandler={createTaskHandler}></Button>
            {taskInput && <div> {maxTitleLength} charters max length</div>}
            {taskInput.length > maxTitleLength && <div style={{color: 'red'}}> title is too long</div>}
            {error && <div style={{color: 'red'}}> enter valid title</div>}
        </div>
    );
};
