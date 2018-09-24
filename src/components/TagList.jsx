import React from "react";
import Tag from "../containers/TagContainer";

import GridList from "@material-ui/core/GridList";
import ListSubheader from "@material-ui/core/ListSubheader";
import GridTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import PlaylistAdd from "@material-ui/icons/PlaylistAdd";

export default class TagList extends React.Component {
    render() {
        var list = [];
        this.props.tags.forEach(element => {
            list.push(
                <Tag key = {element.tagID} style={{ width: "100%" }} tagID = {element.tagID} title = {element.title} abstract = {element.abstract} />
            );
        });

        return (
            <GridList cellHeight = {"auto"} cols = {1} style = {{ flexDirection: "column", flexWrap: "nowrap", height: "100%" }}>
                <GridTile key = "Subheader" cols = {1} rows = {1} >
                    <ListSubheader component="div">REGISTER</ListSubheader>
                    <GridListTileBar actionIcon = { 
                        <IconButton onClick = { (e) => { 
                            this.props.addTag(this.props.tagID + 1) 
                        }} >
                            <PlaylistAdd />
                        </IconButton> 
                    } />
                </GridTile>
                {list}
            </GridList>
        );
    }
}