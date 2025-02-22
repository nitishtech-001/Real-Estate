import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row gap-5'>
      <div className='border-b-4 min-w-[400px]  md:border-r-4 md:border-b-0 md:w-1/3 md:min-h-screen' >
       <form className='flex flex-col m-5 gap-5 mb-5'>
        <fieldset className='flex gap-5 items-center'>
          <label htmlFor="search" className='text-nowrap font-semibold'>Search Term: </label>
          <input type="text" id='searchTerm' placeholder='Search...' className='p-1 rounded-md capitalize border focus:outline-none w-full' />
        </fieldset>
        <div className='flex gap-5 m flex-wrap items-center'>
            <label htmlFor="type" className='font-semibold'>Type: </label>
            <fieldset className='flex gap-2'>
              <input type="checkbox" id='all' className='w-5' />
              <label htmlFor="all">Sale & Rent</label>
            </fieldset>
            <fieldset className='flex gap-2'>
              <input type="checkbox" id='sale' className='w-5' />
              <label htmlFor="sale">Sale</label>
            </fieldset>
            <fieldset className='flex gap-2'>
              <input type="checkbox" id='rent' className='w-5' />
              <label htmlFor="rent">Rent</label>
            </fieldset>
            <fieldset className='flex gap-2'>
              <input type="checkbox" id='offer' className='w-5' />
              <label htmlFor="offer">Offer</label>
            </fieldset>
        </div>
        <div className='flex gap-5 flex-wrap items-center'>
            <label htmlFor="type" className='font-semibold'>Amanaties: </label>
            <fieldset className='flex gap-2'>
              <input type="checkbox" id='parking' className='w-5' />
              <label htmlFor="parking">Parking</label>
            </fieldset>
            <fieldset className='flex gap-2'>
              <input type="checkbox" id='furnished' className='w-5' />
              <label htmlFor="furnished">Furnished</label>
            </fieldset>
        </div>
        <div>
          <label htmlFor="sort" className='font-semibold'>Sort: </label>
          <select name="sort" id="sort_order" className='p-1 rounded-md capitalize border focus:outline-none w-[150px]'>
            <option value="price_hight_low">Price high to low</option>
            <option value="price_hight_low">Price low to high</option>
            <option value="latest">Latest</option>
            <option value="old">Oldest</option>
          </select>
        </div>
        <button className='bg-slate-700 p-2 text-center rounded-md text-white uppercase hover:opacity-85'>Search</button>
       </form>
      </div>
      <div className='mt-5'>
        <h1 className='text-3xl text-slate-700 font-semibold border-4 p-1'>Listing results:</h1>
      </div>
    </div>
  )
}
