import { useEffect } from 'react';
import { useState } from 'react';

import './App.css';
import Button from './comporoment/Button'
import Header from './comporoment/Header'

function App() {
  const [value,setValue] = useState('')
  const [time,setTime] = useState('')
  const [jobs,setJobs] = useState([])
  const [button,setButton] = useState(true)
  const [done,setDone] = useState(0)
  const [deadLine,setDeadLine] = useState(0)
  let i
  const currentime = new Date()


  

  
  const handleAdd = () =>{
    if(!value || !time) return alert('chua co job')
    setJobs(pre => {
      const clone = [...pre,{job:value,time:time}]
      return clone
    })
  }
  const handleDelete = (index) => {
      
     var check = window.confirm('bạn muốn xóa?')
    if (check) {
      setJobs(pre => {
        const clone = [...pre]
        clone.splice(index,1)
        return clone
      })
    }
  }
  useEffect(() => {
    let jobDoneElement = document.querySelectorAll('.done')
    setDone(jobDoneElement.length)
    let jobDeadLineElement = document.querySelectorAll('.deadline')
    setDeadLine(jobDeadLineElement.length)
  },[jobs])
  const displayBtn = (index) => {
    i = index
    setButton(false)
    setTime(jobs[index].time)
    setValue(jobs[index].job)
   
  }
  const handleUpdate = (index) => {
    setJobs(pre => {
      const clone = [...pre]
      clone.splice(index,1,{job:value,time:time})
      return clone
    })
  }
  return (

    <div className='wrapper'>
      <Header title="Công việc hoàn thành" data={done}/>
      <Header title="Công việc deadline" data={deadLine}/>
      Jobs:<input 
            type="text" 
            value={value}
            onInput={e => setValue(e.target.value)}
          /> <br />
      Time:<input 
            value={time}
            type="date" 
            onInput={e => setTime(e.target.value)}
            /> <br />
      Search:<input 
              type="text"  
            /> <br /> <br />
      {button ? 
        <Button value="Add" onClick={handleAdd}/> :
        <Button value="Update" onClick={() => handleUpdate(i)}/>
      } <br />
   
      <div>
        <table>
          <thead>
            <tr>
              <th>Jobs</th>
              <th>Time</th>
              <th>    </th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(function(job,index){
                return (
                  <tr key={index} className={currentime > new Date(job.time) ? "done" : "deadline"}>
                    <th onClick={() => displayBtn(index)}>{job.job}</th>
                    <th>{job.time}</th>
                    <th><Button value="Delete" onClick={() => {handleDelete(index)}}/></th>
                </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}


export default App;
