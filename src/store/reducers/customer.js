import { combineReducers } from 'redux';
import {
    FETCH_CUSTOMERS_SUCCESS,
    FETCH_CUSTOMERS_REQUEST,
    FETCH_CUSTOMERS_FAILURE
} from './../const';

const items = (state = [], action) => {
    switch (action.type) {
        case FETCH_CUSTOMERS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};

const isFetching = (state = false, action) => {
    switch (action.type) {
        case FETCH_CUSTOMERS_REQUEST:
            return true;
        case FETCH_CUSTOMERS_SUCCESS:
        case FETCH_CUSTOMERS_FAILURE:
            return false;
        default:
            return state;
    }
};

const error = (state = null, action) => {
    switch (action.type) {
        case FETCH_CUSTOMERS_FAILURE:
            return action.payload;
        case FETCH_CUSTOMERS_REQUEST:
        case FETCH_CUSTOMERS_SUCCESS:
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