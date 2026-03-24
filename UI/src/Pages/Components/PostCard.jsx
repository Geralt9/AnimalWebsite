import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPen, faXmark,faHeart, faShare, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {faComment, faImages} from '@fortawesome/free-regular-svg-icons';
import '../Posts.css' ;
import { useEffect } from "react";

 import { useComments } from "./useComments";

import { useCat } from "../CatsContext";

    function PostCard({ PostId ,Pictures , userName, Profile_pic , CreatedAt, Text, Likes, Comments, Like, Liked, UserId, UserImg }) {

      const safePostId = Number(PostId);
if (Number.isNaN(safePostId)) return null;
        const { comments, addComment, loading } = useComments(PostId) ;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [content ,setContent] = useState('') ;   
    const [comment, setComment] = useState('') ;
  
   const [Replyto , setReplyto] = useState(null) ;
  const [CommentReply , setCommentReply] = useState('') ;

 
    const parentComments = comments.filter(
      c => c.parent_comment_id === null 
    );

    const repliesByParent = comments.reduce((acc , c)=>{
          if(c.parent_comment_id !== null){
            acc[c.parent_comment_id] ??= [] ;
            acc[c.parent_comment_id].push(c) ;
          }
          return acc ;
    }, {});
  
 
  const {LikeComment , GetCommentsLikes, commentLikes, setCommentLikes, HandleLikeComment} = useCat() ;

  // Go to next picture
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Pictures.length);
  };

  // Go to previous picture
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Pictures.length) % Pictures.length);
  };

  async function handleSubmitComment() {
     const isreply = Replyto !== null ;
      const text = isreply ? CommentReply : comment ;

    if (!text.trim()) return;

    try {
      await addComment({ userId: UserId, content: text, parent_comment_id : isreply ? Replyto : null });

      setComment('');
      setCommentReply('');
      setReplyto(null);

    } catch (e) {
      console.error(e);
    }
  }

  useEffect(()=>{
    GetCommentsLikes();
  },[])



      return (
      <>
        <div className="Posts_Interaction_container" > 
         
          <div className="Pics_area" > 

                    {Pictures.length > 0 && (
          <img
            src={Pictures[currentIndex]}
            className="images_interaction"
           
          />
        )}


          <button className= {Pictures.length < 2 ?  "None": "Previous"  }  onClick={prevSlide}> <FontAwesomeIcon icon={faChevronLeft} /> </button>
          <button className= {Pictures.length < 2 ?  "None" : "Next"  } onClick={nextSlide}><FontAwesomeIcon icon={faChevronRight} /> </button>
              
             </div>
          
          <div className="user_details_area" > 

               <div className="Pfp_inter" > <img src={Profile_pic} /> </div>
              <div className="user_name" > {userName} </div>
              <div className="Creation_time" > {CreatedAt} </div>
              <div className="User_text" > {Text} </div>

          </div>

 
                     <div className="Like_comments_bar"  >
                                  
                                     <div className="Likes_PopUp" id="Likes_PopUp_id" onClick={Like} > <FontAwesomeIcon icon={faHeart}  className={Liked? 'Liked' : 'Unliked' }  /> &nbsp; Like </div>
                                     <div className="Comments_PopUp" id="Comments_PopUp_id" >   <FontAwesomeIcon  icon={faComment} /> &nbsp; Comment </div>
                                    <div className="Share_PopUp" id="Share_PopUp_id" ><FontAwesomeIcon  icon={faShare} />&nbsp; Share  </div>

                     </div> 
                    


          <div className="Comments_section_area" id="Comments_area"  > 
            
                  <div className="Comment_input" > 

                              <div className="Pfp_inter_comments" > <img src={UserImg} /> </div>

                              <textarea id="Comment_fill" placeholder="Write a comment..." className="Comment_text"  value={content}  onChange={(e) => { setContent(e.target.value) ; 
                                // auto-grow 
                              
                            e.target.style.height = "auto";
                             e.target.style.height = e.target.scrollHeight + "px";
                              }} ></textarea>

                                <button className="Submit_comment"  style={{ display: content ? "block" : "none" }} onClick= {handleSubmitComment} disabled = {loading} > Comment </button>
                             </div>

                        <section className="Comments_popUp_Area" >

                            {parentComments.length === 0 ?  (<div> No comments yet </div>) :  (

                              parentComments.map((Element, i) => (
                                  
                                    <div key={i}  > 
 
                                                  <div className="user_details_area" > 

                                                               <div className="Pfp_inter" > <img src={Element.pfp_img} /> </div>
                                                                <div className="user_name" > {Element.FullName} </div>
                                                                <div className="Creation_time" > {new Date (Element.created_at).toLocaleString() } </div>
                                                               

                                                     </div>  

                                                  <div className="Comment_Content" > {Element.content} </div>

                                                <div className="Like_reply Like_reply--postcard" >

                                                  <div className={`Like_Comment ${commentLikes[Element.Comment_id] ? "Liked" : ""}`} onClick={ () => HandleLikeComment(Element.Comment_id, Element.user_id)} > Like </div> 
                                                    
                                                    
                                                  { commentLikes[Element.Comment_id] ?  <FontAwesomeIcon
                                                           icon={faHeart}
                                                           className={commentLikes[Element.Comment_id] ? "Liked" : "Unliked"}
                                                    /> : <></>}

                                                   <div className="Reply_comment" onClick= { () => setReplyto(Element.Comment_id)  } > Reply </div>   
                                                </div>                                                  


                                              <div>                                                
                                            
                                                                              { Replyto === Element.Comment_id && <> <div className="profilereplybox_wrapper2"> <div className="Pfp_inter_comments Pfp_inter_comments--reply  " > <img src={UserImg} /> </div>
                                            
                                                                     <div className="textarea_wrapper textarea_wrapper--reply" >
                                                                         <textarea id="Comment_fill" placeholder="Write a comment..." className="Comment_text Comment_text--reply"  value={CommentReply}  onChange={(e) => { setCommentReply(e.target.value) ;                               
                                                                         
                                                                         e.target.style.height = "auto";
                                                                         e.target.style.height = e.target.scrollHeight + "px";
                                                                         
                                                                         }} ></textarea> <button className="Submit_comment Submit_comment--reply "  style={{ display: CommentReply ? "block" : "none" }} onClick= {handleSubmitComment} disabled = {loading} > Reply </button> </div> </div></>  }
                                            
                                            
                                                                           {repliesByParent[Element.Comment_id]?.map(reply => (
                                                    <div
                                                      key={reply.Comment_id}
                                                      className="Comment_reply"
                                                    >
                                            
                                                      <div className="user_details_area">
                                                        <div className="Pfp_inter_reply">
                                                          <img src={reply.pfp_img} />
                                                        </div>
                                            
                                                        <div className="user_name">{reply.FullName}</div>
                                                        <div className="Creation_time">
                                                          {new Date(reply.created_at).toLocaleString()}
                                                        </div>
                                                      </div>
                                            
                                                      <div className="Comment_Content">
                                                        {reply.content}
                                                      </div>
                                            
                                                      <div className="reply_Like" > 
                                                        
                                                         <div className={`Like_Comment ${commentLikes[reply.Comment_id] ? "Liked" : ""}`} onClick={ () => HandleLikeComment(reply.Comment_id , reply.user_id)} > Like </div> 
                                                         {commentLikes[reply.Comment_id] ?  <FontAwesomeIcon
                                                                                                       icon={faHeart}
                                                                                                       className={commentLikes[reply.Comment_id] ? "Liked" : "Unliked"}
                                                                                                /> : <></>}
                                                         <div className="Reply_comment"  onClick={ () => {setReplyto(reply.Comment_id) ; console.log('reply works') } } > Reply </div>  
                                                        
                                                        </div>
                                                    </div>
                                                  ))}
                                            
                                                                </div>

                                     </div>
                                  
                                ))

                             )}  
                                

                        </section>           

           </div>


        </div>

        </>
      )

      
    }

export default PostCard;
