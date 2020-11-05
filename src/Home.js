import Axios from 'axios';
import React, { useEffect, useState } from 'react'
const Home = (props) => {
    
    const token = localStorage.getItem("token");
    if(token ===null){
        props.history.push("/login");
    }
    const signOut = () =>{
        localStorage.removeItem("token");
        props.history.push("/login")
      
    }

    useEffect(()=>{
        fetchData();
    },[])
    const [data, setData] = useState([]);
   const fetchData = ()=>{
       const id = sessionStorage.getItem("id");
        Axios.get("/user/getUser/"+id).then((res)=>{
            console.log(res);
            setData(res.data);
        })
    }
    return (
        <div>
            Welcom to Home {sessionStorage.getItem("id")}
            <br></br>
                {data.name}
                {data.email}
                {data.password}
            <button type="submit" className="btn btn-primary"  onClick={signOut}>SignOut</button>
        </div>
    )
}

export default Home
