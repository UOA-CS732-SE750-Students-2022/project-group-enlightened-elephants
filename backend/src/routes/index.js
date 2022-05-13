import express from 'express'

const router = express.Router()

import eepost from './eepost'
router.use('/eepost', eepost)

import user from './user';
router.use('/user', user);

export default router