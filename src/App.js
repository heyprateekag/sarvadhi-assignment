import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import Signin from './components/signin';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import { ToastContainer} from 'react-toastify';
import Navbar from './components/navbar';
import React from 'react';
import {useSelector} from 'react-redux';
import LoginSlice from './store/loginSlice';

function App() {
  const loginState = useSelector(state=>state.login);
  return (
    <React.Fragment>
    {(loginState.isLoggedIn || localStorage.getItem('isLoggedIn') === 'true') && <Navbar/>}
    <div className='container'>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<Navigate replace to='/signin'/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </div>
    </React.Fragment>
  );
}

export default App;
