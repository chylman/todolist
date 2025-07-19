import { createAppSlice } from '@/common/utils/createAppSlice'
import { RequestStatus } from '@/common/types'
import { isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

const initialState = {
  themeMode: 'light' as ThemeMode,
  isLoggedIn: false,
  status: 'idle' as RequestStatus,
}

export const appSlice = createAppSlice({
  name: 'app',
  initialState,
  selectors: {
    selectThemeMode: (state): ThemeMode => state.themeMode,
    selectIsLoggedIn: (state): boolean => state.isLoggedIn,
    selectStatus: (state): RequestStatus => state.status,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
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
  }),
})
export type ThemeMode = 'dark' | 'light'

export const appReducer = appSlice.reducer
export const { changeThemeMode, setIsLoggedIn } = appSlice.actions
export const { selectThemeMode, selectIsLoggedIn, selectStatus } =
  appSlice.selectors
