import React, {Component} from 'react';
import Post from "../../../components/Post/Post";
import './Posts.css';
import Spinner from "../../../components/Spinner/Spinner";
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/postsActions';

class Posts extends Component {

    componentDidMount() {
        this.props.onFetchAllPosts();
    }

    componentWillUnmount() {
        this.props.onResetState();
    }

    postSelectedHandler = (id) => {
        this.props.history.push({pathname: '/post/' + id});
    };

    render() {
        let posts = <Spinner/>;

        if (this.props.error) {
            posts = <p style={{textAlign: 'center', color: 'red'}}>{this.props.errorMessage}</p>;
        }

        if (this.props.posts) {
            posts = this.props.posts.map(post => {
                return <Post key={post.id} author={post.author}
                             title={post.title}
                             clicked={() => this.postSelectedHandler(post.id)}/>;
            });
        }

        return (
            <section className="Posts">
                {posts}
            </section>
        );

    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts,
        error: state.posts.error,
        errorMessage: state.posts.errorMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchAllPosts: () => dispatch(actionCreators.fetchAllPosts()),
        onResetState: () => dispatch(actionCreators.resetState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);