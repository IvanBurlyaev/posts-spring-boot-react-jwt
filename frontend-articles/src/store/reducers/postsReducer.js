import * as actions from '../actions/postsActions';

const initialState = {
    posts: null,
    loadedPost: null,
    error: false,
    errorMessage: null
}

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_ALL_POSTS:
            return {...state, ...action.state};
        case actions.FETCH_POST_BY_ID:
            return {...state, ...action.state};
        case actions.DELETE_POST:
            return {...state, ...action.state};
        case actions.RESET_STATE:
            return action.state;
        default:
            return state;
    }
}

export default postsReducer;