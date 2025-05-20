import React from 'react'
import Sidebar from '../components/Sidebar'
import Create from '../components/Create';

const ParkingCreate = () => {
  return (
    <div className='flex flex-row min-h-screen space-x-6'>
      <div className=''>
        <Sidebar/>
      </div>
      <div className='flex-1 p-4 overflow-x-auto' >
        <Create/>
      </div>
    </div>
  )
}

export default ParkingCreate;