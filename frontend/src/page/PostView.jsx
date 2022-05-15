import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Post from '../components/Post';
import Editor from '../components/Editor';
import { styled } from '@mui/material/styles';
import axios from "axios";

import {AuthContext} from '../context/authContext'
import useGet from '../hooks/useGet';

const Wrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 0),
  minHeight: '400px',
}));

export default function PostView() {
    const [postList, setPostList] = React.useState([]);
    const [pageNum, setPageNum] = React.useState(1)
    const {currentId, setCurrentId, currentTitle, setCurrentTitle} = React.useContext(AuthContext)
    let total = 0;

    const url = `/eepost/getByEntry?entry_id=${currentId}&pageNum=${pageNum}`
    const { status, data, isLoading } = useGet(url)
    // console.log(data)

    const getPost = () => {
        if (data.count > 0) total = data.count;
        setPostList(data.eeposts || []);
    }

    // const getPost = async () => {
    //     const url = `/eepost/getByEntry?entry_id=${currentId}&pageNum=1`
    //     axios.get(url).then(res => {
    //         const data = res.data;
    //         setPostList(data.eeposts || []);
    //         if (data.count > 0) total = data.count;
    //     });
    // }

    // React.useEffect(() => {
    //     getPost().then();
    // }, []);

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
