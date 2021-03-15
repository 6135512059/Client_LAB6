import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios' 

const URL ='http://localhost/api/bears'
export default function Home() {
  const [bears , Setbears] = useState({})
  const [name , setname] =useState('')
  const [weight ,setweight]=useState(0)
  const [bear , Setbear] = useState({})
  useEffect(()=>{
    getBears()
  },[])
  const UpdateBear = async(id) =>{
    let bear = await axios.put(`${URL}/${id}`,{name,weight})
    Setbears(bear.data)
  }
  const getBears = async() =>{
    
      let bear = await axios.get(URL)
      Setbears(bear.data)
      console.log('Bears: ',bear.data)
    
  }
  const DeleteBear= async(id) =>{
    let bear = await axios.delete(`${URL}/${id}`)
    Setbears(bear.data)
  }
  const addBear = async (name,weight) => {
   let bear = await axios.post(URL ,{name,weight})
   Setbears(bear.data)
  }
  const getBear =async(id) =>{
    let bear = await axios.get(`${URL}/${id}`)
    Setbear({name: bear.data.name ,weight: bear.data.weight})
  }
  const printBears =() => {
    if(bears.list && bears.list.length)
    return bears.list.map((item,index) => 
    <li key ={index}>
        : {index+1}
        : {item.name} 
        : {item.weight}
        <button onClick={()=>getBear(item.id)}>get</button>
        <button onClick={()=>UpdateBear(item.id)}>Update</button>
        <button onClick={()=>DeleteBear(item.id)}>Delete</button>
        </li>
     )
    else  
      return (<li>No bear</li>)
  }
  return (
    <div>Bears
      
      {printBears()}
      Select bear: {bear.name} : {bear.weight}
    <h2>Add Bear</h2>
    <input type="text" onChange={(e)=>setname(e.target.value)}/><br/>
    <input type="number" onChange={(e)=>setweight(e.target.value)}/><br/>
    <button onClick={()=>addBear(name,weight)}>ADD</button>
    
    </div>
  )
}
