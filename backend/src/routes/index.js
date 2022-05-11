import express from 'express'

const router = express.Router()

import eepost from './eepost'
router.use('/eepost', eepost)

export default router