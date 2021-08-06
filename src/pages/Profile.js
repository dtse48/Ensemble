import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import MyProfile from "./MyProfile";
import {Link} from "react-router-dom";
import {Menu} from "semantic-ui-react";

function Profile() {
    const context = useContext(UserContext);
    return (
        <div>
            {context.loggedIn ?
            <div>
                <ul>
                    <Menu vertical style={{width:"3%"}}><Link to="/settings" style={{textDecoration:"none",color:"black"}}>Settings</Link></Menu>
                </ul>
                <MyProfile ></MyProfile>
            </div>
            :
            <div style={{textAlign:"center",marginTop:"50px"}}>Please log in or create an account to see your profile!</div>
            }
        </div>
    );
}
export default Profile;