import {
    FETCH_CUSTOMERS_SUCCESS,
    FETCH_CUSTOMERS_REQUEST,
    FETCH_CUSTOMERS_FAILURE
} from './../const';
import instance from "../api";

export const fetchCustomerRequest = () => ({
    type: FETCH_CUSTOMERS_REQUEST,
});

export const fetchCustomerSuccess = (сustomer) => ({

    type: FETCH_CUSTOMERS_SUCCESS,
    payload: сustomer,
});

export const fetchCustomerFailure = (error) => ({
    type: FETCH_CUSTOMERS_FAILURE,
    payload: error,
});

export const fetchCustomer = () => async (dispatch) => {
    dispatch(fetchCustomerRequest());

    try {
        const response = await instance.get(`/api/customer/customer/`);
        // const data = await response.json();
        // console.log(data)

        dispatch(fetchCustomerSuccess(response.data.results));
    } catch (error) {
        dispatch(fetchCustomerFailure(error));
    }
};