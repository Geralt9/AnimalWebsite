import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash, faCheck,faSquareCheck,faCircleXmark, faCircleCheck,faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import {useCat} from './CatsContext.jsx'
import './SignIn.css'
 
import { useAuthenticate } from "./AuthenticateContext.jsx";

export default function  SignIn(){
   
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [isFullnameValid , setFullnamevalidation] = useState(false);  
  const [isemailValid , setEmailvalidation] = useState(false);


    const [Password , setPassword] = useState("")
    const [Fullname , SetFullname] = useState("");
    const [Verifyname , SetVerifyname] = useState();
    
    const [emailAddress , SetemailAddress] = useState("");
    const [Verifyemail , SetVerifyemail] = useState("");


    const [showPassword , setShowpassword] = useState(false);
    const [PasswordStrength , setPasswordStrength] = useState("");

  const[error , setError] = useState('')


  
const{AuthenticateStatus, setAuthenticate } = useAuthenticate();

 useEffect(() => {
  document.body.style.backgroundImage = "url('../Icons_Images/Scene-24.jpg')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
  document.body.style.minHeight = "100vh";
  document.body.style.margin = "0";

  return () => {
    document.body.style.backgroundImage = "";
    document.body.style.backgroundSize = "";
    document.body.style.backgroundRepeat = "";
    document.body.style.backgroundPosition = "";
    document.body.style.minHeight = "";
    document.body.style.margin = "";
  };
}, []);


function showPass(e){
    e.preventDefault() ;
    setShowpassword(!showPassword);
    
}

function  HandlePasswordStrength(value){
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (strongRegex.test(value)) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Weak");
    }
}

function HandlePassword(e){
        const value = e.target.value ;
        setPassword(value);
        HandlePasswordStrength(value);    

}
  

    function HandleName(e){
        const value = e.target.value ;
        SetFullname(value);

        const nameTest = /^[A-Z][a-z]+(\s[A-Z][a-z]+)+$/

        if( nameTest.test(value) ){
            SetVerifyname(<FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />)
            setFullnamevalidation(true);
        }else{SetVerifyname() ; setFullnamevalidation(false)  }


    }
 
function HandleEmail(e){
    const value = e.target.value ;
    SetemailAddress(value) ;

    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

   if(emailReg.test(value)){
    SetVerifyemail(<FontAwesomeIcon icon={faSquareCheck}  style={{ color: "green" }} />)  
    setEmailvalidation(true)
   }else if (!emailReg.test(value) && value!==''){ SetVerifyemail(<FontAwesomeIcon icon={faCircleXmark}  style={{ color: "red" }} />)  ; setEmailvalidation(false) }
   else{SetVerifyemail() ; setEmailvalidation(false) }

}
//-----------------------------Submit------------------------------------------



async function Submit(e){

  e.preventDefault();
  if (isLoading) return;


  if(Password == '' || emailAddress =='' || Fullname=='' ){
    setError('Please make sure to fill in all the required fields')
  }else if( isemailValid == false){
    setError('Please enter a valid Email Address!')
  }//else if(isemailValid == true){setError('')}
  else if(isFullnameValid == false){setError('Please make sure to enter a valid Full name with a capital first letter for both') ;}
  else if(PasswordStrength == 'Weak'){setError('Password is too Weak, Try using a combination of letters, numbers, and special letters / * &')}
  else{setError('');

      setIsLoading(true);

    try { 

      const UserData = {
        FullName : Fullname,
        emailAddress : emailAddress,
        Password : Password
      }

      const response = await fetch('http://localhost:8080/User/SignUp' , {
        method : 'POST',
        headers: {'Content-Type' : 'application/json'},
        body : JSON.stringify(UserData),
      })

      if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration Failed')
      }else if(response.ok){
        const successData = await response.json();
        setSuccess(true);
  
        console.log(successData);
      }


    } catch (error) {
        console.error('Error' , error )
        setError(error.message)
    }

  }
}


  return <>



{success ? <div className="Success"> Account created ! <FontAwesomeIcon icon={faCircleCheck} />  <a  href='/Log_in' target='' rel="noopener noreferrer"> Back to the main Page </a> </div> :<>  <div className="Title"> SIGN UP </div>

   <div className="LogInLink"> Already have an account ? <a  className="HyperLog" href="/Log_In" rel="noopener noreferrer"> Log In</a>  </div>

<form className="Form" onSubmit={Submit}>
  <label>Full name : {Verifyname}</label>
  <input onChange={HandleName} value={Fullname} />

  <label>Email Address :</label>
  <div className="input_with_icon">
    <input onChange={HandleEmail} value={emailAddress} />
    <div className="email_check">{Verifyemail}</div>
  </div>

  <label className="Pass_Label">
    Password :
    {PasswordStrength === "Strong" ? (
      <div style={{ color: "green" }}>Strong</div>
    ) : PasswordStrength === "Weak" ? (
      <div style={{ color: "red" }}>Weak</div>
    ) : null}
  </label>

  <div className="password_wrapper">
    <input
      type={showPassword ? "text" : "password"}
      onChange={HandlePassword}
      value={Password}
    />
    <div className="eye_show" onClick={showPass}>
      {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
    </div>
  </div>

  <button type="Submit" className="Submit" disabled={isLoading}>
    {isLoading ? "Signing Up..." : "Sign Up"}
  </button>


  <div className="ErrorBox">{error}</div>
</form>  </>}
  



  </>;
}

       

