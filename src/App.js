import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import Signin from './components/signin';
import Signup from './components/signup';
import { ToastContainer} from 'react-toastify';
import Navbar from './components/navbar';
import React from 'react';

function App() {
  return (
    <React.Fragment>
    <Navbar/>
    <div className='container'>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<Navigate replace to='/signin'/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </div>
    </React.Fragment>
  );
}

export default App;
