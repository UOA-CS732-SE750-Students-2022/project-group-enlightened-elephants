import * as React from 'react';
import PostView from './PostView';
import { useLocation } from 'react-router';
import { styled } from '@mui/material/styles';

const Wrapper = styled('div')(() => ({
    display: 'flex',
    minHeight: '666px',
    height: 'calc(100vh - 70px)',
}));

export default function Result() {
    const location = useLocation();
    const [id, setId] = React.useState('');
    const [title, setTitle] = React.useState('');

    React.useEffect(() => {
        const search = location.search.replace('?', '');
        const searchList = search.split('&');
        for (const item of searchList) {
            const pairs = item.split('=');
            if (pairs[0] === 'id') setId(pairs[1]);
            if (pairs[0] === 'title') setTitle(pairs[1]);
        }
        console.log(id, title, location);
    }, []);

    return (
        <Wrapper>
            <div style={{ width: '50%' }}>
                <iframe
                    src={`https://en.wikipedia.org/wiki/${title}`}
                    style={{ height: '100%', width: '100%' }}
                />
            </div>
            <PostView entryId={id} entryTitle={title}/>
        </Wrapper>
    )
}
