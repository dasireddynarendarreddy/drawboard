import React from 'react'
import {account,databases} from "./AppWrite"
import {useEffect,useState} from "react"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Query } from 'appwrite'
function Logout() {
  const[name,setname]=useState('')
  const navigate=useNavigate();
  const[draw,setdraw]=useState(0);
  useEffect(()=>{
    const get=async()=>{
    try{
      const res=await account.get();
      console.log(res)
     
      if(res.name)
      {
         setname(res.name)
      }
     }
     catch(e)
     {
      toast.error("you have to login")
     }
     /*await databases.createDocument("66fa381100323b15b019","66fcf04d001528454324",
        await databases.getDocument(
         '"66fa381100323b15b019"', // databaseId
         '66fcf04d001528454324', // collectionId
         '<DOCUMENT_ID>', // documentId
         [] // queries (optional)
     );*/
     const res=await databases.listDocuments(process.env.VITE_APPWRITE_DATABASEID_ID,process.env.VITE_APPWRITE_COLLECTION_ID1,[
       Query.equal('mail', (await account.get()).email),
     ]);
     setdraw(res.total)

     console.log(res.total)
}
get();
  
  },[])
  const Logout=async()=>{
    await account.deleteSessions();
    navigate(0);

  }
  return (
    <div className="flex items-center justify-center h-screen flex-col">
  <div className="bg-blue-400 border-2 border-black w-min rounded-full p-2">
    <p className="text-4xl w-fit h-auto  p-1">{name ? name[0].toUpperCase() : "_"}</p>
  </div>
  <div className="ml-4 text-center">
    <p className="font-bold">{name ? name : ".."}</p>
    {name?<button onClick={Logout} className="bg-red-600 rounded-md p-2 w-fit mt-2">
      Logout
    </button>:"you have to login"}
    <p>{name?`no of drawings you done:`:draw}</p>
  </div>
</div>

  )
}

export default Logout
