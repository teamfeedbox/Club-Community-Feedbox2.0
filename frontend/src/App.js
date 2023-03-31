import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/login/Login";
import Register from "./component/signup/Register";
import SignUp from "./component/signup/SignUp";
import Home from "./component/landing_page/Home";
import Main from "./component/Main/Main";
import Rescources from "./component/Rescources/Rescources";
import RescourcesTable from './component/Rescources/RescourcesTable';
import Faq from './component/Faq';
import Approvals from './component/approvals/Approvals';
import ProfilePage from './component/Profile/ProfilePage';
import NewLogin from './component/login/NewLogin';
import AttendanceSheet from './component/Calendar/AttendanceSheet';
import ReactBigCalendar from './component/Calendar/ReactBigCalendar';
import PostBigModel from './component/Main/PostBigModel';
import ProfileBigModel from "./component/Profile/ProfileBigModel";
import Error from "./component/Error";
import Loader from "./component/Loader";
import Dashboard from "./component/Dashboard/Dashboard";

const App = () => {
  const selectedPage = window.location.pathname;

  return (
    <div className="App">
      {/* <div
        className={
          selectedPage == "/" ||
          selectedPage == "/login" ||
          selectedPage == "/register"
            ? "hidden"
            : "block"
        }
      >
        <NavbarRes />
      </div> */}
        {/* <NavbarRes /> */}

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route index path="/login" element={<NewLogin />} />
          <Route index path="/register" element={<Register />} />
          <Route index path="/main" element={<Main />} />
          <Route index path='/comment/:id' element={ <PostBigModel/> } />
          <Route index path="/calendar" element={<ReactBigCalendar />} />
          <Route index path="/rescources" element={<Rescources />} />
          <Route index path="/profile" element={<ProfilePage />} />
          <Route index path='/profileComment' element={<ProfileBigModel/> } />
          <Route index path="/rescourcesDisplay" element={<RescourcesTable />} />
          <Route index path="/faq" element={<Faq />} />
          <Route index path="/approvals" element={<Approvals />} />
          <Route index path='/load' element={<Loader />} />
          <Route index path="*" element={<Error />} />
          <Route index path="/attendance/:name" element={<AttendanceSheet />} />
          <Route index path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;