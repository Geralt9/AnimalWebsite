  import { Link , useNavigate } from "react-router-dom";

 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import {faPen, faX, faImage,faCamera,faUser, faPlus } from '@fortawesome/free-solid-svg-icons';
 import imageCompression from 'browser-image-compression';
 
 import './Profile.css'
 import { useAuthenticate } from './AuthenticateContext.jsx';
 import { useEffect, useState, useRef } from "react";
 import ReactCrop, { centerCrop, makeAspectCrop, convertToPixelCrop } from 'react-image-crop';
 import 'react-image-crop/dist/ReactCrop.css'; 
 

import Modal from "./CropModel.jsx";
import setCanvasPreview from './setCanvasPreview.js'


export default function Profile(){
  
 const{ AuthenticateStatus, setAuthenticate, UserId, setUserId,userIdRef,  fetchProfile, finalCroppedpfpImage , setfinalCroppedPfpImage , 
  finalCroppedBgImage , setfinalCroppedBgImage,UserName, setUsername   } = useAuthenticate() ; 

  
  const Aspect_Ratio = 16/9;
  const containerWidth = 100;
  

  const [UpdatedProfilePic , setUpdatedPfp] = useState(null) ;
  const [updatedBG , setUpdatedBG] = useState();

  const [compressedPfp, setCompressedPfp] = useState(null);
  const [compressedBG, setCompressedBG] = useState(null);






useEffect(() => {
  if (compressedPfp || compressedBG) { 
    Profile_Api();
  }
}, [compressedPfp, compressedBG])
//-------------------------------------------------------------

useEffect(() => {
  if (UpdatedProfilePic) {
    compressBase64ToFile(UpdatedProfilePic).then(setCompressedPfp);
  }
  
}, [UpdatedProfilePic]);

useEffect(() => {
  if (updatedBG) {
    compressBase64ToFile(updatedBG).then(setCompressedBG);
  }
}, [updatedBG]);

  //------------------------------------Sending the Profile img and BG img to the backend---------------------------------------------//


async function compressBase64ToFile(base64, quality = 0.6) {
  const res = await fetch(base64);
  const blob = await res.blob();

  const file = new File([blob], 'image.jpg', { type: blob.type });

  const compressedFile = await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    initialQuality: quality,
  });

  return compressedFile; // 👈 return the compressed file, not base64
}

    async function Profile_Api(params) {
       try {

      //  const Profile_elements = {Background_Img : compressedBG , Profile_Img : compressedPfp }

          const formData = new FormData();
        formData.append('profile_img', compressedPfp);
        formData.append('background_img', compressedBG);
    
    

          const Profile_fetch = await fetch('http://localhost:8080/Api/Upload' , {
            method : 'POST',
            credentials : 'include',
            body: formData
          })

    const response = await Profile_fetch.json() ;   
     
      localStorage.setItem('images', JSON.stringify({
      profilePic: response.ProfilePic,
      backgroundPic: response.BackgroundPic
    }));
 
        setfinalCroppedBgImage(response.BackgroundPic) ;  
        setfinalCroppedPfpImage(response.ProfilePic) ; 

        } catch (error) {
          console.error(error);
          console.log('An error has occured while sending the profile  ')
        }
    }




  //---------------------------------------------------------------------------------------------------------------------------------//

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const [ModalState , setModalState] = useState(false);
  
  const [BGPop, setBGPop] = useState(false);
  

  const containerRef = useRef(null);
  
  const[BackgroundPic , setBackgroundPic] = useState(null);
  

  const [selectedFile , setSelectedFile] = useState(null);  
  
  const [imageType , setImageType] = useState('') ;

    const containerHeight = containerRef.current?.offsetHeight || window.innerHeight;
    const heightPercent = (30 * window.innerHeight / containerHeight);


    const[Crop , setCrop] = useState({

        unit: '%',
        x: 0,
        y: 0,
        width: 100, // 100% width
        height: 100, // Dynamic % equivalent of 30vh
    
      });

    //-----------------------------------Sending Bio details /Post / Get-----------------------------------------------------------------

  const[ProfileBio, setProfileBio] = useState(false);
  const[BioText , setBioText] = useState('');
  const[Bio, setBio] = useState();
  const[BioAlert , setBioAlert] = useState(false);

      async function ModifyBio(e) {

        try {

         if(BioText === '' ){  console.log('need to input something')} else{
  
            const Biofetch = await fetch('http://localhost:8080/Profile/Bio' , { 
              method : 'POST',
              credentials : 'include',
              headers: {'Content-Type' : 'application/json'},
               body: JSON.stringify({Bio_text : BioText})
            })


            setBioAlert((prev)=>{return !prev}) ;
            setProfileBio(false);


           // console.log(response.Bio_data.Bio);

}

        } catch (error) {

          console.error(error);

        }
      }
                  //-------------------------Get Bio for each user --------------------   

   async function GetBio() {

        try {

          const BioRequest = await fetch('http://localhost:8080/Profile/GetBio' , {
            method : 'GET',
            credentials : "include"
          })
               
          const response = await BioRequest.json() ;

                      const Biodata = response.Bio_data.Bio; 
               const Bio_Update_Date = response.Bio_data.updated_at; 

 
            setBio(Biodata);

        } catch (error) {
          console.error(error) ;
        }

      }              


      useEffect(()=>{
        GetBio() ;
      },[BioAlert])

