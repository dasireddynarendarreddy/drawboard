import React, {  useState } from 'react';
import { account, ID} from './AppWrite.jsx';
import { useNavigate} from 'react-router-dom';
import {toast} from "react-toastify"
function Login() {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
   const navigate=useNavigate();
  const login= async (e) => {
    e.preventDefault();
    try {
      if (!mail || !password || !name) {
        setError('All fields are required');
        console.log('All fields are required');
      } 
       else{
      toast.success("you have logged in!!")
      await account.createEmailPasswordSession(mail,password);
      navigate(0);
            navigate("/board",{replace:true})
       }
    } catch (err) {
     
      toast.error(e.message)
    }
  
  };

  const register = async () => {
    if (!mail || !password || !name) {
      setError('All fields are required');
      console.log('All fields are required');
    } else {
      try {
        await account.create(ID.unique(), mail, password, name);
        await account.createEmailPasswordSession(mail,password);
        console.log('User registered:', name, mail);
        navigate(0);
        navigate("/board",{replace:true})
        
      } catch (err) {
        setError(err.message);
        toast(err.message);
        console.error('Error registering user:', err.code);
      }
    }
  };
  
  

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="border-2 border-black w-fit rounded-lg p-4 flex flex-col gap-2">
       
          <input
            type="text"
            placeholder="mail"
            onChange={(e) => setMail(e.target.value)}
            required
            className="border-2 border-black rounded-lg p-2"
          />
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            required
            className="border-2 border-black rounded-lg p-2"
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-2 border-black rounded-lg p-2"
          />
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex gap-2">
            <input
              type="submit"
              value="Login"
              className="rounded-lg bg-black text-white w-fit p-2 cursor-pointer"
              onClick={login}
            />{' '}
            OR
            <button
              type="button"
              className="rounded-lg bg-black text-white w-fit p-2 cursor-pointer"
              onClick={register}
            >
              SignUp
            </button>
          </div>
        
      </div>
    </div>
  );
}

export default Login;
