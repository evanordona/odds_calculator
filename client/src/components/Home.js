import React from 'react'
import bgimg from '../assets/bgimg.png'

const Home = () => {
    return (
        <div name='home' style={{ backgroundImage: `url(${bgimg})`}} className='w-full h-screen '>
            <div className='flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full z-5'>
    
                <div className='flex justify-center items-center w-[300px] h-[500px] mx-auto bg-white rounded-lg shadow-lg shadow-black'>
                    <form action='/calculate' method='GET' className='flex flex-col w-full md:w-1/2'>
                        <button type='submit' className='text-white bg-gradient-to-b from-cyan-500 to-blue-500 px-8 py-3 mx-auto flex items-center rounded-md hover:scale-110 duration-300'>Get Today's Matchups</button>
                    </form>
                </div>
    
            </div>
    
        </div>
      )
}

export default Home