import React,{useEffect, useState,lazy,Suspense} from 'react'
import {account,databases} from "./AppWrite"
import { Query } from 'appwrite'
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import 'react-lazy-load-image-component/src/effects/blur.css';

import './Drawing.css'
const Show= lazy(() => import('./Show.jsx'))
function Drawings() {
  const[data,setdata]=useState([]);
  const[load,setload]=useState();
  const navigate=useNavigate();
  
  useEffect(()=>{
    const get=async()=>{
           const details=(await account.get())
           setload(true);
          
      let promise = await databases.listDocuments(
         import.meta.env.VITE_APPWRITE_DATABASEID_ID,
         import.meta.env.VITE_APPWRITE_COLLECTION_ID1,
        [
            Query.equal('mail', (await account.get()).email)
        ]
    );
    const res=await promise.documents
    
    setdata(res);
    setload(false)
   
    
  
   
    
    }
    get();
  },[])
  const goToBoard=(data)=>{
  
   
    navigate("/board", { replace: true, state: { myData: data} });
  }
  const deleteNotes=async(res)=>{
   
   await databases.deleteDocument(res.$databaseId, res.$collectionId, res.$id)
   navigate(0);
  }
  
  return (
    
    <>
    
    <Suspense fallback={<div className="loader"></div>}>
     <div className='flex flex-wrap gap-2 flex-row p-2'>
      
         {load?"loading...":
          
          data.length>0?data.map((res,index)=>
          <div key={index}>
              <DeleteIcon onClick={()=>deleteNotes(res)} className='cursor-pointer hover:bg-red-500 rounded-lg'/>
             <div onClick={()=>goToBoard(res)} key={index}>
            <Show data={res} key={index} />
               <span>{new Date(res.$createdAt).toUTCString()}</span>
            </div>
            </div>

          )
        
         
         :<p>you have no drawings</p>}
         
        
    </div>
    
    
    </Suspense>
    
    </>
  )
}

export default Drawings
