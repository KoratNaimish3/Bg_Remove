import express from 'express'
import upload from '../middlewares/multer.js'
import { removeBgImage } from '../controllers/imageController.js'
import authUser from '../middlewares/auth.js'

const imageRoute = express.Router()

imageRoute.post('/removeBg' , authUser ,upload.single('image') , removeBgImage)

export default imageRoute