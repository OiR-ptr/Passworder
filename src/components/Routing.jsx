import React from "react";
import {Switch, Route, Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import LoginForm from "../containers/LoginFormContainer";
import GenPassContainer from "../containers/GenPassContainer";

class Routing extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/content" component={GenPassContainer} />
                <Route path="/login" component={LoginForm} />
                <Redirect to="/login" />
            </Switch>
        );
    }
}

export default withRouter(connect(state => ({ location: state.router.location }))(Routing));
