import React from 'react'
import { useState } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from 'react-scroll';

const Navbar = () => {

    const [nav, setNav] = useState(false);

    const links = [
        {
            id: 1,
            name: 'home',
            link: '/'
        },

        {
            id: 2,
            name: 'github',
            link: 'https://github.com/evanordona/odds_calculator'
        },
    ]
    return (
        <div className='flex justify-between items-center w-full h-20 px-4 text-white bg-gradient-to-r from-orange-400 to-orange-700 fixed'>
            <div>
                <h1 className='text-5xl ml-2'>NBA Odds Calculator</h1>
            </div>

            <ul className='hidden md:flex'>
                {links.map(({ id, name, link }) => (
                    <li key={id} className='px-4 cursor-pointer capitalize text-2xl text-white hover:scale-105 duration-200'>
                        <a href={link}>{name}</a>
                    </li>
                ))}
            </ul>

            <div onClick={() => setNav(!nav)} className='cursor-pointer pr-4 z-10 text-white md:hidden'>
                {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
            </div>

            {nav && (<ul className='flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen text-white'>


                {links.map(({ id, link }) => (
                    <li key={id} className='px-4 cursor-pointer capitalize py-6 text-4xl'>
                        <Link onClick={() => setNav(!nav)} to={link} smooth duration={500}>{link}</Link>
                    </li>
                ))}

            </ul>

            )}

        </div>
    )
}

export default Navbar