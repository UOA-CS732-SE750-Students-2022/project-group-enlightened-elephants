import express from 'express';
import { retrieveAllComment_, addComment_, retrievecomment_List,retrieveComment_ListByPostId } from '../../data/comment-data/commentDao';
import {verifyToken} from '../../utils/token'

const router = express.Router();

const HTTP_CREATED = 201;
const HTTP_ACCEPTED = 202;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

router.get('/getAll', async (req, res) => {
    res.json(await retrieveAllComment_())
})

router.get('/getById', async (req, res) => {
    const { post_id,pageNum } = req.query
    const comment_ = await retrieveComment_ListByPostId(post_id,Number(pageNum))
    res.json(comment_)
})

router.post('/add', verifyToken, async (req, res) => {
    const body = req.body
    const comment_ = {
        comment: body.comment,
        post_id: body.post_id,
        user_id: body.user_id,
        user_name: body.user_name
    }
    const newComment_ = await addComment_(comment_)

    res.sendStatus(HTTP_CREATED)
})

router.post('/reply', verifyToken, async (req, res) => {
    const body = req.body
    const comment_ = {
        comment: body.comment,
        post_id: body.post_id,
        user_id: body.user_id,
        user_name: body.user_name,
        replied_id: body.replied_id,
        to_user_id: body.to_user_id,
        to_user_name: body.to_user_id
    }
    const newComment_ = await addComment_(comment_)

    res.sendStatus(HTTP_CREATED)
})

export default router