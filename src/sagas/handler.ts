import { Action } from "../actions";
import {call,put} from "redux-saga/effects"
import { getCast, getShow, searchShows } from "../api";
import { showCastLoadedAction, showDetailLoadedAction, showsLoadedAction } from "../actions/shows";

export function* fetchShows(action:Action):Generator<any,any,any>{
    console.log('payload for fetchShows ',action.payload)
    const shows =  yield call(searchShows,action.payload)
    yield put(showsLoadedAction(shows))
}

export function* fetchShow(action:Action):Generator<any,any,any>{
    console.log('payload for fetchShow ',action.payload)
    const show =  yield call(getShow,action.payload)
    yield put(showDetailLoadedAction(show))
}

export function* fetchCast(action:Action):Generator<any,any,any>{
    console.log('payload for fetchCast ',action.payload)
    const cast =  yield call(getCast,action.payload)
    yield put(showCastLoadedAction(cast))
}