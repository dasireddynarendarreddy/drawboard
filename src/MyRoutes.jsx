import { Routes, Route, Link } from 'react-router-dom';
import Landing from './Landing';
import Home from './Home';
import { useState } from 'react';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Dashboard';
 const MyRouter = () => {
    const[user,setuser]=useState(null)
    const handleLogin=()=>{
        setuser(true);
    }
    console.log(user)
    const handleLogout=()=>{
        setuser(false)
    }
  return (
    <>
      <h1>React Router</h1>

      <Navigation user={user} />
      {user ? (
        <button onClick={handleLogout}>Sign Out</button>
      ) : (
        <button onClick={handleLogin}>Sign In</button>
      )}
      <Routes>
        <Route index element={<Landing />} />
        <Route path="landing" element={<Landing />} />
        <Route element={<ProtectedRoute user={user}></ProtectedRoute>}>
        <Route path="home" element={<Home/>}/>
        <Route path="dashboard" element={<Dashboard />} />
        </Route>
        {/*<Route path="analytics" element={<Analytics />} />
        <Route path="admin" element={<Admin />} />*/}
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
};

const Navigation = () => (
    
  

  <nav>
    <Link to="/landing" >Landing</Link>
    <Link to="/home">Home</Link>
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/analytics">Analytics</Link>
    <Link to="/admin">Admin</Link>
  </nav>
    
);
export default MyRouter