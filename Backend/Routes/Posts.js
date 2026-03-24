import express from 'express' ;
const router = express.Router() ;
import pool from '../db.js';
const api_key = process.env.API_KEY ;
import { verifyToken } from '../Middleware/AuthenticateToken.js';

import cloudinary from '../Cloudinary.js';
import upload from './multer.js';

//---------Create posts---------------//

router.post('/' , verifyToken , upload.array('images' ,4 ),  async (req, res)=>{

    
    const connection = await pool.getConnection();
      const UserID  = req.body.User;
      const Content = req.body.Post_Content;
      const images = req.files ; 

      const uploads = [];
      
    try {


     const postResult = await connection.query('INSERT INTO `posts` (user_id , content , created_at) VALUES(?,?,?)' ,
                            [UserID , Content,  new Date(Date.now())]
      ); 

      const postID = postResult[0].insertId;

      if(!images || images.length === 0){  return res.status(400).json({error : 'No images were uploaded' }) }

    for(const image of images){

      const result = await new Promise((resolve, reject)=>{
        const stream = cloudinary.uploader.upload_stream(
          {

              folder: `users/posts/${UserID}`,
              overwrite: true,
              resource_type: 'image',

          },
          (err , result)=>{
            if(err) return reject(err);
            resolve(result);
          }
          
        )
        stream.end(image.buffer)
      })
       uploads.push(result.secure_url) ;

             await connection.query(
        'INSERT INTO `post_pics` (user_id, post_id, img_url, created_at) VALUES (?, ?, ?, ?)',
        [UserID, postID, result.secure_url, new Date()]
      );

}

  

      res.status(200).json({ postID }); 

    } catch (error) {

        console.error('Error :' , error )
        res.status(500).json({ Error : 'An internal server Error has occured creating a Post'});

    } finally{ 
        if(connection){connection.release()}
    }

});

//---------Get posts---------------//


router.get('/Feed' , verifyToken , async (req, res)=>{

   
    const connection = await pool.getConnection();

    try {

      //const [Posts_Content] = await connection.query(`SELECT content FROM posts `);
      const [results] = await connection.query(`
   SELECT 
    posts.id AS post_id,
    posts.content,
    posts.created_at AS post_created_at,

    users.ID AS user_id,
    users.FullName,
    users.EmailAddress,
    users.pfp_img,
    users.background_img,

    GROUP_CONCAT(post_pics.img_url) AS images

  FROM posts
  JOIN users ON posts.user_id = users.ID
  LEFT JOIN post_pics ON posts.id = post_pics.post_id

  GROUP BY posts.id
  ORDER BY posts.created_at DESC
`);



      res.status(200).json({  //'Post' : Posts.UserID , 
           post_elements : results

      })  

    } catch (error) {

        console.error('Error :' , error )
        res.status(500).json({ Error : 'An internal server Error has occured creating a Post'});

    } finally{ 
        if(connection){connection.release()}
    }

});

 //--------------------------------------Manage Liked Posts---------------------------------------------------------   

  router.post('/Api/Posts/Post_data/Likes/:Post_id' , verifyToken , async (req , res)=>{

    const connection = await pool.getConnection() ;
    const userID = req.user.id ;
    const {Post_id} = req.params ;

    let Liked ;

    try {

         const [existing_like] = await connection.query ('SELECT *FROM likes WHERE post_id = ? AND user_id = ? ', 
          [Post_id , userID]) ;

          if(existing_like.length > 0){
            await connection.query ( 'DELETE FROM likes WHERE post_id = ? AND user_id = ? ' , [Post_id , userID]) ;
             Liked = false ;

          } else {
            await connection.query ( 'INSERT INTO `likes` (post_id , user_id , created_at) VALUES (?,?,?) ' ,
         [Post_id , userID , new Date()] ) ;
          Liked = true ;
          }

          res.status(200).json({Likes : existing_like , LikeStatus : Liked}) ;

    } catch (error) {

      console.error('Error :' , error);
      res.status(400).json({Error : 'An error occured on the /Likes route'})

    }finally{if(connection){connection.release()}}

  })  
        //----get likes data

  router.get('/Api/Posts/Post_data/LikesData' , verifyToken , async(req, res)=>{

    const connection = await pool.getConnection();
    const UserId = req.user.id;
    let Liked ;

    try {

      const [LikesData] = await connection.query('SELECT post_id FROM likes WHERE user_id = ?' ,
         [UserId]);

  const LikesId = LikesData.map(row => row.post_id);

         res.status(200).json({LikesId})

    } catch (error) {
      console.log('Error:', error)
      res.status(400).json({ Error : 'An error has occured while fetching likes data' })  
    }finally {if(connection){connection.release()}}
  })

