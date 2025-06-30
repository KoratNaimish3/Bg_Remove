import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    clerkId: {
        type: String,
        require: true,
        unique: true
    },

    firstName: {
        type: String,
    },

    lastName: {
        type: String,
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    photo: {
        type: String,
        require: true,
    },

    creditBalance: {
        type: Number,
        default: 5
    }
})

const userModel = mongoose.models.user || mongoose.model("user", userSchema)
export default userModel