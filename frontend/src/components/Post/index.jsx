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
import IconButton from '@mui/material/IconButton';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { Link } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import useLocalStorage from '../../hooks/useLocalStorage';
import { AuthContext } from '../../context/authContext';

const Wrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    fontSize: '14px',
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
    fontSize: '14px',
    lineHeight: '22px',
    padding: '4px',
}));

export default function Post(props) {
    const {
        getPost,
        _id,
        user_name = 'unknown',
        content = '...',
        like,
        updatedAt,
        comments = [],
    } = props;

    const [token] = useLocalStorage('token');
    const { isLogin, userName } = React.useContext(AuthContext);
    const [param, setParam] = React.useState({});
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const [fold, setFold] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isReplyOpen = Boolean(anchorEl);

    const handleFold = () => {
        setFold(!fold);
    }

    const handleReplyOpen = (event, data) => {
        setParam(data);
        setAnchorEl(event.currentTarget);
    };

    const handleReplyClose = () => {
        setAnchorEl(null);
        setValue('');
    };

    const handleLike = () => {
        axios.get(`/eepost/like/${_id}`).then(getPost);
    }

    const addComment = async (url, data) => {
        await axios({
            method: 'post',
            url: '/comment/add',
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
            'post_id': _id,
            comment: data.get('content'),
            'user_name': userName,
            ...param,
        }
        const url = param.replied_id ? '/comment/reply': '/comment/add';
        addComment(url, body).then(getPost);
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
                            style={{ width: '45vh' }}
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
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography gutterBottom component="div">
                            <Link>{user_name}</Link>
                            <span style={{ fontSize: '14px' }}> says:</span>
                        </Typography>
                        <div>
                            <IconButton
                                aria-label="search"
                                onClick={handleLike}
                                edge="end"
                            >
                                <ThumbUpOutlinedIcon fontSize="small"/>
                            </IconButton>
                            {like > 0 && <span
                                style={{ lineHeight: '26px', display: 'inline-block', margin: '0 12px' }}
                            >
                                {like}
                            </span>}
                        </div>
                    </div>

                    <Typography style={{ fontSize: '14px' }}>
                        {content}
                    </Typography>
                    <CardActions style={{ flexDirection: 'row-reverse', alignItems: 'baseline' }}>
                        <Button
                            size="small"
                            aria-label="account of current user"
                            aria-controls={replyId}
                            aria-haspopup="true"
                            disabled={!isLogin}
                            onClick={(event) => {
                                handleReplyOpen(event, {});
                            }}
                        >
                            Reply
                        </Button>
                        <DateWrapper>
                            {dayjs(updatedAt).format('HH:mm:ss DD/MM/YYYY')}
                        </DateWrapper>
                    </CardActions>
                </CardContent>
                {comments.length > 0 && <CommentsWrapper style={{ marginBottom: fold ? '' : 0 }}>
                    <div style={{ lineHeight: '22px', padding: '4px' }}>
                        <b>Comments ({comments.length}):</b>
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
                            <CardContent sx={{ flexGrow: 1 }} style={{ paddingTop: '0', paddingBottom: '0' }}>
                                <Typography gutterBottom component="div" style={{ fontSize: '14px' }}>
                                    <Link>{item.user_name}</Link>
                                    <span> replied </span>
                                    <Link>{item.to_user_name}</Link>:
                                </Typography>
                                <Typography style={{ fontSize: '14px' }}>
                                    {item.comment}
                                </Typography>
                            </CardContent>
                            <CardActions style={{ flexDirection: 'row-reverse', alignItems: 'baseline' }}>
                                <Button
                                    size="small"
                                    aria-label="account of current user"
                                    aria-controls={replyId}
                                    aria-haspopup="true"
                                    disabled={!isLogin}
                                    onClick={(event) => {
                                        handleReplyOpen(event, {
                                            replied_id: item._id,
                                            to_user_id: item.user_id,
                                            to_user_name: item.user_name,
                                        });
                                    }}
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