//---------------------------------------Get posts data for interactions--------------------------------//

    router.get('/Api/Posts/Post_data/:id' , verifyToken ,  async(req, res)=>{

      const connection = await  pool.getConnection() ;
      const userId = req.user.id ; 
      const Post_id = req.params.id ;

      try {

        const [post_data] = await connection.query(
          
          `SELECT 
          p.id AS post_id,
          p.user_id,
          p.content,
          p.created_at,
          GROUP_CONCAT(pp.img_url) AS images

          FROM posts p
          LEFT JOIN post_pics pp 
          ON p.id = pp.post_id
          WHERE p.id = ?
          GROUP BY p.id
          ORDER BY p.created_at DESC ` ,
          [Post_id]
        )


        const [user_post_details] = await connection.query(`SELECT  
          p.id ,
          p.user_id,
          u.ID,
          u.FullName,
          u.pfp_img
          FROM posts p 
          JOIN users u ON p.user_id = u.ID
          WHERE p.id = ?
          ` , 
          [Post_id])

        const user_name = user_post_details[0]?.FullName;
        const pfp = user_post_details[0]?.pfp_img;

        res.status(200).json({post_details : post_data , Username : user_name , pfp : pfp })

      } catch (error) {
          console.error('Error :' , error);
          res.status(400).json({message : 'Error has occured while getting Posts data'})
      }finally{if(connection) {connection.release()}}

    })



//--------------------------Profile Upload in Cloudinary -------------------//

router.post('/Upload' ,verifyToken , upload.fields([
  { name: 'profile_img', maxCount: 1 },
  { name: 'background_img', maxCount: 1 }, 
]) , async (req, res)=>{

    const connection = await pool.getConnection();
    
    try {
           // const Background_Img = req.body.Background_Img;
           //  const Profile_Img = req.body.Profile_Img;

           
            const userId = req.user.id ;
            const uploads = {};
      const profileFile = req.files?.profile_img?.[0];
      const bgFile = req.files?.background_img?.[0];

           

        if(!profileFile && !bgFile){
            res.status(400).json({error : 'no image was modified'})
        }

       if (bgFile) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: `users/${userId}`,
              public_id: 'BG_Img',
              overwrite: true
            },
            (err, result) => {
              if (err) return reject(err);
              resolve(result);
            }
          );
          stream.end(bgFile.buffer);
        });

        uploads.BgImgUrl = result.secure_url;
      }

      // Upload profile pic
      if (profileFile) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: `users/${userId}`,
              public_id: 'Pfp',
              overwrite: true
            },
            (err, result) => {
              if (err) return reject(err);
              resolve(result);
            }
          );
          stream.end(profileFile.buffer);
        });

        uploads.Pfp = result.secure_url;
      }
      
     const [userRows] = await connection.query('SELECT background_img, pfp_img FROM users WHERE ID = ?', [userId]);
    const current = userRows[0];

// Keep previous values if new ones weren't uploaded
const finalBgUrl = uploads.BgImgUrl || current.background_img;
const finalPfpUrl = uploads.Pfp || current.pfp_img;

// Now update both with guaranteed values
await connection.query(
  'UPDATE users SET background_img = ?, pfp_img = ? WHERE ID = ?',
  [finalBgUrl, finalPfpUrl, userId]
);

      const [ProfileImages]= await connection.query('SELECT *FROM `users` WHERE `ID`= ? ' , 
             [userId]
          )

      if (!ProfileImages.length) {
            return res.status(404).json({ message: 'User not found' });
        }


      res.status(200).json({ ProfilePic : ProfileImages[0].pfp_img ,
                             BackgroundPic : ProfileImages[0].background_img })


    } catch (error) {
            console.error('Error:' , error);
            res.status(500).json({Error : 'An internal Error has occured when fetching profile data' })

    }finally{ 
        if(connection){connection.release()}
    }

})

