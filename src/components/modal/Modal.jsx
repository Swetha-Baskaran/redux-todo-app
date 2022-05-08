import React, { useState } from 'react';
import styles from "./style.module.css"
import Modal from 'react-modal/lib/components/Modal';
import { useDispatch } from 'react-redux';
import { add } from "../../redux/List"
import { ImCross } from 'react-icons/im'

const InputBox = ({ value }) => {
  const [changeInput, setChangeInput] = useState("")
  const [status, setStatus] = useState("pending")
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
    <div >
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
            padding: '20px',
            height: '14rem',
            overflow: 'hidden',
          }
        }}
      >
        <div className='flex justify-between pb-2 border-b-2 border-gray-300'>
          <p className='text-blue-900 font-bold'>Add New Task</p>
          <p className='text-blue-900 font-bold' 
             onClick={()=>{setIsModalOpen(isModalOpen === "" ? false : !isModalOpen)}}><ImCross /></p>
        </div>
        <div className='mt-3'>
             <label htmlFor="task">
                 Add todo
                <input 
                       id="task" 
                       type="text"
                       onChange={ e => setChangeInput(e.target.value)}
                       className={styles["task-input-field"]}
                />
             </label>
          </div>
          
          <div>
             <label htmlFor="taskStatus">
                 Status
                 <select id="taskStatus"
                         onChange={e => setStatus(e.target.value)}
                         className={styles["task-input-field"]}>
                   <option value="pending">Pending</option>
                   <option value="completed">Completed</option>
                 </select>
             </label>
          </div>
          
          <div className="flex justify-center">
            <button className={styles["button"]}
                    disabled={changeInput === "" || status === ""}
                    onClick={()=> {
                      dispatch(add({value: changeInput, status: status, dateString: dateFunction()}))
                      setIsModalOpen(isModalOpen === "" ? false : !isModalOpen)
                    }}>ADD</button>
          </div>
      </Modal>
    </div>
  )
}

export default InputBox