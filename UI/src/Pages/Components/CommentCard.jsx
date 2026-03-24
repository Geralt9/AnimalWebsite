
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPen, faXmark,faHeart, faShare, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {faComment, faImages} from '@fortawesome/free-regular-svg-icons';
import '../Posts.css' ;
import { useEffect } from "react";
 
import { CommentNode } from "./CommentNode";
import { ReplyBox } from "./ReplyBox";

import {useComments} from './useComments' ;
import { useCat } from "../CatsContext";

 function CommentCard ({Image , Name, date, PostImgs , Content, UserImg, Liked, onLike, onImageClick ,  UserId , PostId} ){

    const { comments: Comments, addComment, loading } = useComments(PostId);

    const [comment, setComment] = useState('') ;
    const [currentIndex, setCurrentIndex] = useState(0);
    
 const [Replyto , setReplyto] = useState(null) ;
  const [CommentReply , setCommentReply] = useState('') ;

 
    const parentComments = Comments.filter(
      c => c.parent_comment_id === null 
    );

    const repliesByParent = Comments.reduce((acc , c)=>{
          if(c.parent_comment_id !== null){
            acc[c.parent_comment_id] ??= [] ;
            acc[c.parent_comment_id].push(c) ;
          }
          return acc ;
    }, {});

    const {LikeComment , GetCommentsLikes, commentLikes, setCommentLikes, HandleLikeComment } = useCat() ;

 

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % PostImgs.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + PostImgs.length) % PostImgs.length);
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

useEffect(() => {
  if (!PostId) return;
  GetCommentsLikes(PostId);
}, [PostId]);

 
      return <>
                          <div className="Comment_Pop_background" > 
                        <div className="Mid_comment_pop" >
                                
                                <div className="Post_title" > {Name} 'S POST </div>

                                <div className="Poster_details_comments" > 

                                          <div className="Pfp_inter_comments" > <img src={Image} /> </div>     
                                          <div className="Profile_name" id="Comment_name" > {Name} </div> 
                                          <div className="Post_date" > {date} </div>  

                                 </div>

                                <div className="Content" > {Content}  </div>
                                
                                <div className="Post_imgs_comments" >  {PostImgs.length > 0 && ( <img src={PostImgs[currentIndex]} onClick={onImageClick} /> )}

          <button className= {PostImgs.length < 2 ?  "None": "Previous"  }    onClick={prevSlide}> <FontAwesomeIcon icon={faChevronLeft} /> </button>
          <button className= {PostImgs.length < 2 ?  "None" : "Next"  }    onClick={nextSlide}><FontAwesomeIcon icon={faChevronRight} /> </button>
                                
                                   </div>
                                
                      <div className="Post_likes_comments_share_Pop"  >
                                  
                                     <div className="Likes_PopUp"  onClick={onLike} > <FontAwesomeIcon icon={faHeart}  className={Liked ? "Liked" : "Unliked"}  /> &nbsp; Like </div>
                                     <div className="Comments_PopUp"  > <FontAwesomeIcon  icon={faComment} /> &nbsp; Comment </div>
                                    <div className="Share_PopUp" ><FontAwesomeIcon  icon={faShare} />&nbsp; Share  </div>

                     </div>

                          <div className="Comment_input" > 

                              <div className="Pfp_inter_comments" > <img src={UserImg} /> </div> 

                        <div className="textarea_wrapper" >
                              <textarea id="Comment_fill" placeholder="Write a comment..." className="Comment_text"  value={comment}  onChange={(e) => { setComment(e.target.value) ; 
                                // auto-grow 
                              
                            e.target.style.height = "auto";
                             e.target.style.height = e.target.scrollHeight + "px";
                              }} ></textarea>

                                <button className="Submit_comment"  style={{ display: comment ? "block" : "none" }} onClick= {handleSubmitComment} disabled = {loading} > Comment </button>
                            
                              </div>

                             </div>

                       <section className="Comments_Area">
                        
  {parentComments.length === 0 ? (
    <div>No comments yet</div>
  ) : (
    parentComments.map(comment => (
      <CommentNode
        key={comment.Comment_id}
        comment={comment}
        repliesByParent={repliesByParent}
        Replyto={Replyto}
        setReplyto={setReplyto}
        CommentReply={CommentReply}
        setCommentReply={setCommentReply}
        handleSubmitComment={handleSubmitComment}
        commentLikes={commentLikes}
        HandleLikeComment={HandleLikeComment}
        UserImg={UserImg}
        loading={loading}
      />
    ))
  )}
</section>

                        </div>
                 </div>
      </>
    }

    
export default React.memo(CommentCard);