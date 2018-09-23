import {connect} from "react-redux";

import Tag from "../components/Tag";
import {selectTagEvent} from "../actions/Actions";

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        selectTag(tagID) {
            dispatch(selectTagEvent(tagID));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tag);