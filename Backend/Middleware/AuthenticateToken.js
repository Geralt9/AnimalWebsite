import jwt from 'jsonwebtoken'

 
/* export function authenticateToken(req,res,next){
 
    const authHeader = req.headers['authorization']
    const token = authHeader &&  authHeader.split(' ')[1]

    if(token == null) {return res.sendStatus(401)}

     jwt.verify(token , process.env.ACCESS_TOKEN_SECRET, (err , user)=>{
        if(err) {return res.sendStatus(403)} ;
         req.user = user ;
         next()
    })
} */


export  function verifyToken(req,res,next){
            
        const Token = req.cookies.AccessToken;
        if(!Token){return res.status(401).json({error : 'Token missing'})}

        jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{

                if(err){
                    if(err.name == "TokenExpiredError"){
                        return res.status(401).json({error : "Token expired"}) // Consistent key name
                    }
                
                return res.status(403).json({ error: 'invalid_token' });
            }

            req.user = {
                id: decoded.user.userId ,
                userName :  decoded.user.userName ,
            } ;
            next();
        })

        

    }
