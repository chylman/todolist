import { createAppSlice } from '@/common/utils/createAppSlice'
import { RequestStatus } from '@/common/types'
import { isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'
import { todolistsApi } from '@/features/todolists/api/todolistsApi'
import { tasksApi } from '@/features/todolists/api/tasksApi'

const initialState = {
  themeMode: 'light' as ThemeMode,
  isLoggedIn: false,
  status: 'idle' as RequestStatus,
  error: null as string | null,
  isInitialized: false,
}

export const appSlice = createAppSlice({
  name: 'app',
  initialState,
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectStatus: (state) => state.status,
    selectAppError: (state) => state.error,
    selectIsInitialized: (state) => state.isInitialized,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state, action) => {
        if (
          todolistsApi.endpoints.getTodolists.matchPending(action) ||
          tasksApi.endpoints.getTasks.matchPending(action)
        ) {
          return
        }
        state.status = 'loading'
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addMatcher(isRejected, (state) => {
        state.status = 'failed'
      })
  },
  reducers: (create) => ({
    changeThemeMode: create.reducer<{ themeMode: ThemeMode }>(
      (state, action) => {
        state.themeMode = action.payload.themeMode
      },
    ),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsInitialized: create.reducer<{ isInitialized: boolean }>(
      (state, action) => {
        state.isInitialized = action.payload.isInitialized
      },
    ),
  }),
})
export type ThemeMode = 'dark' | 'light'

export const appReducer = appSlice.reducer
export const { changeThemeMode, setIsLoggedIn, setAppError, setIsInitialized } =
  appSlice.actions
export const {
  selectThemeMode,
  selectIsLoggedIn,
  selectStatus,
  selectAppError,
  selectIsInitialized,
} = appSlice.selectors
