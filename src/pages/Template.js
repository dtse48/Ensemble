import { Card,Image } from "react-bootstrap";
import { Menu,List } from "semantic-ui-react";
import classes from "./Template.module.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
function Template() {
    const context = useContext(UserContext);
    return (
        <Card style={{width:"50%",margin:"auto",marginTop:"50px"}}>
            <Card.Header style={{textAlign:"center",backgroundColor:"#fff9eb"}}>@{context.username}</Card.Header>
            <Card.Body>
                <Image src={context.profilePicture} roundedCircle style={{width:"15%",marginLeft:"175px",marginTop:"100px"}}></Image>
                <Menu style={{width:"50%",float:"right"}} widths={3}>
                    <Menu.Item>
                        Posts: {context.numPosts}
                    </Menu.Item>
                    <Menu.Item>
                        Followers:
                    </Menu.Item>
                    <Menu.Item>
                        Following:
                    </Menu.Item>
                </Menu>
                <Menu style={{width:"50%",float:"right"}}>
                <ul>
                    <li>
                        Posts in 
                    </li>
                    <li>
                        Posts in 
                    </li>
                    <li>
                        Posts in 
                    </li>
                </ul> 
                </Menu> 
            </Card.Body>
        </Card>
    );
}

export default Template;