import { createAppSlice } from '@/common/utils/createAppSlice'

const initialState = {
  themeMode: 'light' as ThemeMode,
  isLoggedIn: false,
}

export const appSlice = createAppSlice({
  name: 'app',
  initialState,
  selectors: {
    selectThemeMode: (state): ThemeMode => state.themeMode,
    selectIsLoggedIn: (state): boolean => state.isLoggedIn,
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
export const { selectThemeMode, selectIsLoggedIn } = appSlice.selectors
