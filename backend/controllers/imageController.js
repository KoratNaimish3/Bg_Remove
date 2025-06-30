
import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'
import userModel from '../models/user.js'


// Controller function to remove bg from image

const removeBgImage = async (req, res) => {

    try {

        const clerkId = req.user
        const user = await userModel.findOne({ clerkId })

        if (!user) {
            return res.status(400).json({ success: false, message: "User Not Found" })
        }

        if (user.creditBalance === 0) {
            return res.status(400).json({ success: false,  creditBalance: user.creditBalance })
        }

        const imagePath = req.file.path


        //reading the image file
        const imageFile = fs.createReadStream(imagePath)

        const formdata = new FormData()
        formdata.append('image_file', imageFile)

        const { data } = await axios.post('https://clipdrop-api.co/remove-background/v1', formdata, {
            headers: {
                'x-api-key': process.env.CLIPGROP_API
            },
            responseType: 'arraybuffer'
        })

        const base64Image = Buffer.from(data, 'binary').toString('base64')
        const resultImage = `data:${req.file.mimetype};base64,${base64Image}`

        await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 })

        try {
            fs.unlinkSync(imagePath)
        } catch (err) {
            console.log("Failed to delete uploaded image:", err.message)
        }


        res.status(200).json({ success: true, resultImage, creditBalance: user.creditBalance - 1, message: "Background Remove" })



    } catch (error) {

        console.log("error in removeBgImage", error.message)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export { removeBgImage }