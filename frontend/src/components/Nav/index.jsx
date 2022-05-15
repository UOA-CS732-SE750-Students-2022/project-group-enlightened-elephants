import * as React from 'react';
import { Link } from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useLocation, useNavigate } from 'react-router';

import useLocalStorage from '../../hooks/useLocalStorage';
import { LoginModal } from '../LoginOutModal'
import { AuthContext } from '../../context/authContext'

const Search = styled(Autocomplete)(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

export default function Nav() {
    const [loginModalVisible, setLoginModalVisible] = React.useState(false)
    const [logoutModalVisible, setLogoutModalVisible] = React.useState(false)
    const { isLogin, userName, setCurrentId, setCurrentTitle } = React.useContext(AuthContext)

    const location = useLocation()
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [list, setList] = React.useState([]);
    const [history,setHistory] = useLocalStorage('history',[])

    const handleChange = (event, value) => {
        setValue(value);
    };

    const handleClick = (option) => {
        console.log('prop', option);
        setCurrentId(option.pageid)
        setCurrentTitle(option.title)
        navigate(`/result?id=${option.pageid}&title=${option.title}`)
    }

    const handlePressEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.defaultMuiPrevented = true;
            handleSearch();
        }
    }

    const handleSearch = () => {
        if (!history && !(history instanceof Array)) {
            setHistory([])
        }

        history.forEach((item,index) => {
            if (item === value) {
                history.splice(index, 1);
            }
        });
        if (history.length >= 10) {
            history.splice(0, 1);
        }
        setHistory([...history,value])

        setLoading(true);
        const param = value.replace(/\s+/g,"/");
        const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${
            param.trim()
        }&gsrlimit=20&prop=pageimages|extracts&exchars=200&exintro&explaintext&exlimit=max&format=json&origin=*`;
        fetch(url, { method: 'get' })
            .then((res) => res.json())
            .then((res) => {
                const array = [];
                for (const key of Object.keys(res.query.pages)) {
                    array.push(res.query.pages[key]);
                }
                setList(array);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };

    const handleMouseDown = (event) => {
        event.preventDefault();
    };


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

                    {location.pathname === '/result' && <Search
                        freeSolo
                        loading={loading}
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        style={{ width: '469px' }}
                        size="small"
                        inputValue={value}
                        onKeyDown={handlePressEnter}
                        onInputChange={handleChange}
                        filterOptions={(x) => x}
                        disableClearable
                        // options={history.reverse().map((option) => option)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search..."
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                    endAdornment: <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {loading ? <CircularProgress color="inherit" size={12} /> : null}
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="search"
                                                onClick={handleSearch}
                                                onMouseDown={handleMouseDown}
                                                edge="end"
                                            >
                                                <SearchIcon/>
                                            </IconButton>
                                        </InputAdornment>
                                    </div>
                                }}
                            />
                        )}
                        noOptionsText="No results"
                        options={list}
                        getOptionLabel={(option) => `${option.pageid}`}
                        renderOption={(props, option) => (
                            <li
                                {...props}
                                onClick={() => {
                                    handleClick(option);
                                }}
                            >
                                <Box
                                    component="span"
                                    sx={{
                                        width: 50,
                                        height: 50,
                                        flexShrink: 0,
                                        borderRadius: '3px',
                                        mr: 1,
                                        mt: '2px',
                                    }}
                                    style={{
                                        backgroundImage: option.thumbnail?.source ? `url('${option.thumbnail.source}')` : ''
                                    }}
                                />
                                {/* <Link
                                    underline="none"
                                    to={{ pathname: '/result', search: `id=${option.pageid}&title=${option.title}` }}
                                > */}
                                    <Box sx={{ flexGrow: 1 }} style={{ color: '#000' }}>
                                        {option.title}
                                        <br />
                                        <span style={{ fontSize: '14px' }}>{option.extract}</span>
                                    </Box>
                                {/* </Link> */}
                            </li>
                        )}
                    />}

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
