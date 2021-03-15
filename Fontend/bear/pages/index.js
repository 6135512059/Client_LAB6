import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios' 

const URL ='http://localhost/api/bears'
export default function Home() {
  const [bears , Setbear] = useState(
    {list:
       [{id: 1,name: 'winne',weight: 22}, 
        {id: 2,name: 'winy',weight: 23},]}
  )
  const [name , setname] =useState('')
  const [weight ,setweight]=useState(0)
  useEffect(()=>{
    getBears()
  },[])
  const getBears = async() =>{
    
      let bear = await axios.get(URL)
      Setbear(bear.data)
      console.log('Bears: ',bear.data)
    
  }
  const addBear = async (name,weight) => {
   let bear = await axios.post(URL ,{name,weight})
   Setbear(bear.data)
  }
  const printBears =() => {
    if(bears && bears.list.length)
    return bears.list.map((item,index) => 
    <li key ={index}>
        : {item.id}
        : {item.name} 
        : {item.weight}</li>
     )
    else  
      return (<li>No bear</li>)
  }
  return (
    <div>Bears
      
      {printBears()}
    <h2>Add Bear</h2>
    <input type="text" onChange={(e)=>setname(e.target.value)}/><br/>
    <input type="number" onChange={(e)=>setweight(e.target.value)}/><br/>
    <button onClick={()=>addBear(name,weight)}>ADD</button>
    </div>
  )
}
