import './App.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { getTheme } from '@/common/theme/theme.ts'
import { Header } from '@/common/components/Header/Header'
import type { FilterValuesType } from '@/features/todolists/model/todolistsSlice'
import { selectThemeMode } from '@/app/appSlice'
import { Routing } from '@/common/routing'

export type TaskType = {
  title: string
  id: string
  isDone: boolean
}

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routing />
      </ThemeProvider>
    </div>
  )
}
