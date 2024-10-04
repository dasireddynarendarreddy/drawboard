import React, { useEffect, useRef} from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

function Show({ data }) {
  const canvasRef = useRef(null);


  useEffect(() => {
    const parsedData = JSON.parse(data.paths);
    
    if (parsedData.length > 0)
    {
canvasRef.current.loadPaths(parsedData)
    }
      
     else {
      console.log('No paths to load');
    }
  }, [data]);
  

  return (
    <div>
      
        <ReactSketchCanvas
          ref={canvasRef}
          width="300px"
          height="200px"
          canvasColor="transparent"
          strokeColor=""
          
          
          
        />
    
    </div>
  );
}

export default Show;
