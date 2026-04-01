import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import './App.css';

import {useCat} from './Pages/CatsContext.jsx'
import { useAuthenticate } from './Pages/AuthenticateContext.jsx';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPaw, faQuestion,faCircleUser, faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';



function App() { 
 
 const {page , Setpage,limit, Setlimit,Images , setImages, breeds ,
  setBreeds,BarState , setBarState,Search , setSearch, load,FilteredBreed,Getinfo,  } = useCat()

 const{AuthenticateStatus, setAuthenticate,Logout, PopUp, setPopUp } = useAuthenticate();
  
 const DropDown = useRef(null)
 const Iconref = useRef(null)

 useEffect(() => {
  //setAuthenticate(false)
  //console.log('Auth status changed:', AuthenticateStatus);

}, [AuthenticateStatus]);

  useEffect(()=>{
    document.body.style.backgroundColor = '#FFF8E1'
  },[])

  useEffect(()=>{ 
    load();
   // console.log(AuthenticateStatus)
  },[page,limit]);


function HandleClickOutside(e){
  if(DropDown.current && !DropDown.current.contains(e.target) && !Iconref.current.contains(e.target)){
    setPopUp(false);
  }
}

  useEffect(()=>{
    if(PopUp){
      document.addEventListener('mousedown' , HandleClickOutside);
    }else{
      document.removeEventListener('mousedown', HandleClickOutside)
    }

    return()=>{document.removeEventListener('mousedown', HandleClickOutside)}
  },[PopUp])

//--------------------------------------------------------------

 


  return (
    <>

   <section className='header' >

      <div className='Logo' > Cat Wiki &nbsp; <FontAwesomeIcon icon={faPaw}  /> </div>


      <section className='Search_mainCont' onBlur={()=> setBarState(false)} >

        <input className='Search' onFocus={()=> setBarState(true)}   onChange={(e)=>{ setSearch(e.target.value) }} value={Search}  placeholder='Search for cats ...' />

       {BarState ? <div className='Drop_down' onMouseDown={(e) => e.preventDefault()} > {FilteredBreed.map((element,i)=>(
          
          <div className='cat_breeds' onClick={ ()=> Getinfo(element)} key={i}> 

           <Link to={"/Info"}> {element.cat_id} </Link>
          
          </div>

        ))} </div> : null}   

  </section>

                      {/*-------------------------User / authebnticated code -------------------------------*/}

 {AuthenticateStatus ?  <section className='Profile_preferences'>  <FontAwesomeIcon icon={faCircleUser} onClick={(e)=> setPopUp(!PopUp) }  ref={Iconref}/>  </section>  :   <div className='Sign_Log' > 

  <Link to="/Sign_Up" target="_blank" rel="noopener noreferrer" >

              <button className='Sign_in'>Sign Up</button>
  </Link>

            <Link to="/Log_In"  target="_blank" rel="noopener noreferrer">
              <button className='Log_in'>Log In</button>
            </Link>

  </div> }

{PopUp ? <div className='DropDown' ref={DropDown} >
  
<Link to="/Profile" className='Profile_Link'> <div className='Profile' >    Profile </div> </Link> 

    <div className='Log_Out' onClick={Logout} >  Log Out &nbsp; &nbsp;   <FontAwesomeIcon icon={faArrowRightFromBracket} /> </div>
</div> : null}

   </section>



 {/*         <section className='Images_container'>  
        
        {breeds.map((element, i)=>(

          <div className={`Image${i}`} id='Image'  key={i}  >
          
           <img  src ={`https://cdn2.thecatapi.com/images/${element.Image_url}.jpg`} />

          <button className='get_info' onClick={ ()=> Getinfo(element) } >  <Link className='logo_container' to={'/Info'} >  <FontAwesomeIcon icon={faQuestion} />  <FontAwesomeIcon icon={faPaw} /> </Link> </button> 

          </div>

        ))}


        </section>  */}


      {/*-------------------------------new front page styling //--------------------------------------------*/}

          <section className='First_Container' > 

              <div className='Top-wave'/> 

              <div className='Text_element'>

                    <div className='title'> 🐾 Discover the World of Cats </div>

                    <div className='description' > Your ultimate feline companion guide — explore breeds, behaviors, care tips, and adorable facts all in one place! </div>

                    <div className='title2' >🐾 Cat Tip</div>
                    <div className='description2'> Cats love vertical space!
                    Give your cat shelves, trees, or window perches so they can climb, observe, and feel secure. It's great for their confidence and curiosity! </div>

              </div>

              <div className='ImagesContainer'>

              <div className='Image1_container'>
              <img className='Image1' src='https://cdn.mos.cms.futurecdn.net/v2/t:0,l:240,cw:1440,ch:1080,q:80,w:1440/KHQb3Ny62YxXnCEon4mm43.jpg' />

              </div>        

                 <FontAwesomeIcon icon={faPaw} className='Paw' />
                 <FontAwesomeIcon icon={faPaw} className='Paw2' />
                 <FontAwesomeIcon icon={faPaw} className='Paw3' />

              <div className='Image2_container'>
              <img className='Image2'  src='https://getodie.com/wp-content/uploads/2024/06/close-up-beautiful-pet-cat-1-scaled.jpg' /> 
              </div>

            </div>


          </section> 

          <section className='Second_Container' > 

          <div className='Pet_image_container'>
            <img className='Pet_image'  src='../Icons_Images/PetAnimal2.png' /> 
          </div>

            <div className='Second_wave_container' >
                <div className='Second_wave' />          
             </div>   
                 
              <div className='Image_leaping_Container' >
                     <img className='Leaping_cat' src='../Icons_Images/gearalt_cat.png' />
              </div>

                            <div className='Text_element'>

                    <div className='title_2'>  Join our community </div> 
                    <div className='description_2'> 🦴 Connect with cat lovers from around the world — share stories, ask for advice, exchange care tips, and celebrate the joy of feline friendship together. </div>  


                             </div>



  {AuthenticateStatus ? <Link to = '/Posts'  rel="noopener noreferrer" > <button className='Check_Posts'> Check Posts </button> </Link>  : <Link to = '/Sign_Up'  rel="noopener noreferrer" > <button className='Check_Posts'>  Sign Up   </button>  </Link>  }
       
             
                              <FontAwesomeIcon icon={faPaw} className='Paw_' />
                              <FontAwesomeIcon icon={faPaw} className='Paw_2' />
                              <FontAwesomeIcon icon={faPaw} className='Paw_3' />

          </section>


    </>
  )
}

export default App
