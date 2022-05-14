import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import Post from '../components/Post';
import Editor from '../components/Editor';
import { styled } from '@mui/material/styles';
import axios from "axios";

const Wrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(2, 0),
    minHeight: '400px',
    height: 'calc(100vh - 366px)',
    overflow: 'auto',
    marginBottom: theme.spacing(1),
}));

const EmptyWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(2, 0),
    minHeight: '400px',
    height: 'calc(100vh - 366px)',
    marginBottom: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '22px',
    color: 'gray',
}));

export default function PostView() {
    const [page, setPage] = React.useState(1);
    const [postList, setPostList] = React.useState([]);
    const [count, setCount] = React.useState([]);

    const getPost = async () => {
        const url = `/eepost/getByEntry?entry_id=Entry-id-b&pageNum=${page}`;
        axios.get(url).then(res => {
            const data = res.data;
            setPostList(data.eeposts || []);
            if (data.count > 0) {
                setCount(Math.ceil(data.count/10));
            }
        });
    }

    React.useEffect(() => {
        getPost().then();
    }, []);

    const handleChange = (event, value) => {
        setPage(value);
        getPost().then();
    };

    return (
        <Box style={{ width: '50%', marginBottom: '24px' }}>
            <Wrapper>
                <Stack spacing={2}>
                    {postList.map((item, index) => (
                        <Post key={index} getPost={getPost} {...item}/>
                    ))}
                    {postList.length < 1 && <EmptyWrapper>Nothing here~</EmptyWrapper>}
                </Stack>
            </Wrapper>
            <Pagination
                count={count}
                page={page}
                onChange={handleChange}
                style={{ marginBottom: '8px', float: 'right' }}
            />
            <Editor getPost={getPost}/>
        </Box>
    );
}