//----------------------------------Comments management --------------------------------------------

  router.post('/Api/Comment' , verifyToken ,async(req, res) =>{
    
    const connection = await pool.getConnection() ;

const { UserId, PostId, Content, parent_comment_id } = req.body;

      try {

       const [comments] = await connection.query( 'INSERT INTO `comments` ( post_id , user_id , content , created_at , parent_comment_id) values ( ?, ?, ?, ?, ?) ' 
        , [ PostId, UserId, Content, new Date(), parent_comment_id || null]) ;

        res.status(200).json({comments}) ;     

      } catch (error) {
        console.error('Error :' , error) ;
        res.status(500).json({Error : 'An error occured when sending a comment'})
      }finally{if(connection){connection.release() }}

  })

      //------------------------------Get Comments----------------------

   router.get('/Api/CommentsData/:Post_id', verifyToken, async (req, res) => {
  const connection = await pool.getConnection();
  try {
    // ✅ grab the actual route param value
    const { Post_id } = req.params;
    const postId = Number(Post_id); // optional: coerce to number

    const [Comments_Data] = await connection.query(
      `SELECT 
         c.id AS Comment_id,
         c.post_id,
         c.user_id,
         c.content,
         c.created_at,
         c.parent_comment_id,
         u.id   AS author_id,
         u.FullName,
         u.pfp_img
       FROM comments AS c
       LEFT JOIN users AS u ON c.user_id = u.id
       WHERE c.post_id = ?
       ORDER BY c.created_at DESC`,
      [postId] // ✅ pass the primitive value, not the params object
    );

    res.status(200).json({ Comments: Comments_Data });
  } catch (error) {
    console.error('Error :', error);
    res.status(500).json({ Error: 'An error has occured while retrieving comments data' });
  } finally {
    if (connection) connection.release();
  }
});

//---------------------------Liking comments------------------------------

  router.post ('/Api/Comments/Likes' , verifyToken, async(req, res)=>{

    const connection = await pool.getConnection() ;
    const {/*userId ,*/ commentId} = req.body ;
    const userId = req.user.id ;
    let Liked ;
    try {


        const [LikeComment] = await connection.query( 'SELECT *FROM comment_likes WHERE comment_id = ? AND user_id = ?' , 
          [commentId , userId ]) ;


          const [existing_comment_like] = await connection.query ('SELECT *FROM comment_likes WHERE comment_id = ? AND user_id = ? ' , 
            [commentId , userId]
          )

            if(existing_comment_like.length > 0){ 

                         await connection.query('DELETE FROM comment_likes WHERE comment_id = ? AND user_id = ? ', 
                          [commentId , userId ]) ;

                          Liked= false ;

             }else{
            
                await connection.query( 'INSERT INTO `comment_likes` (comment_id, user_id, created_at) VALUES (?, ?, ?)' , 
                               [commentId , userId,new Date() ]) ;
              Liked = true ; 
             
             }

            res.status(200).json({ CommentLikes : existing_comment_like ,
                                   LikedComment : Liked, 
                                  commentId : commentId }) 

    } catch (error) {  
        console.error(error) ;
        res.status(500).json({Error : 'An error has occured when Liking a comment'})
    }finally{if(connection){connection.release()}}

  } )

   //-------------Getting Likes data -------------

  router.get('/Api/Comments/Likes/data/:PostId', verifyToken , async(req,res)=>{

    const connection = await pool.getConnection();
    const {PostId} = req.params ;
    const userId = req.user.id;

    try {
      
      const [CommentLikesData] = await connection.query( `
        SELECT 
        comlikes.id,
        comlikes.comment_id,
        comlikes.user_id,
        comlikes.created_at,
        
        coms.id,
        coms.post_id
        FROM comment_likes AS comlikes LEFT JOIN comments AS coms
        ON comlikes.comment_id = coms.id 
        WHERE coms.post_id = ? AND comlikes.user_id = ? `, [PostId , userId] ) ;

        const LikedCommentsId = CommentLikesData.map (CommentLikesData => CommentLikesData.comment_id) ;

        res.status(200).json({likedCommentIds: LikedCommentsId})

    } catch (error) {
      console.error(error) ;
      res.status(500).json({Error : 'Issue has occured when getting '})
    }finally{if(connection){connection.release()}}

  })

//---------------------------------------------------------

export default router ;


