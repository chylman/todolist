import {Button} from "./Button.tsx";
import {ChangeEvent, useState, KeyboardEvent} from "react";

type AddTaskFormProps = {
    createTask: (title: string) => void

}

export const AddTaskForm = ({createTask}: AddTaskFormProps) => {
    const [taskInput, setTaskInput] = useState<string>('');
    const isAddBtnDisabled = !taskInput || taskInput.length > 10;

    const createTaskHandler = () => {
        createTask(taskInput);
        setTaskInput('');
    }

    const setTaskInputHandler = (e: ChangeEvent<HTMLInputElement>)=> setTaskInput(e.currentTarget.value)

    const onKeyDownTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isAddBtnDisabled) {
            createTaskHandler();
        }
    }


    return (
        <div>
            <input
                placeholder={'10 charters max length'}
                value={taskInput}
                onChange={setTaskInputHandler}
                onKeyDown={onKeyDownTaskHandler}
            />
            <Button disabled={isAddBtnDisabled} title={'+'}
                    onClickHandler={createTaskHandler}></Button>
            {taskInput && <div> 10 charters max length</div>}
            {taskInput.length > 10 && <div style={{color: 'red'}}> title is too long</div>}
        </div>
    );
};
