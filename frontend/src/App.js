import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


import Login from './component/login/Login';
import SignUp from './component/signup/SignUp';
import Home from './component/landing_page/Home';
import Main from './component/Main/Main';
import Rescources from './component/Rescources/Rescources';
import RescourcesDisplay from './component/Rescources/RescourcesDisplay'
import Faq from './component/Faq';
import Approvals from './component/approvals/Approvals';
import CalendarPage from './component/Calendar/CalendarPage';
import ProfilePage from './component/Profile/ProfilePage';
import AttendanceSheet from './component/Calendar/AttendanceSheet';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route index path='/login' element={ <Login /> } />
          <Route index path='/register' element={ <SignUp /> } />
          <Route index path='/main' element={ <Main /> } />
          <Route index path='/calendar' element={ <CalendarPage /> } />
          <Route index path='/rescources' element={ <Rescources /> } />
          <Route index path='/profile' element={ <ProfilePage/> } />
          <Route index path='/rescourcesDisplay' element={ <RescourcesDisplay /> } />
          <Route index path='/faq' element={ <Faq /> } />
          <Route index path='/approvals' element={ <Approvals /> } />
          <Route index path='/attendance' element={ <AttendanceSheet /> } />
        </Routes>
      </Router>
    </div>
  )
}

export default App