import { Card,Image } from "react-bootstrap";
import { Menu,Icon } from "semantic-ui-react";
import { useEffect,useContext,useState } from "react";
import { UserContext } from "../context/UserContext";
import classes from "./ShowProfile.module.css";
import { Link } from "react-router-dom";

function ShowProfile() {
    const context = useContext(UserContext);
    const [username,setUsername] = useState("");
    const [profilePicture,setProfilePicture] = useState("");
    const [numPosts,setNumPosts] = useState(0);
    const [showFollowing,setShowFollowing] = useState(false);
    function toggleFollowing() {
        setShowFollowing(!showFollowing);
    }
    useEffect(() => {
        fetch("https://ensemble-75caf-default-rtdb.firebaseio.com/users.json")
        .then((response) =>{
            return response.json();
        })
        .then((data) => {
            for (const key in data) {
                if (data[key].username === context.currentProfile) {
                    setUsername(data[key].username);
                    setProfilePicture(data[key].picture);
                    setNumPosts(data[key].numPosts);
                    break;
                }
            }
        })
    },[context.currentProfile])
    return (
        <Card style={{width:"50%",margin:"auto",marginTop:"50px"}}>
            <Card.Header style={{textAlign:"center",backgroundColor:"#fff9eb"}}>
                <Link>@{username}</Link>
            </Card.Header>
            <Card.Body>
                <Image src={profilePicture} roundedCircle style={{width:"15%",marginLeft:"175px"}}></Image>
                <Menu style={{width:"50%",float:"right"}} widths={3}>
                    <Menu.Item>
                        Posts: {numPosts}
                    </Menu.Item>
                    <Menu.Item>
                        Followers:
                    </Menu.Item>
                    <Menu.Item>
                        Following:
                    </Menu.Item>
                </Menu>
            </Card.Body>
            {context.username !== username ?
            <Card.Footer style={{textAlign:"right",backgroundColor:"#fff9eb"}}> 
                {context.loggedIn ? 
                <div>
                    {!showFollowing ?
                    <div>
                        <Icon name="user outline" size="large"></Icon>
                        <Icon name="plus" size="small" className={classes.icon} onClick={toggleFollowing}></Icon>
                    </div>
                    :
                    <div>
                        <Icon name="user" size="large" className={classes.icon} onClick={toggleFollowing}></Icon>
                        <Icon name="minus" size="small" className={classes.icon} onClick={toggleFollowing}></Icon>
                    </div>
                    }
                </div> 
                :
                <Link to="/login">Log in to follow this user</Link>
                }    
            </Card.Footer>
            :
            null
            }
        </Card>
    );
}

export default ShowProfile;