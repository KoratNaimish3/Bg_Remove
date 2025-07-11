import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Result from './Pages/Result'
import BuyCredit from './Pages/BuyCredit'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import PaymentSuccess from './Pages/PaymentSuccess'

function App() {

  return (
    <div className='min-h-screen bg-slate-50'>

      <ToastContainer position='bottom-right' />

      <Navbar />

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/buy' element={<BuyCredit />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />

      </Routes>

      <Footer />

    </div>
  )
}

export default App