import { combineReducers } from 'redux';
import {
    FETCH_ORDER_SUCCESS,
    FETCH_ORDER_FAILURE,
    FETCH_ORDER_REQUEST
} from './../const';

const items = (state = [], action) => {
    switch (action.type) {
        case FETCH_ORDER_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};

const isFetching = (state = false, action) => {
    switch (action.type) {
        case FETCH_ORDER_REQUEST:
            return true;
        case FETCH_ORDER_SUCCESS:
        case FETCH_ORDER_FAILURE:
            return false;
        default:
            return state;
    }
};

const error = (state = null, action) => {
    switch (action.type) {
        case FETCH_ORDER_FAILURE:
            return action.payload;
        case FETCH_ORDER_REQUEST:
        case FETCH_ORDER_SUCCESS:
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