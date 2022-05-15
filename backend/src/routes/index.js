import express from 'express'

const router = express.Router()

import user from './user';
router.use('/user', user);

import eepost from './eepost'
router.use('/eepost', eepost)

import comment from './comment'
router.use('/comment',comment)

export default router