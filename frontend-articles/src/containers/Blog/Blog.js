import React, {Component} from 'react';
import './Blog.css';
import Posts from "./Posts/Posts";
import {NavLink, Route, Switch, withRouter} from 'react-router-dom';
import NewPost from "./NewPost/NewPost";
import FullPost from "./FullPost/FullPost";
import Login from "./Login/Login";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/authActions';
import Logout from "./Logout/Logout";

class Blog extends Component {


    componentDidMount() {
        this.props.onTryAutoSignup();
    }


    render() {

        let navLinks = null;

        let routes = (
            <Switch>
                <Route component={Login}/>
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/posts" exact component={Posts}/>
                    <Route path="/new-post" exact component={NewPost}/>
                    <Route path="/post/:id" exact component={FullPost}/>
                    <Route path="/logout" exact component={Logout}/>
                    <Route component={Posts}/>
                </Switch>
            );
            navLinks = (
                <ul>
                    <li><NavLink exact to="/posts">Home</NavLink></li>
                    <li><NavLink exact to="/new-post">New Post</NavLink></li>
                    <li><NavLink exact to="/logout">Logout</NavLink></li>
                </ul>
            );
        }
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            {navLinks}
                        </ul>
                    </nav>
                </header>
                {routes}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.tryAutoSignUp())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog));