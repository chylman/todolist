import {Button} from "./Button.tsx";
import {ChangeEvent, useState, KeyboardEvent} from "react";

type AddItemFormProps = {
    createItem: (title: string) => void
    maxTitleLength: number

}

export const AddItemForm = ({createItem, maxTitleLength}: AddItemFormProps) => {
    const [itemInput, setItemInput] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const isAddBtnDisabled = !itemInput || itemInput.length > maxTitleLength;


    const createItemHandler = () => {
        const trimmedTitle = itemInput.trim();
        if (trimmedTitle) {
            createItem(trimmedTitle);
        } else {
            setError(true);
        }

        setItemInput('');
    }

    const setItemInputHandler = (e: ChangeEvent<HTMLInputElement>)=> {
        error && setError(false);
        setItemInput(e.currentTarget.value);
    }

    const onKeyDownItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isAddBtnDisabled) {
            createItemHandler();
        }
    }


    return (
        <div>
            <input
                placeholder={`${maxTitleLength} charters max length`}
                value={itemInput}
                onChange={setItemInputHandler}
                onKeyDown={onKeyDownItemHandler}
                className={error ? 'error' : ''}
            />
            <Button disabled={isAddBtnDisabled} title={'+'}
                    onClickHandler={createItemHandler}></Button>
            {itemInput && <div> {maxTitleLength} charters max length</div>}
            {itemInput.length > maxTitleLength && <div style={{color: 'red'}}> title is too long</div>}
            {error && <div style={{color: 'red'}}> enter valid title</div>}
        </div>
    );
};
