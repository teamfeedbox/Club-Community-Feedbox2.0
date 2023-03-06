import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


import Login from './component/login/Login';
import SignUp from './component/signup/SignUp';
import Home from './component/landing_page/Home';
// import Main from './component/Main';
import Main from './component/Main/Main';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route index path='/login' element={ <Login /> } />
          <Route index path='/register' element={ <SignUp /> } />
          <Route index path='/main' element={ <Main /> } />
        </Routes>
      </Router>
    </div>
  )
}

export default App