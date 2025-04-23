import {TaskStateType} from "../App.tsx";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";

type ActionType =  ReturnType<typeof deleteTodolistAC> | ReturnType<typeof createTodolistAC>

export const tasksReducer = (tasks: TaskStateType = {}, action: ActionType) => {
    switch (action.type) {
        case 'create_todolist' :{
            const {id} = action.payload
            return {...tasks, [id]: []}
        }
        case 'delete_todolist' : {
            const {id} = action.payload
            const copyState = {...tasks}
            delete copyState[id]
            return copyState
        }

        default:
            return tasks;
    }
}
