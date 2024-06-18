import React, { useState } from 'react'
import { FaPlus, FaSortDown, FaSortUp } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { addTaskToServer } from '../slices/tasksSlice';

const AddTasks = () => {
  const [title, setTitle]=useState('')
  const [description,setDescription]=useState('')
  const [form, setForm]=useState(false)
  const dispatch =useDispatch()
  const handleClick = () => {
    setForm(!form)
}
    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(addTaskToServer({title,description}))
        setTitle('')
        setDescription('')
    }
  return (
    <div>
    <h2 onClick={handleClick} className='flex flex-row items-center justify-center font-bold text-xl p-2 text-green-950'>Add Task {form ? <FaSortUp className='text-green-800 cursor-pointer'/> : <FaSortDown className='text-green-800 cursor-pointer'/>}</h2>
    {form ?(
        <form className='flex flex-row justify-center items-center gap-3' onSubmit={handleSubmit}>
            <input type='text' placeholder='title' required value={title} onChange={(e)=>setTitle(e.target.value)} className=' border border-black rounded p-1' />
            
            <input type='text' placeholder='description' required value={description} onChange={(e)=>setDescription(e.target.value)} className=' border border-black rounded p-1'/>
            <button className='border border-black p-2 rounded bg-green-950 text-white hover:bg-green-700'><FaPlus /></button>
        </form>):(null)}
    </div>
  )
}

export default AddTasks