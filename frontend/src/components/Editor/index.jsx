import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import TextField from "@mui/material/TextField";
import axios from 'axios';
import useLocalStorage from '../../hooks/useLocalStorage';
import { AuthContext } from '../../context/authContext';

const Wrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
}));

const RightButtonWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(1, 0, 2, 1),
    textAlign: 'right',
}));

export default function Editor(props) {
    const [token] = useLocalStorage('token');
    const { isLogin, userName } = React.useContext(AuthContext);
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const addPost = async (data) => {
        await axios({
            method: 'post',
            url: '/eepost/add',
            headers: {
                token: token,
            },
            data,
        });
        setValue('');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            'entry_id':"32452432",
            'entry_title':"hello",
            content: data.get('content'),
            'user_name': userName,
        }
        addPost(body).then(props.getPost);
    };

    return (
        <Wrapper>
            <Card
                sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardContent sx={{ flexGrow: 1 }} style={{ paddingBottom: '0' }}>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            label="Add a new post..."
                            name="content"
                            multiline
                            minRows={5}
                            value={value}
                            onChange={handleChange}
                            placeholder="Please type here.."
                            style={{ width: '100%' }}
                            disabled={!isLogin}
                        />
                        <RightButtonWrapper>
                            <Button
                                size="small"
                                type="submit"
                                variant="contained"
                                disabled={!isLogin}
                            >
                                Post
                            </Button>
                        </RightButtonWrapper>
                    </Box>
                </CardContent>

            </Card>
        </Wrapper>
    );
}
