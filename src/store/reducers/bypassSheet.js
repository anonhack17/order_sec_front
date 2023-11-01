import { combineReducers } from 'redux';
import {
    FETCH_BYPASS_SHEET_SUCCESS,
    FETCH_BYPASS_SHEET_FAILURE,
    FETCH_BYPASS_SHEET_REQUEST
} from './../const';

const items = (state = [], action) => {
    switch (action.type) {
        case FETCH_BYPASS_SHEET_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};

const isFetching = (state = false, action) => {
    switch (action.type) {
        case FETCH_BYPASS_SHEET_REQUEST:
            return true;
        case FETCH_BYPASS_SHEET_SUCCESS:
        case FETCH_BYPASS_SHEET_FAILURE:
            return false;
        default:
            return state;
    }
};

const error = (state = null, action) => {
    switch (action.type) {
        case FETCH_BYPASS_SHEET_FAILURE:
            return action.payload;
        case FETCH_BYPASS_SHEET_REQUEST:
        case FETCH_BYPASS_SHEET_SUCCESS:
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