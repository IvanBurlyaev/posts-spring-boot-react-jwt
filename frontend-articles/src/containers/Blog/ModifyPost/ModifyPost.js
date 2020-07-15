import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/postsActions';
import Spinner from "../../../components/Spinner/Spinner";
import Input from "../../../components/Input/Input";
import axios from 'axios';

class ModifyPost extends Component {

    state = {
        postForm: {
            title: {
                label: 'Title',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Title'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: true,
                touched: false
            },
            content: {
                label: 'Content',
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Content',
                    rows: '7'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: true,
                touched: false
            }
        },
        formIsValid: true,
        loading: false
    }

    componentDidMount() {
        this.props.onFetchPostById(this.props.match.params.id);
        if (this.props.loadedPost) {
            this.populatePostForm();
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.loadedPost && this.props.loadedPost) {
            this.populatePostForm();
        }
    }

    populatePostForm = () => {
        const updatedTitle = {...this.state.postForm.title};
        const updatedContent = {...this.state.postForm.content};
        updatedTitle.value = this.props.loadedPost.title;
        updatedContent.value = this.props.loadedPost.body;
        this.setState({postForm: {title: updatedTitle, content: updatedContent}});
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedPostForm = {...this.state.postForm};

        const updatedFormElement = {
            ...updatedPostForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedPostForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedPostForm) {
            formIsValid = updatedPostForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({postForm: updatedPostForm, formIsValid: formIsValid});
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        return isValid;
    }

    savePostHandler = () => {
        this.setState({loading: true});
        axios.put('/posts', {
            id: this.props.loadedPost.id, title: this.state.postForm.title.value,
            body: this.state.postForm.content.value
        }).then(response => {
            this.setState({loading: false});
            this.navigateToFullPost(response.data.id)
        }).catch(error => {
            console.log(error);
            this.setState({loading: false});
        });
    }

    navigateToFullPost = (postId) => {
        this.props.history.replace('/post/' + postId);
    }

    render() {
        let inputs = <Spinner/>

        let inputElements = [];

        if (this.props.loadedPost) {

            for (let key in this.state.postForm) {
                inputElements.push({
                    id: key,
                    config: this.state.postForm[key]
                });
            }

            inputs = inputElements.map(element => {
                return <Input
                    key={element.id}
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    label={element.config.label}
                    value={element.config.value}
                    invalid={!element.config.valid}
                    shouldValidate={element.config.validation}
                    touched={element.config.touched}
                    changed={(event) => this.inputChangedHandler(event, element.id)}/>;
            })
        }

        return <div className="NewPost">
            <h1>Modify Post</h1>
            {this.state.loading ? <Spinner/> : inputs}
            <button onClick={() => this.navigateToFullPost(this.props.loadedPost.id)}>Cancel</button>
            <button disabled={!this.state.formIsValid || this.state.loading} onClick={this.savePostHandler}>Save
            </button>
        </div>;
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
        onFetchPostById: (id) => dispatch(actions.fetchPostById(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyPost);