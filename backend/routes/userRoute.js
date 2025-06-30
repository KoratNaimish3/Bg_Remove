import express from 'express'
import { clerkWebhooks, userCredits } from '../controllers/userController.js'
import authUser from '../middlewares/auth.js'

const userRoute = express.Router()

userRoute.post('/webhooks' , clerkWebhooks)
userRoute.get('/credits' , authUser , userCredits)

export default userRoute