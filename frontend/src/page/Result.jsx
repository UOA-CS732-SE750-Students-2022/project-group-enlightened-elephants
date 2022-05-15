import * as React from 'react';
import PostView from './PostView';
import { useLocation } from 'react-router';
import { AuthContext } from '../context/authContext';
import { styled } from '@mui/material/styles';

const Wrapper = styled('div')(() => ({
    display: 'flex',
    minHeight: '666px',
    height: 'calc(100vh - 70px)',
}));

export default function Result() {
    const location = useLocation();

    const {currentId, setCurrentId, currentTitle, setCurrentTitle} = React.useContext(AuthContext)

    React.useEffect(() => {
        if (currentId == null) {
            const search = location.search.replace('?', '');
            const searchList = search.split('&');
            for (const item of searchList) {
                const pairs = item.split('=');
                if (pairs[0] === 'id') setCurrentId(pairs[1]);
                if (pairs[0] === 'title') setCurrentTitle(pairs[1]);
            }
        }
    }, []);

    return (
        <Wrapper>
            <div style={{ width: '50%' }}>
                <iframe
                    src={`https://en.wikipedia.org/wiki/${currentTitle}`}
                    style={{ height: '100%', width: '100%' }}
                    title={currentTitle}
                />
            </div>
            <PostView/>
        </Wrapper>
    )
}
