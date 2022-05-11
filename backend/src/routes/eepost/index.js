import express from 'express';
import {retrieveAllEepostList, retrieveEepostListByEntryId} from '../../data/post-data/eepostDao';

const router = express.Router();

// Retrieve all posts
router.get('/getAll', async (req, res) => {
    res.json(await retrieveAllEepostList())
})

// Retrieve posts of single entry
router.get('/getByEntry', async (req, res) => {
    const { entry_id,pageNum } = req.query

    const eeposts = await retrieveEepostListByEntryId(entry_id,Number(pageNum))
    res.json(eeposts)
})


export default router;
