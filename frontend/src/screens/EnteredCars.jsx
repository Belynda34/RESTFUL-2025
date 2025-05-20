import React from 'react'
import Sidebar from '../components/Sidebar'
import CarsOut from '../components/CarEntered';

const Outgoing = () => {
  return (
    <div className='flex flex-row min-h-screen space-x-6'>
      <div className=''>
        <Sidebar/>
      </div>
      <div className='flex-1 p-4 overflow-x-auto' >
        <CarsOut/>
      </div>
    </div>
  )
}

export default Outgoing ;