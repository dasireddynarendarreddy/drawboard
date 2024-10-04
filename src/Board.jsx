import { useState,useRef, useEffect} from "react";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from  '@mui/icons-material/Redo'
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { account ,ID,databases} from "./AppWrite";
import { useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import { ReactSketchCanvas } from "react-sketch-canvas";
export default function Board({name}) {
    const canvasRef=useRef(null);
    const[paths,setPaths]=useState('');
    const [age, setAge] = useState('');
     const[color,setcolor]=useState("#000000")
     const location = useLocation();
     const { myData } = location.state && location.state !== "" ? location.state : { myData: {} };

 
     useEffect(()=>{

     },[])
  const handleChange = (event) => {
    setAge(event.target.value);
  };

    const getPaths=async()=>{
        const data=await canvasRef.current.exportPaths();
        const res=data;
        setPaths(res)

        
    }
    
    const Undo=()=>{
        console.log(color)
        canvasRef.current.undo();
    }
    const Redo=()=>{
        canvasRef.current.redo();
    }
    const Reset=()=>{
        canvasRef.current.resetCanvas();

    }
    useEffect(() => {
      
      if(Object.keys(myData).length)
      {
      const parsedData = JSON.parse(myData.paths);
      
      
      if (parsedData) {
      // Parse the data
        canvasRef.current.loadPaths(parsedData); // Load paths into the canvas
        setPaths(myData)
      }
    }
    
    }, [myData]);
    const save=async()=>{
      

      try{
              if(myData!==paths)
              {
            await databases.createDocument(import.meta.env.VITE_APPWRITE_DATABASEID_ID,import.meta.env.VITE_APPWRITE_COLLECTION_ID1,ID.unique(),
            {
           "mail":(await account.get()).email,
           "paths":JSON.stringify(paths),
            })
            toast.success("you drawing saved")
      }
      else{
         toast.error("you have to make changes and save!!")

      }
      }
      
     catch(e)
     {
       console.log(e)
       toast.error("you have to createaccount to save or login:)")
     }
   
    }
    const handleStrokeColorChange=(e)=>{
      setcolor(e.target.value)
       console.log(e.target.value)
       console.log(color)
    }
  return (
    <div className="p-2">
      <span>Welcome {name}</span>
      <span>Draw here!</span>
      <div className="flex gap-4">
      <input
          type="color"
          value={color}
          onChange={handleStrokeColorChange}
          className="border-r-4 rounded-lg"
        />
       <UndoIcon onClick={()=>Undo()} className="hover:border-2 hover:border-blue-500 hover:rounded-md cursor-pointer w-20"/>
       <RedoIcon onClick={()=>Redo()} className="hover:border-2 hover:border-blue-500 hover:rounded-md cursor-pointer w-20"/>
        <RestartAltIcon onClick={()=>Reset()} className="hover:border-2 hover:border-blue-500 hover:rounded-md cursor-pointer w-20"/>
       </div>
      {/*{color?<Box sx={{ minWidth: 120 }} className="absolute">
      <FormControl>
        <InputLabel id="demo-simple-select-label">colors</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="colors"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>:""}*/}
      <ReactSketchCanvas
        width="100%"
        height="1500px"
        canvasColor="transparent"
        strokeColor={color}
        onStroke={getPaths}
      
        ref={canvasRef}
        className="cursor-pointer"
        
        />
        <button className="bg-blue-500 p-2 rounded-md" onClick={save}>save</button>
      </div>
    );
  }
  