//--------------------------------------------Send Pet Card info  --------------------------------------------------------------------------  

  const [petImage, setPetImage] = useState();
  const [UploadedPetdetails , setUploadedPet] = useState() ;
  const [ModifiedAlert , setModified] = useState(false) ;

      function HandlePet_image_upload(e){

          const file = e.target.files[0];

          if (file) {
      //const FileUpload = URL.createObjectURL(file); for preview only
      setPetImage(file);
      
           }

      }

  async function HandlePetCard() {
      try {

       if(!petImage){  return ;}
        const formdata = new FormData();
        formdata.append('PetImage' , petImage );
        const PetCard = await fetch('http://localhost:8080/Pet/Card' , {
            method : 'POST', 
            body : formdata,
            credentials: "include"
        });
        
        
        setModified((prev)=> {
          return !prev ;
        });

      } catch (error) {
        console.error(error)
      }
  };   
  
useEffect(()=>{
  HandlePetCard();
  
}, [ petImage]);

                //--------Get the pet Image -----------

    async function GetPetImage() {

      try {

          const PetImage = await fetch('http://localhost:8080/Profile/Pet',{
            method : 'GET',
            credentials : "include",

          });

          const response = await PetImage.json();

              if (response.PetImgUrl) {
      setUploadedPet(response.PetImgUrl);

      // persist in localStorage
      localStorage.setItem("petImage", JSON.stringify(response.PetImgUrl));
    }

      } catch (error) {
        console.error(error) ;
      }

    }

    useEffect(()=>{
      GetPetImage()
    },[ModifiedAlert , petImage])



//---------------------------------------------------getch profile------------------------------------------------------------------------- 



    useEffect(()=>{
        GetPetForm() ;
        fetchProfile();

        document.body.style.backgroundColor = '#0047AB'

        return () => {
            document.body.style.backgroundColor = ''; // Reset when component unmounts
          };

    }, [])


    useEffect(()=>{
        if(UpdatedProfilePic){
          setModalState(false)
        }

    },[UpdatedProfilePic])


    function HandleClosingModal  (){
      if(UpdatedProfilePic){setModalState(false)}

      setModalState(false) ;
      
    }


    const HandleLoadedBG = (e) => {

      const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
      const container = containerRef.current;
      
      if (!container) return;
    
      const containerHeight = container.offsetHeight;
      const containerWidth = container.offsetWidth;
      
       const crop = makeAspectCrop(
        {
          unit : "%",
          width : 100, 
          height :100
        },
        width / height,
        containerWidth,
        containerHeight
       )
       setCrop(crop);

    };

     function handleImageUpload(e , type){ 
    
            const file = e.target.files[0] ;
            
            if(!file) return ;
            setSelectedFile(file) ;
            setImageType(type);
    
            const reader = new FileReader();
    
            reader.onload = ()=>{
    
              setBackgroundPic(reader.result)

           }
    
         reader.readAsDataURL(file); // reads the file element and converts it to base64-encoded
    
    
        }

        function handleBGPop(e){
          e.preventDefault() ;
          setBGPop(true);
        }

     {/*-------------------------------------Handle form ---------------------------------------------*/}   

        const [formState , setFormState] = useState(false) ;
        const [formError,setFormError] = useState('') ;

        const [formData , setFormData] = useState({
          'Name' : "",
          'Breed' : "",
          'Age' : "",
          'Sex' : ""
        })

        function HandleformChange(e){
          setFormData({ ...formData , 
            [e.target.name] : e.target.value})
        }

       async function handleFormSubmit(e){

         e.preventDefault() ;

          try {

            if(Object.values(formData).some(value => value === '' )){
              setFormError(' One of the fields is Missing ') ;
            }else{

            const Formfetch = await fetch('http://localhost:8080/Api/pet/form' , {
              method : 'POST',
              credentials : 'include',
              headers: { "Content-Type": "application/json" },
              body : JSON.stringify(formData) 
            })
              GetPetForm()
              setFormState( (prev) =>{ return !prev } );
}
          } catch (error) {
            console.error(error);
          }

        }



          {/*-----------------------Get form --------------------------*/}
      const [Pet_Details , setPetData] = useState()

        async function GetPetForm() {

          try {

            const response = await fetch('http://localhost:8080/Api/pet/Getform' ,{
               method : 'GET',
               credentials : "include",
            })

            const response_data = await response.json() ;
            setPetData(response_data.petDetails[0]) ;
            //console.log(response_data.petDetails[0]);

          } catch (error) {
            console.error(error)
          }

        }


     {/*-------------------------------------------------------------------------------------------------------*/}   



    return  <>

