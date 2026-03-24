import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

import infoStyle from './Info.module.css'
import {useCat} from './CatsContext.jsx'


 
export default function Info(){ 

    const {Images , setImages, breeds ,
        setBreeds,BarState , setBarState,Search , setSearch, FilteredBreed, Description,setDescription,ID,setID,Catimage, setCatImage} = useCat()

        const navigate = useNavigate()

//Description ID Catimage

    return <>   


    <button className={infoStyle.Back} onClick={()=>navigate(-1) } > <FontAwesomeIcon className={infoStyle.Icon} icon={faArrowLeft} /> <div> Back </div> </button>

         <section className={infoStyle.Main_cont} >
               
                <div className={infoStyle.Image_cont} > <img className={infoStyle.Image} src={`https://cdn2.thecatapi.com/images/${Catimage}.jpg`} />  </div>
                <div className={infoStyle.Title_Desc_cont} > 

                     <div className={infoStyle.CatID} > {ID} </div> 
                     <div className={infoStyle.Description} > {Description} </div>
                     

                </div>
                
            </section>   

           
           
           
    </>
}