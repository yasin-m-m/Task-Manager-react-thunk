import React from 'react'

const Footer = () => {
    const date=new Date();
    const year=date.getFullYear()
  return (
    <footer className='flex flex-row justify-center items-center bg-blue-700 text-white font-semibold text-1xl p-2'>
    &copy; {year} by &nbsp;<a href='https://in.linkedin.com/in/yasinmm' target='blank' className='underline'>Yasin M M </a> &nbsp;Projects
</footer>
  )
}

export default Footer