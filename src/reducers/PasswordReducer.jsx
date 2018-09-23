import jsSHA from "jssha";
import Base91 from "node-base91";

import {GENERATE_PASS, GENERATE_PASS_DONE} from "../actions/Actions";

const initialState = {
    password: "",
};

export default function passwordReducer(state = initialState, action) {
    switch(action.type) {
        case GENERATE_PASS:
            var hash = new jsSHA("SHA-1", "TEXT");
            hash.update( action.seed );
            return Object.assign({}, state, {
                password: Base91.encode(hash.getHash("HEX"))
            });

        case GENERATE_PASS_DONE:
            return Object.assign({}, state, {
                password: "",
            });

        default:
            return state;
    }
}
