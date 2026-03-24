import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash, faCheck,faSquareCheck,faCircleXmark,faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import './SignIn.css'

import { useAuthenticate } from "./AuthenticateContext.jsx";
 


export default function Login(){
    
  const {fetchProtectedData,Submit,showPass, Password, SetPassword,error , setError, emailAddress ,setEmail,success, setSuccess, isLoading, setIsLoading,showPassword , setShowpassword,UserId } = useAuthenticate()
 
useEffect(() => {
  if (UserId) {
    localStorage.setItem('UserId', UserId);
    console.log(UserId)
  } else {
    localStorage.removeItem('UserId');
  }
}, [UserId]); 


    useEffect(() => {
      document.body.style.backgroundImage = "url('https://lagrandclassique.com/cdn/shop/products/01457_cat_breeds_main.jpg?v=1708938827')";
      document.body.style.backgroundSize = "cover"; // Make sure the image covers the whole screen
         //document.body.style.filter = "blur(5px)"
      document.body.style.backgroundRepeat = "no-repeat"; // Prevent tiling 
  
      return () => {
        document.body.style.backgroundColor = ""; // Reset when component unmounts
      };
    }, []);
  
  
    // <button onClick={fetchProtectedData} > Test Token expiry </button>
    return <>
  
  
  {success ? <div className="Success"> Success <FontAwesomeIcon icon={faCircleCheck} />  <a  href='/' target='' rel="noopener noreferrer"> Back to the main Page </a> </div>   : <>  <div className="Title"> Log In </div>
  
  <form className="Form" onSubmit={Submit} > 
  

  
  <label >Email Address :</label>  
  <input onChange={(e)=> setEmail(e.target.value)}  value={emailAddress}/>
  
  
  <label className="Pass_Label"> Password :  </label>
  <input type={showPassword ? "text" : "password"} onChange={ (e)=> SetPassword(e.target.value) } value={Password} />
  
       <div  className="eye_show" onClick={ showPass }> { showPassword ? <FontAwesomeIcon icon={faEye} /> :    <FontAwesomeIcon icon={faEyeSlash} /> }</div>
  
    <button type="Submit" className="Submit" disabled={isLoading}>
  {isLoading ? "Logging In..." : "Log In"}
    </button>
  
     <div> Dont have an account ?<a href="/Sign_Up" target="" rel="noopener noreferrer"> Register </a></div>
  
    <div className="ErrorBox" > {error} </div>
  
  </form>  </>}
    
  </>
}