import React, { useState } from 'react'
import "./Comment.css"
import { useEffect } from 'react'
function Comment(show) {
// const [show,setShow]=useState(props);
const [clas,setClas]=useState("ab");
if(show)
{
 setClas("a");
}
else
{
    setClas("ab");
}

  return (
    <div className={clas} 
    onClick={()=>{setClas('a')}}
    >Comment</div>
  )
}

export default Comment