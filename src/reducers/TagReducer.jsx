import Moment from "moment";

import { LOAD_TAGS, ADD_TAG, SELECT_TAG, SAVE_TAG } from "../actions/Actions";

const initialState = {
    isLoaded: false,
    selected_tag: {
        tagID: 0,
        title: "example",
        abstract: "",
        detail: "",
        seed: "default seed",
        updateAt: Moment().format('LLL'),
    },
    tag_count: 0,
    tags: [],
};

export default function tagReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_TAGS:
            return Object.assign({}, state, {
                isLoaded: true,
                tags: action.tags,
                tag_count: action.tags.length,
                selected_tag: Object.assign({}, state.selected_tag, {
                    tagID: action.tags.length + 1,
                })
            });

        case ADD_TAG:
            var t = {
                tagID: action.tagID,
                title: "example", abstract: "", detail: "", seed: "default seed", updateAt: action.updateAt
            }
            var obj = Object.assign({}, state, {
                tag_count: state.tag_count + 1,
                tags: Array.from(new Set([...state.tags, t]))
            });
            return obj;

        case SELECT_TAG:
            return Object.assign({}, state, {
                selected_tag: Object.assign({}, state.tags.filter( function( value ) {
                    return value.tagID === action.tagID;
                })[0])
            });

        case SAVE_TAG:
            let newtags = state.tags.slice();
            const idx = state.tags.findIndex( function(value) {
                return value.tagID === action.tag.tagID;
            });
            if(idx !== -1) {
                newtags[idx] = action.tag;
            }
            else {
                newtags.push(action.tag);
            }
            return Object.assign({}, state, {
                tags: newtags,
                tag_count: newtags.length,
            });

        default:
            return state;
    }
}
