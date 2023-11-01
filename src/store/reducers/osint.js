import { combineReducers } from 'redux';
import {
    FETCH_OSINT_SUCCESS,
    FETCH_OSINT_FAILURE,
    FETCH_OSINT_REQUEST
} from './../const';

const items = (state = [], action) => {
    switch (action.type) {
        case FETCH_OSINT_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};

const isFetching = (state = false, action) => {
    switch (action.type) {
        case FETCH_OSINT_REQUEST:
            return true;
        case FETCH_OSINT_SUCCESS:
        case FETCH_OSINT_FAILURE:
            return false;
        default:
            return state;
    }
};

const error = (state = null, action) => {
    switch (action.type) {
        case FETCH_OSINT_FAILURE:
            return action.payload;
        case FETCH_OSINT_REQUEST:
        case FETCH_OSINT_SUCCESS:
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