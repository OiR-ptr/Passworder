import React from "react";
import {createStore, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import createHistory from "history/createBrowserHistory";
import {reducer as formReducer} from "redux-form";
import {routerReducer, routerMiddleware, ConnectedRouter} from "react-router-redux";
import tagReducer from "./TagReducer";
import passwordReducer from "./PasswordReducer";
import authReducer from "./AuthReducer";
import Routing from "../components/Routing";

const history = createHistory();
const middleware = routerMiddleware(history);

const rootReducer = combineReducers({
    auth: authReducer,
    tag: tagReducer, 
    password: passwordReducer,
    form: formReducer,
    router: routerReducer
})

const store = createStore(rootReducer, applyMiddleware(middleware));

export default class RootComponent extends React.Component {
    render() {
        return (
            <Provider store={store}>                
                <ConnectedRouter history={history}>
                    <Routing />
                </ConnectedRouter>
            </Provider>
        );
    }
}
