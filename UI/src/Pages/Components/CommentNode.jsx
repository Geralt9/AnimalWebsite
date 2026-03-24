import {ReplyBox}from "./ReplyBox"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPen, faXmark,faHeart, faShare, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {faComment, faImages} from '@fortawesome/free-regular-svg-icons';
import { useEffect } from "react";

export function CommentNode({
  comment,
  repliesByParent,
  Replyto,
  setReplyto,
  CommentReply,
  setCommentReply,
  handleSubmitComment,
  commentLikes,
  HandleLikeComment,
  UserImg,
  loading,
  depth = 0,
}) {

  

  const replies = repliesByParent[comment.Comment_id] || [];

  return (
    <div className="Comment_node" style={{ marginLeft: Math.min(depth, 2) * 24 }} >
      <div className="user_details_area">
        <div className="Pfp_inter">
          <img src={comment.pfp_img} />
        </div>
        <div className="user_name">{comment.FullName}</div>
        <div className="Creation_time">
          {new Date(comment.created_at).toLocaleString()}
        </div>
      </div>

      <div className="Comment_Content">{comment.content}</div>

      <div className="reply_Like">
        <div
          className={`Like_Comment ${
            commentLikes[comment.Comment_id] ? "Liked" : ""
          }`}
          onClick={() =>
            HandleLikeComment(comment.Comment_id, comment.user_id)
          }
        >   <FontAwesomeIcon
                                               icon={faHeart}
                                               className={commentLikes[comment.Comment_id] ? "Liked" : "Unliked"}
                />
          Like
        </div>

        <div
          className="Reply_comment"
          onClick={() => setReplyto(comment.Comment_id)}
        >
          Reply
        </div>
      </div>

      {Replyto === comment.Comment_id && (
        <ReplyBox
          avatar={UserImg}
          value={CommentReply}
          onChange={setCommentReply}
          onSubmit={handleSubmitComment}
          loading={loading}
        />
      )}

      {replies.map((reply) => (
        <CommentNode
          key={reply.Comment_id}
          comment={reply}
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
          depth={depth + 1}
        />
      ))}
    </div>
  );
}
