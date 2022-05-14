import express from 'express';
import {retrieveAllEepostList,addEepost,retrieveEepostListByEntryId,deleteEepost,updateEepost,like} from '../../data/post-data/eepostDao';

const router = express.Router();

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_ACCEPTED = 202;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

// Retrieve all posts
router.get('/getAll', async (req, res) => {
    res.status(HTTP_OK).json(await retrieveAllEepostList())
})

// Retrieve posts of single entry
router.get('/getByEntry', async (req, res) => {
    const { entry_id,pageNum } = req.query

    const eeposts = await retrieveEepostListByEntryId(entry_id,Number(pageNum))
    res.status(HTTP_OK).json(eeposts)
})

// Add new post
router.post('/add', async (req, res) => {
    const body = req.body
    const eepostDoc = {
        entry_id: body.entry_id,
        entry_title: body.entry_title,
        content: body.content,
        user_id: body.user_id,
        user_name: body.user_name
    }
    const newEepost = await addEepost(eepostDoc)

    res.sendStatus(HTTP_CREATED)
})

//  Delete post
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params
    // console.log(id);
    const row = await deleteEepost(id)
    console.log(`${row.deletedCount} data deleted!`)
    res.sendStatus(HTTP_ACCEPTED)
})

// Update a post
router.post('/update', async (req, res) => {
    const { id, content } = req.body
    const result = await updateEepost(id, content)
    if (result) {
        res.sendStatus(HTTP_ACCEPTED)
        console.log(`Data (_id:${result._id}) is updated!`)
    } else {
        res.sendStatus(HTTP_NOT_FOUND)
        console.log(`id:${id} not found!`);
    }
})

// Give a like
router.get('/like/:id', async (req,res) => { 
    const {id} = req.params
    const result = await like(id)
    if (result) {
        console.log(`Post ${result._id} got a like!`);
        res.sendStatus(HTTP_ACCEPTED)
    } else {
        console.log(`${id} not found!`);
        res.sendStatus(HTTP_NOT_FOUND)
    }
 })

export default router;
