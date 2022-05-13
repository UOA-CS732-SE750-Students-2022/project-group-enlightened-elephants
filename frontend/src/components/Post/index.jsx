import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Popover from '@mui/material/Popover';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';

const Wrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
}));

const ReplyWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(1, 1),
}));

export default function Post(props) {
    const {
        user = 'someone',
        content = 'bala bala',
    } = props;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const isReplyOpen = Boolean(anchorEl);

    const handleReplyOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleReplyClose = () => {
        setAnchorEl(null);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            content: data.get('content'),
        });
    };

    const replyId = isReplyOpen ? 'primary-search-account-reply' : undefined;
    const renderReply = (
        <Popover
            id={replyId}
            open={isReplyOpen}
            anchorEl={anchorEl}
            onClose={handleReplyClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <ReplyWrapper>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextareaAutosize
                        name="content"
                        aria-label="minimum height"
                        minRows={5}
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
            </ReplyWrapper>
        </Popover>
    );

    return (
        <Wrapper>
            <Card
                sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {user}<span style={{ fontWeight: '400' }}> says:</span>
                    </Typography>
                    <Typography>
                        {content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <span>at 22:22:22 22/05/2022</span>
                    <Button
                        size="small"
                        aria-label="account of current user"
                        aria-controls={replyId}
                        aria-haspopup="true"
                        onClick={handleReplyOpen}
                    >
                        Reply
                    </Button>
                </CardActions>
            </Card>
            {renderReply}
        </Wrapper>
    );
}
