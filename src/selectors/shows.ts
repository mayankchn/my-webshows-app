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

export const queryShowsMapSelector = createSelector(showsStateSelector,(showsState)=>{
    return showsState.query_shows
})

export const showsSelector = createSelector(showsMapSelector,queryShowsMapSelector,showsQuerySelector,(showsMap,queryShowsMap,query)=>{
    return queryShowsMap[query]?.map((id)=>{
        return showsMap[+id] 
    })
})

export const showCastMapSelector = createSelector(showsStateSelector,(showsState)=>{
    return showsState.cast
})

export const showCastSelector = createSelector(showCastMapSelector,(showCastMap)=>{
    return Object.keys(showCastMap).map((id)=>{
        return showCastMap[+id]
    })
})

export const showsLoadingSelector = createSelector(showsStateSelector,(showsState)=>{
    return showsState.loading
})

export const showLoadingSelector = createSelector(showsStateSelector,(showsState)=>{
    return showsState.show_loading
})

export const showCastLoadingSelector = createSelector(showsStateSelector,(showsState)=>{
    return showsState.cast_loading
})
