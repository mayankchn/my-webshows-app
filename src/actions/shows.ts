import { ActionCreator } from "."
import { Cast, Show } from "../models"

export const SHOWS_LOADED = "SHOWS_LOADED"
export const SHOWS_QUERY_CHANGE = "SHOWS_QUERY_CHANGE"
export const SHOW_DETAIL_LOADED = "SHOW_DETAIL_LOADED"
export const SHOW_CAST_LOADED = "CAST_LOADED"
export const SHOW_ID_CHANGE = "SHOW_ID_CHANGE"
export const LOADING = "LOADING"

export const showsLoadedAction:ActionCreator<Show[]> = (shows:Show[]) => {
    return {
        type:SHOWS_LOADED,
        payload:shows,
    }
}

export const showsQueryChangeAction:ActionCreator<string> = (query:string) => {
    return {
        type:SHOWS_QUERY_CHANGE,
        payload:query,
    }
}

export const showDetailLoadedAction:ActionCreator<Show> = (show:Show) => {
    return {
        type:SHOW_DETAIL_LOADED,
        payload:show,
    }
}

export const showCastLoadedAction:ActionCreator<Cast[]> = (cast:Cast[]) => {
    return {
        type:SHOW_CAST_LOADED,
        payload:cast,
    }
}

export const showIdChangeAction:ActionCreator<number> = (id:number) => {
    return {
        type:SHOW_ID_CHANGE,
        payload:id,
    }
}
