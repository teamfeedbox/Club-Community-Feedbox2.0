import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


import Login from './component/login/Login';
import SignUp from './component/signup/SignUp';
import Landing from './component/landing_page/landing';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route index path='/login' element={ <Login /> } />
          <Route index path='/signup' element={ <SignUp /> } />
        </Routes>
      </Router>
    </div>
  )
}

export default App