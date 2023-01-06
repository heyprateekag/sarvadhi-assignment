import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import Signin from './components/signin';

function App() {
  return (
    <div className='container'>
      <Routes>
        <Route path='/' element={<Navigate replace to='/signin'/>}/>
        <Route path='/signin' element={<Signin/>}/>
      </Routes>
    </div>
  );
}

export default App;
