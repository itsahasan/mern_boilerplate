import express from 'express'
import {signup, verifyemail, login, logout, forgetpassword, resetpassword, checkAuth} from '../controllers/auth.controller.js'
import {verifyToken} from '../utils/auth.js'

const router = express.Router()

router.get('/check-auth', verifyToken, checkAuth )

router.post('/signup', signup )
router.post('/verify-email', verifyemail)
router.post('/login', login)
router.post('/logout', logout)
router.post('/forgot-password', forgetpassword)
router.post('/reset-password/:token', resetpassword)







export default router