import {Button} from "./Button.tsx";
import styled from "styled-components";

type TodoListItemPropsType = {
    title: string
    deleteTodolistCallback: () => void
}

export const TodoListTitle = ({title, deleteTodolistCallback}: TodoListItemPropsType) => {
    return (
        <TitleWrapper>
            <Title>{title}</Title>
            <Button title={'x'} onClickHandler={deleteTodolistCallback}/>
        </TitleWrapper>
    );
};

const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
`

const Title = styled.h2`
    margin: 0 10px 10px 0;
`
