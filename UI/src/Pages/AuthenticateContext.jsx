import {useState , useEffect , useContext , createContext, useRef, useMemo} from 'react'
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

 const AuthenticateContext = createContext() ;


 export const User_login = ({children})=>{

    const [AuthenticateStatus , setAuthenticate] = useState(()=>{
      return localStorage.getItem('isAuthenticated') === 'true';
    }) ;

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

       const [showPassword , setShowpassword] = useState(false);

       const [emailAddress ,setEmail] = useState('')
       const [Password, setPassword] = useState('')

     const[error , setError] = useState();

     const [PopUp, setPopUp] = useState(false);

    /*-----------------User Data coming from the backend---------------------------*/

    const [UserId, setUserId] = useState(null);

    /*-----------------------------------------------------------------------------*/

     useEffect(() => {
      localStorage.setItem('isAuthenticated', AuthenticateStatus);
    }, [AuthenticateStatus]);


  function showPass(e){
    e.preventDefault() ;
    setShowpassword(!showPassword);

   }

//-----------------------------Submit------------------------------------------

  async function AuthFetch(url, options = {}) {
    let response = await fetch(url, { ...options, credentials: 'include' });

    if (response.status === 401) {
      // Read the error type without consuming the original response body
      let errorType = null;
      try {
        const errorData = await response.clone().json();
        errorType = errorData.error;
      } catch (_) { /* non-JSON 401 — leave errorType null */ }

      // 'Token expired'  → JWT is still in the cookie but the signature has expired
      // 'Token missing'  → browser already deleted the cookie after maxAge elapsed
      // Both cases mean the access token is gone; attempt a silent refresh.
      if (errorType === 'Token expired' || errorType === 'Token missing') {
        try {
          const refreshRes = await fetch(`${API}/refresh`, {
            method: 'POST',
            credentials: 'include',
          });

          if (refreshRes.ok) {
            // New AccessToken cookie is now set — retry the original request
            response = await fetch(url, { ...options, credentials: 'include' });
          }
        } catch (e) {
          console.error('Token refresh failed:', e);
        }
      }
    }

    return response;
  }



async function Submit(e){

  e.preventDefault();
  if (isLoading) return;

  if (Password === '' || emailAddress === '') {
    return setError('Please fill in all required fields.');
  }
  if (!emailRegex.test(emailAddress)) {
    return setError('Please enter a valid email address.');
  }
  if (Password.length < 8) {
    return setError('Password must be at least 8 characters.');
  }

  setError('');
  setIsLoading(true);

    try {

      const UserData = {
        emailAddress : emailAddress,
        Password : Password
      }

      const response = await AuthFetch(`${API}/User/LogIn` , {
        method : 'POST',
        headers: {'Content-Type' : 'application/json'},
        body : JSON.stringify(UserData),
      })

    const data = await response.json();

      if(!response.ok){
        throw new Error(data.error || data.message || 'Login failed');
      }

      setUserId(data.UserID);
      setSuccess(true);
      setAuthenticate(true);

    } catch (error) {

        setAuthenticate(false);
        console.error('Error' , error )
        setError(error.message)

    } finally {
      setIsLoading(false);
    }
}


async function Logout(e){

  e.preventDefault() ;

  try {

    const response = await fetch(`${API}/Logout` , {
      method: 'DELETE',
      credentials: 'include'
    })

    if(response.ok){
      setAuthenticate(false) ;
      setUserId(null);
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

                const response = await AuthFetch(`${API}/User/Profile` ,{
                     method: 'GET',
                })

              if(response.ok){

                 const ReceivedData = await response.json() ;
                 setUsername(ReceivedData.userName);

                 setfinalCroppedPfpImage(ReceivedData.ProfilePic);
                 setfinalCroppedBgImage(ReceivedData.BackgroundPic);

              }else{
                    setAuthenticate(false)
              }

        } catch (error) {
            console.error('Error:' , error)
        }

    }

  const contextValue = useMemo(() => ({
    Submit, showPass, Password, setPassword, error, setError,
    emailAddress, setEmail, success, setSuccess,
    isLoading, setIsLoading, showPassword, setShowpassword,
    AuthenticateStatus, setAuthenticate, Logout, PopUp, setPopUp,
    UserId, setUserId, fetchProfile, AuthFetch,
    finalCroppedpfpImage, setfinalCroppedPfpImage,
    finalCroppedBgImage, setfinalCroppedBgImage,
    UserName, setUsername,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [AuthenticateStatus, isLoading, success, error, showPassword,
       emailAddress, Password, PopUp, UserId,
       finalCroppedpfpImage, finalCroppedBgImage, UserName]);

        return( <AuthenticateContext.Provider value={contextValue}> {children} </AuthenticateContext.Provider>)

 }

  export const useAuthenticate = ()=>useContext (AuthenticateContext) ;
