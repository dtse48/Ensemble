import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import MyProfile from "./MyProfile";

function Profile() {
    const context = useContext(UserContext);
    return (
        <div>
            {context.loggedIn ?
            <MyProfile ></MyProfile>
            :
            <div style={{textAlign:"center",marginTop:"50px"}}>Please log in or create an account to see your profile!</div>
            }
        </div>
    );
}
export default Profile;