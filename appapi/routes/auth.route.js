import express from 'express'
import {signup, verifyemail, login, logout, forgetpassword, resetpassword} from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/signup', signup )
router.post('/verify-email', verifyemail)
router.post('/login', login)
router.post('/logout', logout)
router.post('/forgot-password', forgetpassword)
router.post('/reset-password/:token', resetpassword)







export default router