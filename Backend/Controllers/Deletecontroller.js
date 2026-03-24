import jwt from 'jsonwebtoken';
import 'dotenv/config';
import pool from '../db.js';
const api_key = process.env.API_KEY ;


export const Logout = async(req, res)=>{

          
          const connection = await pool.getConnection();

           
          try {

            const RefreshToken =  req.cookies.RefreshToken;
            if(!RefreshToken){return res.status(400).json({error : 'no RefreshToken provided'})}

            const[result] = await connection.query( 'DELETE FROM `refresh_tokens` where `Token` = ?' , [RefreshToken]);

            res.clearCookie('AccessToken' ,{
                    httpOnly: true,
                    secure : true ,
                    sameSite: 'strict',
            })
            res.clearCookie('RefreshToken' ,{
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            })

            res.sendStatus(204)

          } catch (error) {

                 console.error('Error:', error );
                res.status(500).json({error : 'Internal Logout Server error'});

          }finally{
            if(connection){
                 connection.release()
            }
          }


    }
