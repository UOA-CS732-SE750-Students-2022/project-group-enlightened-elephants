import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Post from '../components/Post';
import Editor from '../components/Editor';
import { styled } from '@mui/material/styles';
import useGet from '../useGet';

const Wrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 0),
  minHeight: '400px',
}));

export default function BasicStack() {
    const { data } = useGet('/eepost/getByEntry?entry_id=Entry-id-b&pageNum=1', []);

    // const data = { count: 1, eepost: [{id:99,name:'tets'}]}

    return (
        <Box style={{ width: '50%', marginBottom: '24px' }}>
            <Wrapper>
                <Stack spacing={2}>
                    {(data.eepost || []).map((item, index) => (<Post key={index} {...item}/>))}
                </Stack>
            </Wrapper>
            <Editor/>
        </Box>
    );
}