{/* --------------------------------Modal for Profile crop------------------------------------------ */}

{ ModalState &&

    <Modal isOpen ={ModalState} 

           onClose ={HandleClosingModal} 
           setUpdatedPfp={setUpdatedPfp}  />
        
}





<section className={ `BG_CropPopUp ${BGPop ? 'Visible' : 'Hidden'} ` }> 

      
      <div className= {BGPop ? 'Container_Crop' : 'Container_Crop_Before' } ref={containerRef} >  

      <button className="closePopUp" onClick={(e)=> {setBGPop(false) ; setBackgroundPic(null) }} > <FontAwesomeIcon icon={faX} /> </button>

            <input type="file"
                      accept="image/*" 
                      id="BG" 
                     style={{display : "none"}}
                      onChange={ (e) => handleImageUpload(e , 'Background')}
                        />

                < label htmlFor="BG" className= {BackgroundPic ? 'BG_Uploaded_label' : 'Bg_non_uploaded_label' } > Upload Image </label>  

                { BackgroundPic && 

             <section className="BG_Crop_element" >

            <ReactCrop

            crop={Crop}
            onChange={( pixelCrop , percentCrop )=> setCrop(percentCrop)}

            ruleOfThirds // Shows helpful composition grid
            style={{ width: '100%', height: '100%' }}

            locked={true}             
            disabled={false}
          >
             <img src={BackgroundPic}  className="BackgroundUpload" onLoad={ HandleLoadedBG} style={{ display: 'block', maxWidth: '100%' }} ref={imgRef} /> 
             
           </ReactCrop>

                  <button className="ApplyCrop" onClick={() => {

              setCanvasPreview(
                imgRef.current, // HTMLImageElement
                previewCanvasRef.current, // HTMLCanvasElement
                convertToPixelCrop(
                  Crop,
                  imgRef.current.width,
                  imgRef.current.height
                )
              );
              const dataUrl = previewCanvasRef.current.toDataURL();
              setUpdatedBG(dataUrl);
              setBackgroundPic(null);
              setBGPop(false);

            }} > Crop Image </button>

               <canvas className="Preview_Box"   ref={previewCanvasRef}
          
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}  />

               </section>

              }    
          
       </div>

</section>



