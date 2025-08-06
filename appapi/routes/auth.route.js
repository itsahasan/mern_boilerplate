import express from 'express'
import {signup, forgetpassword} from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/signup', signup )
router.post('/forgetpassword', forgetpassword )




export default router