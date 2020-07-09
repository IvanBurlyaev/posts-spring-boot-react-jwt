import * as actions from '../actions/authActions';

const initialState = {
    token: null,
    error: false,
    errorMessage: null,
    loading: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.START_AUTHENTICATION:
        case actions.AUTHENTICATION_SUCCESS:
        case actions.AUTHENTICATION_FAILURE:
        case actions.START_TRY_AUTO_SIGNUP:
        case actions.TRY_AUTO_SIGNUP_SUCCESS:
        case actions.TRY_AUTO_SIGNUP_FAILURE:
        case actions.START_LOGOUT:
        case actions.LOGOUT_SUCCESS:
        case actions.LOGOUT_FAILURE:
            return {...state, ...action.state};
        default:
            return state;
    }
}

export default authReducer;