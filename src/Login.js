import Axios from "axios";
import { useState } from "react";
import GoogleLogin from "react-google-login";

const Login = (props) => {
    const token = localStorage.getItem("token");
    if(token !==null){
        props.history.push("/home");
    }
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const handleSubmit = (e)=>{
        e.preventDefault();
        const data ={
            email:email,
            password:password
        }
        Axios.post("/user/login",data).then((res)=>{
            const {result,token,id} = res.data;
            if(result === "Success"){
                localStorage.setItem("token",token);
                sessionStorage.setItem("id",id);
                console.log(res);
                props.history.push("/home");
            }
            else{
                console.log("not");
            }
        })
    }

    
    const responseGoogle = (res)=>{
        console.log(res);
        const {email,googleId} =res.profileObj;
        const googleData = {
            email:email,
            password:googleId,
        }
        Axios.post("/user/login",googleData).then((res)=>{
            const {result,token} = res.data;
            if(result === "Success"){
                localStorage.setItem("token",token);
                console.log(res);
                props.history.push("/home");
            }
            else{
                console.log("not");
            }
        })
    }
    return ( 
        <div className="container-fluid">
        <form onSubmit={handleSubmit}>
            <div className="form-group row">
                <label htmlFor="email" className="col-form-label col-1" >Email:</label>
                <input type="email" className="form-control col-md-2" name="email" onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="form-group row">
                <label htmlFor="password" className="col-form-label col-1" >Password:</label>
                <input type="password" className="form-control col-md-2" name="password"onChange={(e)=>setPassword(e.target.value)} />
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

export default Login
