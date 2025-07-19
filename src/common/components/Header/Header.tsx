import {
  AppBar,
  Box,
  Container,
  IconButton,
  LinearProgress,
  Switch,
  Toolbar,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import {
  changeThemeMode,
  selectIsLoggedIn,
  selectStatus,
  selectThemeMode,
  setIsLoggedIn,
} from '@/app/appSlice'
import { NavButton } from '@/common/components/NavButton/NavButton'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { getTheme } from '@/common/theme/theme'
import { NavLink } from 'react-router'
import { Path } from '@/common/routing'
import { useLogoutMutation } from '@/features/auth/api/authApi.ts'
import { ResultCode } from '@/common/enums'
import { AUTH_TOKEN } from '@/common/constants'
import { baseApi } from '@/app/baseApi'

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const [logout] = useLogoutMutation()
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectStatus)

  const theme = getTheme(themeMode)

  const changeMode = () => {
    dispatch(
      changeThemeMode({
        themeMode: themeMode === 'light' ? 'dark' : 'light',
      }),
    )
  }

  const signOutClickHandler = () => {
    logout()
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedIn({ isLoggedIn: false }))
          localStorage.removeItem(AUTH_TOKEN)
        }
      })
      .then(() => {
        dispatch(baseApi.util.invalidateTags(['Todolist', 'Task']))
      })
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Container
          maxWidth="lg"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Box>
            {!isLoggedIn && (
              <NavLink to={Path.Login}>
                <NavButton>Sign in</NavButton>
              </NavLink>
            )}
            {isLoggedIn && (
              <NavButton onClick={signOutClickHandler}>Sign Out</NavButton>
            )}
            <NavButton background={theme.palette.secondary.light}>
              Faq
            </NavButton>
            <Switch color="secondary" onChange={changeMode} />
          </Box>
        </Container>
      </Toolbar>
      {status === 'loading' && <LinearProgress />}
    </AppBar>
  )
}
