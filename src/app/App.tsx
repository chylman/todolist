import './App.css';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {useAppSelector} from '@/common/hooks/useAppSelector';
import {selectThemeMode} from "@/model/app-selectors.ts";
import {getTheme} from "@/common/theme/theme.ts";
import {Header} from "@/Header.tsx";
import {Main} from "@/app/Main.tsx";


export type TaskType = {
    title: string,
    id: string,
    isDone: boolean
}

// todo replace in tasks-reducer
export type TaskStateType = {
    [todolistId: string]: TaskType[]
}
// todo replace in todolists-reducer
export type FilterValuesType = "all" | "active" | "completed"

// todo replace in todolists-reducer
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const App = () => {
    const themeMode = useAppSelector(selectThemeMode);
    const theme = getTheme(themeMode);

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Header/>
                <Main/>
            </ThemeProvider>
        </div>
    );
};
