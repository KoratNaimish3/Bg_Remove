import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import { AppContext } from '../Context/appContext';

function PaymentSuccess() {

    const { setCredit ,credit } = useContext(AppContext)

    const { getToken } = useAuth()


    useEffect(() => {
        const updateCredits = async () => {

            const token = await getToken()

            try {
                const { data } = await axios.get('http://localhost:4000/api/payment/get-credit', {
                    headers: { token }
                });

                setCredit(data.creditBalance)


            } catch (error) {
                console.log("Error in updateCredits", error.message)
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message)
                }
                else {
                    toast.error("An unexpected error occurred. Please try again.");
                }
            }
        };
        updateCredits();
    }, []);

    return (
        <div className="flex flex-col  items-center justify-center text-center  min-h-[84vh]">
            <h1 className="text-2xl font-bold">Payment Successful!</h1>
            <p><span className='text-2xl'>{credit && credit}</span> credits added to your account.</p>
        </div>
    );
}

export default PaymentSuccess;
