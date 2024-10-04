import React,{useEffect, useState,lazy,Suspense} from 'react'
import {account,databases} from "./AppWrite"
import { Query } from 'appwrite'
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const Show= lazy(() => import('./Show.jsx'))
function Drawings() {
  const[data,setdata]=useState([]);
  const navigate=useNavigate();
  
  useEffect(()=>{
    const get=async()=>{
           const details=(await account.get()).name
           //setname(details)
      let promise = await databases.listDocuments(
         import.meta.env.VITE_APPWRITE_DATABASEID_ID,
         import.meta.env.VITE_APPWRITE_COLLECTION_ID1,
        [
            Query.equal('mail', (await account.get()).email)
        ]
    );
    const res=await promise.documents
    
    setdata(res)
  
    
  
   
    
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
    <span>{data.length===0?<div className="flex items-center justify-center h-screen">
      <LazyLoadImage  alt="example image"
      height={100}
      src="https://static.vecteezy.com/system/resources/previews/000/374/466/original/vector-little-girl-drawing-sun-on-paper.jpg"
      width={200}
      className="rounded-full"
      effect="blur"
    />
    <p>you can view your drawings here!</p>
    </div>:" your drawings"}</span>
    <Suspense fallback={<div>Loading...</div>}>
     <div className='flex flex-wrap gap-2 flex-row p-2'>
      
         {
          
          data.length>0?data.map((res,index)=>
          <div key={index}>
              <DeleteIcon onClick={()=>deleteNotes(res)} className='cursor-pointer'/>
             <div onClick={()=>goToBoard(res)} key={index}>
            <Show data={res} key={index} />
               <span>{new Date(res.$createdAt).toUTCString()}</span>
            </div>
            </div>
          )
         
         :""}
        
    </div>
    
    </Suspense>
    </>
  )
}

export default Drawings
