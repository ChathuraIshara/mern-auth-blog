import React from 'react'
import { assets } from '../assets/assets'
const Header = () => {
  return (
    <div className='flex flex-col items-center text-center text-gray-800 mt-20'>
        <img src={assets.header_img} className='w-36 h-36 rouded-full mb-6'></img>
        <h1 className='flex items-center gap-3 text-xl sm:text-3xl font-medium mb-2'>Hey blogger <img src={assets.hand_wave} className='w-8 aspect-square'></img></h1>
        <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to our app</h2>
        <p className='mb-8 max-w-md'>Here you can share your thoughts and ideas with the world and join with the universe.</p>
        <button className='border border-gray-500 text-gray-800 rounded-full py-2 px-4 hover:bg-gray-100 transition-all'>Get Started</button>
    </div>
  )
}

export default Header