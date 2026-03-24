import { useState, useRef, useContext ,createContext, useEffect, children } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPen, faXmark,faHeart, faShare, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {faComment, faImages} from '@fortawesome/free-regular-svg-icons';

import CommentCard from "./Components/CommentCard.jsx";


const Catcontext = createContext();



export const InfoContext = ({children})=>{


    const [page , Setpage] = useState(1);
    const [limit, Setlimit] = useState(10);
  
    
    const [breeds , setBreeds] = useState([]); 
    const [BarState , setBarState] = useState(false); 

    const[ID,setID]= useState('') ;
    const[Description,setDescription]= useState("") ;
    const [Catimage, setCatImage] = useState("");

    const [Search , setSearch] = useState("") ;

//---------------------------state management for posts------------------------------------
  const [Posts_content , SetPostContent] = useState([]) ;


//-----------------------------------------------------------------------------------------

     async function load (){
   
      try { 
  
        const response = await fetch(`http://localhost:8080/Cats/Images?limit=${limit}&page=${page}`)
  
        const received = await response.json();
        const db_Table = received.data_rows;  
        
       // console.log(received.data_rows);
        setBreeds(db_Table);

        Setpage(received.page);
        Setlimit(received.limit); 
        
        
  
  
      } catch (error) {
          console.log('error') ;
      }
  
  }
  
//------------- getting the image id and description -----------

  function Getinfo(element){

    setDescription(element.description);
    setID(element.cat_id)
    setCatImage(element.Image_url);
    setBarState(false)
     
  }
  
  const FilteredBreed = breeds.filter( (element)=>element.cat_id.includes(Search.toLowerCase()) );

  //--------------------------------Receiving Posts ------------------------------------

    async function GetPosts(){
      try {

        const response = await fetch('http://localhost:8080/Api/Posts/Feed' , {
          method: 'GET',
          credentials : 'include'
        });

        const Post_Content = await response.json();
        
        //const Content = Post_Content.Content.map(element => element.content);
        //console.log(Post_Content.post_elements);
        
        SetPostContent(Post_Content.post_elements);
        


        if(!response.ok){

            console.log('Error, Response not received in /Feed')

        }

      } catch (error) {

          console.error(error) ;

      }
    }

//-------------------------------------Handle post interaction / Comments / pop up/ data----------------------------
      const [Postinteract , setPostinteract] = useState(false) ;
      const[PostId , setPostId] = useState() ;

  const[PostDetails , setpostDetails] = useState();
  const[ImagesInter , setimagesInter] = useState([]) ;
 


// optional helper for safety
const parseImages = (images) =>
  (images || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

const controllerRef = useRef(null);

async function loadPost(id, { openInteract = false, openComments = false } = {}) {
  // abort any previous request
  if (controllerRef.current) controllerRef.current.abort();
  const controller = new AbortController();
  controllerRef.current = controller;

  if (openInteract) setPostinteract(true);
  if (openComments) setCommentPop(true);

  setPostId(id);
  setimagesInter([]); // clear previous images

  try {
    const res = await fetch(`http://localhost:8080/Api/Posts/Post_data/${id}`, {
      method: "GET",
      credentials: "include",
      signal: controller.signal,
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    setpostDetails(data);

    const imgs = parseImages(data?.post_details?.[0]?.images);
    setimagesInter(imgs);
  } catch (err) {
    if (err.name !== "AbortError") console.error(err);
  } finally {
    controllerRef.current = null;
  }
}

// new simpler handlers
const HandlePostInteract = (id) => loadPost(id, { openInteract: true }); 
const ManageComments = (id) => loadPost(id, { openComments: true }); 



 //-------------------------------------Manage Liking a Post-----------------------------------------------


 const [likedPosts, setLikedPosts] = useState({});  

  async function ManageLikedPosts(Post_id) {

        try {

                const Likes_Response = await fetch( `http://localhost:8080/Api/Posts/Post_data/Likes/${Post_id}` ,{
                        method : 'POST',
                        credentials : 'include'
                });

                const Response = await Likes_Response.json() ;
             //  console.log(Response.LikeStatus) ;   //Response.Likes[0]
                
                        setLikedPosts(prev => ({
                                ...prev,
                        [Post_id]: Response.LikeStatus // update only this post
                        }));

              

        } catch (error) {
                console.error(error) ;
        }
  }
  //---------------------Get Likes Status---------------------------------------------

  async function GetLikeData() {

        try {
                const response = await fetch('http://localhost:8080/Api/Posts/Post_data/LikesData' , {
                        
                        method : 'GET',
                        credentials : 'include',
                })

                const LikesResponse = await response.json();
               // console.log(LikesResponse) ;

                      const likedMap = {};
      LikesResponse.LikesId.forEach(id => {
        likedMap[id] = true;
      });

      setLikedPosts(likedMap);

        } catch (error) {
                console.error(error)
        }
  }

    //----------------------------------comments management------------------------------------------


const [Comment_pop , setCommentPop] = useState(false) ;

//------------------------------------Managing Comment likes----------

  const [commentLikes, setCommentLikes] = useState({});



    async function HandleLikeComment(commentId , UserId) {

    try {
      
      await LikeComment({userId : UserId , commentId : commentId}) ;

    } catch (error) {
      console.error(error)
    }

  }
  
  async function LikeComment({userId , commentId}){
      
      try {

        const Like_response = await fetch(`http://localhost:8080/Api/Comments/Likes` , {

            method : 'POST',
            credentials : 'include',
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({
              userId : userId,
              commentId : commentId

            })

        })

        const response = await Like_response.json() ;

        setCommentLikes( prev =>({
            ...prev, [commentId] : response.Liked 
        }))
       

        GetCommentsLikes() ;

      } catch (error) {
        console.error(error) ;
      }

    }

      async function GetCommentsLikes (){ //{userId , commentId}

        try {
          
          const GetCommentsLikes = await fetch(`http://localhost:8080/Api/Comments/Likes/data/${PostId}` ,{
            method : 'GET' ,
            credentials : 'include',
          })

          const CommentLikesResponse = await GetCommentsLikes.json() ;

           const map = {};
           CommentLikesResponse.likedCommentIds.forEach(id =>{
            map[id] = true ;
           })

           setCommentLikes(map)

          //console.log(map)

        } catch (error) {
          console.error(error) ;
        }

      }


  //----------------------------------------------------------------------------------------------


    return ( <Catcontext.Provider value={{page , Setpage,limit, Setlimit, breeds ,
         setBreeds,BarState , setBarState,Search , setSearch, load,FilteredBreed,Getinfo ,Description,setDescription,ID,setID,Catimage, setCatImage,GetPosts, Posts_content , SetPostContent,
         /*PostCard,*/ likedPosts, setLikedPosts, ManageLikedPosts,GetLikeData, PostDetails , setpostDetails, ImagesInter , setimagesInter, HandlePostInteract, Postinteract , setPostinteract,  ManageComments,
        Comment_pop , setCommentPop, LikeComment , GetCommentsLikes, commentLikes, setCommentLikes, HandleLikeComment }} > {children} </Catcontext.Provider> )

}

export const useCat = ()=>useContext(Catcontext) ;
