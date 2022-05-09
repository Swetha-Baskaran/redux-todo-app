import React, { useState } from 'react';
import { MdDeleteForever } from "react-icons/md"
import { FaEdit } from "react-icons/fa"
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im"
import { Delete } from "../../redux/List"
import { useDispatch } from 'react-redux';
import EditInputBox from '../modal/EditModal';
import { updateStatus } from '../../redux/List';

const Task = ({ value, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const dispatch = useDispatch()

  const handleTaskStatus = () => {
     dispatch(updateStatus(index))
  }

  return (
    <div className='flex justify-evenly items-center py-3'>
       <div onClick={()=>{handleTaskStatus()}}>
         {
           value.status === "completed" ? <ImCheckboxChecked className='checkBoxTick' /> : <ImCheckboxUnchecked className='checkBoxUnTick' />
         }
       </div>
       <div onClick={()=>{handleTaskStatus()}}
            className='sm:w-6/12 w-5/12'>
           <p style={value.status === "completed" ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}>{value.value}</p>
           <p className='text-gray-400'>{value.dateString}</p>
       </div>
       <div className='flex'>
           <button onClick={() => setIsModalOpen(!isModalOpen)}>
             <FaEdit className="iconSizeEdit" />
           </button>
           <button onClick={()=>{dispatch(Delete(index))}}>
             <MdDeleteForever className="iconSizeDelete" />
           </button>
       </div>
       <EditInputBox value={isModalOpen} index={index} />
    </div>
  )
}

export default Task;