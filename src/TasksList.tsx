import {Box, Checkbox, IconButton, List, ListItem} from "@mui/material";
import {TaskType} from "./App.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import ClearIcon from '@mui/icons-material/Clear';
import {getListItemSx} from "./TaskList.styles.ts";

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
                <List>
                    {tasks.map(t => {

                        return (
                            <ListItem
                                key={t.id}
                                disablePadding
                                sx={getListItemSx(t.isDone)}
                            >
                                <Box>
                                    <label>
                                        <Checkbox
                                            size="small"
                                            onChange={(e) => changeTaskStatus(t.id, e.currentTarget.checked)}
                                            checked={t.isDone}
                                        />
                                        <EditableSpan
                                            title={t.title}
                                            changeTitle={(title: string) => changeTaskTitle(t.id, title)}/>
                                    </label>
                                </Box>
                                <IconButton size="small" onClick={() => deleteTask(t.id)}>
                                    <ClearIcon/>
                                </IconButton>
                            </ListItem>
                        );
                    })}
                </List>)}
        </div>
    );
};
