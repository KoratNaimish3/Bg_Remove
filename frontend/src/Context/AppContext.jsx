import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const { getToken } = useAuth()
    const { isSignedIn } = useUser()
    const { openSignIn } = useClerk()
    const navigate = useNavigate()

    //state
    const [credit, setCredit] = useState(false)
    const [image, setImage] = useState(false)
    const [resultImage, setResultImage] = useState(false)

    const loadCreditsData = async () => {
        try {

            const token = await getToken()
            const { data } = await axios.get(backendUrl + '/api/user/credits', { headers: { token } })

            if (data.success) {
                setCredit(data.credits)
            }

        } catch (error) {
            console.log("Error in loadCreditsData", error.message)
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message)
            }
            else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    }

    const removeBg = async (image) => {
        try {

            if (!isSignedIn) {
                return openSignIn()
            }

            setImage(image)
            setResultImage(false)
            navigate('/result')

            const token = await getToken()
            const formData = new FormData()
            image && formData.append('image', image)

            const { data } = await axios.post(`${backendUrl}/api/image/removeBg`, formData, {
                headers: { token }
            })

            if (data.success) {
                setResultImage(data.resultImage)
                setCredit(data.creditBalance)
            }

        } catch (error) {
            console.log("Error in removeBg", error.message)
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message)

            }
            if (error.response.data.creditBalance === 0) {
                navigate('/buy')
            }

            else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    }

    const value = {
        credit, setCredit, loadCreditsData, backendUrl, image, removeBg, resultImage, setResultImage, setImage
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider