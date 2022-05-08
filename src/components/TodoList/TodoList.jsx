import React, { useState } from 'react'
import './style.css'
import Task from './Task'
import InputBox from '../modal/Modal'
import { FaPlus } from "react-icons/fa"
import { useSelector, useDispatch } from 'react-redux'
import { deleteAll } from '../../redux/List'

const TodoList = () => {
  const taskList = useSelector( state => state.list.value);
  const dispatch = useDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [value, setValue] = useState("all")
  const [searchChange, setSearchChange] = useState("");

  const handleSelectChange = (e) => {
     const value = e.target.value;
     setValue(value)
  }

  const listOutput = () => {
    return value === "all" ? taskList : taskList.filter((e)=>{ return e.status === value })
  }

  const handleSearchChange = (e) => {
      setSearchChange(e.target.value)
  }

  const searchFuntion = () => {
      const regex = new RegExp(searchChange)
      return searchChange === "" ? listOutput() : listOutput().filter((e) =>{ return regex.test(e.value) === true } )
  }

  const AddButton = {
   borderRadius: '4px',
   color: '#ffffff',
   backgroundColor: '#fdc500',
   fontWeight: 'bolder',
   padding: '0.4rem 1rem'
  }

  const selectDropdown = {
   border: '1px solid #fdc500',
   borderRadius: '5px',
   color: '#fdc500',
   fontWeight: 'bolder',
   padding: '0.4rem 0.6rem',
   outline: 'none',
  }


  return (
    <div>
        <InputBox value={isModalOpen} />
        <h1 className='text-center text-4xl p-4 mt-5 font-bold text-dark-blue'>Task List</h1>
        <div className='flex justify-between bg-white py-6 mx-3 sm:mx-8 lg:mx-72 shadow-sm rounded my-4 px-5'>
           <button onClick={()=> setIsModalOpen(!isModalOpen)}
                   className='flex items-center justify-evenly addButton'
                   style={AddButton}
           >
              Add Task <FaPlus className='ml-3' />
           </button>
           <button onClick={()=>{dispatch(deleteAll())}}
                   className="deleteButton"
                   >Delete All</button>
        </div>
        <div className='flex justify-between bg-white py-6 mx-3 sm:mx-8 lg:mx-72 shadow-sm rounded my-4 px-5'>
           <div><input type="search" 
                       placeholder="search" 
                       onChange={(e) => handleSearchChange(e)}
                       className="todoSearchBar" /></div>
           <div>
              <select onChange={(e) => handleSelectChange(e)} style={selectDropdown}>
                <option className='selectOptions' value="all">All</option>
                <option className='selectOptions' value="completed">Completed</option>
                <option className='selectOptions' value="pending">Pending</option>
             </select>
           </div>
        </div>
        <div className='bg-white py-6 mx-3 sm:mx-8 lg:mx-72 shadow-lg rounded'>
            {
                searchFuntion().length === 0 ? <div className='text-gray-400 text-center'>No Task Scheduled</div>
                 :   searchFuntion().map((e, index)=> {
                      return (
                       <div key={index}>
                          <Task value={e} index={index} />
                          { 
                             index === searchFuntion().length - 1 ? "" : <hr />
                          }
                       </div>   
                    )
              })
            }
        </div>
    </div>
  )
}

export default TodoList;