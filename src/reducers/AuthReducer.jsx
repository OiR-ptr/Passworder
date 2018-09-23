import {AUTHENTIFICATION_SUCCEEDED, AUTHENTIFICATION_FAILED, AUTHENTIFICATION_DONE} from "../actions/AuthActions";

const initialState = {
    isAuthSuccess: false,
    isAuthFailed: false,
    closing: false,
};

export default function authReducer(state = initialState, action) {
    switch(action.type) {
        case AUTHENTIFICATION_SUCCEEDED:
            return Object.assign({}, state, {
                isAuthSuccess: true,
                isAuthFailed: false,
            });

        case AUTHENTIFICATION_FAILED:
            return Object.assign({}, state, {
                isAuthFailed: true,
                isAuthSuccess: false,
            });

        case AUTHENTIFICATION_DONE:
            return Object.assign({}, state, {
                isAuthSuccess: false,
                isAuthFailed: false,
                closing: !(state.closing),
            });

        default:
            return state;
    }
}

