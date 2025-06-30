import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/db.js'
import userRoute from './routes/userRoute.js'
import imageRoute from './routes/imageRoute.js'
import priceRoute from './routes/priceRoute.js'
import { stripeWebhook } from './controllers/priceControlleer.js'

//App Config
const PORT = process.env.PORT || 4000
const app = express()
connectDB()

app.post('/api/payment/webhook', express.raw({ type: 'application/json' }), stripeWebhook)

//Initialize Middlewares
app.use(express.json())
app.use(cors()) // connect frontend to backend server

// API routes
app.get('/', (req, res) => res.send("API is working"))
app.use('/api/user', userRoute)
app.use('/api/image', imageRoute)
app.use('/api/payment', priceRoute)

app.listen(PORT, () => console.log("Server is Running on port : " + PORT))