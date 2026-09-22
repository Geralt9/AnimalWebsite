import jwt from 'jsonwebtoken';
import 'dotenv/config';
import pool from '../db.js';
const api_key = process.env.API_KEY ;



 export const GetCats =  async (req,res)=> {

    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page)   || 1 ;

    if(isNaN(limit) || limit <= 0 || isNaN(page) || page <= 0){
        return res.status(400).json({ message: 'Invalid limit or page parameter' });
    }

    try {

        const [data_rows] = await pool.query('SELECT * FROM `cat_data`');

        res.status(200).json({
            limit,
            page,
            data_rows,
        });

    } catch (error) {
        console.error('Error fetching cat data:', error);
        res.status(500).json({ message: 'An internal server error occurred' });
    }

}

    //-----------------------------Animals endpoint ---------------------------------------------------------------------------

    export const GetAnimals = async(req, res)=>{

try {
        const animalName = req.query.name ;

            const response = await fetch (`https://api.api-ninjas.com/v1/animals?name=${animalName}` , 
                {headers : {'X-Api-Key' : process.env.NINJA_API_KEY}}
            ) ;

            if (!response.ok) {
                 return res.status(response.status).json({ error: "Failed to fetch animal data from external API" });
            }

            const AnimalData = await response.json() ;

    res.status(200).json({AnimalData}) ;   

    

    } catch (error) {
        console.error('Error fetching animal data:', error);
        return res.status(500).json({ error: 'Internal server error' });
     }  

    }
//-------------------------------------Get Profile ---------------------------------------------------------------------------

export const GetProfile = async(req, res)=>{

        const connection = await pool.getConnection();

        try {
            
              const userId = req.user.id ;
          //const [Username] = await connection.query('SELECT *FROM `users` WHERE `FullName`= ? ' , [req.user.FullName])  for additionnal info

                const [ProfileImages]= await connection.query('SELECT *FROM `users` WHERE `ID`= ? ' , 
        [userId]
      )

         if (!ProfileImages.length) {
            return res.status(404).json({ message: 'User not found' });
        }




      res.status(200).json({
        ProfilePic   : ProfileImages[0].pfp_img,
        BackgroundPic: ProfileImages[0].background_img,
        userName     : ProfileImages[0].FullName,
      });
                             
           /* res.status(200).json({
                userName : req.user.userName
            }) */

        } catch (error) {

            console.error('Error :', error)
            res.status(500).json({error : 'Internal server Error'})
           
        }finally{
            if(connection){connection.release()}
        }
    }

