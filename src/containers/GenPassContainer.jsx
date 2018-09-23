import GenPass from "../components/GenPass";
import {push} from "react-router-redux";
import {firebaseApp} from "../firebase/firebaseinstance";
import { connect } from "react-redux";
import {loadTagsEvent} from "../actions/Actions";

function mapStateToProps(state) {
    return {
        isLoaded: state.tag.isLoaded
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadTags() {
            if (firebaseApp.auth().currentUser) {
                var tagsRef = firebaseApp.database().ref("tags");
            
                tagsRef.off();
                tagsRef.once("value", 
                    (dataSnapShot) => {
                        dispatch(loadTagsEvent(dataSnapShot.val()));
                    }
                );
            }
            else {
                dispatch(push('/login'));
            }
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GenPass);