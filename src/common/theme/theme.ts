import { createTheme } from '@mui/material/styles'
import { ThemeMode } from '@/app/appSlice.ts'
import { lime, purple } from '@mui/material/colors'

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      primary: lime,
      secondary: purple,
      mode: themeMode,
    },
  })
}
