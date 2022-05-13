import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Post from '../components/Post';
import Editor from '../components/Editor';
import { styled } from '@mui/material/styles';

const Wrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 0),
  minHeight: '400px',
}));

export default function BasicStack() {
  return (
    <Box style={{ width: '50%', marginBottom: '24px' }}>
      <Wrapper>
        <Stack spacing={2}>
          <Post/>
          <Post/>
          <Post/>
        </Stack>
      </Wrapper>
      <Editor/>
    </Box>
  );
}
