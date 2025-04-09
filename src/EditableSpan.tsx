import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    classes: string
    changeTitle: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = ({title, classes, changeTitle}: EditableSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [titleInput, setTitleInput] = useState<string>(title);
    const onEditMode = () => setIsEditMode(true);
    const offEditMode = () => {
        setIsEditMode(false);
        changeTitle(titleInput)
    };

    const setTitleInputHandler = (e: ChangeEvent<HTMLInputElement>)=> {
        setTitleInput(e.currentTarget.value);
    }

    return (
        isEditMode
            ? <input
                value={titleInput}
                autoFocus
                onBlur={offEditMode}
                onChange={setTitleInputHandler}
            />
            : <span
                className={classes}
                onDoubleClick={onEditMode}>{title}</span>

    );
};
