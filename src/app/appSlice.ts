import { createAppSlice } from '@/common/utils/createAppSlice'

const initialState = {
  themeMode: 'light' as ThemeMode,
}

export const appSlice = createAppSlice({
  name: 'app',
  initialState,
  selectors: {
    selectThemeMode: (state): ThemeMode => state.themeMode,
  },
  reducers: (create) => ({
    changeThemeMode: create.reducer<{ themeMode: ThemeMode }>(
      (state, action) => {
        state.themeMode = action.payload.themeMode
      },
    ),
  }),
})
export type ThemeMode = 'dark' | 'light'

export const appReducer = appSlice.reducer
export const { changeThemeMode } = appSlice.actions
export const { selectThemeMode } = appSlice.selectors
