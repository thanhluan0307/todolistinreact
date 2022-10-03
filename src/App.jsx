import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import Button from './comporoment/Button'
function App() {
  const [value,setValue] = useState('')
  const [time,setTime] = useState('')
  const [jobs,setJobs] = useState([])
  const [button,setButton] = useState(true)
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
    setJobs(pre => {
      const clone = [...pre]
      clone.splice(index,1)
      return clone
    })
  }
  useEffect(() => {
    
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
      Jobs:<input 
            type="text" 
            value={value}
            onInput={e => setValue(e.target.value)}
          /> <br />
      Time:<input 
            value={time}
            type="date" 
            onInput={e => setTime(e.target.value)}
            /> <br /> <br />
      {button ? 
        <Button value="Add" onClick={handleAdd}/> :
        <Button value="Update" onClick={() => handleUpdate(i)}/>
      }
      <div>
        <table>
          <thead>
            <tr>
              <th>Jobs</th>
              <th>Time</th>
              <th></th>
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
