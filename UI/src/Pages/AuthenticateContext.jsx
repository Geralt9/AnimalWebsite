import { faL } from '@fortawesome/free-solid-svg-icons';
import {useState , useEffect , useContext , createContext, useRef, children,navigate} from 'react'
import { Link, useNavigate } from "react-router-dom";



 const AuthenticateContext = createContext() ;


 export const User_login = ({children})=>{

    const [AuthenticateStatus , setAuthenticate] = useState(()=>{

      return localStorage.getItem('isAuthenticated') === 'true';

    }) ;

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
   
       const [showPassword , setShowpassword] = useState(false);
      
       const [emailAddress ,setEmail] = useState('')
       const [Password, SetPassword] = useState('')  
 
     const[error , setError] = useState();

     const [PopUp, setPopUp] = useState(false);

    /*-----------------User Data coming from the backend---------------------------*/ 

    const [UserId, setUserId] = useState();
    const userIdRef = useRef(() => {
    const storedUserId = localStorage.getItem('UserId');
    return storedUserId ? storedUserId : null; // Or parseInt(storedUserId) for numbers
  });
    /*-----------------------------------------------------------------------------*/ 

     useEffect(() => {
      localStorage.setItem('isAuthenticated', AuthenticateStatus);
    }, [AuthenticateStatus]);
  

  function showPass(e){
    e.preventDefault() ;
    setShowpassword(!showPassword); 
    
   }

//-----------------------------Submit------------------------------------------

   
  const fetchProtectedData = async () => {
    
    try {
      
      const response = await AuthFetch('http://localhost:8080/TestToken');

      if (response.ok) {
        const result = await response.json();
        setData(result.message);
      }

    } catch (err) {
      setError(err.message);
    }

  };



  async function AuthFetch(url, options = {}) {
    // First attempt
    const response = await fetch(url, {
        ...options,
        credentials: 'include'
    });

    // Clone the response for error handling
    const responseClone = response.clone();

    // Handle token expiration
    if (response.status === 401) {
        try {
            const errorData = await responseClone.json();
            if (errorData.error === 'Token expired') {
                const refreshResponse = await fetch('http://localhost:8080/refresh', {
                    method: 'POST',
                    credentials: 'include'
                });

                if (refreshResponse.ok) {
                    return fetch(url, { ...options, credentials: 'include' });
                }
                throw new Error("Session expired. Please log in again.");
            }
        } catch (e) {
            console.error("Refresh error:", e);
        }
    }

    return response;

}



async function Submit(e){

  e.preventDefault();
  if (isLoading) return;


  if(Password == '' || emailAddress =='' ){
    setError('Please make sure to fill in all the required fields')
  }
  else{  setError('');

      setIsLoading(true);

    try { 

      const UserData = {
        emailAddress : emailAddress,
        Password : Password
      }

      const response = await AuthFetch('http://localhost:8080/User/LogIn' , {
        method : 'POST',
        headers: {'Content-Type' : 'application/json'},
        body : JSON.stringify(UserData),
       
      })

    const data = await response.json();
     setUserId(data.UserID) ;


      if(!response.ok){
        
        throw new Error(data.error || 'Login failed');
       
      }else if(response.ok){
        setUserId(data.UserID);
        setSuccess(true);
        setAuthenticate(true);
        
      }

    } catch (error) {

        setAuthenticate(false);
        console.error('Error' , error )
        setError(error.message)
       
    }finally {
    setIsLoading(false);
  }

  }
}


async function Logout(e){

  e.preventDefault() ;

  try {

    const response = await fetch('http://localhost:8080/Logout' , {
      method: 'DELETE',
      credentials: 'include'
    })

    if(response.ok){
      setAuthenticate(false) ;
      setPopUp(false);
    }

  } catch (error) {
    
    console.error('Error' , error)

  }

}

//------------------------------------------------fetch profile ----------------------------------------------------------------------

  const[finalCroppedpfpImage , setfinalCroppedPfpImage] = useState(null);
  const[finalCroppedBgImage , setfinalCroppedBgImage] = useState(null);
  const [UserName, setUsername] = useState("") ;

    async function fetchProfile() {

        try {

                const response = await fetch('http://localhost:8080/User/Profile' ,{
                     method: 'GET',
                    credentials: 'include'
                })

              if(response.ok){
                  
                 const ReceivedData = await response.json() ;
                 setUsername(ReceivedData.userName); 
               
           
                 setfinalCroppedPfpImage(ReceivedData.ProfilePic);
                 setfinalCroppedBgImage(ReceivedData.BackgroundPic);

                  console.log('Profile fetched');

              }else if(!response.ok){
                    setAuthenticate(false)

              } 

        } catch (error) {
            console.error('Error:' , error)
        }

    }


        return( <AuthenticateContext.Provider value={{Submit,showPass, Password, SetPassword,error , setError, emailAddress ,setEmail,success, setSuccess,
            isLoading, setIsLoading,showPassword , setShowpassword,AuthenticateStatus , setAuthenticate,fetchProtectedData,Logout,PopUp, setPopUp, UserId,setUserId, userIdRef,
          fetchProfile , finalCroppedpfpImage , setfinalCroppedPfpImage, finalCroppedBgImage , setfinalCroppedBgImage, UserName, setUsername }}> {children} </AuthenticateContext.Provider>)

 }

  export const useAuthenticate = ()=>useContext (AuthenticateContext) ;

