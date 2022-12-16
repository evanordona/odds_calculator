import React, { useEffect } from 'react'

const Table = (props) => {
    let i = 0;
    
    return (
    <div className='text-red-400 text-2xl'>
        <table className='border'>
            <thead>
                <tr>
                    <th className='p-1 text-3xl'>Home</th>
                    <th className='p-1 text-3xl'>Away</th>
                    <th className='p-1 text-3xl'>Odds</th>
                    <th className='p-1 text-3xl'>Alg. Odds</th>
                </tr>
            </thead>
            <tbody>
                {props.match.map((el) => (
                    <tr key={i++}>
                    <td className='p-1'>{el.team1}</td>
                    <td className='p-1'>{el.team2}</td>
                    <td className='p-1'>{el.oddsTeam2}</td>
                    <td className='p-1'>{'Odds: ' + (-1 * el.odds)}</td>
                    </tr>
                ))}
            </tbody>
         </table>
    </div>
  )
}

export default Table