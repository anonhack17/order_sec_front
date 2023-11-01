import { combineReducers } from 'redux';
import {
    FETCH_EXECUTORS_REQUEST,
    FETCH_EXECUTORS_SUCCESS,
    FETCH_EXECUTORS_FAILURE
} from './../const';

const items = (state = [], action) => {

    switch (action.type) {
        case FETCH_EXECUTORS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};

const isFetching = (state = false, action) => {
    switch (action.type) {
        case FETCH_EXECUTORS_REQUEST:
            return true;
        case FETCH_EXECUTORS_SUCCESS:
        case FETCH_EXECUTORS_FAILURE:
            return false;
        default:
            return state;
    }
};

const error = (state = null, action) => {
    switch (action.type) {
        case FETCH_EXECUTORS_FAILURE:
            return action.payload;
        case FETCH_EXECUTORS_REQUEST:
        case FETCH_EXECUTORS_SUCCESS:
            return null;
        default:
            return state;
    }
};

export default combineReducers({
    items,
    isFetching,
    error,
});