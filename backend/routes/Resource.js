const express = require('express')
const router = express.Router()
const Resource = require('../models/resource')

// const[image,setImage] = useState('')
// const[url,setUrl] = useState('')


useEffect(()=>{
if(url){
    fetch('/create-post',{
        method:'post',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            title,
            desc,
            postType,
            collegeName,
            postedDate,
            postedBy,
           pic:url
        })
    }).then(res=>res.json())
    // .then(data=>{
    //     console.log(data)
    //     if(data.error){
    //         console.log("error")
    //     }
    //     else{
    //         history.push('/') or use useNavigate()
    //     }
    // })
    .catch(err=>{
        console.log(err)
    })
}
},[url])




 const postDetails = ()=>{
    const data = new FormData()
    data.append('file',image)
    data.append('upload_preset','feedbox-community-web')
    data.append('cloud_name','feedbox-community-web')
    fetch('https://api.cloudinary.com/v1_1/feedbox-community-web/image/upload',{
        method:'post',
        body:data
    })
    .then(res=>res.json())
    .then(data=>{
        setUrl(data.url)
    })
    .catch(err=>{
        console.log(err)
    })


}

{/* <button onClick ={()=>postDetails()} */}






module.exports = router