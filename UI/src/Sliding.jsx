

import { useState, useRef,useContext,createContext, useEffect  } from "react";
import {useCat} from './Pages/CatsContext.jsx'

const Sliding_context = createContext();

export const Slide_context = ({children})=>{

  const {Images , setImages, breeds ,
         setBreeds,BarState , setBarState,Search , setSearch, FilteredBreed, Description,setDescription,ID,setID,Catimage, setCatImage} = useCat()

    

    const Total_images = FilteredBreed.length ;
    const Total_Pages = Math.ceil( Total_images / 12);

    

    return (  <Sliding_context.Provider value={{}} > {children} </Sliding_context.Provider> )

}

export const useSlide = () => useContext(Sliding_context);