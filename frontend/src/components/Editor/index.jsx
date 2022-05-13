import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';

const Wrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
}));

export default function Editor() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            content: data.get('content'),
        });
    };

    return (
        <Wrapper>
            <Card
                sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextareaAutosize
                        name="content"
                        aria-label="minimum height"
                        minRows={5}
                        maxRows={5}
                        placeholder="Please type here..."
                        style={{ width: 200 }}
                    />
                    <Button
                        size="small"
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>
                </Box>
            </Card>
        </Wrapper>
    );
}
