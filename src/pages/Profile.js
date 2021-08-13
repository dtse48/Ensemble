import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import MyProfile from "./MyProfile";
import {Link} from "react-router-dom";
import {Icon, Card, Button, Image} from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import Template from "./Template";

function Profile() {
    const context = useContext(UserContext);
    const history = useHistory();
    const {set_NumPosts} = useContext(UserContext);
    function redirect() {
        history.push("/settings")
    }
    function showProfile() {
        history.push("/myposts");
    }
    function loadData() {
        fetch("https://ensemble-75caf-default-rtdb.firebaseio.com/users/" + context.userId + ".json")
        .then(response => {
            return response.json();
        }).then(data => {
            set_NumPosts(data.numPosts);
            console.log(context.numPosts)
        })
    }
    return (
        
        <div>
            {loadData()}
            {context.loggedIn ?
            <div>
                <Button icon ><Icon name="settings" size="large" onClick={redirect}></Icon></Button>
                <Button onClick={showProfile}>My Posts</Button>
                <Template>
                </Template>
            </div>
            :
            <div style={{textAlign:"center",marginTop:"50px"}}>Please log in or create an account to see your profile!</div>
            }
        </div>
    );
}
export default Profile;