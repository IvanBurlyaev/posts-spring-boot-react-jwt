import React, {Component} from 'react';

import './FullPost.css';
import Spinner from "../../../components/Spinner/Spinner";
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/postsActions';

class FullPost extends Component {

    deletePostHandler = () => {
        this.props.onDeletePost(this.props.loadedPost.id);
        this.props.history.replace('/posts');
    };

    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.onFetchPostById(this.props.match.params.id);
        }
    }

    render() {
        let post = <Spinner/>;

        if (this.props.error) {
            post = <p style={{textAlign: 'center', color: 'red'}}>{this.props.errorMessage}</p>;
        }

        if (this.props.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.props.loadedPost.title}</h1>
                    <p>{this.props.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>

            );
        }

        return post;
    }
}

const mapStateToProps = state => {
    return {
        loadedPost: state.posts.loadedPost,
        error: state.posts.error,
        errorMessage: state.posts.errorMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPostById: (id) => dispatch(actions.fetchPostById(id)),
        onDeletePost: (id) => dispatch(actions.deletePost(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullPost);