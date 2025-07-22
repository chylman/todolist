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
            borderRadius: 500,
            padding: '12px 32px',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            transition:
              'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
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
            main: '#1DB954', // Сохраняем зеленый цвет Spotify
            light: '#1ED760',
            dark: '#1AA34A',
          },
          secondary: {
            main: '#000000', // В светлой теме вторичный цвет черный
          },
          background: {
            default: '#FFFFFF',
            paper: '#F8F8F8', // Светлый фон для карточек
          },
          text: {
            primary: '#000000',
            secondary: '#535353', // Серый для второстепенного текста
          },
          grey: {
            50: '#FFFFFF',
            100: '#F8F8F8',
            200: '#E5E5E5',
            300: '#D2D2D2',
            400: '#A0A0A0',
            500: '#535353',
          },
        },
        components: {
          ...commonThemeSettings,
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundColor: '#F8F8F8',
                borderRadius: '8px',
                transition:
                  'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  backgroundColor: '#E5E5E5',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                  zIndex: 1,
                },
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: '#FFFFFF',
                color: '#000000',
                borderBottom: '1px solid #E5E5E5',
              },
            },
          },
        },
      })
    : createTheme({
        ...commonThemeSettings,
        palette: {
          mode: 'dark',
          primary: {
            main: '#1DB954',
            light: '#1ED760',
            dark: '#1AA34A',
          },
          secondary: {
            main: '#FFFFFF',
          },
          background: {
            default: '#121212',
            paper: '#181818',
          },
          text: {
            primary: '#FFFFFF',
            secondary: '#B3B3B3',
          },
          grey: {
            900: '#121212',
            800: '#181818',
            700: '#282828',
            600: '#535353',
            500: '#B3B3B3',
          },
        },
        components: {
          ...commonThemeSettings,
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundColor: '#181818',
                transition:
                  'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  backgroundColor: '#282828',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                  zIndex: 1,
                },
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: '#000000',
              },
            },
          },
        },
      })
}
