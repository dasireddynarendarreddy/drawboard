import { useState, useRef, useEffect } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { account, ID, databases } from "./AppWrite";
import { useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import { ReactSketchCanvas } from "react-sketch-canvas";

export default function Board({ name }) {
  const canvasRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [paths, setPaths] = useState('');
  const [age, setAge] = useState('');
  const [color, setColor] = useState("#000000");
  const location = useLocation();
  const { myData } = location.state && location.state !== "" ? location.state : { myData: {} };

  useEffect(() => {
    if (Object.keys(myData).length) {
      const parsedData = JSON.parse(myData.paths);
      if (parsedData) {
        canvasRef.current.loadPaths(parsedData); // Load paths into the canvas
        setPaths(myData);
      }
    }
  }, [myData]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const getPaths = async () => {
    const data = await canvasRef.current.exportPaths();
    setPaths(data);
  };

  const Undo = () => {
    canvasRef.current.undo();
  };

  const Redo = () => {
    canvasRef.current.redo();
  };

  const Reset = () => {
    canvasRef.current.resetCanvas();
  };

  const save = async () => {
    try {
      if (myData !== paths) {
        await databases.createDocument(import.meta.env.VITE_APPWRITE_DATABASEID_ID, import.meta.env.VITE_APPWRITE_COLLECTION_ID1, ID.unique(), {
          "mail": (await account.get()).email,
          "paths": JSON.stringify(paths),
        });
        toast.success("Your drawing is saved");
      } else {
        toast.error("You have to make changes and save!");
      }
    } catch (e) {
      console.log(e);
      toast.error("You have to create an account to save or login :)");
    }
  };

  const handleStrokeColorChange = (e) => {
    setColor(e.target.value);
  };

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
      console.log("Scrolling to bottom");
    } else {
      console.log("scrollContainerRef is null");
    }
  };

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      console.log("Scrolling to top");
    } else {
      console.log("scrollContainerRef is null");
    }
  };

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
        <UndoIcon onClick={Undo} className="hover:border-2 hover:border-blue-500 hover:rounded-md cursor-pointer w-20" />
        <RedoIcon onClick={Redo} className="hover:border-2 hover:border-blue-500 hover:rounded-md cursor-pointer w-20" />
        <RestartAltIcon onClick={Reset} className="hover:border-2 hover:border-blue-500 hover:rounded-md cursor-pointer w-20" />
      </div>
      <div ref={scrollContainerRef} className="relative overflow-auto h-[600px]">
        <ReactSketchCanvas
          width="100%"
          height="1500px"
          canvasColor="transparent"
          strokeColor={color}
          onStroke={getPaths}
          ref={canvasRef}
          className="cursor-pointer"
        />
        <div className="absolute right-2 top-2 bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer" onClick={scrollToTop}>
          ↑
        </div>
        <div className="absolute right-2 bottom-2 bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer" onClick={scrollToBottom}>
          ↓
        </div>
      </div>
      <button className="bg-blue-500 p-2 rounded-md mt-4" onClick={save}>save</button>
    </div>
  );
}
