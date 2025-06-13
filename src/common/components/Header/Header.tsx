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
import { changeThemeModeAC } from '@/app/app-reducer.ts'
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts'
import { useAppSelector } from '@/common/hooks/useAppSelector.ts'
import { getTheme } from '@/common/theme/theme.ts'
import { selectThemeMode } from '@/features/todolists/model/app-selectors'
import { NavButton } from '@/common/components/NavButton/NavButton'

export const Header: React.FC = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)

  const changeMode = () => {
    dispatch(
      changeThemeModeAC({
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
            <NavButton>Sign in</NavButton>
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
