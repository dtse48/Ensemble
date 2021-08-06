import {Header,Menu} from "semantic-ui-react";
import {useState,useContext} from "react";
import 'semantic-ui-css/semantic.min.css'
import {Button} from "react-bootstrap";
import {UserContext} from "../context/UserContext";
function Settings() {
    const [mouseOver,setMouseOver] = useState("");
    const [showUsername,setShowUsername] = useState(false);
    const [showPassword,setShowPassword] = useState(false);
    const [showPicture,setShowPicture] = useState(false);
    const [newUsername,setNewUsername] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [newPicture,setNewPicture] = useState("");
    const context = useContext(UserContext);
    function mouseOverUsername() {
        setMouseOver("username")
    }
    function mouseNotOverUsername() {
        setMouseOver("")
    }
    function mouseOverPassword() {
        setMouseOver("password")
    }
    function mouseNotOverPassword() {
        setMouseOver("")
    }
    function mouseOverPicture() {
        setMouseOver("picture")
    }
    function mouseNotOverPicture() {
        setMouseOver("")
    }
    function showUsernameInput() {
        setShowUsername(true);
        setShowPassword(false);
        setShowPicture(false);
    }
    function showPasswordInput() {
        setShowUsername(false);
        setShowPassword(true);
        setShowPicture(false);
    }
    function showPictureInput() {
        setShowUsername(false);
        setShowPassword(false);
        setShowPicture(true);
    }
    function changeUsername() {
        if (newUsername !== "") {
            fetch("https://ensemble-75caf-default-rtdb.firebaseio.com/users/" + context.userId + ".json",
            {
                method:"PATCH",
                body:JSON.stringify({
                    username: newUsername
                }),
                headers: {"Content-Type": "application/json"}
            }).then(() => {
                // history.push("/");
                alert("Username successfully updated!");
            })
        }
    }
    function changePassword() {
        if (newPassword !== "") {
            fetch("https://ensemble-75caf-default-rtdb.firebaseio.com/users/" + context.userId + ".json",
            {
                method:"PATCH",
                body:JSON.stringify({
                    password: newPassword
                }),
                headers: {"Content-Type": "application/json"}
            }).then(() => {
                // history.push("/");
                alert("Password successfully updated!");
            })
        }
    }
    function changePicture() {
        if (newPicture !== "") {
            fetch("https://ensemble-75caf-default-rtdb.firebaseio.com/users/" + context.userId + ".json",
            {
                method:"PATCH",
                body:JSON.stringify({
                    picture: newPicture
                }),
                headers: {"Content-Type": "application/json"}
            }).then(() => {
                // history.push("/");
                alert("Picture successfully updated!");
            })
        }
    }
    return (
        <div style={{textAlign:"center"}}>
            <Menu vertical>
                <Menu.Item onMouseOver={mouseOverUsername} onMouseLeave={mouseNotOverUsername} active={mouseOver==="username"} onClick={showUsernameInput}>
                    <p>Change username</p>
                    {showUsername ?
                    <div>
                        <input onChange={(response => {setNewUsername(response.target.value);})}></input>
                        <Button size="sm" style={{marginTop:"15px"}} onClick={changeUsername}>Confirm</Button>
                    </div>
                    :null}
                </Menu.Item>
                <Menu.Item onMouseOver={mouseOverPassword} onMouseLeave={mouseNotOverPassword} active={mouseOver==="password"} onClick={showPasswordInput}>
                    <p>Change password</p>
                    {showPassword ?
                    <div>
                        <input onChange={(response => {setNewPassword(response.target.value);})}></input>
                        <Button size="sm" style={{marginTop:"15px"}} onClick={changePassword}>Confirm</Button>
                    </div>
                    :null}
                </Menu.Item>
                <Menu.Item onMouseOver={mouseOverPicture} onMouseLeave={mouseNotOverPicture} active={mouseOver==="picture"} onClick={showPictureInput}>
                    <p>Change profile picture</p>
                    {showPicture ?
                    <div>
                        <input onChange={(response => {setNewPicture(response.target.value);})} placeholder="Image link"></input>
                        <Button size="sm" style={{marginTop:"15px"}} onClick={changePicture}>Confirm</Button>
                    </div>
                    :null}
                </Menu.Item>
            </Menu>
        </div>
    );
}
export default Settings