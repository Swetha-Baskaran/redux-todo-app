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

  const iconSizeEdit = {
      width: '1.5rem',
      height: '1.5rem',
      margin: '0 0.5rem 0 0',
      color: '#003f88',
  }
  const iconSizeDelete = {
    width: '1.8rem',
    height: '1.8rem',
    margin: '0 0 0 1.5rem',
    color: 'red'
  }
  const checkBoxTick = {
    width: '1.2rem',
    height: '1.2rem',
    margin: '0 1.5rem',
    color: '#fdc500'
  }
  const checkBoxUnTick = {
    width: '1.2rem',
    height: '1.2rem',
    margin: '0 1.5rem',
    color: '#fdc500'
  }
  return (
    <div className='flex justify-evenly items-center py-3'>
       <div onClick={()=>{handleTaskStatus()}}>
         {
           value.status === "completed" ? <ImCheckboxChecked style={checkBoxTick} /> : <ImCheckboxUnchecked style={checkBoxUnTick} />
         }
       </div>
       <div onClick={()=>{handleTaskStatus()}}
            className='sm:w-6/12 w-5/12'>
           <p>{value.value}</p>
           <p className='text-gray-400'>{value.dateString}</p>
       </div>
       <div className='flex'>
           <button onClick={() => setIsModalOpen(!isModalOpen)}>
             <FaEdit style={iconSizeEdit} />
           </button>
           <button onClick={()=>{dispatch(Delete(index))}}>
             <MdDeleteForever style={iconSizeDelete} />
           </button>
       </div>
       <EditInputBox value={isModalOpen} index={index} />
    </div>
  )
}

export default Task;