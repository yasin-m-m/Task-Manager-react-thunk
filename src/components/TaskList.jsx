import React, { useEffect, useState } from 'react'
import { FaCircleCheck, FaPencil, FaRectangleXmark, FaTrash } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTaskFromServer, getTasksFromServer, remove, updateTaskInServer } from '../slices/tasksSlice'

const TaskList = () => {

  const tasksList=useSelector((state)=>state.tasks.tasksList)

  const [editMode,setEditMode] =useState(false)
  const [editTitle,setEditTitle]=useState('')
  const [editDescription,setEditDescription]=useState('')
  const [editId,setEditId]=useState(null)
  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(getTasksFromServer())
  
    
  }, [dispatch])
  

  const handleEdit=(task)=>{
    setEditMode(!editMode);
    setEditId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
   
  }
  const handleEditSubmit = () => {
    const updatedTask = { id: editId, title: editTitle, description: editDescription };
    dispatch(updateTaskInServer(updatedTask)); // Dispatch update action with updated task data
    setEditMode(false); // Reset edit mode state
  };
  const handleEditCancel = () => {
    setEditMode(false); // Reset edit mode state
  };
  const handleDelete=(id)=>{
    dispatch(deleteTaskFromServer(id)).then(()=>{
      dispatch(remove(id));
    });
  }
  return (
    <div>
    
    <h2 className='text-center font-bold text-2xl my-5'>Tasks List</h2>
   
  {
    tasksList.map((task,index)=>
       (
        <ul key={index} className='flex flex-row justify-between w-full items-center gap-3 py-3 border border-b-black'>

        <li className='w-1/5 h-full text-center font-semibold text-xl'>{index+1}</li>

        {editMode && editId === task.id ?(<li className=''><input type='text' value={editTitle} onChange={(e)=>setEditTitle(e.target.value)} className='border border-b-black'/></li>):
        <li className='w-1/5 h-full text-center font-semibold text-xl'>{task.title}</li>}

        {editMode && editId === task.id ?(<li className=''><input type='text' value={editDescription} onChange={(e)=>setEditDescription(e.target.value)} className='border border-b-black'/></li>):<li className='w-1/5 h-full text-center font-semibold text-xl'>{task.description}</li>}
        
        <div className='w-2/5 flex flex-row justify-evenly'>

        <li className='h-full text-center font-semibold text-xl text-blue-800 hover:text-blue-500 cursor-pointer' >
        
        {editMode ?(<div className='flex felx-row justify-between gap-3'><FaCircleCheck className= 'text-green-700' onClick={handleEditSubmit}/> <FaRectangleXmark onClick={handleEditCancel} className='text-red-700'/></div>):(<FaPencil onClick={()=>handleEdit(task)}/>)} 
        </li>

        <li className='h-full text-center font-semibold text-xl  text-red-500 hover:text-red-800 cursor-pointer' onClick={()=>handleDelete(task)}><FaTrash /></li>
        </div>
        </ul>
      )
    )
  }
    </div>
  )
}

export default TaskList