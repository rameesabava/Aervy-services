import React from 'react'
import { Link } from 'react-router-dom'
import { FaBackward } from 'react-icons/fa'

function PaymentSuccess() {
    return (
        <>
           
            <div className='container min-h-screen flex justify-center items-center'>
                <div className='md:grid grid-cols-2 px-20 justify-center items-center my-10'>
                    <div>
                        <h1 className="text-amber-500 md:text-4xl font-bold">Congratulation!!!</h1>
                        <p className='text-2xl my-10'>Thank you for booking. Hope you have a good time with us.</p>
                        <Link to={'/services'} className='flex justify-center items-center bg-amber-700 w-60 p-3 text-white font-bold'><FaBackward className='me-2' />More Services...</Link>
                    </div>
                    <div className='flex justify-center items-center'>
                        <img src="https://cdn.dribbble.com/users/614270/screenshots/14575431/payment_drib.gif" alt="success" />
                    </div>
                </div>

            </div>
            
        </>
    )
}

export default PaymentSuccess