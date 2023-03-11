import { createSelector } from "reselect";
import { State } from "../store";

export const showsStateSelector = (state:State) => {
    return state.shows;
}

export const showsQuerySelector = createSelector(showsStateSelector,(showsState)=>{
    return showsState.query;
})

export const showsMapSelector = createSelector(showsStateSelector,(showsState)=>{
    return showsState.shows;
})

export const showsSelector = createSelector(showsMapSelector,(showsMap)=>{
    return Object.keys(showsMap).map((id)=>{
        return showsMap[+id]
    })
})

export const showSelector = createSelector(showsStateSelector,(showsState)=>{
    return showsState.showDetail
})

export const showCastMapSelector = createSelector(showsStateSelector,(showsState)=>{
    return showsState.cast
})

export const showCastSelector = createSelector(showCastMapSelector,(showCastMap)=>{
    return Object.keys(showCastMap).map((id)=>{
        return showCastMap[+id]
    })
})