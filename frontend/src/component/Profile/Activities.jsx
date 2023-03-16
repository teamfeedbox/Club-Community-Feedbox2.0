import React from 'react';
import "./Profile.css";
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PostDisplay from '../Main/PostDisplay';
import HomePageEvent from "../Main/HomePageEvent"
import RescourcesDisplay from "../Rescources/RescourcesDisplay";
// import Sonnet from '../../components/Sonnet';
function Activities() {
    const [post,setPost]=useState(true);
    const [events,setEvents]=useState(false);
    const [res,setRes]=useState(false);
    const [style,setStyle]=useState('type');

    function update(){
        setPost(true);
        setRes(false);
        setEvents(false);
        setStyle('type1')
    }
    function update1(){
        setPost(false);
        setRes(false);
        setEvents(true);
    }
    function update2(){
        setPost(false);
        setRes(true);
        setEvents(false);
    }

  return (
    <div className='activites-contianer'>
        {/* <p>Activites:</p>
        <div className='activites'>
           <a href="#"> <span className={style} onClick={update}>Posts</span></a>
           <a href="#"><span className={style} onClick={update1}>Events</span></a>
           <a href="#"><span className={style} onClick={update2}>Resources</span></a>
        </div>
        
        <section>1</section>
        <section>2</section>
        <section>3</section> */}
    
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="profile" title="Posts">
        <PostDisplay/>
      </Tab>
      <Tab eventKey="home" title="Events">
        <HomePageEvent/>
      </Tab>
      <Tab eventKey="contact" title="Resources">
        <RescourcesDisplay/>
      </Tab>
    </Tabs>
    </div>
  )
}

export default Activities