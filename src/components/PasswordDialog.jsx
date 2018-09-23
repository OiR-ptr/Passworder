import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";

export default class PasswordDialog extends React.Component {
    render() {
        return (
            <Dialog open={this.props.open} >
                <DialogTitle>Generated Password</DialogTitle>
                <DialogContent>
                    <DialogContentText>{this.props.password}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={ () => {
                        this.props.passwordDone(); 
                    } } >end</Button>
                </DialogActions>
            </Dialog>
        );
    }
}