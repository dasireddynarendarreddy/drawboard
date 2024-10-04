import React, { useState, useEffect,lazy,Suspense} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { account } from "./AppWrite";

import ProtectedRoute from './ProtectedRoute';
const Board= lazy(() => import('./Board'))
const Logout= lazy(() => import('./Logout.jsx'))
const Nav= lazy(() => import('./Nav.jsx'))
const Drawings= lazy(() => import('./Drawings.jsx'))
const Login= lazy(() => import('./login.jsx'))
function App() {
  const [user, setUser] = useState(false);
  
  const[name,setname]=useState('')

  useEffect(() => {
    const getUserSession = async () => {
      try {
        const res = await account.get();
        
        if (res) {
          setUser(true);
          setname(res.name)
        } else {
          setUser(false);
        }
      } catch (e) {
        if (e.code === 401) {
          toast.error("have you registerd.");
          setUser(false);
        }
      }
    };

    getUserSession();
  }, []);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>} >
      <Nav user={user} />
      <ToastContainer />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/yourdrawing" replace /> : <Login />} />
        {/*<Route path="/logout" element={<ProtectedRoute user={user}><Logout /></ProtectedRoute>} />*/}
        <Route path="/yourdrawing" element={<ProtectedRoute user={user}><Drawings /></ProtectedRoute>} />
        <Route path="/board" element={<Board name={name} />} />
        <Route path="*" element={user ? <Navigate to="/yourdrawing" replace /> : <Navigate to="/" replace />} />
      </Routes>
      </Suspense>
    </div>
  
  );
}

export default App;
