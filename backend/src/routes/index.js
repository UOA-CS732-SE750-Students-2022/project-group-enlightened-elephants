import express from 'express'

const router = express.Router()

import user from './user';
router.use('/', user);

export default router