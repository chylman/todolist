import './App.css'
import { CircularProgress, CssBaseline, ThemeProvider } from '@mui/material'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { getTheme } from '@/common/theme/theme.ts'
import { Header } from '@/common/components/Header/Header'
import type { FilterValuesType } from '@/features/todolists/model/todolistsSlice'
import {
  selectIsInitialized,
  selectThemeMode,
  setIsInitialized,
  setIsLoggedIn,
} from '@/app/appSlice'
import { Routing } from '@/common/routing'
import { useEffect } from 'react'
import { useMeQuery } from '@/features/auth/api/authApi.ts'
import { ResultCode } from '@/common/enums'
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts'
import { ErrorSnackbar } from '@/common/components/ErrorSnackbar/ErrorSnackbar'
import styles from './App.module.css'

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
  const isInitialized = useAppSelector(selectIsInitialized)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()
  const { data, isLoading } = useMeQuery()

  useEffect(() => {
    if (isLoading) return
    dispatch(setIsInitialized({ isInitialized: true }))
    if (data?.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
    }
  }, [isLoading])

  if (!isInitialized) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </ThemeProvider>
    </div>
  )
}
