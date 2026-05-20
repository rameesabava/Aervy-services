import React from 'react'
import { MdVerifiedUser } from "react-icons/md";
import { FaCopyright, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className='bg-gray-950'>
            <div className='py-10 px-20 text-sm'>
                {/* icon */}
                <div className='font-semibold text-sm text-amber-700 flex'>
                    <img src="/icon.png" alt="icon" className='h-5 w-5 me-2' />
                    AERVY SERVICES PLATFORM</div>
                <div className='md:flex justify-between mt-5'>
                    <div>
                        <div className='flex items-center'>
                            <MdVerifiedUser className='text-green-600 text-sm' />
                            <p className='text-amber-600'>Verified Providers</p>
                        </div>
                        <p className='text-gray-400 py-3'>Connecting you with trusted local service providers — from plumbers to tutors.</p>
                        <p className='text-gray-400'>All within your neighbourhood.</p>
                    </div>

                    <div>
                        <h2 className='text-amber-600 pb-3'>Services</h2>
                        <p className='text-gray-400 pb-2'>Driving</p>
                        <p className='text-gray-400 pb-2'>Tutoring</p>
                        <p className='text-gray-400 pb-2'>Cleaning </p>
                        <p className='text-gray-400 pb-2'>Home Repairs</p>
                        <p className='text-gray-400 pb-2'>Beauty and Wellness</p>
                    </div>

                    <div>
                        <h2 className='text-amber-600 pb-3'>Company</h2>
                        <p className='text-gray-400 pb-2'>About Us</p>
                        <p className='text-gray-400 pb-2'>Contact Us</p>
                        <p className='text-gray-400 pb-2'>Privacy Policy</p>
                        <p className='text-gray-400 pb-2'>Terms of Service</p>
                        <Link to={'/provider'} className='text-gray-400 pb-2'>Become a Provider</Link>
                    </div>
                </div>
                <hr className='my-5 border border-gray-800' />

                <div className='text-gray-400 text-sm md:flex justify-between items-center'>
                    <div className='flex items-center'><FaCopyright className='pe-1 text-5xl md:text-sm' /><p className='text-sm'>2026 Aervy Services Platform. All rights reserved</p>
                    </div>
                    {/* icons */}
                    <div className='hidden md:flex items-center gap-3 text-lg'>
                        <FaInstagram/> <FaXTwitter /> <FaFacebook /> <FaLinkedin />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer