import {takeEvery} from "redux-saga/effects"
import { SHOWS_QUERY_CHANGE } from "../actions/shows"
import { fetchShows } from "./handler"

export function* rootSaga(){
    yield takeEvery(SHOWS_QUERY_CHANGE,fetchShows)
}