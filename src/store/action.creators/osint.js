import {
    FETCH_OSINT_SUCCESS,
    FETCH_OSINT_FAILURE,
    FETCH_OSINT_REQUEST
} from './../const';
import instance from "../api";

export const fetchOsintRequest = () => ({
    type: FETCH_OSINT_REQUEST,
});

export const fetchOsintSuccess = (osint) => ({

    type: FETCH_OSINT_SUCCESS,
    payload: osint,
});

export const fetchOsintFailure = (error) => ({
    type: FETCH_OSINT_FAILURE,
    payload: error,
});

export const fetchOsint = () => async (dispatch) => {
    dispatch(fetchOsintRequest());

    try {
        const response = await instance.get(`/api/osint/osint/`);
        // const data = await response.json();
        // console.log(data)

        dispatch(fetchOsintSuccess(response.data.results));
        debugger
    } catch (error) {
        dispatch(fetchOsintFailure(error));
    }
};