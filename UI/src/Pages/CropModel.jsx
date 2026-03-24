import { Link , useNavigate } from "react-router-dom";

 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import {faX } from '@fortawesome/free-solid-svg-icons';
 import{useState , useEffect, useRef} from 'react';
 
 import ReactCrop, { centerCrop, makeAspectCrop, convertToPixelCrop } from 'react-image-crop';
 import 'react-image-crop/dist/ReactCrop.css';
 import setCanvasPreview from "./setCanvasPreview.js"; 

 import './CropModel.css'
 


export default function Modal ({isOpen , onClose,setUpdatedPfp}){

    if (!isOpen) return null;


//-----------------------------------------------------------------------------

const ASPECT_RATIO = 1 ;
const MIN_DIMENSION = 150; 


const [ProfilePic , setProfilePic] = useState();
const [File , setFile] = useState() ;
const [crop , setCrop] = useState() ;
const [Error , setError] = useState('') ;

const ImgRef = useRef() ;
const previewCanvasRef = useRef(null)



 function handleImageUpload(e){
 
  const UploadedFile = e.target.files[0]; 
  if(!UploadedFile) return ;
  
  setFile(UploadedFile) ;

  const reader = new FileReader();

  reader.onload = ()=>{

      const ImageUrl = reader.result
      setProfilePic(ImageUrl);

       const img = new Image() ;
       img.src = ImageUrl ;

      img.onload = ()=>{
        
        if(Error){setError("")}
        
        const {naturalWidth , naturalHeight} = img;

        

        if(naturalWidth < MIN_DIMENSION || naturalHeight< MIN_DIMENSION){
            setError("Image should be bigger than 750 x 750") ;
            console.log(Error)
            return setProfilePic("") ;
        }

      }

  }

 reader.readAsDataURL(UploadedFile) ;

      

 } 

 function HandlImageLoad(e){
      const {width , height} = e.currentTarget ;
      const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
     
    const Crop = makeAspectCrop({
         unit : '%',
         width : cropWidthInPercent,
         height ,
    },
      ASPECT_RATIO,
      width,
      height
    ) ; 
      const centeredCrop = centerCrop(Crop , width , height) ;
      setCrop(centeredCrop);
 }


    return <>

      <main className={isOpen ? 'Modal_Main_Container' : 'Modal_Main_Container_Before'}> 

       <section className="Cropper_Container" >       

         <button className="CloseModal" onClick={ onClose }> <FontAwesomeIcon icon={faX} /> </button>


                      <input type="file"
                              accept="image/*" 
                              id="PFP" 
                             style={{display : "none"}}
                              onChange={ (e) => handleImageUpload(e)} 

                      />

                     < label htmlFor="PFP" className={ProfilePic ? 'BG_Upload_label_after' : 'BG_Upload_label' } > Upload Profile Picture </label>    

  <div> {Error} </div>

{ProfilePic &&
              <>   
                <ReactCrop

                    className="Crop_Container"
                    crop={crop}
                    onChange={(pixelCrop , percentCrop)=>setCrop(percentCrop)} 
                    
                    circularCrop
                    keepSelection
                    aspect={ASPECT_RATIO}
                    minWidth={MIN_DIMENSION}
                 
                    
                >
                       
                        <img src={ProfilePic} className="Uploaded_Img"  onLoad={HandlImageLoad}  ref={ImgRef} />
                     
                </ReactCrop>

                  <button className="Crop_Button" onClick={()=>{
                    setCanvasPreview(

                            ImgRef.current, // HTMLImageElement
                                          previewCanvasRef.current, // HTMLCanvasElement
                                          convertToPixelCrop(
                                            crop,
                                            ImgRef.current.width,
                                            ImgRef.current.height
                                          )
                    );
                    const dataUrl = previewCanvasRef.current.toDataURL();
                     setUpdatedPfp(dataUrl) ;
                     setProfilePic(null);
                     

                  }} > Apply Crop </button>

                  <canvas className="Preview_Box"   ref={previewCanvasRef}
          
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}  />

                </>
                }


                     </section> 

          </main>


            

    </>
   
}


