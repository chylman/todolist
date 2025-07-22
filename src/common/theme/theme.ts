import { createTheme } from '@mui/material/styles'
import { ThemeMode } from '@/app/appSlice.ts'

export const getTheme = (themeMode: ThemeMode) => {
  const commonThemeSettings = {
    typography: {
      fontFamily: '"Circular Spotify Tx T", "Helvetica", Arial, sans-serif', // Spotify-шрифт (можно заменить на "Inter")
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none' as const,
            fontWeight: 'bold' as const,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease',
          },
        },
      },
    },
  }

  return themeMode === 'dark'
    ? createTheme({
        ...commonThemeSettings,
        palette: {
          mode: 'light',
          primary: {
            main: '#1DB954', // Зелёный (кнопки, акценты)
          },
          secondary: {
            main: '#191414', // Тёмный (для текста)
          },
          background: {
            default: '#FFFFFF',
            paper: '#F5F5F5', // Фон карточек
          },
          text: {
            primary: '#191414',
            secondary: '#535353',
          },
        },
      })
    : createTheme({
        ...commonThemeSettings,
        palette: {
          mode: 'dark',
          primary: {
            main: '#1DB954', // Зелёный (акценты)
          },
          secondary: {
            main: '#FFFFFF', // Белый (второстепенные элементы)
          },
          background: {
            default: '#121212',
            paper: '#181818', // Карточки
          },
          text: {
            primary: '#FFFFFF',
            secondary: '#B3B3B3', // Серый (неактивный текст)
          },
        },
      })
}