{/* ---------------------------------------------Backgrtound image after / before upload------------------------------------------------------------- */}

    <main className="main_cont" > 

    <div className="Background_Image" >

    <FontAwesomeIcon icon={faImage} className={finalCroppedBgImage ? 'HiddenBgSilouhette' : 'BgSilouhette'} />

    <button className='AddBG' onClick={(e)=> handleBGPop(e)} >  <FontAwesomeIcon icon={faCamera} />  </button>   

    <img src={finalCroppedBgImage}  className="BackgroundUpload" onLoad={ HandleLoadedBG} style={{ display: 'block', maxWidth: '100%' }} ref={imgRef} />

    </div>


    {/*-------------------------------------------------------------Profile Pic portion--------------------------------------------------------------------------------------*/}

                    <div className="Pfp"> 

                  { finalCroppedpfpImage ? 
                   <img className="Default_Pfp" src={finalCroppedpfpImage} />  : <img className="Default_Pfp"   src="https://cdn.vectorstock.com/i/1000v/95/56/user-profile-icon-avatar-or-person-vector-45089556.jpg" />
                  }
                   
                   <FontAwesomeIcon icon={faPen} className="ModifyPfp" onClick={ (e)=> setModalState(true)} />

                    </div>

  {/*-------------------------------------------------------------Profile Pic portion-----------------------------------------------*/}
                  
            <section className="Profile_details1" > 

                  <div className="Bio"> <div className="Bio_Title" > About / Bio </div> 

                  {ProfileBio ? <div> <textarea className="Bio_text" value={BioText} onChange={ (e)=> setBioText(e.target.value)} />  <button className="Save_bio" onClick={ (e)=> ModifyBio(e) } > Save </button> </div> :  <div className="Text_Bio_Container" > {Bio}
                     
                     <button className="Edit_Bio" onClick={ (e) => setProfileBio(true)} > Edit Bio <FontAwesomeIcon className="Bio_pen" icon={faPen}/> </button>
                     
                      </div>  }
                  </div>

                  <div className="Pet_details"> 

                    

                          <div className="Pet_title"> Pet details : </div>


                          {/*----------------------------Pet Form Area ------------------------*/}
  
                         { formState ?  <form className="Pet_form">

                                {/*Name*/}

                            <label> Name : </label> 
                            <input type="text" name="Name" placeholder="Input your pet's name"  value={formData.Name} onChange={HandleformChange} />

                                {/*Breed  Dynamic APi introduction */ }

                            <label> Breed :</label>
                            <input type="text" name="Breed" placeholder="Enter your pet's breed"  value={formData.Breed} onChange={HandleformChange}  />

                                {/* Age */}

                             <label htmlFor="age">Age (in years) : </label>
                             <input type="number" id="age" name="Age" min="0" max="100"  value={formData.Age} onChange={HandleformChange}  />  

                                {/* sex */}

                              <label>Sex :</label>  

                              <div className="sex_options" >
                               <label> <input type="radio" name="Sex" value="male"    checked={formData.Sex === "male"} onChange={HandleformChange} /> Male </label>
                               <label> <input type="radio" name="Sex" value="female"  checked={formData.Sex === "female"} onChange={HandleformChange} /> Female </label>
                              </div>

                             { formError && <div className="Form_Error" style={{color : 'red'}} > {formError} </div> }
                              <button className="Submit_Pet_Card" onClick={ (e) => handleFormSubmit(e)} > Save </button>
                              <button className="Cancel_Pet_Card" onClick={ (e) => setFormState(false)} > <FontAwesomeIcon icon={faX} /> </button>

                           </form  > : <div className="form_details" > <div id="Form_title" > Form details : </div>

                              <div id="form_sub_element" > Pet Name : {Pet_Details?.name}  </div>
                              <div id="form_sub_element" > Age : {Pet_Details?.age}  </div>
                              <div id="form_sub_element" > Sex : {Pet_Details?.sex} </div>
                              <div id="form_sub_element" > Breed :{Pet_Details?.breed} </div>

                              <button className="Edit_form_Butt" onClick={ (e)=> {setFormState(true)} } > Edit Pet details </button>

                             </div> }

                          {/*------------------------------------------------------------------------------ */}
                            <div className="pet_image" >  

                                { UploadedPetdetails ? <> <img className="pet-image"  src={UploadedPetdetails} /> </>  : <img className="animal_silhouette"  src="../Icons_Images/Dog.png" /> }
                                <input type="file"
                                       accept="image/*"
                                       id="pet_image"
                                       style={{display : "none"}} 
                                       onChange={(e) => HandlePet_image_upload(e) }
                                         />

                                <label htmlFor="pet_image" className="pet_image_upload" style={UploadedPetdetails && {display:"none"}}  > <FontAwesomeIcon icon={faPlus}  /></label>  
                              
                             </div>

                  
                             {UploadedPetdetails && (
                              
                                <label htmlFor="pet_image" className="pet_image_reupload" >
                                 <FontAwesomeIcon icon={faImage} />
                                </label>

                              )}
                    
                     </div>

                 {/*------------------------------------------------------------- */}
                  <div className="Routes_box"> Routes </div>

               </section>      

               {/*----------------Feed Section----------------*/}

             <section>
                                

              </section>  

 </main>


    </>

 } 


    