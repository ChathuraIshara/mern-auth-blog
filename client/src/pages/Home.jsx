import React from 'react'
import Navbar from '../components/navbar';
import Header from '../components/Header';

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center bg-[url("/bg_img.png")] min-h-screen bg-cover bg-center'>
      <Navbar />
      <Header/>
    </div>
  )
}

export default Home;