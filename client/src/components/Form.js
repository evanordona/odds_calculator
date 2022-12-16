import React from 'react'

const Form = () => {

  return (
    <div className='w-full h-[115vh] bg-gradient-to-b from-black to-orange-800 p-4 text-white'>
        <div className='flex flex-col p-4 justify-center item max-w-screen-lg mx-auto h-screen'>
            <div className='pt-[250px] md:pb-5'>
                <p className='text-4xl font-bold inline border-b-4 border-gray-400'>Look up Games by Date</p>
                <p className='py-6'></p>
            </div>

            <div className='flex justify-center items-center'>
                <form action='/games' method='POST' className='flex flex-col w-full md:w-1/2'>
                    <input type='text' name='date' placeholder='Enter a date (2015-JUL-31 : YEAR-MON-DAY)' className='p-2 bg-transparent border-2 rounded-md text-white focus:outline-none'/>
                  
                    <button className='text-white bg-gradient-to-b from-cyan-500 to-blue-500 px-6 py-3 my-5 mx-auto flex items-center rounded-md hover:scale-110 duration-300'>Get Games</button>
                </form>
            </div>

        </div>
    </div>
  )
}

export default Form