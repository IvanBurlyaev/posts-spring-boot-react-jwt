import axios from 'axios';

export const START_AUTHENTICATION = 'START_AUTHENTICATION';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_FAILURE = 'AUTHENTICATION_FAILURE';

export const START_TRY_AUTO_SIGNUP = 'START_TRY_AUTO_SIGNUP';
export const TRY_AUTO_SIGNUP_SUCCESS = 'TRY_AUTO_SIGNUP_SUCCESS';
export const TRY_AUTO_SIGNUP_FAILURE = 'TRY_AUTO_SIGNUP_FAILURE';

export const START_LOGOUT = 'START_LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';


export const authenticate = (username, password) => {
    return (dispatch, getState) => {
        const currentState = getState().auth;
        dispatch({type: START_AUTHENTICATION, state: {...currentState, ...{loading: true}}});
        axios.post('/authenticate', {username: username, password: password}).then(response => {
            dispatch({
                type: AUTHENTICATION_SUCCESS,
                state: {...currentState, ...{token: response.data, error: false, errorMessage: null, loading: false}}
            });
        }).catch(error => {
            dispatch({
                type: AUTHENTICATION_FAILURE,
                state: {...currentState, ...{token: null, error: true, errorMessage: error.message, loading: false}}
            });
        });
    }
}

export const tryAutoSignUp = () => {
    return (dispatch, getState) => {
        const currentState = getState().auth;
        dispatch({type: START_TRY_AUTO_SIGNUP, state: {...currentState, ...{loading: true}}});
        axios.post('authenticate').then(response => {
            dispatch({
                type: TRY_AUTO_SIGNUP_SUCCESS,
                state: {...currentState, ...{token: response.data, error: false, errorMessage: null, loading: false}}
            })
        }).catch(error => {
            dispatch({
                type: TRY_AUTO_SIGNUP_FAILURE,
                state: {...currentState, ...{token: null, error: true, errorMessage: error.message, loading: false}}
            });
        });
    }
}

export const logout = () => {
    return (dispatch, getState) => {
        const currentState = getState().auth;
        dispatch({type: START_LOGOUT, state: {...currentState, ...{token: null, loading: true}}});
        axios.post('/expireAuth').then(response => {
            dispatch({
                type: LOGOUT_SUCCESS,
                state: {...currentState, ...{token: null, error: false, errorMessage: null, loading: false}}
            })
        }).catch(error => {
            dispatch({
                type: LOGOUT_FAILURE,
                state: {...currentState, ...{token: null, error: true, errorMessage: error.message, loading: false}}
            });
        });
    }
}