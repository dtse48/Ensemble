import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {useState} from "react";

function LoginPage() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [submitted,setSubmitted] = useState(false);
    const [loadedUsers,setLoadedUsers] = useState([]);
    const [userFound,setUserFound] = useState(null);
    function submitHandler() {
        setSubmitted(true);
        if (username !== "" && password !== "") {
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
            for (const key in loadedUsers) {
                if (username === loadedUsers[key].username && password === loadedUsers[key].password) {
                    console.log("user found!");
                    setUserFound(true);
                }
            }
            if (userFound === null) {
                setUserFound(false);
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