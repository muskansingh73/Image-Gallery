import { useEffect, useState } from "react";
import axios from "axios";

const count =1
function LoadImage(){
  const[state,setState] = useState([])
  axios
    .get("https://api.unsplash.com/photos?client_id=AhT6CJtGo5BBj2UwV49XVmval2A3V51hroClZodwI4s")
    .then((data) =>{
      setState(data.data)
    }, [count])
    return state;
  
}

function StartSearch(query) {

   const [state, setState] = useState([])
   useEffect(() =>{
    axios
    .get(`https://api.unsplash.com/photos?query=${query}&client_id=AhT6CJtGo5BBj2UwV49XVmval2A3V51hroClZodwI4s`)
    .then((data) =>{
      setState(data.data)
    })
   }, [query])
    return state

    
}

export default StartSearch;
export {LoadImage}