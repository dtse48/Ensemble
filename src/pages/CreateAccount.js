import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState,useContext,useEffect} from "react";
import {useHistory} from "react-router-dom";
import {UserContext} from "../context/UserContext";

function CreateAccount() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [picture,setPicture] = useState("");
    const [submitted,setSubmitted] = useState(false);
    const [loadedUsers,setUsers] = useState([]);
    const history = useHistory();
    const context = useContext(UserContext);
    const {set_Username} = useContext(UserContext);
    const {set_Password} = useContext(UserContext);
    const {setLoggedIn} = useContext(UserContext);
    var validUsername = true;
    useEffect(() => {
        fetch("https://ensemble-75caf-default-rtdb.firebaseio.com/users.json"
        ).then(response => {
            return response.json();
        }).then(data => {
            const users = [];
            for (const key in data) {
                const user = {
                    id: key,
                    ...data[key]
                }
                users.push(user); 
            }
            setUsers(users);
        });
    },[])
    console.log(loadedUsers);
    function registrationHandler() {
        setSubmitted(true);
        if (username !== "" && password !== "") {
            for (const key in loadedUsers) {
                if (username === loadedUsers[key].username) {
                    alert("username is taken!");
                    validUsername = false;
                }
            }
            if (validUsername) {
                let userData = {
                    username: username,
                    password: password,
                    picture: picture,
                    numPosts: 0
                }
                fetch("https://ensemble-75caf-default-rtdb.firebaseio.com/users.json",
                {
                    method:"POST",
                    body:JSON.stringify(userData),
                    headers: {"Content-Type": "application/json"}
                }).then(() => {
                    history.push("/");
                    alert("Congratulations, you have created an account!");
                });
                // set_Username(username);
                // set_Password(password);
                // setLoggedIn(true);
            }
        }
    }
    return (
        <div>
            <Form style = {{marginLeft: "auto",marginRight:"auto",marginTop:"15px",width:"25%"}}>
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type = "text" onBlur={(response)=>{setUsername(response.target.value);}}></Form.Control>
                    {submitted && username === "" ?
                    <div style={{color:"red"}}>Username is required!</div> 
                    : null}
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type = "password" onBlur={(response)=>{setPassword(response.target.value);}}></Form.Control>
                    {submitted && password === "" ?
                    <div style={{color:"red"}}>Password is required!</div> 
                    : null}
                    <Form.Label>Profile Picture (image link):</Form.Label>
                    <Form.Control type = "text" onBlur={(response)=>{setPicture(response.target.value);}}></Form.Control>
                </Form.Group>
                <div style = {{textAlign:"center"}}>
                    <Button style = {{marginTop:"20px",marginLeft:"auto",marginRight:"auto",backgroundColor: "#ff7456",borderColor:"#ff7456"}} onClick = {registrationHandler}>Register</Button>
                </div>
            </Form>
        </div>
    );
}
export default CreateAccount;