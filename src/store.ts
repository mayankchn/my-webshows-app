import { composeWithDevTools } from "@redux-devtools/extension";
import createSagaMiddleware from "@redux-saga/core";
import { createStore,combineReducers, applyMiddleware } from "redux";
import showsReducer from "./reducers/shows";
import { rootSaga } from "./sagas/watcher";

const reducer = combineReducers({
    shows:showsReducer,
})

const sagaMiddleware = createSagaMiddleware()

export type State = ReturnType<typeof reducer>

export const store = createStore(reducer,composeWithDevTools(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga)