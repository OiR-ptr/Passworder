import moment from "moment";

export const LOAD_TAGS = 'LOAD_TAGS';
export const ADD_TAG = 'ADD_TAG';
export const SELECT_TAG = 'SELECT_TAG';
export const SAVE_TAG = 'SAVE_TAG';
export const GENERATE_PASS = 'GENERATE_PASS';
export const GENERATE_PASS_DONE = 'GENERATE_PASS_DONE';

export function loadTagsEvent(tags) {
    var tagarray = [];
    if(tags) {
        Object.keys(tags).forEach(val => {
            tagarray.push(tags[val]);
        });
    }
    return {
        type: LOAD_TAGS,
        tags: tagarray,
    };
}

export function addTagEvent(tagID) {
    return {
        type: ADD_TAG,
        tagID: tagID,
        updateAt: moment().format('LLL')
    };
}

export function selectTagEvent(tagID) {
    return {
        type: SELECT_TAG,
        tagID: tagID,
    }
}

export function saveTagEvent(tag) {
    return {
        type: SAVE_TAG,
        tag: tag,
    }
}

export function generatePasswordEvent(seed) {
    return {
        type: GENERATE_PASS,
        seed: seed,
    };
}

export function clearPasswordEvent() {
    return {
        type: GENERATE_PASS_DONE,
    };
}