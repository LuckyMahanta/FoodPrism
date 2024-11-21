import React from 'react'

const HomeCard = ({ name, image, category, price, loading }) => {
  return (
    <div className='bg-white hover:shadow-2xl drop-shadow-lg p-2 rounded min-h-[180px] w-44'>
      {
        name ? (
          <>
            <div className="w-40 min-h-[150px]">
              <img src={image} alt='food' className='h-full w-full' />
            </div>
            <h3 className='font-semibold text-center capitalize text-lg'>{name}</h3>
            <p className='text-center text-slate-500 capitalize'>{category}</p>
            <p className='text-center font-bold'><span className='text-red-400'>&#8377;</span> {price}</p>
          </>
        )
        : <p className='flex justify-center items-center h-full'>{loading}</p>
      }
    </div>
  )
}

export default HomeCard
