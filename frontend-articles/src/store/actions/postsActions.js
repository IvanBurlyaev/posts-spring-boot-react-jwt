import axios from 'axios';

export const FETCH_ALL_POSTS = 'FETCH_ALL_POSTS';
export const FETCH_POST_BY_ID = 'FETCH_POST_BY_ID';
export const DELETE_POST = 'DELETE_POST';
export const RESET_STATE = 'RESET_STATE';


export const fetchAllPosts = () => {
    return dispatch => {
        axios.get('/posts').then(response => {
            return dispatch({
                type: FETCH_ALL_POSTS,
                state: {posts: response.data.slice(0, 15)}
            });
        }).catch(error => {
            return dispatch({
                type: FETCH_ALL_POSTS,
                state: {posts: null, error: true, errorMessage: error.message}
            });
        });
    }
}

export const fetchPostById = (postId) => {
    return (dispatch, getState) => {
        const loadedPost = getState().loadedPost;
        if (!loadedPost || loadedPost.id !== postId) {
            axios.get('/posts/' + postId).then(response => {
                    return dispatch({type: FETCH_POST_BY_ID, state: {loadedPost: response.data}})
                }
            ).catch(error => {
                return dispatch({
                    type: FETCH_POST_BY_ID,
                    state: {loadedPost: null, error: true, errorMessage: error.message}
                })
            });
        }

    }
}

export const deletePost = id => {
    return dispatch => {
        axios.delete('/posts/' + id).then(response => {
            return dispatch({type: DELETE_POST, state: {loadedPost: null}});
        }).catch(error => {
            return dispatch({loadedPost: null, error: true, errorMessage: error.message});
        });
    }
}

export const resetState = () => {
    return dispatch => {
        return dispatch({type: RESET_STATE, state: {posts: null, error: false, errorMessage: null}});
    }
}
