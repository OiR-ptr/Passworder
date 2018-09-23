import React from "react";

import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

import TagList from "../containers/TagListContainer";
import MainContent from "../containers/MainContentContainer";
import PasswordDialog from "../containers/PasswordDialogContainer";

export default class GenPass extends React.Component {
    componentDidMount() {
        this.props.loadTags();
    }

    render() {
        return (
            <Paper>
                <Paper style={{ float: "left", width: "30%" }}>
                    { this.props.isLoaded ? <TagList /> : <CircularProgress size={40} thickness={5} /> }
                </Paper>
                <Paper style={{ float: "left", width: "70%" }}>
                    <MainContent />
                </Paper>
                <PasswordDialog />
            </Paper>
        )

    }
}
