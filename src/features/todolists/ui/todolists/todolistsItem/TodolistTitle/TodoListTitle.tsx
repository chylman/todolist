import styled from "styled-components";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan";
import {useDispatch} from "react-redux";
import {changeTodolistTitleAC, deleteTodolistAC} from "@/features/todolists/model/todolists-reducer";

type Props = {
    title: string
    todolistId: string
}


export const TodoListTitle = ({
                                  title,
                                  todolistId
                              }: Props) => {
    const dispatch = useDispatch();

    const deleteTodolist = () => {
        dispatch(deleteTodolistAC({id: todolistId}));
    };

    const changeTodolistTitle = () => {
        dispatch(changeTodolistTitleAC({id: todolistId, title}))
    }

    return (
        <TitleWrapper>
            <Title>
                <EditableSpan changeTitle={changeTodolistTitle} classes={''} title={title}/>
            </Title>
            <IconButton onClick={deleteTodolist}>
                <DeleteIcon/>
            </IconButton>
        </TitleWrapper>
    );
};

const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
`;

const Title = styled.h2`
    margin: 0 10px 10px 0;
`;
