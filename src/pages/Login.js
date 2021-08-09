import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {useState, useContext} from "react";
import {UserContext} from "../context/UserContext";
import {useHistory} from "react-router-dom";

function LoginPage() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [submitted,setSubmitted] = useState(false);
    const [loadedUsers,setLoadedUsers] = useState([]);
    const [userFound,setUserFound] = useState(null);
    const {setLoggedIn} = useContext(UserContext); 
    const {set_Username} = useContext(UserContext);
    const {set_Password} = useContext(UserContext);
    const {set_UserId} = useContext(UserContext);
    const history = useHistory();
    const context = useContext(UserContext);
    function submitHandler() {
        setSubmitted(true);
        if (username !== "" && password !== "") {
            console.log(loadedUsers);
            if (loadedUsers.length !== 0) {
                for (const key in loadedUsers) {
                    if (username === loadedUsers[key].username && password === loadedUsers[key].password) {
                        console.log("user found!");
                        setUserFound(true);
                        setLoggedIn(true);
                        set_Username(username);
                        set_Password(password);
                        set_UserId(loadedUsers[key].id);
                        history.push("/");
                    }
                }
            }  
        }
        if (userFound === null) {
            setUserFound(false);
        }
    }
    function loadData() {
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
                setLoadedUsers(users);
            });
    }
    return (
        <div>
            {loadData()}
            <Form style = {{marginLeft: "auto",marginRight:"auto",marginTop:"50px",width:"25%"}}>
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
                    {userFound === false ?
                    <div style={{color:"red"}}>Username or Password incorrect!</div>
                    : null}
                </Form.Group>
                <div style = {{textAlign:"center"}}>
                    <Button style = {{marginTop:"20px",marginLeft:"auto",marginRight:"auto",backgroundColor: "#ff7456",borderColor:"#ff7456"}} onClick = {submitHandler}>Log in</Button>
                </div>
            </Form>
            <div style={{textAlign:"center",marginTop:"15px"}}>
                <Link to = "/createaccount">Don't have an account? Create one here</Link>
            </div>
        </div>
    );
}
export default LoginPage;