import React from "react";
import { Field } from "redux-form";
import Moment from "moment";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Done from "@material-ui/icons/Done";
import VpnKey from "@material-ui/icons/VpnKey";

const renderTextField = ({
    input,
    label,
    ...custom
  }) =>
    <TextField
      label={label}
      {...input}
      {...custom}
    />

export default class MainContent extends React.Component {
    render() {
        return (
            <form>
                <center>{this.props.tag.tagID} : {this.props.tag.updateAt}</center> <br />
                <Divider />

                <Field 
                    name="title"
                    label="Title"
                    component={renderTextField}
                /><br />
                <Field 
                    name="abstract"
                    label="Abstract"
                    component={renderTextField}
                /><br />
                <Field 
                    name="detail"
                    label="Detail"
                    component={renderTextField}
                /><br />
                <Field 
                    name="seed"
                    label="Seed"
                    component={renderTextField}
                /><br />

                <Button 
                    type="submit"
                    icon={ <Done /> }
                    style={{ float: "right" }}
                    onClick={this.props.handleSubmit(
                        values => {
                            this.props.saveTag({
                                tagID: values.tagID,
                                title: values.title,
                                abstract: values.abstract,
                                detail: values.detail,
                                seed: values.seed,
                                updateAt: Moment().format('LLL'),
                            })
                        }
                    )}
                >Save</Button>
                <Button 
                    icon={ <VpnKey /> }
                    style={{ float: "right" }}
                    onClick={this.props.handleSubmit(
                        values => {
                            this.props.generatePassword(values.seed);
                        }
                    )}
                >Generate</Button>
            </form>
        );
    }
}
