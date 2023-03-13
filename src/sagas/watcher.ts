import { takeEvery, debounce } from "redux-saga/effects"
import { SHOWS_QUERY_CHANGE, SHOW_ID_CHANGE } from "../actions/shows"
import { fetchCast, fetchShow, fetchShows } from "./handler"

export function* rootSaga() {
    yield debounce(1000, SHOWS_QUERY_CHANGE, fetchShows)
    yield takeEvery(SHOW_ID_CHANGE, fetchShow)
    yield takeEvery(SHOW_ID_CHANGE, fetchCast)
}