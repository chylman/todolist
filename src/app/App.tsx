import './App.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { getTheme } from '@/common/theme/theme.ts'
import { Main } from '@/app/Main.tsx'
import { selectThemeMode } from '@/features/todolists/model/app-selectors'
import { Header } from '@/common/components/Header/Header'
import type { FilterValuesType } from '@/features/todolists/model/todolists-reducer'

export type TaskType = {
  title: string
  id: string
  isDone: boolean
}

// todo replace in tasks-reducer

// todo replace in todolists-reducer
// export type FilterValuesType = "all" | "active" | "completed"

// todo replace in todolists-reducer
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
        <Main />
      </ThemeProvider>
    </div>
  )
}
