import { Menu } from "semantic-ui-react";
import classes from "./Room.module.css";

function Room(props) {
    return (
        <Menu className={classes.room} widths={1}>
            {props.numPosts === 1 ?
            <Menu.Item link>{props.numPosts} post about {props.roomName}</Menu.Item>
            :
            <Menu.Item link>{props.numPosts} posts about {props.roomName}</Menu.Item>
            }
            
        </Menu>
    )
}

export default Room;