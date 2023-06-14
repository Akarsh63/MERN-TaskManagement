import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios'
import './createtask.css'
export default function CreateTask() {
  const [Taskinfo,settaskinfo]=useState({
    title:'',
    description:'',
    timeanddate:'',
  })
  const [error,seterror]=useState(false);
  const navigate = useNavigate();
  const handlechange = (event) => {
   const { name, value } = event.target;
   settaskinfo({ ...Taskinfo, [name]: value });
 };
 const  onsubmit= async (e)=>{
   e.preventDefault();
   if (Taskinfo.title==="" || Taskinfo.description===""){
    seterror(true)
    return 
   }
   try{
     const {title,description}=Taskinfo;
     const timeanddate=value
     const task = await axios.post('https://mern-taskmanagementapp.onrender.com/tasks/enter',{title,description,timeanddate});
     alert("A new task created Successfully!")
     navigate('/tasks')
   }
   catch(err){
     alert(err.response.data.message)
       
   }
  }
  const [value, setValue] = useState(dayjs(Date.now()));
  return (
    <div className='createpage'>
      <Header heading='Check your Tasks' button_name='My Tasks' button_link='/tasks'/>
      <div className='form'>
        <div className='form_heading'>Create a new task!</div>
        <form onSubmit={onsubmit}>
            <div className='formgrp'>
                <label id='title'>Title of the task</label>
                <input type='text' placeholder='Title' for='title' name='title' className='input' value={Taskinfo.title} onChange={handlechange} />
            </div>
            <div className='formgrp'>
                <label id='description'>Description about the task</label>
                <input type='text' placeholder='Description' for='description' name='description' className='input' value={Taskinfo.description} onChange={handlechange} />
            </div>
            <div className='formgrp'>
                <label id='dateandtime'>Deadline of the task</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                            <DateTimePicker id="dateandtime" value={value} onChange={(newValue) => setValue(newValue)} />
                    </DemoContainer>
                </LocalizationProvider>
            </div>
            <div className='err'>{error?"Please fill all the fields!":null}</div>
            <div className='formgrpsubmit'>
                <input type='submit' value='Create' />
            </div>
        </form>
      </div>
      <div style={{height:'40px'}}></div>
    </div>
  )
}
