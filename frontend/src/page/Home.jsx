import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import useLocalStorage from '../hooks/useLocalStorage';

export default function Home() {
    const [value, setValue] = React.useState('');
    const [history,setHistory] = useLocalStorage('history',[])

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleClick = () => {
      
      const param = value.replace(/\s+/g,"")
      console.log(param);
      const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${param}&gsrlimit=20&prop=pageimages|extracts&exchars=200&exintro&explaintext&exlimit=max&format=json&origin=*`;
      fetch(url, {
        method: 'get'
    }).then((res) =>res.json()
    ).then((res)=>{
      console.log(res.query.pages)
    }).catch(function(err) {
      console.log(err);
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
                disableClearable
                options={top100Films.map((option) => option.title)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Input and search..."
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            endAdornment: <div>
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="search"
                                        onClick={handleClick}
                                        onMouseDown={handleMouseDown}
                                        edge="end"
                                    >
                                        <SearchIcon/>
                                    </IconButton>
                                </InputAdornment>
                            </div>
                        }}
                        value={value}
                        onChange={handleChange}
                    />
                    /*<OutlinedInput
                        {...params}
                        fullWidth
                        value={value}
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="search"
                                    onClick={handleClick}
                                    onMouseDown={handleMouseDown}
                                    edge="end"
                                >
                                    <SearchIcon/>
                                </IconButton>
                            </InputAdornment>
                        }
                    />*/
                )}
            />
        </div>
    )
}

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
];
