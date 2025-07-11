import React, { useState } from 'react'
import { assets } from '../assets/assets'

function BgSlider() {

    const [sliderPosition, setSliderPosition] = useState(50)

    const handlerSliderChange = (e) => {
        setSliderPosition(e.target.value)
    }
    return (
        <div className='pb-10 md:pb-20 mx-4'>

            {/* -----------title----------- */}
            <h1 className='text-center text-2xl md:text-3xl lg:text-4xl  font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent pb-2 mb-12 sm:mb-20'>Remove background with high <br /> Quality and accuracy</h1>

            <div className='relative w-full max-w-3xl overflow-x-hidden m-auto rounded-xl'>

                {/* ------background Image --------- */}
                <img src={assets.image_w_bg} style={{ clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)` }} alt="" />

                {/* ------foreground Image --------- */}
                <img src={assets.image_wo_bg} style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }} alt="" className='absolute top-0 left-0 w-full h-full'/>

                {/* slider */}
                <input type="range" min={0} max={100} value={sliderPosition} onChange={handlerSliderChange} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10 slider'/>

            </div>

        </div>
    )
}

export default BgSlider