import React from 'react'
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Switch,
  Toolbar,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { changeThemeMode, selectThemeMode } from '@/app/appSlice'
import { NavButton } from '@/common/components/NavButton/NavButton'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { getTheme } from '@/common/theme/theme'
import { NavLink } from 'react-router'
import { Path } from '@/common/routing'

export const Header: React.FC = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)

  const changeMode = () => {
    dispatch(
      changeThemeMode({
        themeMode: themeMode === 'light' ? 'dark' : 'light',
      }),
    )
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
            <NavLink to={Path.Login}>
              <NavButton>Sign in</NavButton>
            </NavLink>{' '}
            <NavButton>Sign up</NavButton>
            <NavButton background={theme.palette.secondary.light}>
              Faq
            </NavButton>
            <Switch color="secondary" onChange={changeMode} />
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  )
}
