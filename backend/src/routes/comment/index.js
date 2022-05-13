import express from 'express';
import { retrieveAllComment_, addComment_, retrievecomment_List,retrieveComment_ListById } from '../../data/post-data/commentDao';

const router = express.Router();

const HTTP_CREATED = 201;
const HTTP_ACCEPTED = 202;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
// Retrieve all posts
router.get('/getAll', async (req, res) => {
    res.json(await retrieveAllComment_())
})

// Retrieve posts of single entry
router.get('/getById', async (req, res) => {
    const { id,pageNum } = req.query

    const comment_ = await retrieveComment_ListById(id,Number(pageNum))
    res.json(comment_)
})
// Add new post
router.post('/add', async (req, res) => {
    // console.log('entry');
    const body = req.body
    const comment_ = {
        comment: body.comment,
        post_id: body.post_id,
        user_id: body.user_id,
        replied_id: body_replied_id,
        to_user_id: body.to_user_id,
        create_time: body.create_time,
        id: body.id,
    }
    const newComment_ = await addComment_(comment_)

    res.header('Location', `/getById/${newComment_.id}`)
        .sendStatus(HTTP_CREATED)
})