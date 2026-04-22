import { useState, useRef, useContext, createContext, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPen, faXmark,faHeart, faShare, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {faComment, faImages} from '@fortawesome/free-regular-svg-icons';

import CommentCard from "./Components/CommentCard.jsx";

const API = import.meta.env.VITE_API_URL;
const POSTS_LIMIT = 10;

const Catcontext = createContext();



export const InfoContext = ({children})=>{


    const [page , setPage] = useState(1);
    const [limit, setLimit] = useState(10);


    const [breeds , setBreeds] = useState([]);
    const [BarState , setBarState] = useState(false);

    const[ID,setID]= useState('') ;
    const[Description,setDescription]= useState("") ;
    const [Catimage, setCatImage] = useState("");

    const [Search , setSearch] = useState("") ;

//---------------------------state management for posts------------------------------------
  const [Posts_content , setPostContent] = useState([]) ;
  const [postsPage, setPostsPage] = useState(1);

//-----------------------------------------------------------------------------------------

     async function load (){

      try {

        const response = await fetch(`${API}/Cats/Images?limit=${limit}&page=${page}`)

        const received = await response.json();
        const db_Table = received.data_rows;

        setBreeds(db_Table);

        setPage(received.page);
        setLimit(received.limit);



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

  async function GetPosts(page = 1){
      try {

        const response = await fetch(`${API}/Api/Posts/Feed?page=${page}&limit=${POSTS_LIMIT}` , {
          method: 'GET',
          credentials : 'include'
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || errData.message || `Request failed (${response.status})`);
        }

        const Post_Content = await response.json();

        if (page === 1) {
          setPostContent(Post_Content.post_elements);
        } else {
          setPostContent(prev => [...prev, ...Post_Content.post_elements]);
        }
        setPostsPage(page);

      } catch (error) {

          console.error(error) ;

      }
    }

//-------------------------------------Handle post interaction / Comments / pop up/ data----------------------------
      const [Postinteract , setPostinteract] = useState(false) ;
      const[PostId , setPostId] = useState() ;

  const[PostDetails , setpostDetails] = useState();
  const[ImagesInter , setimagesInter] = useState([]) ;


// helper: parse comma-separated image string safely
const parseImages = (images) =>
  (images || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

const controllerRef = useRef(null);

async function loadPost(id, { openInteract = false, openComments = false } = {}) {
  if (controllerRef.current) controllerRef.current.abort();
  const controller = new AbortController();
  controllerRef.current = controller;

  if (openInteract) setPostinteract(true);
  if (openComments) setCommentPop(true);

  setPostId(id);
  setimagesInter([]);

  try {
    const res = await fetch(`${API}/Api/Posts/Post_data/${id}`, {
      method: "GET",
      credentials: "include",
      signal: controller.signal,
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP ${res.status}`);
    }

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

const HandlePostInteract = (id) => loadPost(id, { openInteract: true });
const ManageComments = (id) => loadPost(id, { openComments: true });



 //-------------------------------------Manage Liking a Post-----------------------------------------------

 const [likedPosts, setLikedPosts] = useState({});
 const pendingLikes = useRef(new Set());

  async function ManageLikedPosts(Post_id) {
        if (pendingLikes.current.has(Post_id)) return;
        pendingLikes.current.add(Post_id);
        try {

                const Likes_Response = await fetch( `${API}/Api/Posts/Post_data/Likes/${Post_id}` ,{
                        method : 'POST',
                        credentials : 'include'
                });

                if (!Likes_Response.ok) {
                  const errData = await Likes_Response.json().catch(() => ({}));
                  throw new Error(errData.error || `HTTP ${Likes_Response.status}`);
                }

                const Response = await Likes_Response.json() ;

                        setLikedPosts(prev => ({
                                ...prev,
                        [Post_id]: Response.LikeStatus
                        }));

        } catch (error) {
                console.error(error) ;
        } finally {
          pendingLikes.current.delete(Post_id);
        }
  }
  //---------------------Get Likes Status---------------------------------------------

  async function GetLikeData() {

        try {
                const response = await fetch(`${API}/Api/Posts/Post_data/LikesData` , {

                        method : 'GET',
                        credentials : 'include',
                })

                if (!response.ok) {
                  const errData = await response.json().catch(() => ({}));
                  throw new Error(errData.error || `HTTP ${response.status}`);
                }

                const LikesResponse = await response.json();

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
  const pendingCommentLikes = useRef(new Set());


    async function HandleLikeComment(commentId , UserId) {
    if (pendingCommentLikes.current.has(commentId)) return;
    pendingCommentLikes.current.add(commentId);
    try {

      await LikeComment({userId : UserId , commentId : commentId}) ;

    } catch (error) {
      console.error(error)
    } finally {
      pendingCommentLikes.current.delete(commentId);
    }

  }

  async function LikeComment({userId , commentId}){

      try {

        const Like_response = await fetch(`${API}/Api/Comments/Likes` , {

            method : 'POST',
            credentials : 'include',
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({
              userId : userId,
              commentId : commentId

            })

        })

        if (!Like_response.ok) {
          const errData = await Like_response.json().catch(() => ({}));
          throw new Error(errData.error || `HTTP ${Like_response.status}`);
        }

        const response = await Like_response.json() ;

        setCommentLikes( prev =>({
            ...prev, [commentId] : response.Liked
        }))

        GetCommentsLikes() ;

      } catch (error) {
        console.error(error) ;
      }

    }

      async function GetCommentsLikes (){

        try {

          const GetCommentsLikesRes = await fetch(`${API}/Api/Comments/Likes/data/${PostId}` ,{
            method : 'GET' ,
            credentials : 'include',
          })

          if (!GetCommentsLikesRes.ok) return;

          const CommentLikesResponse = await GetCommentsLikesRes.json() ;

           const map = {};
           CommentLikesResponse.likedCommentIds.forEach(id =>{
            map[id] = true ;
           })

           setCommentLikes(map)

        } catch (error) {
          console.error(error) ;
        }

      }


  //----------------------------------------------------------------------------------------------

  const contextValue = useMemo(() => ({
    page, setPage, limit, setLimit, breeds, setBreeds,
    BarState, setBarState, Search, setSearch, load, FilteredBreed, Getinfo,
    Description, setDescription, ID, setID, Catimage, setCatImage,
    GetPosts, Posts_content, setPostContent, postsPage,
    likedPosts, setLikedPosts, ManageLikedPosts, GetLikeData,
    PostDetails, setpostDetails, ImagesInter, setimagesInter,
    HandlePostInteract, Postinteract, setPostinteract,
    ManageComments, Comment_pop, setCommentPop,
    LikeComment, GetCommentsLikes, commentLikes, setCommentLikes, HandleLikeComment,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [page, limit, breeds, BarState, Search, FilteredBreed,
       Posts_content, postsPage, likedPosts, commentLikes,
       Postinteract, Comment_pop, PostDetails, ImagesInter]);

    return ( <Catcontext.Provider value={contextValue}> {children} </Catcontext.Provider> )

}

export const useCat = ()=>useContext(Catcontext) ;
