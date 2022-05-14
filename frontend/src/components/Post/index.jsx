import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import dayjs from 'dayjs';
import axios from "axios";
import useLocalStorage from "../../hooks/useLocalStorage";
import {AuthContext} from "../../context/authContext";

const Wrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    fontSize: '18px',
}));

const ReplyWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
}));

const CommentsWrapper = styled('div')(({ theme }) => ({
    margin: theme.spacing(0, 2, 1, 2),
    padding: theme.spacing(1),
    backgroundColor: 'rgba(0,0,0,0.05)',
    display: 'flex',
    justifyContent: 'space-between',
}));

const DateWrapper = styled('div')(({}) => ({
    fontSize: '16px',
    lineHeight: '24px',
    padding: '4px',
}));

export default function Post(props) {
    const {
        getPost,
        user_name = 'unknown',
        content = '...',
        updatedAt,
        comments = [
            {
                user_name: 'unknown',
                to_user_name: 'unknown',
                content: '...',
                updatedAt,
            },
        ],
    } = props;

    const [token] = useLocalStorage('token');
    const { isLogin, userName } = React.useContext(AuthContext);
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const [fold, setFold] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isReplyOpen = Boolean(anchorEl);

    const handleFold = () => {
        setFold(!fold);
    }

    const handleReplyOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleReplyClose = () => {
        setAnchorEl(null);
        setValue('');
    };

    const addComment = async (data) => {
        await axios({
            method: 'post',
            url: '/comment/add', // '/comment/reply'
            headers: {
                token: token,
            },
            data,
        });
        handleReplyClose();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            'post_id':"32452432",
            comment: data.get('content'),
            'user_name': userName,
            // 'replied_id': '',
            // 'to_user_id': '',
            // 'to_user_name': '',
        }
        addComment(body).then(props.getPost);
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
                    <ReplyWrapper>
                        <TextField
                            label="Content"
                            name="content"
                            multiline
                            minRows={4}
                            value={value}
                            onChange={handleChange}
                            placeholder="Please type here.."
                            style={{ width: '100vh' }}
                        />
                    </ReplyWrapper>
                    <ReplyWrapper style={{ paddingTop: '0', textAlign: 'right' }}>
                        <Button
                            size="small"
                            type="submit"
                            variant="contained"
                        >
                            Submit
                        </Button>
                    </ReplyWrapper>
                </Box>
            </ReplyWrapper>
        </Popover>
    );

    return (
        <Wrapper>
            <Card
                sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardContent sx={{ flexGrow: 1 }} style={{ paddingBottom: '0' }}>
                    <Typography gutterBottom component="div">
                        <Link>{user_name}</Link>
                        <span style={{ fontSize: '16px' }}> says:</span>
                    </Typography>
                    <Typography style={{ fontSize: '16px' }}>
                        {content}
                    </Typography>
                    <CardActions style={{ flexDirection: 'row-reverse', alignItems: 'baseline' }}>
                        <Button
                            size="small"
                            aria-label="account of current user"
                            aria-controls={replyId}
                            aria-haspopup="true"
                            onClick={handleReplyOpen}
                        >
                            Reply
                        </Button>
                        <DateWrapper>
                            {dayjs(updatedAt).format('HH:mm:ss DD/MM/YYYY')}
                        </DateWrapper>
                    </CardActions>
                </CardContent>
                {comments.length > 0 && <CommentsWrapper>
                    <div style={{ lineHeight: '26px', padding: '4px' }}>
                        <b>Comments:</b>
                    </div>
                    <Button
                        size="small"
                        onClick={handleFold}
                    >
                        {fold ? 'Unfold' : 'fold'}
                    </Button>
                </CommentsWrapper>}
                <CommentsWrapper
                    style={{
                        display: fold ? 'none' : 'block',
                        paddingTop: 0,
                        paddingBottom: 0,
                    }}
                >
                    {comments.map((item, index) => (
                        <div key={index}>
                            <CardContent sx={{ flexGrow: 1 }} style={{ paddingBottom: '0' }}>
                                <Typography gutterBottom component="div" style={{ fontSize: '16px' }}>
                                    <Link>{item.user_name}</Link>
                                    <span> replied </span>
                                    <Link>{item.to_user_name}</Link>:
                                </Typography>
                                <Typography style={{ fontSize: '16px' }}>
                                    {item.content}
                                </Typography>
                            </CardContent>
                            <CardActions style={{ flexDirection: 'row-reverse', alignItems: 'baseline' }}>
                                <Button
                                    size="small"
                                    aria-label="account of current user"
                                    aria-controls={replyId}
                                    aria-haspopup="true"
                                    onClick={handleReplyOpen}
                                >
                                    Reply
                                </Button>
                                <DateWrapper>
                                    {dayjs(item.updatedAt).format('HH:mm:ss DD/MM/YYYY')}
                                </DateWrapper>
                            </CardActions>
                        </div>
                    ))}
                </CommentsWrapper>
            </Card>
            {renderReply}
        </Wrapper>
    );
}