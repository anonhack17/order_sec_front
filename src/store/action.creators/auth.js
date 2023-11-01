import {LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS, SET_MESSAGE,} from "./../const";

import AuthService from "../../service/AuthService";

export const register = (email, password) => (dispatch) => {
    return AuthService.registration(email, password).then(
        (response) => {

            dispatch({
                type: REGISTER_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: REGISTER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const login = (email, password) => {
    return (dispatch) => {

        return AuthService.login(email, password).then(
            (data) => {
                AuthService.getUserInfo().then(
                    (data) => {

                        localStorage.setItem('user', JSON.stringify(data.data))

                        dispatch({
                            type: LOGIN_SUCCESS,
                            payload: {user: data.data},
                        })
                    }
                ).catch(e => {})


                return Promise.resolve();
            },
            (error) => {
                const message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                dispatch({
                    type: LOGIN_FAIL,
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload: message,
                });

                return Promise.reject();
            }
        );
    };
};

export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({
        type: LOGOUT,
    });
};