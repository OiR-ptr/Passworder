import {connect} from "react-redux";
import { reduxForm } from "redux-form";

import MainContent from "../components/MainContent";
import {saveTagEvent, generatePasswordEvent} from "../actions/Actions";
import {firebaseApp} from "../firebase/firebaseinstance";

let contactForm = reduxForm({
    form: 'contact',
    enableReinitialize: 'true'
})(MainContent);

let MainContentWithForm = connect(state => ({
    initialValues: state.tag.selected_tag
}))(contactForm);

function mapStateToProps(state) {
    return {
        tag: state.tag.selected_tag,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        saveTag(obj) {
            if(obj.tagID) {
                var tagsRef = firebaseApp.database().ref(`tags/${obj.tagID}`);
                tagsRef.update(obj);
                
                dispatch(saveTagEvent(obj))
            }
        },
        generatePassword(seed) {
            dispatch(generatePasswordEvent(seed))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContentWithForm);