import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import useLocalStorage from '../hooks/useLocalStorage';

export default function Home() {
    const [value, setValue] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [list, setList] = React.useState([]);
    const [history,setHistory] = useLocalStorage('history',[])

    const handleChange = (event, value) => {
        setValue(value);
    };

    const handleClick = (option) => {
        console.log('prop', option);
    }

    const handlePressEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.defaultMuiPrevented = true;
            // handleSearch();
        }
    }

    const handleSearch = () => {
        if (!history && !(history instanceof Array)) {
            setHistory([])
        }

        history.map((item,index) => {
            if(item === value){
                history.splice(index, 1);
            }
        })
        if (history.length >= 10) {
            history.splice(0, 1);
        }
        setHistory([...history,value])

        setLoading(true);
        const param = value.replace(/\s+/g,"");
        const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${
            param.toLowerCase().trim()
        }&gsrlimit=20&prop=pageimages|extracts&exchars=200&exintro&explaintext&exlimit=max&format=json&origin=*`;
        fetch(url, { method: 'get' })
            .then((res) => res.json())
            .then((res) => {
                const array = [];
                for (const key of Object.keys(res.query.pages)) {
                    array.push(res.query.pages[key]);
                }
                setList(array);
                console.log(list, array.length);
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

    return (
        <div style={{ padding: '10em', textAlign: 'center' }}>
            <div style={{ marginBottom: '12px' }}>
                <span className="App-title" style={{ color: 'black', marginRight: '8px' }}>Enlightened Elephants</span>
                <span style={{ lineHeight: '34px', fontSize: '22px' }}>Wikipedia Forum</span>
            </div>
            <Autocomplete
                freeSolo
                loading={loading}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {}}
                inputValue={value}
                onKeyUp={handlePressEnter}
                onInputChange={handleChange}
                filterOptions={(x) => x}
                disableClearable
                // options={history.reverse().map((option) => option)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Input and search..."
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            endAdornment: <div style={{ display: 'flex' }}>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
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
                        <Box sx={{ flexGrow: 1 }}>
                            {option.title}
                            <br />
                            <span style={{ fontSize: '14px' }}>{option.extract}</span>
                        </Box>
                    </li>
                )}
            />
        </div>
    )
}
