import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import GridTile from "@material-ui/core/GridListTile";

export default class Tag extends React.Component {
    render() {
        return (
            <GridTile onClick = { (e) => { this.props.selectTag( this.props.tagID ) } }>
                <ListItem button={true} dense={true} >
                    <ListItemText primary = {this.props.title} />
                    <ListItemText secondary = {this.props.abstract} />
                </ ListItem>
            </GridTile>
        );
    }
}