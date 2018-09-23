import TagList from "../components/TagList";
import {addTagEvent} from "../actions/Actions";
import {connect} from "react-redux";

function mapStateToProps(state) {
    return {
        tagID: state.tag.tag_count,
        tags: state.tag.tags,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addTag(tagID) {
            dispatch(addTagEvent(tagID));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TagList);