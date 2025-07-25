import {
  AppBar,
  Box,
  Button,
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
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useAppSelector } from '@/common/hooks/useAppSelector'
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
    <AppBar position="relative">
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
                <Button
                  variant="text"
                  size={'large'}
                  color="secondary"
                  sx={{ fontWeight: '700' }}
                >
                  Sign in
                </Button>
              </NavLink>
            )}
            {isLoggedIn && (
              <Button
                variant="text"
                color="secondary"
                onClick={signOutClickHandler}
                size={'large'}
                sx={{ fontWeight: '700' }}
              >
                Sign Out
              </Button>
            )}
            <Button
              variant="text"
              color="secondary"
              size={'large'}
              sx={{ fontWeight: '700' }}
            >
              Faq
            </Button>
            <Switch color="secondary" onChange={changeMode} />
          </Box>
        </Container>
      </Toolbar>
      <Box sx={{ position: 'absolute', bottom: '0', width: '100%' }}>
        {status === 'loading' && <LinearProgress />}
      </Box>
    </AppBar>
  )
}
