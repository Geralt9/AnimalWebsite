import { Link , useNavigate } from "react-router-dom";

 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import {faPen, faXmark,faHeart, faShare, faCircleXmark, faHouse, faCircleUser, faBookBookmark, faShop} from '@fortawesome/free-solid-svg-icons';
import {faComment, faImages} from '@fortawesome/free-regular-svg-icons';
        
 import { useState , useEffect, useRef } from "react"; 
 import { useAuthenticate} from "./AuthenticateContext";   
 import { useCat } from "./CatsContext";       

import './Posts.css' ;
import CommentCard from "./Components/CommentCard.jsx";
import PostCard from "./Components/PostCard.jsx";

export default  function Posts(){

const{ AuthenticateStatus, setAuthenticate, UserId, setUserId,userIdRef , finalCroppedpfpImage , fetchProfile } = useAuthenticate() ;
const{GetPosts, Posts_content , SetPostContent , /*PostCard,*/     likedPosts, setLikedPosts,ManageLikedPosts, GetLikeData,     PostDetails , setpostDetails,ImagesInter , setimagesInter,
  HandlePostInteract, Postinteract , setPostinteract, ManageComments, Comment_pop , setCommentPop} = useCat();
const [PostPop , setPostPop] = useState(false) ;


const PostContentRef = useRef(null) ;

useEffect(() => {
  //console.log("finalCroppedpfpImage changed:", finalCroppedpfpImage);
}, [finalCroppedpfpImage])

useEffect(()=>{
 
   document.body.style.backgroundColor = '#FFF8E1'  ;

  },[]);

useEffect(() => {
  fetchProfile();
}, []);

/*useEffect(()=>{
 
  },[Posts_content]); */

  //render useEffect

useEffect(() => {
        
       const userId = parseInt(localStorage.getItem('UserId'));
       setUserId(userId);
       GetPosts();
       GetLikeData() ;

}, []);

//--------------------------------------Handle adding a picture in a post--------------------------//

const [PostPicture, setPostPic] = useState([]);
const [PicsPreview , setPicsPreview] = useState([]);
const [imgNumAlert , setimgNumAlert] = useState('');

const MaxImages = 5 ;

function HandleImagePost(e){

        const file = Array.from(e.target.files); //what needs to be sent to the Backend (pics files)

        if(!file) return ;
        const PreviewPics = file.map(element => URL.createObjectURL(element)) ;

       
    setPicsPreview(prev => {
        if (prev.length + PreviewPics.length < MaxImages) {
             setimgNumAlert('')   
            return [...prev, ...PreviewPics]  ;
                
        } else {
            setimgNumAlert('You can only upload up to 4 images.');
            return prev; // don't change the state
        }

    });
        
        setPostPic((prev)=>{
                if(prev.length + file.length < MaxImages){
                        return [...prev , ...file]
                }else { return prev}
       });

}

       //--Get the images for the grid class (Pre-Post) name (Dynamically) --//

        function GetGridClass(){
                
                const count = PicsPreview.length ;
                
        if(count == 1) return "grid single" ;
        if(count == 2) return "grid two" ;
        if(count == 3) return "grid three" ;
        if(count == 4) return "grid four" ; 
                return "grid_maxed"           
        }

        //--Get the images for the grid class (Pre-Post) name (Dynamically) --//

        function GetImageGridClass(imagesCount){
               
                if(imagesCount == 1) return  "Post_Image_Container single" ;
                if(imagesCount == 2) return  "Post_Image_Container two"  ;
                if(imagesCount == 3) return  "Post_Image_Container three" ;
                if(imagesCount == 4) return  "Post_Image_Container four" ;

        }

//---------------------------------------Submitting a post--------------------------------------//
  async function HandleSubmit(){
       
  try {
           const value = PostContentRef.current.value; 
          // SetPosts(value);

        if( value.trim() === '' && PicsPreview.length == 0 ){ return console.log('input something') } 

        const formdata = new FormData()
        formdata.append('User' , UserId);
        formdata.append('Post_Content' , value);
        
        PostPicture.forEach((file)=>(
                formdata.append('images' , file)
        )) ;

       /* const Content = {
                User : UserId, 
                Post_Content : value,

        } */

        const SendPost = await fetch('http://localhost:8080/Api/Posts' , {
                method: 'POST',
               // headers : {'Content-Type' : 'application/json'},
                body: formdata,  //JSON.stringify(Content)
                credentials: 'include'
        });
                
        const Posts_content = await SendPost.json() ;


         if (!SendPost.ok) {
      throw new Error(`HTTP error! status: ${SendPost.status}`);
    }
        
        setPostPop(false)

        } catch (error) {
                console.error(error);
                
        }


  }





useEffect(() => {
  if (Postinteract) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [Postinteract]);


//----------------------Comments Pop Up --------------------------------------------------



//---------------------previous post details code : -------------------------



    return <>
            
         <div className={PostPop ? 'Main_Background' : 'Main_Background_False' } > 
          <div className={PostPop ? 'Pop_Up' : 'Pop_Up_False' }> 

                <div className="Post_Title" > Share with the community </div>
                <button className="Close_Pop" onClick={ (e)=> {setPostPop(false) ; setPicsPreview([]) } } > <FontAwesomeIcon icon={faXmark} /> </button>

                <textarea className="Post_Input" placeholder="What s on your mind ?" ref={PostContentRef} />  

                 <input type="file" multiple accept="image/*"  id="PostPic" style={{display : "none"}}  onChange={ (e) => HandleImagePost(e)}  />
                 <label htmlFor="PostPic" className={PicsPreview ? "Image_upload" : "Image_upload_after"}  onClick={(e)=> HandleImagePost(e)} >  <FontAwesomeIcon icon={faImages} /> </label>       


                 <div className={GetGridClass()} >
                     {PicsPreview.map((urls , index)=> (

                           <div  key={index} className="Grid-image-wrapper" >

                                <img  src={urls} alt={`pic-${index}`} />

                          </div>

                        ))}
                </div>


                <button className= {PicsPreview ? 'Create_Post' : 'Create_Post_after'} onClick={ HandleSubmit} > Post </button> 
                <div className="image_upload_error" > {imgNumAlert} </div>
                        
          </div>
         
         
         </div> 



            <section className="Header" >Header</section>

            <section className="Left_Navigation"> 
                  
                 <div className="Home_Link" > <Link to= '/' > <FontAwesomeIcon icon={faHouse} /> Home</Link> </div> 
                  <div> <Link to='/Profile' > <FontAwesomeIcon icon={faCircleUser} /> Profile </Link> </div> 
                     <div>  <FontAwesomeIcon icon={faBookBookmark} /> Animal Wiki  </div>    
                    <div> <FontAwesomeIcon icon={faShop} /> Shops  </div>  
            </section>

            <section className="Ads_box" > 
                        
              <img src='../Icons_Images/PetAd.jpg' />
               <img src='../Icons_Images/PetAd2.jpg' />

             </section>

            <section className="Posts" >

                    <div className="Post_Body" onClick={ (e)=> setPostPop(true)} > What s on your Mind ? <FontAwesomeIcon className="Pen_Icon" icon={faPen} />  </div>
               

                                    <section className="Posts_inside">

                    {Posts_content.map((Element , i) => 

                                <div className="Each_Post" key={i}> 

                                     <div className="Profile_details">
                                        
                                          <div className="Image_cont_post" > <img className="Image" src={Element.pfp_img} /> </div>     
                                          <div className="Profile_name"> {Element.FullName} </div> 
                                          <div className="Post_date" > {new Date(Element.post_created_at).toLocaleString()} </div>

                                     </div>

                                     <div className="Post_content" > {Element.content} </div>
                                     
                                     {Element.images && (() => {
                                                 const imagesArray = Element.images.split(',');
                                                 const imagesCount = imagesArray.length; //  Number of images

                                                         return (
                                                                
                                                         <div className={GetImageGridClass(imagesCount)} > 
                                                                
                                                      { imagesArray.map((imgUrl, index) => (
                                                                <div  
                                                                className= "Images_Wrapper"
                                                                  key={index}
                                                                   >
                                         <img className="Post_Image" style={{cursor : 'pointer'}} onClick={ (e) => HandlePostInteract(Element.post_id)}  src={imgUrl} alt={`post_image_${index}`} />
                                                                 </div>
                                                        
                                                             )) } </div>  )
                                                          })()}

                                     <div className="Post_likes_comments_share" >
                                                                         
                                                <div className="Likes"  onClick={ (e)=>  ManageLikedPosts(Element.post_id) } > <FontAwesomeIcon icon={faHeart}  className={likedPosts[Element.post_id] ? 'Liked' : 'Unliked' }  /> &nbsp; Like </div>
                                                <div className="Comments" onClick={(e) =>{ ManageComments(Element.post_id ) ; fetchProfile()  } } >  <FontAwesomeIcon  icon={faComment} /> &nbsp; Comment </div>
                                                <div className="Share" ><FontAwesomeIcon  icon={faShare} />&nbsp; Share  </div>
                                     </div>
                                      
                                        {/*Element.content*/}
                                </div>
                 )}

          </section>   


            </section>

                {Comment_pop && PostDetails &&  <> <CommentCard Name = {PostDetails.Username} Image = {PostDetails.pfp} UserImg ={finalCroppedpfpImage} date = {new Date(PostDetails.post_details[0].created_at).toLocaleString()} 
                PostImgs = {ImagesInter} Liked={likedPosts[PostDetails.post_details[0].post_id]} onLike={() => ManageLikedPosts(PostDetails.post_details[0].post_id)} 
                 Content = {PostDetails.post_details[0].content}  onImageClick={() => HandlePostInteract(PostDetails.post_details[0].post_id)} 
                 UserId = {UserId} PostId = {PostDetails.post_details[0].post_id}  />  
                
                 <button  className="closeInterpop" onClick={(e) => setCommentPop(false)} > <FontAwesomeIcon icon={faCircleXmark} /> </button> </>
                }


            {/*---------------------------------------------------------------Posts inspection Pop Up-------------------------------------------------------------*/}
   
                                
                { Postinteract && PostDetails && <> <PostCard key={finalCroppedpfpImage}  UserId={UserId} userName={PostDetails.Username}  Pictures = {ImagesInter} Profile_pic = {PostDetails.pfp}
                Text = {PostDetails.post_details[0].content} CreatedAt ={new Date(PostDetails.post_details[0].created_at).toLocaleString() } 
                Like = { () => ManageLikedPosts(PostDetails.post_details[0].post_id)} Liked={likedPosts[PostDetails.post_details[0].post_id]} PostId ={PostDetails.post_details[0].post_id}  UserImg ={finalCroppedpfpImage}  />  
                
                   <button className="closeInterpop" onClick={(e) => setPostinteract(false)} > <FontAwesomeIcon icon={faCircleXmark} /> </button> </>}

    </>
}