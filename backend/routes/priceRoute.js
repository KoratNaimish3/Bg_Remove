import express from 'express'
import authUser from '../middlewares/auth.js'
import  { addCredit, paymentController } from '../controllers/priceControlleer.js'

const priceRoute = express.Router()

priceRoute.post('/stripe' , authUser , paymentController)
priceRoute.get('/get-credit' , authUser , addCredit)

export default priceRoute