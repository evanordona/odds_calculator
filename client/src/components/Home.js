import React, { useEffect, useState } from 'react'
import bgimg from '../assets/bgimg.png'
import Table from './Table';

const Home = () => {
    const [matches, setMatches] = useState([]);
    const [formVisible, setFormVisible] = useState(false);

    const getData = async () => {
        const result = await fetch("https://oddscalculator.herokuapp.com/calculate").catch((err) => { console.log(err) });
        const jsonResult = await result.json();
        console.log(jsonResult);
        setMatches([...jsonResult]);
        setFormVisible(true);
    };
    
    return (
        <div name='home' style={{ backgroundImage: `url(${bgimg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }} className='w-full h-screen '>
            <div className='flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full z-5'>

                <div id='form' style={{
                  width: formVisible ? '800px' : '300px',
                  height: formVisible ? '800px' : '500px',
                  transition: 'width 1s, height 1s',
                  marginTop: '60px'
                }} className='flex justify-center items-center mx-auto bg-white rounded-lg shadow-lg shadow-black'>
                    <div className='flex flex-col w-full md:w-1/2'>
                        {!formVisible ? <button onClick={getData} type='submit' className='text-white bg-gradient-to-b from-cyan-500 to-blue-500 px-8 py-3 mx-auto flex items-center rounded-md hover:scale-110 duration-300'>Get Today's Matchups</button> 
                        : <Table match={matches}/>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home