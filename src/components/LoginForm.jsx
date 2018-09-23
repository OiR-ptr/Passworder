import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import LockOpen from "@material-ui/icons/LockOpen";

export default class LoginForm extends React.Component {z
    constructor(props) {
        super(props);
        
        this.state = {
            email: 'myr.ryusuke@gmail.com',
            password: 'password',
        };
    }

    render() {
        return(
            <Paper style={{ textAlign: "center" }}>
                <TextField name="email" label="Email" value={this.state.email}
                    onChange={ (e) => { this.setState({email: e.target.value}); }} /><br />
                    
                <TextField name="password" label="Password" value={this.state.password} type="password"
                    onChange={ (e) => { this.setState({password: e.target.value}); }} /><br />

                <Button variant="contained" color="primary" icon={ <LockOpen /> } onClick={(e) => {
                        this.props.signIn(this.state.email, this.state.password);
                    }
                } >SignIn</Button>

                <Button variant="contained" color="secondary" onClick={(e) => {
                        this.props.signUp(this.state.email, this.state.password);
                    }
                } >SignUp</Button>

                <Snackbar open={(this.props.isAuthSuccess && !this.props.dialogClose)}
                    message="Authentication succeeded" 
                    autoHideDuration={2000} 
                    onClose={ () => {
                        this.props.gotoContentPage();
                    }
                } />
                
                <Snackbar open={(this.props.isAuthFailed && !this.props.dialogClose)}
                    message="Authentication failed" 
                    autoHideDuration={2000}
                    onClose={ () => {
                        this.props.closeDialog();
                    }
                } />
            </Paper>
        );
    }
}