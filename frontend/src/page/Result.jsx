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
