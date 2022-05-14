import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Post from '../components/Post';
import Editor from '../components/Editor';
import { styled } from '@mui/material/styles';
import axios from "axios";

const Wrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 0),
  minHeight: '400px',
}));

export default function PostView() {
    const [postList, setPostList] = React.useState([]);
    let total = 0;

    const getPost = async () => {
        const url = '/eepost/getByEntry?entry_id=Entry-id-b&pageNum=1';
        axios.get(url).then(res => {
            const data = res.data;
            setPostList(data.eeposts || []);
            if (data.count > 0) total = data.count;
        });
    }

    React.useEffect(() => {
        getPost().then();
    }, []);

    return (
        <Box style={{ width: '50%', marginBottom: '24px' }}>
            <Wrapper>
                <Stack spacing={2}>
                    {postList.map((item, index) => (
                        <Post key={index} getPost={getPost} {...item}/>
                    ))}
                </Stack>
            </Wrapper>
            <Editor getPost={getPost}/>
        </Box>
    );
}
