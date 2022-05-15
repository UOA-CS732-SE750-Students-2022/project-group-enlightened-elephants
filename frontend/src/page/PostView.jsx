import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import Post from '../components/Post';
import Editor from '../components/Editor';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const Wrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(2, 0),
    minHeight: '366px',
    height: 'calc(100% - 276px)',
    overflow: 'auto',
    marginBottom: theme.spacing(1),
}));

const EmptyWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(2, 0),
    minHeight: '326px',
    height: 'calc(100% - 316px)',
    marginBottom: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '22px',
    color: 'gray',
}));

export default function PostView(props) {
    const {
        entryId,
        entryTitle,
    } = props;

    const [page, setPage] = React.useState(1);
    const [postList, setPostList] = React.useState([]);
    const [count, setCount] = React.useState(0);

    const getPost = async () => {
        const url = `/eepost/getByEntry?entry_id=${entryId}&pageNum=${page}`;
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
        <Box style={{ width: '50%', margin: '12px 0' }}>
            <Wrapper>
                <Stack spacing={2}>
                    {postList.map((item, index) => (
                        <Post key={index} getPost={getPost} {...item} entryId={entryId} entryTitle={entryTitle}/>
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
            <Editor getPost={getPost} entryId={entryId} entryTitle={entryTitle}/>
        </Box>
    );
}
