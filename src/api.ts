import axios from "axios"
import {Show,Cast} from "./models/index"

export const searchShows = (query:string) => {
    return axios.get<{show:Show}[]>("https://api.tvmaze.com/search/shows?q="+query).then((response)=>{
        return response.data.map((item)=>{
            // console.log('item ',item)
            return item.show;
        })
    }).catch((error)=>{
        return error;
    })
}

export const getShow = (id:number) => {
    return axios.get<{show:Show}>("https://api.tvmaze.com/shows/"+id).then((item)=>{
        return item.data;
    }).catch((error)=>{
        return error;
    })
}

export const getCast = (id:number) => {
    return axios.get("https://api.tvmaze.com/shows/"+id+"/cast").then((response)=>{
        return response.data.map((item:any)=>{
            return item.character
        })
    })
}