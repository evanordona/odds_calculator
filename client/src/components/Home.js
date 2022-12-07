import React, { useEffect, useState } from 'react'
import bgimg from '../assets/bgimg.png'

const Home = () => {
    const [matches, setMatches] = useState([]);

    const getData = async () => {
        const result = await fetch("/calculate").catch((err) => {console.log(err)});
        const jsonResult = await result.json();
        console.log(jsonResult);
        setMatches([...jsonResult]);
    };

    // const submitMatch = async () => {
    //     const myData = {
            
    //     }

    //     const result = await fetch('/calculate', {
    //         method: 'POST',
    //         body: JSON.stringify(myData),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })

    //     const resultInJSON = result.json();
    //     console.log(resultInJSON);
    //     setMatches(prev => [...prev, resultInJSON])
    // };


    return (
        <div name='home' style={{ backgroundImage: `url(${bgimg})` }} className='w-full h-screen '>
            <div className='flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full z-5'>

                <div className='flex justify-center items-center w-[300px] h-[500px] mx-auto bg-white rounded-lg shadow-lg shadow-black'>
                    <div className='flex flex-col w-full md:w-1/2'>
                        <button onClick={getData} type='submit' className='text-white bg-gradient-to-b from-cyan-500 to-blue-500 px-8 py-3 mx-auto flex items-center rounded-md hover:scale-110 duration-300'>Get Today's Matchups</button>
                    </div>
                </div>

                <p className='text-red-500 text-4xl flex justify-center'>{'Output: ' + matches.forEach((element) => {
                    console.log(`${element.team1} vs. ${element.team2} ${element.oddsTeam1} ${element.oddsTeam2}`);
                })}</p>
            </div>

        </div>
    )
}

export default Home