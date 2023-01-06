import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import Signin from './components/signin';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import { ToastContainer} from 'react-toastify';
import Navbar from './components/navbar';
import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Profile from './components/profile';
import { loginActions } from './store/store';
const restaurants = [{
        name: 'Lalit',
        openingTime: '9 AM',
        closingTime: '10 PM',
        seatingCapacity: 100,
        address: 'Nehru Park',
        rating: '4 stars'
    }, {
        name: 'Taj',
        openingTime: '8 AM',
        closingTime: '7 PM',
        seatingCapacity: 60,
        address: 'Time square',
        rating: '4.8 stars'
    }];

function App() {
  const dispatch = useDispatch();
  
  //this will store the login state to check whether user is logged in or not
  const loginState = useSelector(state=>state.login);

  useEffect(()=>{
    if(localStorage.getItem('isLoggedIn') === 'true'){
      //for reloading of the app, if user is still logged in then restoring the state in redux store
      dispatch(loginActions.login());
      //for storing the restaurant data in local storage
      localStorage.setItem('restaurants', JSON.stringify(restaurants));
    }
  }, [dispatch]);

  return (
    <React.Fragment>
    {loginState.isLoggedIn && <Navbar/>}
    <div className='container'>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<Navigate replace to='/signin'/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
    </React.Fragment>
  );
}

export default App;
