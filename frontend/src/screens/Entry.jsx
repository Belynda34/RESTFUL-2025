import React from 'react'
import Sidebar from '../components/Sidebar'
import CarEntry from './CarEntry';

const Entry = () => {
  return (
    <div className='flex flex-row min-h-screen space-x-6'>
      <div className=''>
        <Sidebar/>
      </div>
      <div className='flex-1 p-4 overflow-x-auto' >
        <CarEntry/>
      </div>
    </div>
  )
}

export default Entry;