import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../Context/appContext'

function Upload() {
        const {removeBg} = useContext(AppContext)
    
    return (
        <div className='pb-5'>

            <h1 className='text-center text-2xl md:text-3xl lg:text-4xl  font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent mt-24 pb-7 '>See the magic. Try now</h1>


            <div className='text-center mb-16'>
                <input type="file" id='upload2' hidden onChange={e=>removeBg(e.target.files[0])} accept='image/*'/>

                <label htmlFor="upload2" className='inline-flex items-center gap-3 px-6 py-3.5 rounded-full cursor-pointer bg-gradient-to-r  from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-500'>

                    <img src={assets.upload_btn_icon} alt="" width={20} />
                    <p className='text-white text-sm'>Upload your image</p>

                </label>
            </div>

        </div>
    )
}

export default Upload