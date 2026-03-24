import jwt from 'jsonwebtoken';
import 'dotenv/config';
import pool from '../db.js';
import bcrypt from "bcryptjs";
import { verifyToken } from '../Middleware/AuthenticateToken.js';
const api_key = process.env.API_KEY ; 


function generateAccessToken(user){
        return jwt.sign({user} , process.env.ACCESS_TOKEN_SECRET , {expiresIn : '15m'})
    }

/*--------------------------------------------Sign up user Logic------------------------------------------------------------------------*/ 


export const SignUp = async(req, res)=>{

    const connection = await pool.getConnection();

  try {

    const {FullName , emailAddress, Password} = req.body ;

   
    if(FullName == null || emailAddress == null || Password== null){ return res.status(400).json({'Error' : 'Missing required fields'})}
     
   
       
        const [userExists] = await connection.query(
            `SELECT *FROM users WHERE EmailAddress = ?`,
            [emailAddress]
        )

        if(userExists.length>0){return res.status(409).json({error : 'User already exists'})}
   
            //hashing the password

        const salt = await bcrypt.genSalt(10);
        const HashedPassword = await bcrypt.hash(Password , salt) ;

        //adding the user to the DB-----

    
        const sql = 'INSERT INTO `users` (`FullName` , `EmailAddress` , `Password`) VALUES (?,?,?)';

        const [user] =await connection.query(sql , [FullName , emailAddress , HashedPassword] ) ;       

        res.status(201).json({
            success : true,
            user : {
                id: user.insertId,
                FullName,
                emailAddress
            }
        })

  } catch (error) {
        console.error("Error :" ,error) ;
        res.status(500).json({error : ' internal server error'}) ;
  }finally{
    if (connection) connection.release();
  }

}

/*------------------------------------------------Log in user Logic--------------------------------------------------------------------*/ 

export const LogIn =  async (req,res)=>{

    const connection = await pool.getConnection();

          const emailAddress = req.body.emailAddress;
            const Password = req.body.Password ; 
           

        try {

           // const Payload = {email : emailAddress , Password : Password}

            const [Checkemail] = await connection.query('SELECT *FROM `users` WHERE `EmailAddress` = ?' , [emailAddress])
            if(Checkemail.length === 0){return res.status(400).json({error : 'Invalid Password or email' })};
            

         
            const ValidPass = await bcrypt.compare(Password , Checkemail[0].Password);

            if(!ValidPass){ return res.status(400).json({error : 'Invalid Password or email'})}

          //  res.status(200).json({message : ' user Authenticated successfully!'})

            const userId = {userId : Checkemail[0].ID,
                            userName : Checkemail[0].FullName } /// Payload

            const AccessToken = generateAccessToken(userId);
            const RefreshToken = jwt.sign(userId , process.env.REFRESH_TOKEN_SECRET, {expiresIn : '7d'});

            const [rows , fields] = await connection.query('INSERT INTO `refresh_tokens` (`user_id` ,`Token` , `Expiry_time`) VALUES (?,?,?)' ,
                                                   [Checkemail[0].ID, RefreshToken , new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)]) ;
                                                   
            res.cookie('AccessToken' , AccessToken, {
                httpOnly: true,
                secure : true,
                maxAge: 15*60*1000,
                sameSite: 'strict',
                 domain: 'localhost'
            });

            res.cookie('RefreshToken' , RefreshToken, {
                httpOnly: true,
                secure: true,
                maxAge:7*24*60*60*1000,
                sameSite: 'strict',
                 domain: 'localhost'
            })


           res.status(200).json({UserID : userId.userId})

        } catch (error) {

                console.error('Error:', error );
                res.status(500).json({error : 'Internal server Error'});

        }finally{
            if(connection){connection.release()}
        }
    }

/*----------------------------------------------Refresh Token logic----------------------------------------------------------------------*/ 


 export const RefreshTokenGeneration =   async(req,res)=>{ 

            const RefreshToken = req.cookies.RefreshToken;
            const connection =await pool.getConnection() ;

        try {  

            const [CheckToken] = await connection.query('SELECT *FROM `refresh_tokens` WHERE `TOKEN`= ? AND `Expiry_time` > NOW()' ,[RefreshToken] )
            if(CheckToken[0] == null){return  res.sendStatus(401)}
            if(CheckToken.length === 0 ){return res.sendStatus(403)}  

            const decoded = jwt.verify(RefreshToken , process.env.REFRESH_TOKEN_SECRET)
            const newAccessToken = generateAccessToken({userId : decoded.userId})
            
            res.cookie('AccessToken' , newAccessToken , {
                httpOnly: true,
                secure: true,
                maxAge: 15 * 60 * 1000,
                sameSite: 'strict'

            })

            res.sendStatus(200) ;

        } catch (error) {
            console.error('Error :', error);
            res.status(500).json({error : 'Internal Server error'})
        }finally{
            if(connection){connection.release()}
        }

    }



