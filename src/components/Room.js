import { Menu } from "semantic-ui-react";
import classes from "./Room.module.css";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Room(props) {
    const history = useHistory();
    // const context = useContext(UserContext);
    const {set_currentRoom} = useContext(UserContext);
    var roomPosts = [];
    var posts = [];
    function redirect() {
        fetch("https://ensemble-75caf-default-rtdb.firebaseio.com/posts.json")
        .then(response => {
            return response.json();
        }).then(data => {
            for (const key in data) {
                const post = {
                    ...data[key]
                }
                posts.push(post);
            }
        }).then(() => {
            for (const post2 of props.posts) {
                for (const post3 of posts) {
                    if (post2 === post3.id) {
                        roomPosts.push(post3);
                        break;
                    }
                }
            }
        }).then(() => {
            set_currentRoom(roomPosts)
            console.log(roomPosts);
            history.push("/roomposts");
        })
    }
    return (
        <div style={{width:"50%",margin:"auto"}}>
        <Menu style={{marginTop:"25px"}} className={classes.room} widths={1}>
                {props.numPosts === 1 ?
                <Menu.Item link onClick={redirect}>{props.numPosts} post about {props.roomName}</Menu.Item>
                :
                <Menu.Item link onClick={redirect}>{props.numPosts} posts about {props.roomName}</Menu.Item>
                }
            </Menu>
        </div>
        
    )
}

export default Room;