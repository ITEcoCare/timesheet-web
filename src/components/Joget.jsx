import React from 'react'
import data from '../data/data'


const Joget = ({title, imgURL, link}) => {

  const id = null

  return (
    <div>
      {/* <p className='font-bold text-xl mb-1 md:text-3xl md:mb-2'>Joget</p> */}
      <div className=''>Joget</div>
      <div className='flex flex-col md:flex-row items-center justify-center'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>

          {data.map((project) => (
            <div className='rounded-md overflow-hidden'>
              <img 
                src={project.imgURL}
                alt='Joget App'
                className='w-full h-48 sm:h-48 md:h-48 object-cover cursor-pointer rounded-full overflow-hidden'
              />
              <div key={null} className='w-full font-light text-gray-400 text-sm md:text-md' onClick={() => project.link}>{project.title}</div>
            </div>
          ))}
 
        </div>
      </div>

    </div>
  )
}

export default Joget