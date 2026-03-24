import { useEffect , useState } from "react";



export function useComments (PostId){

        const [comments , setComments] = useState([]) ;
        const [loading,  setLoading]  = useState(false);
        const [error,    setError]    = useState(null);
        
       // const [CommentLikes , setCommentLikes] = useState({});


      async function Getcomments(signal) {

             if (!PostId || Number.isNaN(Number(PostId))) return;

        try {

          setLoading(true) ;
          setError(null) ;

          const Comments_response = await fetch(`http://localhost:8080/Api/CommentsData/${PostId}` , {

            credentials : 'include' ,
            method : 'GET',
            signal
          })

          if(!Comments_response.ok) throw new Error (`HTTP ${Comments_response.status}`) ;

          const response = await Comments_response.json();
          const list = response?.Comments ?? [];
          setComments(list) ;

        // console.log(list) //console.log(response.Comments);  // Comments[0].pfp_img /  Comment_id
        } catch (err) {
           if (err.name !== "AbortError") setError(err);
        }finally{ setLoading(false) }

      }


       async function addComment ({ userId, content, parent_comment_id = null }) {

      try {

          const Comm_response = await fetch ('http://localhost:8080/Api/Comment' , {
            
            method : 'POST',
            credentials : 'include' ,
            headers: { "Content-Type": "application/json" },
            body : JSON.stringify({
              UserId : userId,
              PostId : PostId,
              Content : content,
              parent_comment_id: parent_comment_id,
            })
          })
          
          if(!Comm_response.ok) throw new Error(`HTTP ${Comm_response.status}`);
         // setComment(''); 
          await Getcomments() ;         

      } catch (err) {
        if (err.name !== "AbortError") setError(err);
      }
    }


        useEffect(()=>{
          
          if (!PostId || Number.isNaN(Number(PostId))) return;

              const ctrl = new AbortController();
               setComments([]);
               Getcomments(ctrl.signal);
          return () => ctrl.abort();
      
            },[PostId]) ;

            return { comments, loading, error, refetch: Getcomments, addComment };
    
}
