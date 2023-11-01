import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import Executor from "./reducers/executor";
import BypassSheet from "./reducers/bypassSheet";
import Auth from "./reducers/auth";
import Customer from "./reducers/customer";
import Osint from "./reducers/osint";

let reducers = combineReducers({
    executors: Executor,
    customers: Customer,
    osints: Osint,
    bypassSheet: BypassSheet,
    auth: Auth,
})

export let store = createStore(reducers, compose(applyMiddleware(thunk)))

