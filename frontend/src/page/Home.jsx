import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function Home() {
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
            }}
          />
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
