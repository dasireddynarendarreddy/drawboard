import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {account} from "./AppWrite"
import {useNavigate} from "react-router-dom"
function Nav({user}) {
  const navigate=useNavigate();
  const [name,setname]=useState('')
  useEffect(()=>{
      const get=async()=>{
         const res= await account.get().name
         setname(res);
      }
      get()
  },[user])
  const Logout=async()=>{
 
    await account.deleteSessions();
    navigate(0);
  }
  console.log(user)
  return (
    <div className='bg-black text-white p-2 flex flex-row  gap-64'>
    <div className='flex gap-4'>
    {user?"":<NavLink to="/" className="bg-white text-black rounded-lg p-2">Login</NavLink>}
    {user?<button className='bg-white text-black rounded-lg p-2' onClick={()=>Logout()}>Logout</button>:" "}
     
      <NavLink to="/board" className='bg-white text-black rounded-lg p-2'>Board</NavLink>
      <NavLink to="/yourdrawing" className="bg-white text-black rounded-lg p-2">Drawings</NavLink>
      </div>
      <div>{name?<span className="bg-white text-black rounded-lg p-2">{name}</span>:" "}</div>
      
    </div>
  )
}

export default Nav
