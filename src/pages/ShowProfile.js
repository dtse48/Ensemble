import { Card,Image } from "react-bootstrap";
import { Menu } from "semantic-ui-react";
import { useEffect,useContext,useState } from "react";
import { UserContext } from "../context/UserContext";

function ShowProfile() {
    const context = useContext(UserContext);
    const [username,setUsername] = useState("");
    const [profilePicture,setProfilePicture] = useState("");
    const [numPosts,setNumPosts] = useState(0);
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
            <Card.Header style={{textAlign:"center",backgroundColor:"#fff9eb"}}>@{username}</Card.Header>
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
        </Card>
    );
}

export default ShowProfile;