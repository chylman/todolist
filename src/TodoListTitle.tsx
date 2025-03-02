type TodoListItemPropsType = {
    title: string
}

export const TodoListTitle = ({title}: TodoListItemPropsType) => {
    return (
        <h3>{title}</h3>
    );
};
