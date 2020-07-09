import React, {Component} from 'react';

import './NewPost.css';
import Input from "../../../components/Input/Input";
import axios from 'axios';
import Spinner from "../../../components/Spinner/Spinner";

class NewPost extends Component {
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
                valid: false,
                touched: false
            },
            content: {
                label: 'Content',
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Content'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            author: {
                label: 'Author',
                elementType: 'select',
                elementConfig: {
                    options: null
                },
                value: '',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    }


    componentDidMount() {
        axios.get('/authors').then(response => {
            this.updateAuthorsOptions(response.data);
        });
    }


    postDataHandler = () => {
        axios.post('/posts',
            {
                userId: this.state.postForm.author.value,
                title: this.state.postForm.title.value,
                body: this.state.postForm.content.value,
                author: null
            }).then(response => {
            const updatedState = {...this.state.postForm};
            this.resetPostFieldsToDefault(updatedState);
            alert('New post with id: ' + response.data.id + ' has been added');
        });
    }

    updateAuthorsOptions(authors) {
        const postForm = {...this.state.postForm};
        postForm.author.elementConfig.options = authors.map(author => {
            return {value: author.id, displayValue: author.name}
        });
        postForm.author.value = postForm.author.elementConfig.options[0].value;
        this.setState({postForm: postForm});
    }

    resetPostFieldsToDefault(postForm) {
        postForm.title = {...postForm.title, ...{value: '', valid: false, touched: false}};
        postForm.content = {...postForm.content, ...{value: '', valid: false, touched: false}};
        this.setState({postForm: postForm, formIsValid: false});
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

    render() {

        let inputs = <Spinner/>

        if (this.state.postForm.author.elementConfig.options) {
            let inputElements = [];

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
                    changed={(event) => this.inputChangedHandler(event, element.id)}/>
            });
        }

        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                {inputs}
                <button disabled={!this.state.formIsValid} onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;