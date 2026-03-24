import express from 'express';
import path from 'path';
import mysql from 'mysql2/promise';
import pool from './db.js';
import bcrypt from "bcryptjs";
import 'dotenv/config';

import { Hash, randomBytes } from 'crypto';

import { GetProfile , GetCats } from './Controllers/GetController.js';
import { LogIn, SignUp, RefreshTokenGeneration } from './Controllers/PostController.js';
import {Logout} from './Controllers/Deletecontroller.js';
import { verifyToken } from './Middleware/AuthenticateToken.js';

import jwt from 'jsonwebtoken' 
import cookieParser from 'cookie-parser';
import cors from 'cors'
import router from './Routes/Posts.js';
import router2 from './Routes/ProfileDetails.js';


const randomHex = randomBytes(64).toString('hex');
//console.log(randomHex); 

const port = process.env.PORT || 8080

const App = express();
App.use(cookieParser());
// App.use(cors());

const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend origin
    credentials: true, // Allow cookies
    allowedHeaders: ['Content-Type', 'Authorization']
  };
  


App.use(cors(corsOptions));

App.use (express.json());
App.use(express.urlencoded({extended: false}));

App.use(express.json({ limit: '100mb' }));
App.use(express.urlencoded({ extended: true, limit: '100mb' }));



App.get('/Cats/Images' , GetCats);

//----------------------------authenticate the user using bcrypt to check for password and email && storing credentials in DB--------------------------------


App.post('/User/SignUp' , SignUp)

//--------------------------------------Login the user / provide jwt to the user ---------------------------------------------

App.post('/User/LogIn' ,LogIn)

App.delete('/Logout' , Logout )

App.post('/refresh' , RefreshTokenGeneration)

//--------------------------Protected Routes----------------------

App.get('/User/Profile' , verifyToken , GetProfile );

App.use('/Api/Posts', router);
App.use('/Api', router);
App.use('/' , router);
 

//----------------------------------------------Profile details routes------------------------------------------------------------------------------


App.use('/' , router2); 

App.listen(port , ()=>{console.log(`server running on port ${port}`)})



