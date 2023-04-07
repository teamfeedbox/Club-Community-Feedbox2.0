import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./component/signup/Register";
import SignUp from "./component/signup/SignUp";
import Home from "./component/landing_page/Home";
import Main from "./component/Main/Main";
import Rescources from "./component/Rescources/Rescources";
import RescourcesTable from "./component/Rescources/RescourcesTable";
import Faq from "./component/Faq";
import Approvals from "./component/approvals/Approvals";
import ProfilePage from "./component/Profile/ProfilePage";
import NewLogin from "./component/login/NewLogin";
import AttendanceSheet from "./component/Calendar/AttendanceSheet";
import ReactBigCalendar from "./component/Calendar/ReactBigCalendar";
import PostBigModel from "./component/Main/PostBigModel";
import ProfileBigModel from "./component/Profile/ProfileBigModel";
import Error from "./component/Error";
import Loader from "./component/Loader";
import Dashboard from "./component/Dashboard/Dashboard";
import MobileNotification from "./component/navbar/MobileNotification";
import NavbarRes from "./component/navbar/NavbarRes";
import Login from "./component/login/Login";

const App = () => {
  const [data, setData] = useState();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    let result = await fetch(`http://localhost:8000/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    result = await result.json();
    setData(result.role);
  };
  console.log(data, "kmk");
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route index path="/login" element={<NewLogin />} />
          <Route index path="/super_admin_login" element={<Login />} />
          <Route index path="/register" element={<Register />} />
          <Route
            index
            path="/main"
            element={
              data && data == null ? <Error /> : [<NavbarRes />, <Main />]
            }
          />

          <Route
            index
            path="/comment/:id"
            element={data && data == null ? <Error /> : <PostBigModel />}
          />

          <Route
            index
            path="/calendar"
            element={
              data && data == null ? (
                <Error />
              ) : (
                [<NavbarRes />, <ReactBigCalendar />]
              )
            }
          />

          <Route
            index
            path="/rescources"
            element={
              data && data == null ? <Error /> : [<NavbarRes />, <Rescources />]
            }
          />

          <Route
            index
            path="/profile"
            element={
              (data && data == null) || (data == "Super_Admin") ? (
                <Error />
              ) : (
                [<NavbarRes />, <ProfilePage />]
              )
            }
          />

          <Route index path="/profileComment" element={<ProfileBigModel />} />

          <Route
            index
            path="/rescourcesDisplay"
            element={
              data && data == null ? (
                <Error />
              ) : (
                [<NavbarRes />, <RescourcesTable />]
              )
            }
          />

          <Route
            index
            path="/faq"
            element={
              data && data == null ? <Error /> : [<NavbarRes />, <Faq />]
            }
          />

          <Route
            index
            path="/approvals"
            element={
              (data && data == null) || ( data == "Club_Member") ? (
                <Error />
              ) : (
                [<NavbarRes />, <Approvals />]
              )
            }
          />

          <Route index path="/load" element={<Loader />} />
          <Route index path="*" element={<Error />} />

          <Route
            index
            path="/attendance/:name"
            element={
              (data && data == null) || ( data == "Club_Member") ? (
                <Error />
              ) : (
                [<NavbarRes />, <AttendanceSheet />]
              )
            }
          />

          <Route
            index
            path="/dashboard"
            element={
              data && data == "Super_Admin" ? (
                [<NavbarRes />, <Dashboard />]
              ) : (
                <Error />
              )
            }
          />

          <Route
            index
            path="/notification"
            element={data && data == null ? <Error /> : <MobileNotification />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
