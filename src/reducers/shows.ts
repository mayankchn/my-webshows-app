import produce from "immer";
import { schema } from "normalizr";
import { Action } from "../actions";
import { SHOWS_LOADED, SHOWS_QUERY_CHANGE, SHOW_CAST_LOADED, SHOW_DETAIL_LOADED, SHOW_ID_CHANGE } from "../actions/shows";
import {Cast, Show} from "../models/index"
import {normalize} from "normalizr"

type State = {
    shows:{[id:number]:Show};
    query:string;
    showDetail?:Show;
    cast:{[id:number]:Cast};
    showId?:number;
}

const initialState:State = {
    shows:{},
    query:"",
    cast:{},
}

const showsReducer = (state=initialState, action: Action) => {
    switch(action.type){
        case SHOWS_QUERY_CHANGE: 
            return produce(state,(draft)=>{
                const query = action.payload;
                draft.query=query
            })
        case SHOWS_LOADED: 
            return produce(state,(draft)=>{
                const shows = action.payload as Show[]
                const show = new schema.Entity('shows')
                const normalizedData = normalize(shows,[show])
                draft.shows = normalizedData.entities.shows || {}
            })
        case SHOW_DETAIL_LOADED:
            return produce(state,(draft)=>{
                const show = action.payload as Show
                draft.showDetail = show
            })
        case SHOW_CAST_LOADED: 
            return produce(state,(draft)=>{
                const cast = action.payload as Cast[]
                const castSchema = new schema.Entity('cast')
                const normalizedData = normalize(cast,[castSchema]) 
                draft.cast = normalizedData.entities.cast || {}
            })
        case SHOW_ID_CHANGE:
            return produce(state,(draft)=>{
                const id = action.payload
                draft.showId=id
            })
        default: 
            return state
    }
}
export default showsReducer;