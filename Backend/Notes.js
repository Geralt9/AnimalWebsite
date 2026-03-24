const users = [] ; 

    App.post( '/users' , async (req , res)=>{ 

        
     try{   
        
        const salt = await bcrypt.genSalt();
        const HashedPasswords = await bcrypt.hash(req.body.password , salt);

        const user =  { name : req.body.name , password : HashedPasswords } ;
        
        users.push(user);
        res.status(200).json(users)


} catch{
    res.status(500).send()
}
    })


App.post('/users/login' , async (req,res)=>{
  //authenticate the user

    const user = users.find(user => user.name == req.body.name )
    if(user == null){
            return res.status(500).json({message : "user not found"})
    }

    try {
        if(await bcrypt.compare(req.body.password ,user.password )){
        return res.status(200).send('Success') ;
      }
      else{  return res.status(200).send('Incorect password') }
    } catch (error) {
        res.status(500).send() ;
    }


})

//------------------------------------------------------------------------------------------------


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