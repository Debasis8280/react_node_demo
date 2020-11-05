import React,{useState} from 'react'
import axios from "axios";
// import { Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
const Signup = (props) => {
   
    const token = localStorage.getItem("token");
    if(token !==null ){
        props.history.push('home');
    }
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const onSubmit = (e)=>{
        e.preventDefault();
        const user = {
            name:name,
            email:email,
            password:password
        } 
        axios.post("/user/signup",user).then((res)=>{
            //console.log(res.data);
            if(res.data.result === "Success"){
                localStorage.setItem("token",res.data.token);
                props.history.push("/home")
            }
            else{
                console.log(res.data.result);
            }
        })
    }

    const responseGoogle =(res)=>{
        const {name,email,googleId} = res.profileObj;
        const googlUser = {
            name:name,
            email:email,
            password:googleId
        }
        axios.post("/user/signup",googlUser).then((res)=>{
            console.log(res.data);
            if(res.data.result === "Success"){
                localStorage.setItem("token",res.data.token);
                props.history.push("/home")
            }
            else{
                console.log(res.data.result);
            }
        })
        console.log(res);
    }

    return (
        <div className="container-fluid">
        <form onSubmit={onSubmit} method="post">
            <div className="form-group row">
                <label htmlFor="Name" className="col-form-label col-1" >Name:</label>
                <input type="text" className="form-control col-md-2" onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="form-group row">
                <label htmlFor="email" className="col-form-label col-1" >Email:</label>
                <input type="email" className="form-control col-md-2" name="email" onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="form-group row">
                <label htmlFor="password" className="col-form-label col-1" >Password:</label>
                <input type="password" className="form-control col-md-2" name="password" onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="form-group row">
                <input type="submit" className="btn btn-primary"/>
            </div>
        </form>
        <GoogleLogin
            clientId="344707042840-tj3k86mc80v3p44jgbr6vek35j49qgjs.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    </div>
    )
}

export default Signup

