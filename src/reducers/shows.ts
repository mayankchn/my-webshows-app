import produce from "immer";
import { schema } from "normalizr";
import { Action } from "../actions";
import { SHOWS_LOADED, SHOWS_QUERY_CHANGE, SHOW_CAST_LOADED, SHOW_DETAIL_LOADED, SHOW_ID_CHANGE } from "../actions/shows";
import {Cast, Show} from "../models/index"
import {normalize} from "normalizr"

type State = {
    shows:{[id:number]:Show};
    query:string;
    loading:boolean;
    query_shows: {[id:string]:number[]}
    show_loading:boolean;
    cast:{[id:number]:Cast};
    cast_loading:boolean;
}

const initialState:State = {
    shows:{},
    query:"",
    loading:false,
    query_shows:{},
    show_loading:false,
    cast:{},
    cast_loading:false,
}

const showsReducer = (state=initialState, action: Action) => {
    switch(action.type){
        case SHOWS_QUERY_CHANGE: 
            return produce(state,(draft)=>{
                const query = action.payload;
                draft.query=query
                draft.loading=true
            })
        case SHOWS_LOADED: 
            return produce(state,(draft)=>{
                const shows = action.payload as Show[]
                const show = new schema.Entity('shows')
                const normalizedData = normalize(shows,[show])
                console.log(normalizedData)
                draft.query_shows[draft.query] = normalizedData.result
                draft.shows = {...draft.shows, ...normalizedData.entities.shows} || {}
                draft.loading=false
            })
        case SHOW_ID_CHANGE:
            return produce(state,(draft)=>{
                draft.show_loading=true
                draft.cast_loading=true
            })
        case SHOW_DETAIL_LOADED:
            return produce(state,(draft)=>{
                const show = action.payload as Show
                draft.shows[show.id]=show
                draft.show_loading=false
            })
        case SHOW_CAST_LOADED: 
            return produce(state,(draft)=>{
                const cast = action.payload as Cast[]
                const castSchema = new schema.Entity('cast')
                const normalizedData = normalize(cast,[castSchema]) 
                draft.cast = normalizedData.entities.cast || {}
                draft.cast_loading=false
            })
        default: 
            return state
    }
}
export default showsReducer;