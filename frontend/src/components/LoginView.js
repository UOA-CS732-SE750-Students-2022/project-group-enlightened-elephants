import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import {UserRequest} from './Nav/UserRequest';

export default function FormPropsTextFields() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Username"
          defaultValue={username}
          onInput = {e => setUsername(e.target.value)}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete={password}
          onInput = {e => setPassword(e.target.value)}
        />
      </div>
      <Button variant="contained" onClick={() => {console.log(1)}}>Login</Button>
    </Box>
  );
}
