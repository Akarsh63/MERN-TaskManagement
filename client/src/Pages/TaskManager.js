import React,{useLayoutEffect, useState,useEffect} from 'react'
import Header from '../Components/Header'
import './taskmanager.css';
import axios from 'axios';
import { VscTrash } from "react-icons/vsc";
import { BiEditAlt } from "react-icons/bi";
export default function TaskManager() {
  const [page,setpage]=useState(0);
  const [searchtitlename, setSearchname] = useState("")
  const [taskstofetch,settasks]=useState([]);
  const [loading,setloading]=useState(true)
  const [filters,setfilters]=useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [status,setstatus]=useState(false)
  const [totaltasks,settotaltasks]=useState(0);
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [updateVisible, setUpdateVisible] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true)
        const response = await axios.get("https://mern-taskmanagementapp.onrender.com/tasks/alltasks");
        if (page===0){
          settasks(response.data.alltasks.reverse())
        }
        else if (page===1){
          settasks(response.data.completedtasks.reverse())
        }
        else if(page===2){
          settasks(response.data.activetasks.reverse())
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }finally{
        setloading(false)
      }
    };
  
    fetchData();
  },[page,status]);
  const clearinput =(event)=>{
    event.preventDefault();
    setSearchname('');
  }
  const removeItem = async (key) => {
    try {
      await axios.put('https://mern-taskmanagementapp.onrender.com/tasks/delete', { key });
      const updatedTasks = taskstofetch.filter(task => task._id !== key);
      settasks(updatedTasks);
    } catch (err) {
      console.log(err);
    }
  };
  const Change_handler = (event) => {
    event.preventDefault();
    const selectedPage = parseInt(event.target.value);
    setfilters(selectedPage);
    setpage(selectedPage);
  };
  const updateItem = (taskid) => {
    setSelectedTaskId(taskid);
    setUpdateVisible((prevVisible) => !prevVisible);
  };
  const change_status=async (taskid,event)=>{
    event.preventDefault()
    
    setUpdateVisible((prevVisible) => !prevVisible);
    // event.preventDefault();
    const val=event.target.value ;

    try {
      await axios.put('https://mern-taskmanagementapp.onrender.com/tasks/update', { taskid,val});
      setstatus(prevstatus => !prevstatus)
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className='taskmanager'>
      <Header heading='Create a new task' button_name='Create' button_link='/' />
      <div className='form'>
          <div className='searchbar'>
            <input type='text' placeholder='Search by title name...' value={searchtitlename} onChange={event => setSearchname(event.target.value)}/>
            <button onClick={clearinput}>Clear</button>
          </div>
          {windowWidth>=735?( 
           <div className='filters'>
               <button onClick={() => { setpage(0); console.log(page); }} style={{ color: page === 0 ? '#3b71ca' : '#777', borderBottom: page === 0 ? '2px solid #3b71ca' : 'none' }}>ALL</button>
<button onClick={() => { setpage(1); console.log(page); }} style={{ color: page === 1 ? '#3b71ca' : '#777', borderBottom: page === 1 ? '2px solid #3b71ca' : 'none' }}>COMPLETED</button>
<button onClick={() => { setpage(2); console.log(page); }} style={{ color: page === 2 ? '#3b71ca' : '#777', borderBottom: page === 2 ? '2px solid #3b71ca' : 'none' }}>ACTIVE</button>

           </div>):(
           <div className='filters'>
              <select name="filters" value={filters} onChange={Change_handler}>
                    <option value={0}>All</option>
                    <option value={1}>Completed</option>
                    <option value={2}>Active</option>
              </select>
           </div>)}

           {loading ? (
          <div className='loading' style={{justifyContent:'center'}}><div className="loader" ></div>Loading...</div>
        ) :taskstofetch.length===0? (<div style={{ display: taskstofetch.length === 0 && !loading ? "block" : "none" }} className='notasks'>
              {page === 0 ? "There are no tasks yet!" : page === 1 ? "There are no completed tasks yet!" : "There are no active tasks yet!"}
            </div>): (
          taskstofetch.filter(task => {
            if (searchtitlename === '') {
               return task;}
            else if (task.title.toLowerCase().includes(searchtitlename.toLowerCase())) {
               return task;}
          }).map((task, index) => {
            return (
              <div key={index} className='taskdiv'>
                <div style={{width:"85%"}}>
                    <p className='title'>{task.title}</p>
                    <p className='description'>{task.description}</p>
                    <p className='dateandtime'>{task.timeanddate}</p>
                    <p className='status' style={{color:task.status==="On progress"? '#FFA500':'#228B22',display:'flex',flexDirection:'row'}}><div class="circle" style={{backgroundColor:task.status==="On progress"? '#FFA500':'#228B22'}}></div>{task.status}</p>
                    <div className='update' style={{display:selectedTaskId===task._id && updateVisible?"flex":"none"}}>
                      <div><input type="radio" name={`status_${task._id}`} value="On progress" style={{marginLeft:"0px"}} checked={task.status==="On progress"} onChange={(e) => change_status(task._id,e)}/> On progress</div>
                      <div><input type="radio" name={`status_${task._id}`} value="Completed"  style={{marginLeft:"0px"}} checked={task.status==="Completed"} onChange={(e) => change_status(task._id,e)}/> Completed</div>

                    </div>
                </div>
                <div className='icons' >
                <VscTrash style={{color:"#e91e63",fontSize:"23px",cursor:"pointer"}} onClick={() => removeItem(task._id) }/>
                <BiEditAlt style={{color:" #007BFF",fontSize:"23px",cursor:"pointer" }} onClick={() => updateItem(task._id) }/>
                </div>
              </div>
            );
          })
        )}

           <div>
           </div>
           
      </div>
      <div style={{height:'40px'}}></div>
    </div>
  )
}
