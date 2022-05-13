import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Post from '../components/Post';
import Editor from '../components/Editor';

export default function BasicStack() {
  return (
    <Box style={{ width: '50%' }}>
      <Stack spacing={2}>
        <Post/>
        <Post/>
        <Post/>
      </Stack>
      <Editor/>
    </Box>
  );
}
