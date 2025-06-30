import { Webhook } from 'svix'
import userModel from '../models/user.js'
//API Controller function  to manage clerk user with database

const clerkWebhooks = async (req, res) => {

    try {

        //create svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })


        const { data, type } = req.body

        switch (type) {

            case 'user.created': {

                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url

                }

                await userModel.create(userData)
                console.log("success")
                res.status(200).json({ success: true })

                break;
            }

            case 'user.updated': {

                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url

                }

                await userModel.findOneAndUpdate({ clerkId: data.id }, userData)
                res.status(200).json({ success: true })

                break;

            }

            case 'user.deleted': {

                await userModel.findOneAndDelete({ clerkId: data.id })
                res.status(200).json({ success: true })

                break;

            }
        }

    } catch (error) {
        console.log("error in webhooks", error.message)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}



// API Controller function to get User available credits data

const userCredits = async (req, res) => {
    try {

        const clerkId = req.user
        const userData = await userModel.findOne({ clerkId })
        res.status(200).json({ success: true, credits: userData.creditBalance })

    } catch (error) {
        console.log("error in userCredits", error.message)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}





export { clerkWebhooks, userCredits }
