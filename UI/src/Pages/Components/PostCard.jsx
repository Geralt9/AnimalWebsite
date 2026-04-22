import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart, faShare, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {faComment} from '@fortawesome/free-regular-svg-icons';
import '../Posts.css' ;

import { useComments } from "./useComments";
import { CommentNode } from "./CommentNode";
import { useCat } from "../CatsContext";

    function PostCard({ PostId ,Pictures , userName, Profile_pic , CreatedAt, Text, Like, Liked, UserId, UserImg }) {

      const safePostId = Number(PostId);
      if (Number.isNaN(safePostId)) return null;

      const { comments, addComment, loading } = useComments(PostId) ;

  const [currentIndex, setCurrentIndex] = useState(0);
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

  const {GetCommentsLikes, commentLikes, HandleLikeComment} = useCat() ;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Pictures.length);
  };

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
        <div className="Posts_Interaction_container">

          {/* ── Left: image viewer ── */}
          <div className="Pics_area">
            {Pictures.length > 0 && (
              <img
                src={Pictures[currentIndex]}
                className="images_interaction"
                alt={`Post image ${currentIndex + 1} of ${Pictures.length}`}
              />
            )}
            <button className={Pictures.length < 2 ? "None" : "Previous"} aria-label="Previous image" onClick={prevSlide}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className={Pictures.length < 2 ? "None" : "Next"} aria-label="Next image" onClick={nextSlide}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          {/* ── Right: info + comments panel ── */}
          <aside className="inter-panel">

            <div className="user_details_area">
              <div className="Pfp_inter">
                <img src={Profile_pic} alt={`${userName} avatar`} />
              </div>
              <div className="inter-meta">
                <div className="user_name">{userName}</div>
                <div className="Creation_time">{CreatedAt}</div>
              </div>
            </div>

            {Text && <div className="User_text">{Text}</div>}

            <div className="Like_comments_bar">
              <button
                className="Likes_PopUp"
                id="Likes_PopUp_id"
                aria-label={Liked ? 'Unlike post' : 'Like post'}
                aria-pressed={!!Liked}
                onClick={Like}
              >
                <FontAwesomeIcon icon={faHeart} className={Liked ? 'Liked' : 'Unliked'} />&nbsp; Like
              </button>
              <div className="Comments_PopUp" id="Comments_PopUp_id">
                <FontAwesomeIcon icon={faComment} />&nbsp; Comment
              </div>
            </div>

            <div className="Comments_section_area" id="Comments_area">

              <div className="Comment_input">
                <div className="Pfp_inter_comments">
                  <img src={UserImg} alt="Your avatar" />
                </div>
                <div className="textarea_wrapper">
                  <textarea
                    id="Comment_fill"
                    placeholder="Write a comment..."
                    className="Comment_text"
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                      e.target.style.height = "auto";
                      e.target.style.height = e.target.scrollHeight + "px";
                    }}
                  />
                  <button
                    className="Submit_comment"
                    style={{ display: comment ? "block" : "none" }}
                    onClick={handleSubmitComment}
                    disabled={loading}
                  >
                    Comment
                  </button>
                </div>
              </div>

              <section className="Comments_popUp_Area">
                {parentComments.length === 0
                  ? <div className="no-comments">No comments yet</div>
                  : parentComments.map(c => (
                      <CommentNode
                        key={c.Comment_id}
                        comment={c}
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
                }
              </section>

            </div>

          </aside>

        </div>
      </>
      )
    }

export default PostCard;
