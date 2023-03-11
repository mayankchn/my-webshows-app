import { Action } from "../actions";
import {call,put} from "redux-saga/effects"
import { searchShows } from "../api";
import { showsLoadedAction } from "../actions/shows";

export function* fetchShows(action:Action):Generator<any,any,any>{
    console.log('payload for fetchShows ',action.payload)
    const shows =  yield call(searchShows,action.payload)
    yield put(showsLoadedAction(shows))
}