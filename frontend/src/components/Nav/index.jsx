import * as React from 'react';
import { Link } from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useLocation } from 'react-router'

import { LoginModal } from '../LoginOutModal'
import { AuthContext } from '../../context/authContext'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function Nav() {
    const [loginModalVisible, setLoginModalVisible] = React.useState(false)
    const [logoutModalVisible, setLogoutModalVisible] = React.useState(false)
    const { isLogin, userName } = React.useContext(AuthContext)

    const location = useLocation()
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleSignInOpen = () => {
        setLoginModalVisible(true)
    };

    const handleSignOutOpen = ()=>{
        setLogoutModalVisible(true)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Link to={{ pathname: '/home' }}>
                        <Button variant="text">
                            <span className="App-title">Enlightened Elephants</span>
                        </Button>
                    </Link>

                    {location.pathname === '/result' && <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{'aria-label': 'search'}}
                        />
                    </Search>}
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {!isLogin && (<Button
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            onClick={handleSignInOpen}
                            color="inherit"
                        >
                            Login
                        </Button>)}
                        {isLogin && (<div>
                            <Button
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <span style={{ textTransform: 'none' }}>{userName}</span>
                            </Button>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleCloseMenu}
                            >
                                <MenuItem onClick={handleSignOutOpen}>Log out</MenuItem>
                            </Menu>
                        </div>)}
                    </Box>
                </Toolbar>
            </AppBar>
            <LoginModal
                loginModalVisible={loginModalVisible}
                setLoginModalVisible={setLoginModalVisible}
                logoutModalVisible={logoutModalVisible}
                setLogoutModalVisible={setLogoutModalVisible}
            />
        </Box>
    );
}
