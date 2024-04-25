import React from 'react'
import Hero from '@/components/hero';
import Feature from '@/components/feature';
import Navbar from '@/components/navbar';
import Book from '@/components/book';
function index() {
  return (
    <div>
       <div className="bg-white ">
        <Navbar/>
      <Feature/>
    </div>
    </div>
  )
}

export default index
