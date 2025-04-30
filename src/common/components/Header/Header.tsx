import React from 'react';
import {AppBar, Box, Container, IconButton, Switch, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {NavButton} from "@/NavButton.tsx";
import {changeThemeModeAC} from "@/app/app-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectThemeMode} from "@/model/app-selectors.ts";
import {getTheme} from "@/common/theme/theme.ts";

export const Header: React.FC = () => {
    const themeMode = useAppSelector(selectThemeMode);

    const dispatch = useAppDispatch();

    const theme = getTheme(themeMode);

    const changeMode = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}));
    };



    return (
        <AppBar position="static">
            <Toolbar>
                <Container maxWidth="lg" sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <Box>
                        <NavButton>Sign in</NavButton>
                        <NavButton>Sign up</NavButton>
                        <NavButton background={theme.palette.secondary.light}>Faq</NavButton>
                        <Switch color="secondary" onChange={changeMode}/>
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    );
};
