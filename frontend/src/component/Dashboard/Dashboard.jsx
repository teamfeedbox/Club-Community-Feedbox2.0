import {
  faCalendar,
  faUniversity,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState,useEffect } from "react";
import NavbarRes from "../navbar/NavbarRes";
import Chart from "chart.js/auto";
import { Bar, Line, Pie } from "react-chartjs-2";

const Dashboard = () => {
  const [user , setUser] = useState('')
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: ["#007D9C",
        "#244D70",
        "#D123B3",
        "#F7E018",
        "#0f9635",
        "#FE452A"],
        // borderColor: "rgb(255, 99, 132)",
        data: [4, 10, 5, 2, 20, 30, 45, 2, 10, 5, 25, 30],
      },
    ],
  };

useEffect(()=>{
  getUser()
},[])

  const getUser = async()=>{
    let result = await fetch("http://localhost:8000/getAllUser");
    result = await result.json();
    setUser(result.length)
    console.log(result.length);
  }


  return (
    <div>
      <NavbarRes />
      <div className=" pt-[60px] w-[90%] md:w-[90%] lg:w-[70%] m-auto">
        <div className="flex lg:mt-4 lg:ml-4 mt-2 ml-1">
          <p className="ml-2 text-[28px] font-semibold mb-0">Dashboard</p>
        </div>

        <div className=" flex flex-wrap justify-around lg:flex md:flex-row flex-col">

          <div className="flex mt-2 lg:mt-0 w-[100%] md:w-[33%] lg:w-[30%] rounded shadow-sm h-[80px] ">
            <div className=" w-[50px] h-[50px] mt-3  ml-3 rounded bg-blue-200">
              <FontAwesomeIcon
                className="w-[30px] h-[30px] m-2.5 text-blue-800"
                icon={faUserGroup}
              />
            </div>
            <div className=" flex flex-col m-2 pl-3">
              <h className="pt-1 text-[18px] md:text-[16px]  m-0 pb-0 font-semibold">
                Total Students:
              </h>
              <p className=" text-[25px] font-bold p-0 relative bottom-2">
               {user}
              </p>
            </div>
          </div>

          <div className="flex mt-2 lg:mt-0 w-[100%] md:w-[33%] lg:w-[30%] rounded shadow-sm h-[80px] ">
            <div className=" w-[50px] h-[50px] mt-3  ml-3 rounded bg-green-200">
              <FontAwesomeIcon
                className="w-[30px] h-[30px] m-2.5 text-green-800"
                icon={faUniversity}
              />
            </div>
            <div className=" flex flex-col m-2 pl-3">
              <h className="pt-1 text-[18px] md:text-[16px]  m-0 pb-0 font-semibold">
                Total Colleges:
              </h>
              <p className=" text-[25px] font-bold p-0 relative bottom-2">15</p>
            </div>
          </div>

          <div className="flex mt-2 lg:mt-0 w-[100%] md:w-[33%] lg:w-[30%] rounded shadow-sm h-[80px] ">
            <div className=" w-[50px] h-[50px] mt-3  ml-3 rounded bg-red-200">
              <FontAwesomeIcon
                className="w-[30px] h-[30px] m-2.5 text-red-800"
                icon={faCalendar}
              />
            </div>
            <div className=" flex flex-col m-2 pl-3">
              <h className="pt-1 text-[18px] md:text-[16px]  m-0 pb-0 font-semibold">
                Upcoming Events:
              </h>
              <p className=" text-[25px] font-bold p-0 relative bottom-2">10</p>
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap justify-around">

          <div className="w-[320px] md:w-[300px] m-3 rounded-md shadow-md p-2" >
            <Bar width={300} height={300}  data={data} />
            <div className="m-3">
            <h5 className="pt-1 text-[16px]  m-0 pb-0 font-semibold">
                Total Number of events held:
              </h5>
              <p className=" text-[25px] mt-1  font-bold p-0 relative bottom-2">10</p>
            </div>
          </div>

          <div className="w-[320px] md:w-[300px] m-3 rounded-md shadow-md p-2" >
            <Line width={300} height={300}  data={data} />
            <div className="m-3">
            <h5 className="pt-1 text-[16px]  m-0 pb-0 font-semibold">
                Total Number of hours events held:
              </h5>
              <p className=" text-[25px] mt-1  font-bold p-0 relative bottom-2">12 hrs</p>
            </div>
          </div>

          <div className="w-[320px] md:w-[300px] m-3 rounded-md shadow-md p-2" >
            <Pie width={300} height={300}  data={data} />
            <div className="m-3">
            <h5 className="pt-1 text-[16px]  m-0 pb-0 font-semibold">
                Total Number of hours student studied:
              </h5>
              <p className=" text-[25px] mt-1  font-bold p-0 relative bottom-2">8 hrs</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
