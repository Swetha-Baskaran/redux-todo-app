import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from "./style.module.css"
import Modal from 'react-modal/lib/components/Modal';
import { useDispatch } from 'react-redux';
import { edit } from "../../redux/List"
import { ImCross } from 'react-icons/im'

const EditInputBox = ({ value, index }) => {
  const taskList = useSelector( state => state.list.value);

  const [changeInput, setChangeInput] = useState(taskList[index].value)
  const [status, setStatus] = useState(taskList[index].status)
  const [isModalOpen, setIsModalOpen] = useState("")
  const dispatch = useDispatch()

  const modalTrigger = () => {
     if(value === true && isModalOpen === ""){
       return true;
     }
     else if(isModalOpen === false && value === true){
       return false
     }
     else if(value === false && isModalOpen === false){
       return true
     }
     else if(isModalOpen === true && value === false){
       return false;
     }
     else if(value === true && isModalOpen === true){
       return true
     }
  }

  const dateFunction = () => {
    let d = new Date()
    let dateString = d.toLocaleDateString() + " " + d.toLocaleTimeString()
    return dateString
  }

  return (
    <div>
      <Modal
        isOpen={modalTrigger()}
        ariaHideApp={false}
        className='xl:mx-96 lg:mx-64 sm:mx-40 mx-0'
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#00509d59',
          },
          content: {
            position: 'absolute',
            top: '90px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: '1px solid #ccc',
            background: '#fff',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '10px',
            height: '14rem',
            overflow: 'hidden',
          }
        }}
      >
          <div className='flex justify-between items-center pb-2 pt-1 px-2 border-b-2 border-gray-300'>
            <p className='text-blue-900 font-bold'>Edit Task</p>
            <p className='text-blue-900 font-bold' 
               onClick={()=>{setIsModalOpen(isModalOpen === "" ? false : !isModalOpen)}}><ImCross /></p>
          </div>
          <div className='mt-3 flex items-center lg:ml-16'>
                <label htmlFor="task">
                   Edit todo
                </label>
                <input 
                       id="task" 
                       type="text"
                       value={changeInput}
                       onChange={ e => setChangeInput(e.target.value)}
                       className={styles["task-input-field"]}
                />
          </div>
          
          <div className='mt-3 flex items-center lg:ml-16'>
                 <label htmlFor="taskStatus">
                    Status
                 </label>
                 <select id="taskStatus"
                         onChange={e => setStatus(e.target.value)}
                         className={styles["task-input-field"]}
              >
                   <option value="pending" selected={status === "completed"}>Pending</option>
                   <option value="completed" selected={status === "completed"}>Completed</option>
                 </select>
          </div>
          
          <div className="flex justify-center">
            <button className={styles["button"]}
                    disabled={changeInput === "" || status === ""}
                    onClick={()=> {
                      dispatch(edit({
                          index: index,
                          value: {
                                   value: changeInput,
                                   status: status,
                                   dateString: dateFunction()
                                }
                      }))
                      setIsModalOpen(isModalOpen === "" ? false : !isModalOpen)
                    }}>Edit</button>
          </div>
      </Modal>
    </div>
  )
}

export default EditInputBox