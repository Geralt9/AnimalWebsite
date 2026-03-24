 import express from 'express' ;
 const router2 = express.Router() ; 
 import pool from '../db.js';
 import 'dotenv/config';
 const api_key = process.env.API_KEY ;
 import { verifyToken } from '../Middleware/AuthenticateToken.js';

import cloudinary from '../Cloudinary.js';
import upload from './multer.js';

const animals_Api_Key = process.env.ANIMALS_API_KEY;

 //-----------------------------------------------Profile details : bio images etc ..-------------------------------------------------------

    router2.post('/Profile/Bio' , verifyToken , async (req, res)=>{

        const connection = await pool.getConnection()
        
        const Bio_data = req.body.Bio_text;
        const UserId = req.user.id ;
       
        try {
            

          /*  const [profile_data] = await connection.query("UPDATE profile_details SET Bio =?, updated_at = NOW() WHERE Profile_id=?",
                [Bio_data , UserId]
            ) ; */


  const [rprofile_data] = await connection.query(
   `INSERT INTO profile_details (Profile_id, Bio, updated_at)
   VALUES (?, ?, NOW())
   ON DUPLICATE KEY UPDATE
     Bio = VALUES(Bio),
     updated_at = NOW();`,
  [UserId, Bio_data]
);

            res.status(200).json({ Message : 'Bio uploaded successfully' });

        } catch (error) {

                       console.error('Error :' , error )
                       res.status(500).json({ Error : 'An internal server Error has occured in Bio routes'});

        }finally{
            if (connection){connection.release()}
        }

    })  

    router2.get('/Profile/GetBio' , verifyToken , async (req, res)=>{

        const connection = await pool.getConnection()
        const UserId = req.user.id ;

         const[data_response] = await connection.query(` SELECT Bio, updated_at FROM profile_details WHERE Profile_id = ? ORDER BY updated_at DESC LIMIT 1` ,
         [UserId])
    

            res.status(200).json({ Bio_data : data_response[0] });

        try {

        } catch (error) {
            console.error('Error :' , error);
            res.status().json({Message : 'Error has occured when fetching the user Bio' })
        }
    })
    
 //-----------------------------------------------Profile details : bio images / Pet Card etc ..-------------------------------------------------------   

    router2.post('/Pet/Card' , verifyToken, upload.single('PetImage'), async (req,res)=>{

        const connection = await pool.getConnection();
        const UserId = req.user.id ;
        const PetImage = req.file ;
        

        try {

            if(!PetImage) {return res.status(400).json({error : 'No Pet Image was uploaded'})}

            if(PetImage){
                const result = await new Promise((resolve, reject)=>{
                    const stream = cloudinary.uploader.upload_stream(
                        {folder : `users/Profile/Pet_image/${UserId}`,
                            overwrite : false,
                            resource_type: 'image',
                          },
                        (err, result)=>{if(err) return reject(err);
                            resolve(result);
                        })

                    stream.end(PetImage.buffer);
                })
                const uploadUrl = result.secure_url; 

             const [PetImages] = await connection.query('UPDATE `profile_details` SET `Pictures` = ? WHERE `Profile_id` = ?',
                [uploadUrl , UserId]
            ) 

                
            }

           res.status(200).json({Message : 'Pet Image Uploaded successfully'})

        } catch (error) {
            console.error('Error :' , error);
            res.status(500).json({ Error : 'Error occured while fetching the Pet Card'})
        }finally{if (connection){connection.release()}}
    })


    //-------------------------------------------Get the pet image route---------------------------------------------------


    router2.get('/Profile/Pet', verifyToken, async(req,res)=>{

        const connection = await pool.getConnection() ;
        const UserId = req.user.id;

        try {

             const [UrlUpload] = await connection.query ('SELECT `Pictures` FROM `profile_details` WHERE `Profile_id` = ? ' ,
                [UserId]
            )
            
            if(UrlUpload[0]){
             res.status(200).json({PetImgUrl : UrlUpload[0].Pictures});
 }else{return}
        } catch (error) {
            console.error( 'Error :' , error);
            res.status().json()
        } finally {if(connection){connection.release()}}

    })

    //------------------------------------------- Post the form ----------------------------------------------

    router2.post ('/Api/pet/form' , verifyToken, async (req , res)=>{

      const connection = await pool.getConnection() ;          
      const UserID = req.user.id ;

        try {

            const Name = req.body.Name;
            const Breed = req.body.Breed;
            const Age = req.body.Age ;
            const Sex = req.body.Sex ;

            const [PetData] = await connection.query('UPDATE `pet` SET `name` = ?, `age` = ?, `sex` = ?, `breed` = ? WHERE `user_ID` = ? ' , 
                [Name, Age, Sex, Breed, UserID ]
            )

            if(PetData.affectedRows === 0){
                await connection.query(
               `INSERT INTO pet (user_ID, name, age, sex, breed) VALUES (?, ?, ?, ?, ?)`,
                                 [UserID, Name, Age, Sex, Breed] )
            }


            res.status(200).json({message : 'Form updated in the backend successfully!'})

        } catch (error) {
                console.error(error);
                res.status(400).json({message : 'Error while handling Animals Api'})

        }finally{if(connection){connection.release()}} ;

    })

    //------------------------------------------- Get the form ----------------------------------------------    

    router2.get('/Api/pet/Getform' ,verifyToken, async(req,res)=>{

        const connection = await pool.getConnection();
        const userID = req.user.id ;
        try {

            const [petFormData] = await connection.query('SELECT * FROM `pet` WHERE `user_ID` = ? ',
                [userID]
            )

            res.status(200).json({petDetails : petFormData}) ;

        } catch (error) {
                
                console.error(error);
                res.status(400).json({message : 'Error while getting the pet form'})

        }finally{if(connection){connection.release()}}
    })

    export default router2 ;