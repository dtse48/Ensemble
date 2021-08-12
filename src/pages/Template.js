import { Card,Image } from "react-bootstrap";
import { Menu } from "semantic-ui-react";
import classes from "./Template.module.css";

function Template() {
    return (
        <Card style={{width:"50%",margin:"auto",marginTop:"50px"}}>
            <Card.Header style={{textAlign:"center",backgroundColor:"#fff9eb"}}>Username</Card.Header>
            <Card.Body>
                <Image src="https://upload.wikimedia.org/wikipedia/en/5/53/Wolf_cover3.jpg" roundedCircle style={{width:"10%",marginLeft:"200px"}}></Image>
                <Menu style={{width:"50%",float:"right"}} widths={3}>
                    <Menu.Item>
                        Posts
                    </Menu.Item>
                    <Menu.Item>
                        Followers
                    </Menu.Item>
                    <Menu.Item>
                        Following
                    </Menu.Item>
                </Menu>
            </Card.Body>
        </Card>
    );
}

export default Template;