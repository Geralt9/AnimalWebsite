import express from 'express'
import cors from 'cors'
const App = express();

import { LoginUser, CreateRefreshToken } from './Controllers/PostController.js';
import 'dotenv/config'
import jwt from 'jsonwebtoken'; 

App.use(cors()); 
App.use (express.json());
App.use(express.urlencoded({extended: false}));

let refreshTokens = []

App.post('/login' , LoginUser);
App.post('/token' , CreateRefreshToken);

App.delete('/logout' , (req,res)=>{

    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204) ;
    
})


App.listen(5000 , ()=>{ console.log(`sever listening on Port 5000`)})