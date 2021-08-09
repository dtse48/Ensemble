import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import MyProfile from "./MyProfile";
import {Link} from "react-router-dom";
import {Icon, Card, Button, Image} from "semantic-ui-react";
import { useHistory } from "react-router-dom";

function Profile() {
    const context = useContext(UserContext);
    const history = useHistory();
    function redirect() {
        history.push("/settings")
    }
    return (
        <div>
            {context.loggedIn ?
            <div>
                <Button icon ><Icon name="settings" size="large" onClick={redirect}></Icon></Button>
                <Card style={{margin:"auto"}}>
                   <Image src="https://upload.wikimedia.org/wikipedia/en/5/53/Wolf_cover3.jpg"></Image>
                    <Card.Content>
                        <Card.Header>{context.username}</Card.Header>
                        <Card.Meta>More Info</Card.Meta>
                        <Card.Description>More Info</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        asdfasfd
                    </Card.Content>
                </Card>
            </div>
            :
            <div style={{textAlign:"center",marginTop:"50px"}}>Please log in or create an account to see your profile!</div>
            }
        </div>
    );
}
export default Profile;