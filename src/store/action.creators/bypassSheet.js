import {
    FETCH_BYPASS_SHEET_SUCCESS,
    FETCH_BYPASS_SHEET_FAILURE,
    FETCH_BYPASS_SHEET_REQUEST
} from './../const';
import instance from "../api";

export const fetchBypassSheetRequest = () => ({
    type: FETCH_BYPASS_SHEET_REQUEST,
});

export const fetchBypassSheetSuccess = (bypassSheet) => ({

    type: FETCH_BYPASS_SHEET_SUCCESS,
    payload: bypassSheet,
});

export const fetchBypassSheetFailure = (error) => ({
    type: FETCH_BYPASS_SHEET_FAILURE,
    payload: error,
});

export const fetchBypassSheet = () => async (dispatch) => {
    dispatch(fetchBypassSheetRequest());

    try {
        const response = await instance.get(`/api/bypassSheet/bypassSheet/`);
        // const data = await response.json();
        // console.log(data)

        dispatch(fetchBypassSheetSuccess(response.data.results));

    } catch (error) {
        if (error.response.status === 401) {
            window.count = 1;
        } else {
            console.log('Произошла ошибка:', error.message);
        }
        dispatch(fetchBypassSheetFailure(error));
    }
};